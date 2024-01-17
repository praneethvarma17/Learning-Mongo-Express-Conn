import  Express  from 'express';
import { MongoClient } from 'mongodb';

const expressApp = new Express()

const client = new MongoClient('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1')

let conn;
try {
    conn = await client.connect()
} catch(err) {
    console.log(err)
}

let db = conn.db('signdesk')

expressApp.get('/', async (req, res) => {
    let collection = await db.collection('users')

    let results = await collection.find({}).limit(50).toArray();

    res.status(200);
    res.send(results)
})


expressApp.listen(3000, ()=> {console.log('Server Started Listening on 3000')})