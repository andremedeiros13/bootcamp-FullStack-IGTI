const express = require('express');
const fs = require('fs');
const router = express.Router();

router.post('/', (req, res) => {
    let account = req.body;

    fs.readFile(global.fileName, 'UTF8', (err, data) => {
        if (!err) {
            try {

                let json = JSON.parse(data);
                account = {
                    id: json.nextId++,
                    ...account
                };
                json.accounts.push(account);

                fs.writeFile(global.fileName, JSON.stringify(json), err => {
                    if (err) {
                        res.status(400).send({ error: err.message })

                    } else {
                        res.end();
                    }
                })

            } catch (err) {
                res.status(400).send({ error: err.message })
            }

        } else {
            res.status(400).send({ error: err.message })
        }
    });
});

router.get('/', (_req, res) => {
    fs.readFile(global.fileName, 'UTF8', (err, data) => {
        if (!err) {
            let results = JSON.parse(data);
            delete results.nextId;
            res.send(results);

        } else {
            res.status(400).send({ error: err.message });
        }
    });
});

router.get('/:id', (req, res) => {
    const accountId = req.params.id;
    fs.readFile(global.fileName, 'UTF8', (err, data) => {
        if (!err) {
            let results = JSON.parse(data);
            const account = results.accounts.find(account => account.id === parseInt(accountId, 10));
            if (account) {
                res.send(account);
            } else {
                res.status(400).send('Account Not Found!');
            }
        } else {
            res.status(400).send({ error: err.message });
        }
    });
});

module.exports = router;