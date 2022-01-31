const LOGGER_TOKEN = 'LOGGER_TOKEN';

export const getLoggerToken = (ctx) => {
  return `${ctx}_${LOGGER_TOKEN}`;
};
