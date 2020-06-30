import express from 'express';
import mongoose from 'mongoose';
import { studentRouter } from './routes/studentRouter.js';

//conectar ao MongoDB pelo mongoose
(async () => {
    try {
        await mongoose.connect('mongodb+srv://igti:andre@bootcamp.cwoi3.mongodb.net/grades?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

    } catch (err) {
        console.error(err);
    }
})();



const app = express();
app.use(express.json());
app.use(studentRouter);


app.listen(3000, () => console.log('API Iniciado'));