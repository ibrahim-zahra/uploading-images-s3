/**
 * RDS-MYSQL DB connector and repository
 * Configure DB details in .env file
 * First it will create a DB and users table if not exist
 */
const mysql = require('mysql');

let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,

});
connection.connect(function (err) {
    if (err) throw err;
});
initialize()

/**
 * Initialize your DB with tables
 * new table should be added to the procedure
 */
async function initialize() {
    console.log("Initializing DB")
    await createDB();
    createUserTable();
    createImagePathTable();
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
 *This table will store user info like email and password
 * User id is autogenerated
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

/**
 *This table will store user uploaded images with his ID
 */
function createImagePathTable() {
    console.log("Creating image_path table if not exists")
    connection.query("CREATE TABLE  IF NOT EXISTS `user_images` (\n" +
        "  `user_id` int NOT NULL,\n" +
        "  `image_path` varchar(255) NOT NULL,\n" +

        "  PRIMARY KEY (`user_id`,`image_path`),\n" +
        "   CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;", function (err, results) {
        if (err) {
            console.log('error in creating image path table', err);
            return;
        }
    })
}
//Close DB connection on exit
process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
    connection.end();
});
//Any table repositry will
module.exports=connection;