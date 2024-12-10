import mongoose, { ObjectId } from 'mongoose';
import Dashboard from '../models/dashboard.model';
import { getDaysList } from '../utils/getDaysList';
import { createDateFilter } from '../utils/date';
import { getMonths } from '../utils/getMonths';

const months = getMonths();

const expenseTypes = [
  'Transfer between cards',
  'Cash withdrawn',
  'Food',
  'Taxes',
  'Rent',
];

class DashboardService {
  async getOverview(
    userId: string,
    filter?: { date?: Date; month?: number; year?: number },
  ) {
    const matchConditions: {
      user: mongoose.Types.ObjectId;
      $and?: mongoose.FilterQuery<any>[];
    } = { user: new mongoose.Types.ObjectId(userId) };

    const dateFilter = createDateFilter(
      filter?.date,
      filter?.month,
      filter?.year,
    );

    if (Object.keys(dateFilter).length) {
      matchConditions.$and = [dateFilter];
    }

    const result = await Dashboard.aggregate([
      { $match: matchConditions },
      {
        $project: {
          totalRevenue: { $sum: '$revenue.amount' },
          totalReceivables: { $sum: '$receivables.amount' },
          pendingReceivables: {
            $sum: {
              $cond: [
                { $eq: ['$receivables.status', 'Pending'] },
                '$receivables.amount',
                0,
              ],
            },
          },
          totalExpenses: { $sum: '$expenses.amount' },
        },
      },
    ]);

    return result;
  }

  async getCharts(
    userId: string,
    filter?: { startDate?: Date; endDate?: Date },
  ) {
    const filterOptions: {
      user: mongoose.Types.ObjectId;
      $and?: mongoose.FilterQuery<any>[] | undefined;
    } = {
      user: new mongoose.Types.ObjectId(userId),
    };
    const currentMonth = new Date().getMonth();
    const labels = months.slice(0, currentMonth);
    const dayLabels = getDaysList();

    if (filter?.startDate || filter?.endDate) {
      filterOptions.$and = [];

      if (filter.startDate) {
        filterOptions.$and.push({
          'revenue.date': { $gte: new Date(filter.startDate) },
        });
        filterOptions.$and.push({
          'expenses.date': { $gte: new Date(filter.startDate) },
        });
      }

      if (filter?.endDate) {
        filterOptions.$and.push({
          'revenue.date': { $lte: new Date(filter.endDate) },
        });
        filterOptions.$and.push({
          'expenses.date': { $lte: new Date(filter.endDate) },
        });
      }
    }

    const result = await Dashboard.aggregate([
      {
        $match: filterOptions,
      },
      {
        $project: {
          revenuesAndExpensesLineChart: {
            labels,
            revenueDataSet: {
              $map: {
                input: labels,
                as: 'month',
                in: {
                  $reduce: {
                    input: '$revenue',
                    initialValue: 0,
                    in: {
                      $add: [
                        '$$value',
                        {
                          $cond: [
                            {
                              $eq: [
                                { $month: '$$this.date' },
                                months.indexOf('$$month') + 1,
                              ],
                            },
                            '$$this.amount',
                            0,
                          ],
                        },
                      ],
                    },
                  },
                },
              },
            },
            expensesDataSet: {
              $map: {
                input: labels,
                as: 'month',
                in: {
                  $reduce: {
                    input: '$expenses',
                    initialValue: 0,
                    in: {
                      $add: [
                        '$$value',
                        {
                          $cond: [
                            {
                              $eq: [
                                { $month: '$$this.date' },
                                months.indexOf('$$month') + 1,
                              ],
                            },
                            '$$this.amount',
                            0,
                          ],
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
          expensesDoughnut: {
            labels: expenseTypes,
            datasets: {
              $map: {
                input: expenseTypes,
                as: 'expenseType',
                in: {
                  $reduce: {
                    input: '$expenses',
                    initialValue: 0,
                    in: {
                      $add: [
                        '$$value',
                        {
                          $cond: [
                            { $eq: ['$$expenseType', '$$this.category'] },
                            '$$this.amount',
                            0,
                          ],
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
          currentMonthExpensesAndRevenuesBarChart: {
            currentMonth,
            labels: dayLabels,
            revenueDataSet: {
              $map: {
                input: dayLabels,
                as: 'day',
                in: {
                  $reduce: {
                    input: '$revenue',
                    initialValue: 0,
                    in: {
                      $add: [
                        '$$value',
                        {
                          $cond: [
                            {
                              $eq: [
                                { $dayOfMonth: '$$this.date' },
                                { $toInt: '$$day' },
                              ],
                            },
                            '$$this.amount',
                            0,
                          ],
                        },
                      ],
                    },
                  },
                },
              },
            },
            expensesDataSet: {
              $map: {
                input: dayLabels,
                as: 'day',
                in: {
                  $reduce: {
                    input: '$expenses',
                    initialValue: 0,
                    in: {
                      $add: [
                        '$$value',
                        {
                          $cond: [
                            {
                              $eq: [
                                { $dayOfMonth: '$$this.date' },
                                { $toInt: '$$day' },
                              ],
                            },
                            '$$this.amount',
                            0,
                          ],
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      },
    ]);

    return result;
  }
}

export default new DashboardService();
