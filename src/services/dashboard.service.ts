import mongoose, { ObjectId } from 'mongoose';
import Dashboard from '../models/dashboard.model';
import { getDaysList } from '../utils/getDaysList';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

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
    const matchConditions: any = { user: new mongoose.Types.ObjectId(userId) };
    const andConditions = [];

    if (filter?.date) {
      const startOfDay = new Date(filter.date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(filter.date);
      endOfDay.setHours(23, 59, 59, 999);

      andConditions.push(
        { 'revenue.date': { $gte: startOfDay, $lte: endOfDay } },
        { 'receivables.dueDate': { $gte: startOfDay, $lte: endOfDay } },
        { 'expenses.date': { $gte: startOfDay, $lte: endOfDay } },
      );
    }

    if (filter?.month || filter?.year) {
      const month = filter?.month ? filter.month - 1 : new Date().getMonth();
      const year = filter?.year || new Date().getFullYear();
      const startOfMonth = new Date(year, month, 1);
      const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);

      andConditions.push(
        { 'revenue.date': { $gte: startOfMonth, $lte: endOfMonth } },
        { 'receivables.dueDate': { $gte: startOfMonth, $lte: endOfMonth } },
        { 'expenses.date': { $gte: startOfMonth, $lte: endOfMonth } },
      );
    }

    if (andConditions.length > 0) {
      matchConditions.$and = andConditions;
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
