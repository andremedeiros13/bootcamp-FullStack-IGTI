const express = require('express');
const fs = require('fs');
const app = express();
const accountsRouter = require('./routes/accouts');

global.fileName = "accounts.json";

app.use(express.json());

app.use('/account', accountsRouter)



app.listen(3000, () => {
    try {

        fs.readFile(global.fileName, 'UTF8', (err, data) => {
            if (err) {
                const initialJson = {
                    nextId: 1,
                    accounts: []
                };
                fs.writeFile(global.fileName, JSON.stringify(initialJson), err => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });

    } catch (error) {
        console.error(error);
    }
    console.log('server is running')
}); 