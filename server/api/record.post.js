import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./database/db.sql');

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    if (!body.id) {
        return await postRecord(body);
    } else {
        return await updateRecord(body);        
    }

    function postRecord(body) {
        return new Promise((resolve, reject) => {
            try {
                db.serialize(function () {
                    const statementInsertPush = db.prepare("INSERT INTO `records`(`name`, `comment`, `multiselect1`, `multiselect2`, `simpleselect`) VALUES (?,?,?,?,?)");
                    statementInsertPush.run(body.name, body.comment, body.multiselect1, body.multiselect2, body.simpleselect);
                    statementInsertPush.finalize();
                });
            } catch (error) {
                console.log(`Error With Select ALL(): \r\n ${error}`)
                reject();
            }
        });
    }

    function updateRecord(body) {
        return new Promise((resolve, reject) => {
            try {
                db.serialize(function () {
                    const statementUpdatePush = db.prepare("UPDATE `records` SET name = (?), comment = (?), multiselect1 = (?), multiselect2 = (?), simpleselect = (?) WHERE id = (?)");    
                    statementUpdatePush.run(body.name, body.comment, body.multiselect1, body.multiselect2, body.simpleselect, body.id);
                    statementUpdatePush.finalize();
                });
            } catch (error) {
                console.log(`Error With Select ALL(): \r\n ${error}`)
                reject();
            }
        });
    }
  
});