const mysql = require("mysql2");

console.log("DATABASE CONNECTION BEGUN");

const config = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "277374",
  port: process.env.DB_PORT || "3306",
  database: process.env.DB_NAME || "pissbabydb",
  timezone: "+00:00",
};
console.log(config);
const dbPool = mysql.createPool({
  ...config,
  connectionLimit: 10,
  waitForConnections: true,
});

dbPool.once("connection", () => console.log("CONNECTED"));

exports.getConfig = () => config;

exports.getPromise = () => dbPool.promise();

exports.getConnection = () =>
  new Promise((resolve, reject) => {
    dbPool.getConnection((err, conn) => {
      if (err) {
        reject(err);
      } else {
        resolve(conn.promise());
      }
    });
  });

exports.releaseConnection = (conn) => {
  conn.release();
};
