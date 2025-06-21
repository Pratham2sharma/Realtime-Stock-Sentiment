// utils/validSymbols.js
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const validSymbols = new Set();

const filePath = path.join(process.cwd(), "data", "symbols.csv");

export const loadSymbols = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if (row.SYMBOL) {
          validSymbols.add(row.SYMBOL.trim().toUpperCase());
        }
      })
      .on("end", () => {
        console.log(`✅ NSE symbols loaded: ${validSymbols.size}`);
        resolve();
      })
      .on("error", reject);
  });
};

export default validSymbols;
