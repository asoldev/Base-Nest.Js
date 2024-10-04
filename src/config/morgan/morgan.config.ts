import * as fs from "fs";
import * as path from "path";
import * as rfs from "rotating-file-stream";

const logDirectory = path.resolve("public/logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory, { recursive: true });

const accessLogStream = rfs.createStream(
  (time, index) => {
    if (!time) return `access-${index}.log`;
    const date = new Date(time);
    return `access-${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}.log`;
  },
  {
    interval: "1d",
    path: logDirectory,
  }
);

const errorLogStream = rfs.createStream(
  (time, index) => {
    if (!time) return `error-${index}.log`;
    const date = new Date(time);
    return `error-${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}.log`;
  },
  {
    interval: "1d",
    path: logDirectory,
  }
);

export { accessLogStream, errorLogStream };
