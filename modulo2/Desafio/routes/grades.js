const express = require('express');
const { promises } = require('fs');
const { readFile, writeFile } = promises;

const router = express.Router();

router.post('/', async (req, res) => {
    let grade = req.body;
    try {
        console.log('Ola')
        let data = await readFile(global.fileName, 'UTF8');
        let json = JSON.parse(data);

        grade = { id: json.nextId++, ...grade, timestamp: new Date() }
        json.grades.push(grade)

        await writeFile(global.fileName, JSON.stringify(json));

        res.send(grade).end();

    } catch (err) {
        res.sendStatus(400).send({ error: err.message });
    }

});

router.put('/', async (req, res) => {
    try {
        let newGrade = req.body;
        let data = await readFile(global.fileName, 'utf-8');
        let json = JSON.parse(data);
        let oldIndex = json.grades.findIndex(
            grade => grade.id === newGrade.id
        );

        if (oldIndex < 0) {
            res.status(401).send('Student not found!');
        }

        json.grades[oldIndex].student = newGrade.student;
        json.grades[oldIndex].subject = newGrade.subject;
        json.grades[oldIndex].type = newGrade.type;
        json.grades[oldIndex].value = newGrade.value;

        await writeFile(global.fileName, JSON.stringify(json));
        res.end()

    } catch (err) {
        res.sendStatus(400).send({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let data = await readFile(global.fileName, 'utf-8');
        let json = JSON.parse(data);

        let grade = json.grades.filter(grade => grade.id !== parseInt(req.params.id, 10));
        json.grades = grade;

        await writeFile(global.fileName, JSON.stringify(json));
        res.end();
    } catch (err) {
        res.sendStatus(400).send({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        let data = await readFile(global.fileName, 'utf-8');
        let json = JSON.parse(data);

        let grade = json.grades.find(grade => grade.id === parseInt(req.params.id, 10));

        if (grade) {
            res.send(grade);
        } else {
            res.sendStatus(401).send('Student not found!');
        }

    } catch (err) {
        res.sendStatus(400).send({ error: err.message });
    }
});

router.get('/:student/:subject', async (req, res) => {
    try {
        let student = req.params;
        let data = await readFile(global.fileName, 'utf-8');
        let json = JSON.parse(data);

        let grades = json.grades.filter(grade => grade.student === student.student && grade.subject === student.subject);

        let sum = grades.reduce((acc, curr) => {
            return acc + curr.value;
        }, 0);

        res.send({
            student: student.student,
            subject: student.subject,
            total: sum
        });


        if (indexStudent < 0) {
            res.sendStatus(401).send('Student not found!');
        }
    } catch (err) {
        res.sendStatus(400).send({ error: err.message });
    }
});

router.get('/media/:subject/:type', async (req, res) => {
    try {
        let params = req.params;
        let data = await readFile(global.fileName, 'utf-8');
        let json = JSON.parse(data);

        let grades = json.grades.filter(grade => grade.subject === params.subject && grade.type === params.type);

        let sum = grades.reduce((acc, curr) => {
            return acc + curr.value;
        }, 0);


        let media = sum / grades.length;

        res.send({
            subject: params.subject,
            type: params.type,
            media: media
        });


        if (!params) {
            res.sendStatus(401).send('Student not found!');
        }
    } catch (err) {
        res.sendStatus(400).send({ error: err.message });
    }
});

router.get('/best/:subject/:type', async (req, res) => {
    try {
        let params = req.params;
        let data = await readFile(global.fileName, 'utf-8');
        let json = JSON.parse(data);

        let grades = json.grades.filter(grade => grade.subject === params.subject && grade.type === params.type);

        grades.sort((a, b) => {
            return b.value - a.value
        });

        res.send({ grades });

    } catch (err) {
        res.sendStatus(400).send({ error: err.message });
    }
});

module.exports = router;