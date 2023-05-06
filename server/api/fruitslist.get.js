import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./database/db.sql');

export default defineEventHandler(async (event) => {

    return await selectAll();
    
    function selectAll() {
        return new Promise((resolve, reject) => {
            try {
                db.serialize(function () {
                    db.all("SELECT * FROM fruits", function (err, rows) {
                        resolve(rows);
                    });
                });
            } catch (error) {
                console.log(`Error With Select ALL(): \r\n ${error}`)
                reject();
            }
        });
    }

});