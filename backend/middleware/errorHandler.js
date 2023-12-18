import { logEvents } from './logger.js';

const errorHandler = (err, req) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers['x-real-ip']}`,
    'errLog.log'
  );


};
export default errorHandler;
