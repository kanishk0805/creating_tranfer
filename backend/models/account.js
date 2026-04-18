const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        default: 0
    }
});

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;