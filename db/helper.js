import { connection } from "../db/db.js";

export const getRandomNumber = (min, max) => {
    if (min >= max) {
      throw new Error('Min must be less than max');
    }
    return Math.floor(Math.random() * (max - min) + min);
}

export const getMedicineDetails = async (Med_ID) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT Price FROM medicine WHERE MedicineID = ?';
      connection.query(query, [Med_ID], (err, results) => {
        if (err) {
          console.error('Error fetching medicine details:', err);
          resolve(null);
        } else {
          resolve(results[0]);
        }
      });
    });
  }