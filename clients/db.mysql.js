import mysql from 'mysql2';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'myfirstdb'
};

const connection = mysql.createConnection(dbConfig);

export default connection.promise()