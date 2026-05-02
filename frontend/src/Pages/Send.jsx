import {useState, useEffect} from "react"
import Button from "../components/Button"
import { Navigate, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { use } from "react";

export default function Send(){
   const [searchParams] = useSearchParams();
    const recipientEmail = searchParams.get("recipient");
    const recipientName = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    console.log(recipientEmail, recipientName);
    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">{recipientName.charAt(0)+recipientName.charAt(1)}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{recipientName}</h3>
                </div>
                <div className="space-y-4">
                    <AmountInput amount={amount} setAmount={setAmount} />
                    <InitiateTransferButton recipientEmail={recipientEmail} amount={amount} />
                </div>
                </div>
        </div>
      </div>
    </div>
}


function AmountInput({amount, setAmount}){
    const [localAmount, setLocalAmount] = useState(amount);
    useEffect(() => {
        if(localAmount < 0){
            return;
        }
        const timer = setTimeout(() => {
            setAmount(localAmount);
        }, 500);
       return () => clearTimeout(timer);
    }, [localAmount]);
    return <div className="space-y-2">
        <label
            className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="amount"
        >
            Amount (in Rs)
        </label>
        <input
            type="number"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            id="amount"
            placeholder="Enter amount"
            value={localAmount}
            onChange={(e) => setLocalAmount(e.target.value)}
        />
        <p className="text-red-600"> {localAmount < 0 ? "Amount must be a positive number" : ""}</p>
    </div>
}
function InitiateTransferButton({recipientEmail, amount}){
    const Navigate = useNavigate();
    if(amount <= 0){
        return <button disabled className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-gray-400 text-white cursor-not-allowed">
            Initiate Transfer disabled
        </button>
    }
    const handleClick = () => {
        // Make API call to initiate transfer
        console.log("Initiating transfer to:", recipientEmail, "Amount:", amount);
        fetch(`${import.meta.env.VITE_API_URL}/accounts/transfer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                recipientEmail,
                amount
            })
        }).then(res => res.json()).then(data => {
            console.log(data);
            alert(data.message || "Transfer initiated successfully");
            Navigate("/Dashboard");
        }).catch(err => {
            console.log(err);
            alert(err.message || "Something went wrong in initiating transfer");
        });
    };
    return <button className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white" onClick={handleClick}>
        Initiate Transfer
    </button>
}