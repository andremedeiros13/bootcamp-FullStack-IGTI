const express = require('express');
const { promises } = require('fs');
const gradesRouter = require('./routes/grades.js');

const { readFile, writeFile } = promises;


global.fileName = 'grades.json';

const app = express();
app.use(express.json());
app.use('/grades', gradesRouter);

app.listen(3000, async () => {
    try {
        await readFile(global.fileName, 'UTF8');
        console.log('API Started');

    } catch (err) {
        const initialJson = {
            nextId: 1,
            grades: []
        }
        await writeFile(global.fileName, JSON.stringify(initialJson)).catch(err => {
            console.log(err);
        })

    }
});

