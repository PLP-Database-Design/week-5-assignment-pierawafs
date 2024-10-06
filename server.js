const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');

app.use(express.json());
dotenv.config();

const db = mysql.createConnection({
host: process.env.DB_HOST,
user: process.env.DB_USERNAME,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME

});

db.connect((err) => {
    if (err) return console.log("Error connecting to MYSQL");
    console.log("Connected to MYSQL as ID:",db.threadId);
} )


app.set('view engine', 'ejs');
app.set ('views', __dirname + '/views');

app.get('', (req,res) => {

    db.query ('SELECT patient_id,first_name,last_name, date_of_birth FROM patients', (err, results) => {
        if (err){
            console.error(err);
            res.status(500).send('Error retrieving data')

        }else {
             res.render('data',{results:results});
    }
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
    console.log('Sending message to browser.....');

    app.get('/', (req,res) => {
        res.send('Server Started Sucessfully!');
    });

});
