export const Errors = {
  InvalidJson: [400, 'InvalidJson', 'Invalid JSON'],
  ValidationError: (
    field: string,
    issue:
      | 'range'
      | 'type'
      | 'too_small'
      | 'too_large'
      | 'restricted_characters',
  ) => [
    400,
    'ValidationError',
    `Parameter is missing or in an invalid format`,
    { field, issue },
  ],
  ActionLimit: (type: 'rate') => [
    403,
    'ActionLimit',
    `You faced ${type} limit of this action`,
    { type },
  ],
  UnexpectedError: [
    500,
    'UnexpectedError',
    'Try again or contact support',
  ] as const,
  AlreadyExists: (record: string, field: string) =>
    [
      400,
      'AlreadyExists',
      'This record already exists',
      { record, field },
    ] as const,
  RegistrationError: [
    400,
    'RegistrationError',
    'Wrong email or password, try to reregister with correct credentials',
  ] as const,
  Unauthorized: [401, 'Unauthorized', 'User is not authorized'] as const,
  IncorrectActivationLink: [
    400,
    'IncorrectActivationLink',
    'Incorrect activation link',
  ] as const,
  UserNotFound: [
    404,
    'UserNotFound',
    'User not found, try to re-login or register',
  ] as const,
  WrongPassword: [400, 'WrongPassword', 'Wrong password'] as const,
  IncorrectToken: [
    400,
    'IncorrectToken',
    'You must provide correct encrypted token',
  ] as const,
  RateLimit: [
    429,
    'RateLimit',
    'You have exceeded the rate limit. Please wait a moment and try again',
  ] as const,
  TWOFA: [
    400,
    'TwoFactor',
    'Failed to send 2FA code, please try again.',
  ] as const,
  InvalidTWOFA: [400, 'InvalidTWOFA', 'Invalid or expired 2FA code.'] as const,
  ExpiredTWOFA: [400, 'ExpiredTWOFA', '2FA code has expired.'] as const,
  FailedToSend2FA: [400, 'FailedToSend2FA', 'Failed to send 2fA'] as const,
  FailedToSendSMS: [400, 'FailedToSendSMS', 'Failed to send SMS'] as const,
  FailedToGenerateToken: [
    400,
    'FailedToGenerateToken',
    'Failed to generate token, please try again',
  ] as const,
  OverviewError: [
    400,
    'OverviewError',
    'Error happened while loading overview, please try again',
  ] as const,
  ChartsError: [
    400,
    'OverviewError',
    'Error happened while loading charts, please try again',
  ] as const,
};

export type MyError = readonly [number, string, string, any?];
