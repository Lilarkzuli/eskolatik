const mysql = require('mysql2/promise');
import { database } from './config/database';

const connection = mysql.createConnection({
  host: database.DB_HOST,
  user: database.DB_USER,
  password: database.DB_PASS,
  database: database.DATABASE
});

export default connection;