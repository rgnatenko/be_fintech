import * as Yup from 'yup';

const errorMessages = {
  required: 'This field is required',
  month: 'Month must be a number',
  budgetedHours: 'Budget hours must be a number',
  actualHours: 'Actual hours must be a number',
  budge: 'Budge must be a number',
  tedExpenses: 'Ted expenses must be a number',
  actualExpenses: 'Actual expenses must be a number',
};

export const createFinancialPlanSchema = Yup.object().shape({
  projectId: Yup.string().required(errorMessages.required),
  month: Yup.number()
    .required(errorMessages.required)
    .typeError(errorMessages.month),
  budgetedHours: Yup.number()
    .typeError(errorMessages.budgetedHours)
    .required(errorMessages.required),
  actualHours: Yup.number()
    .typeError(errorMessages.actualHours)
    .required(errorMessages.required),
  budge: Yup.number()
    .typeError(errorMessages.budge)
    .required(errorMessages.required),
  tedExpenses: Yup.number()
    .typeError(errorMessages.tedExpenses)
    .required(errorMessages.required),
  actualExpenses: Yup.number()
    .typeError(errorMessages.actualExpenses)
    .required(errorMessages.required),
});

export const updateFinancialPlanSchema = Yup.object().shape({
  month: Yup.string(),
  budgetedHours: Yup.number().typeError(errorMessages.budgetedHours),
  actualHours: Yup.number().typeError(errorMessages.actualHours),
  budge: Yup.number().typeError(errorMessages.budge),
  tedExpenses: Yup.number().typeError(errorMessages.tedExpenses),
  actualExpenses: Yup.number().typeError(errorMessages.actualExpenses),
});
