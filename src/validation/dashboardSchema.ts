import * as Yup from 'yup';

const errorMessages = {
  required: 'This field is required',
  amount: 'Amount must be a number',
  date: 'Date param should have a date type',
};

export const createDashboardRevenueShema = Yup.object().shape({
  amount: Yup.number()
    .typeError(errorMessages.amount)
    .required(errorMessages.required),
  date: Yup.date().typeError(errorMessages.date),
  source: Yup.string().required(errorMessages.required),
});

export const createDashboardReceivableShema = Yup.object().shape({
  amount: Yup.number().required(errorMessages.required),
  dueDate: Yup.date(),
  client: Yup.string().required(errorMessages.required),
  status: Yup.string()
    .oneOf(['Pending', 'Paid', 'Error'])
    .required(errorMessages.required),
});

export const createDashboardExpenseShema = Yup.object().shape({
  amount: Yup.number().required(errorMessages.required),
  date: Yup.date(),
  category: Yup.string()
    .oneOf(['TransferBetweenCards', 'CashWithdrawn', 'Food', 'Taxes', 'Rent'])
    .required(errorMessages.required),
  notes: Yup.string(),
});
