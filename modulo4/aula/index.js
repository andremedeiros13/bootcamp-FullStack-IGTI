
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://igti:andre@bootcamp.cwoi3.mongodb.net/<dbname>?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true

});

client.connect(async (err) => {
    const collection = client.db("grades").collection("student");


    //busca collection student
    const documents = await collection.find().toArray();

    //console.log(documents);

    //busca na collection pelo subject
    const documents1 = await collection.find({ subject: 'bootcamp' }).toArray();
    // console.log(documents1);



    const dataBaseList = await client.db().admin().listDatabases();

    dataBaseList.databases.forEach(db => {
        console.log(` - ${db.name}`)
    });

    client.close();
});
