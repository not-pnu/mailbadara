export const EDescription = {
    DEFAULT: 'DEFAULT',
    WARNING: 'WARNING',
    BRANCH: 'BRANCH',
    WAITING: 'WAITING',
    ALERT_MAIL: 'ALERT_MAIL',
    DUPLICATE: 'DUPLICATE',
    ERROR: 'ERROR',
};

export type EDescription = (typeof EDescription)[keyof typeof EDescription];
