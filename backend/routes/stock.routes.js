import express from "express";
import { getStock, getStockHistory } from "../controllers/stock.controller.js";

const router = express.Router();


router.get('/:symbol', getStock);
router.get('/history/:symbol'  , getStockHistory)


export default router;