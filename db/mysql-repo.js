/**
 * RDS-MYSQL DB connector and repository
 * Configure DB details in .env file
 * First it will create a DB and users table if not exist
 * @type {{createConnection?: function((Object|string)): Connection, createPool?: function((Object|string)): Pool, createPoolCluster?: function(Object=): PoolCluster, createQuery?: function(string, Array=, Function=): Query, escape?: function(*, boolean=, string=): string, escapeId?: function(*, boolean=): string, format?: function(string, Array=, boolean=, string=): string, raw?: function(string): *, Types?: *}}
 */
var mysql = require('mysql');
const userTable = "users";
var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,

});
initialize()

/**
 *
 * @param email
 * @param callback
 */
function getUser(email, callback) {
    console.log(email)
    connection.query(`SELECT * FROM ${userTable} where email=?`, [email], function (err, result, fields) {
        if (err) throw err;
        callback(result);
    });
}

/**
 *
 * @param user
 * @param callback
 * @returns {Promise<void>}
 */
async function insertUser(user, callback) {
    getUser(user.email, function (result) {
        if (result.length > 0) {
            console.log("This user already exist")
            callback(false)
        } else {

            connection.query(`INSERT INTO ${userTable} (email, password) VALUES(?,?)`, [ user.email, user.password], function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                callback(true)
            });
        }
    })
}
/**
 * Initialize your DB with tables
 * new table should be added to the procedure
 */
async function initialize() {
    console.log("Initializing DB")
    await createDB();
    createUserTable();
}

/**
 *
 */
async function createDB() {
    console.log("Creating DB if not exist")
    await connection.query('CREATE DATABASE IF NOT EXISTS ??', process.env.MYSQL_SCHEMA, function (err, results) {
        if (err) {
            console.log('error in creating database', err);
            return;
        }
    })
    //Set current DB after creating it

    connection.changeUser({database: process.env.MYSQL_SCHEMA}, function (err) {
        if (err) throw err;
    });
}

/**
 *
 */
function createUserTable() {

    console.log("Creating users table if not exists")
    connection.query("CREATE TABLE  IF NOT EXISTS `users` (\n" +
        "  `id` int NOT NULL AUTO_INCREMENT,\n" +
        "  `email` varchar(255) DEFAULT NULL,\n" +
        "  `password` varchar(255) DEFAULT NULL,\n" +
        "  PRIMARY KEY (`id`),\n" +
        "  UNIQUE KEY `email_UNIQUE` (`email`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;", function (err, results) {
        if (err) {
            console.log('error in creating table', err);
            return;
        }
    })
}

module.exports = {getUser, insertUser};