const mongoose = require('mongoose');


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

//criando o modelo de schema/collection
const studentSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    subject: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    value: {
        type: Number,
        require: true
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
});

//definindo o modelo de schema/collection
mongoose.model('student', studentSchema, 'student');
//|

const student = mongoose.model('student');

new student({
    name: 'Pedro',
    subject: 'Matematica',
    type: 'Trabalho Pratico',
    value: 22
})
    .save()
    .then(() => console.log('Documento inserido'))
    .catch((err) => console.log(err));

