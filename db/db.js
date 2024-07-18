import mysql from 'mysql2';
import express, { json } from 'express';
import cors from 'cors';
const app = express();
const PORT = 3000;
app.use(cors());
const DB_URI = "mysql://avnadmin:AVNS_Wq9z1CjMWf0xkkox-R4@mysql-1835da40-ak0704176-bdd5.c.aivencloud.com:16165/pharmacy_management_system"
const connection = mysql.createConnection(DB_URI);

connection.connect(err => err ? console.error('Connection error:', err) : console.log("DB CONNECTED"));

app.get('/api/medicine', (request ,response) => {
    const getMedicine = `SELECT Name,Category,Description,Price,PName,Quantity FROM medicine INNER JOIN pharmacy ON medicine.P_ID = pharmacy.PharmacyID`;
    connection.query(getMedicine ,(err, res) => {
        return err ? response.sendStatus(400):response.status(200).json(res);
    });
});

app.get('/api/supplier', (request ,response) => {
    const getSupplier = `SELECT * FROM supplier`;
    connection.query(getSupplier ,(err, res) => {
        return err ? response.sendStatus(400):response.status(200).json(res);
    });
});
app.listen(PORT , () => {
    console.log("SERVER UP");
});