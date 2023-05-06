const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/db.sql');

const dbInit = () => {
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS records (id VARCHAR(20) PRIMARY KEY, name TEXT, comment TEXT, multiselect1 TEXT, multiselect2 TEXT, simpleselect TEXT)");
        db.run("CREATE TABLE IF NOT EXISTS fruits (id VARCHAR(20), name VARCHAR(20))");
    });    
}

const dbDrop = () => {
    db.serialize(() => {
        // db.run("DROP TABLE legals");
        // db.run("DROP TABLE products");
        // db.run("DROP TABLE pushs");
    });    
}

dbInit();