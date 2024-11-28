import * as Yup from 'yup';

const errorMessages = {
  invoiceNumber: 'Invoice number should be a number',
  required: 'This field is required',
  invalidStatus: 'Invalid status value',
  amount: 'amount should be a number',
};

export const createInvoiceSchema = Yup.object().shape({
  invoiceNumber: Yup.number()
    .typeError(errorMessages.invoiceNumber)
    .required(errorMessages.required),
  dueDate: Yup.date().required(errorMessages.required),
  status: Yup.string()
    .oneOf(['UNPAID', 'PAID', 'OVERDUE'], errorMessages.invalidStatus)
    .required(errorMessages.required),
  amount: Yup.number()
    .typeError(errorMessages.amount)
    .required(errorMessages.required),
});

export const updateInvoiceSchema = Yup.object().shape({
  invoiceNumber: Yup.number().typeError(errorMessages.invoiceNumber),
  dueDate: Yup.date(),
  status: Yup.string().oneOf(
    ['UNPAID', 'PAID', 'OVERDUE'],
    errorMessages.invalidStatus,
  ),
  amount: Yup.number().typeError(errorMessages.amount),
});
