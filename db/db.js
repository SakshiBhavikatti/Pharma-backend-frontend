import mysql from "mysql2";
import express, { json } from "express";
import cors from "cors";
import { getMedicineDetails, getRandomNumber } from "../db/helper.js";
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DB_URI =
  "mysql://avnadmin:AVNS_Wq9z1CjMWf0xkkox-R4@mysql-1835da40-ak0704176-bdd5.c.aivencloud.com:16165/pharmacy_management_system";
export const connection = mysql.createConnection(DB_URI);

connection.connect((err) =>
  err ? console.error("Connection error:", err) : console.log("DB CONNECTED")
);

app.get("/api/medicine", (request, response) => {
  const getMedicine = `SELECT Name,Category,Description,Price,PName,Quantity,MedicineID FROM medicine INNER JOIN pharmacy ON medicine.P_ID = pharmacy.PharmacyID`;
  connection.query(getMedicine, (err, res) => {
    return err ? response.sendStatus(400) : response.status(200).json(res);
  });
});

app.get("/api/supplier", (request, response) => {
  const getSupplier = `SELECT * FROM supplier`;
  connection.query(getSupplier, (err, res) => {
    return err ? response.sendStatus(400) : response.status(200).json(res);
  });
});

app.post("/api/bill", (request, response) => {
  const { cart } = request.body;

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return response.status(400).json({ error: "Cart items are required" });
  }

  const insertBillItems = "INSERT INTO bill (CustomerID, PharmacyID, BillDate, TotalAmount, Med_ID, Quantity) VALUES (?, ?, ?, ?, ?, ?)";
  const CustomerID = getRandomNumber(1, 15);
  const PharmacyID = getRandomNumber(110, 112);
  const BillDate = new Date();
  let totalAmount = 0;

  cart.forEach(async (item) => {
    const { MedicineID, Quantity } = item;
    const medicineDetails = await getMedicineDetails(MedicineID);

    if (medicineDetails) {
      const { Price } = medicineDetails;
      totalAmount += Price * Quantity;
      const values = [
        CustomerID,
        PharmacyID,
        BillDate,
        totalAmount,
        MedicineID,
        Quantity,
      ];

      connection.query(insertBillItems, values, (err, res) => {
        err
          ? console.error("Error inserting data into Bill table:", err)
          : response.status(201);
      });
    }
  });
});

app.listen(PORT, () => {
  console.log("SERVER UP");
});
