import * as Yup from 'yup';
import { ITask } from '../models/task.model';

const errorMessages = {
  required: 'This field is required',
  tags: 'Tags should be string array',
};

export const createTaskSchema = Yup.object().shape({
  projectId: Yup.string().required(errorMessages.required),
  title: Yup.string().required(errorMessages.required),
  description: Yup.string().required(errorMessages.required),
  startDate: Yup.date().typeError('Start date must be a valid date'),
  endDate: Yup.date()
    .min(Yup.ref('startDate'), 'End date must be after the start date')
    .typeError('End date must be a valid date'),
  priority: Yup.string().oneOf(['URGENT', 'HIGH', 'NORMAL', 'LOW']),
  tags: Yup.array().of(Yup.string()).typeError(errorMessages.tags),
});

export const updateTaskSchema = Yup.object().shape({
  title: Yup.string(),
  description: Yup.string(),
  startDate: Yup.date().typeError('Start date must be a valid date'),
  endDate: Yup.date()
    .min(Yup.ref('startDate'), 'End date must be after the start date')
    .typeError('End date must be a valid date'),
  priority: Yup.string()
    .oneOf(['URGENT', 'HIGH', 'NORMAL', 'LOW'])
    .required(errorMessages.required),
  tags: Yup.array().of(Yup.string()).typeError(errorMessages.tags),
});
