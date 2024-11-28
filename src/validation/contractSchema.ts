import * as Yup from 'yup';

const errorMessages = {
  amount: 'amount should be a number',
  required: 'This field is required',
};

export const createContractSchema = Yup.object().shape({
  contractName: Yup.string().required(errorMessages.required),
  startDate: Yup.date(),
  endDate: Yup.date(),
  amount: Yup.number()
    .typeError(errorMessages.amount)
    .required(errorMessages.required),
  terms: Yup.string().required(errorMessages.required),
});

export const updateContractSchema = Yup.object().shape({
  contractName: Yup.string().min(1, errorMessages.required),
  endDate: Yup.date(),
  amount: Yup.number().typeError(errorMessages.amount),
  terms: Yup.string().min(1, errorMessages.required),
});
