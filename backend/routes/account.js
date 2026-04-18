const express = require('express');
const app = express();
const accountsRouter = express.Router();
const Account = require("../models/account");
const authorization = require("../middlewares/authorization");
const User = require("../models/user");
accountsRouter.get("/test", (req, res) => {
    res.json({ message: "API is working!" });
});

accountsRouter.get("/balance", authorization, async (req, res) => {
    const userId = req.user.id;
    try {
        const account = await Account.findOne({ userId });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.json({ balance: account.balance });
    } catch (err) {
        console.error("Error fetching account balance:", err);
        res.status(500).json({ message: "Error fetching account balance" });
    }
});

accountsRouter.post("/transfer", authorization, async (req, res) => {
    const senderId = req.user.id;
    const { recipientEmail, amount } = req.body;
    try {
        const session = await Account.startSession();
        session.startTransaction();
        const recipientUser = await User.findOne({ email: recipientEmail }).session(session);
        if (!recipientUser) {
            return res.status(404).json({ message: "Recipient user not found: " + recipientEmail });
        }
        const recipientAccount = await Account.findOne({ userId: recipientUser._id }).session(session);
        if (!recipientAccount) {
            return res.status(404).json({ message: "Recipient account not found" });
        }
        const senderAccount = await Account.findOne({ userId: senderId }).session(session);
        if (!senderAccount) {
            return res.status(404).json({ message: "Sender account not found" });
        }
        if (senderAccount.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }
        senderAccount.balance -= amount;
        recipientAccount.balance += amount;
        await Account.updateOne({ _id: senderAccount._id }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ _id: recipientAccount._id }, { $inc: { balance: amount } }).session(session);
        await session.commitTransaction();
        session.endSession(); 
        res.json({ message: "Transfer successful" });
    } catch (err) { 
        console.error("Error processing transfer:", err);
        res.status(500).json({ message: "Error processing transfer" });
    }
});
module.exports = accountsRouter;