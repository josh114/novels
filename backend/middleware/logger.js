import format from 'date-fns/format/index.js';
import { v4 } from 'uuid';
import * as fs from 'node:fs';
import * as fsPromises from 'node:fs/promises';
import path from 'path';
import Origin from './originModel.js';
import errorHandler from './errorHandler.js';
import axios from 'axios';

export const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
  const logItem = `${dateTime}\t${v4()}\t${message}\n`;
  const dirname = path.join(process.cwd(), 'logs');
  try {
    if (!fs.existsSync(path.join(dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(dirname, '..', 'logs'));
    }
    await fsPromises.appendFile(
      path.join(dirname, '..', 'logs', logFileName),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};
export const logger = async (req, res, next) => {
  await logEvents(
    `${req.method}\t${req.url}\t${req.headers['x-real-ip']}`,
    'reqLog.log'
  );
  try {
    const ip = req.headers['x-real-ip'];
    // const ip = '197.211.63.110'
    let data;
    if (ip != '::1' || !ip) {
      data = await axios
        .get(`http://ip-api.com/json/${ip}`)
        .then((result) => {
          return result.data;
        })
        .catch((err) => {
          errorHandler(err, req);
        });
    }

    if (data) {
      const body = {
        ip,
        country: data.country,
        countryCode: data.countryCode,
        regionName: data.regionName,
        city: data.city,
        timezone: data.timezone,
        lat: data.lat,
        lon: data.lon,
        isp: data.isp,
        path: req.url,
        method: req.method,
      };
      await Origin.create(body);
    }
  } catch (error) {
    errorHandler(error, req);
  }

  next();
};
