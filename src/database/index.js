const mysql = require('mysql');

const db = mysql.createPool({
    host: 'sql10.freemysqlhosting.net',
    user: 'sql10481403',
    password: 'lhYMMtqhE7',
    database: 'sql10481403'
});

exports.query = async (query, values = []) => {
    try {
        const result = await new Promise((resolve, reject) => {
            db.query(query, values, (err, res) => {
                if (err){
                    reject(err);
                } 
                else {
                    resolve(res);
                }
            });
        });
        return result;
    } catch (err) {
        console.log('This err happened on db query', err)
    }
};