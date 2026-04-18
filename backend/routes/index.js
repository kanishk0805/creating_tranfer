const express = require('express');
const router = express.Router();
router.get("/test", (req, res) => {
    res.json({ message: "API is working!" });
});
const userRouter = require("./user"); 
router.use("/user", userRouter);
const accountsRouter = require("./account");
router.use("/accounts", accountsRouter);
module.exports = router;  