const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionControllers");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("date", "La fecha es obligatorio").not().isEmpty(),
    check("paymentMethod", "El metodo de pago es obligatorio").not().isEmpty(),
    check("value", "El valor de la transaccion es obligatorio").not().isEmpty(),
    check("concept", "El concepto es obligatorio").not().isEmpty(),
    check("type", "El tipo de transaccion es obligatorio").not().isEmpty(),
  ],
  auth,
  transactionController.createTransaction
);

router.get("/", auth, transactionController.getTransactions);

module.exports = router;
