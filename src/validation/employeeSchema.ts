import * as Yup from 'yup';

const errorMessages = {
  required: 'This field is required',
  invalidPosition: 'Invalid position value',
  assignedProjects: 'Assigned projects should be string array',
};

export const createEmployeeSchema = Yup.object().shape({
  name: Yup.string().required(errorMessages.required),
  contract: Yup.string().required(errorMessages.required),
  position: Yup.string()
    .oneOf(
      ['Manager', 'Developer', 'Designer', 'QA', 'HR'],
      errorMessages.invalidPosition,
    )
    .required(errorMessages.required),
  assignedProjects: Yup.array()
    .of(Yup.string())
    .typeError(errorMessages.assignedProjects),
});

export const updateEmployeeSchema = Yup.object().shape({
  name: Yup.string(),
  contract: Yup.string(),
  startDate: Yup.date().typeError('Start date must be a valid date'),
  endDate: Yup.date()
    .min(Yup.ref('startDate'), 'End date must be after the start date')
    .typeError('End date must be a valid date'),
  position: Yup.string().oneOf(
    ['Manager', 'Developer', 'Designer', 'QA', 'HR'],
    errorMessages.invalidPosition,
  ),
  assignedProjects: Yup.array()
    .of(Yup.string())
    .typeError(errorMessages.assignedProjects),
});

export const assignProjectSchema = Yup.object().shape({
  projectId: Yup.string().required(errorMessages.required),
});

export const assignTaskSchema = Yup.object().shape({
  taskId: Yup.string().required(errorMessages.required),
});
