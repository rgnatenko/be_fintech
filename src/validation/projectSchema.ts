import * as Yup from 'yup';

const errorMessages = {
  budget: 'Budget should be a number',
  required: 'This field is required',
};

export const createProjectSchema = Yup.object().shape({
  name: Yup.string().required(errorMessages.required),
  description: Yup.string(),
  startDate: Yup.date(),
  endDate: Yup.date(),
  budget: Yup.number()
    .typeError(errorMessages.budget)
    .required(errorMessages.required),
  status: Yup.string(),
});

export const updateProjectSchema = Yup.object().shape({
  name: Yup.string().min(1, errorMessages.required),
  description: Yup.string(),
  endDate: Yup.date(),
  budget: Yup.number().typeError(errorMessages.budget),
  status: Yup.string(),
});
