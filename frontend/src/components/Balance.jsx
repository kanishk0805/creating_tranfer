import { useState,useEffect } from "react"

export default function Balance(){
    const [balance,setBalance] = useState(0);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/accounts/balance`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json()).then(data => {
            console.log("Fetched balance:", data);
            setBalance(data.balance);
        }).catch(err => {
            console.log("Error fetching balance:", err);
            alert("Error fetching balance: " + (err.message || "Unknown error"));   
            }
        );
    }, [balance]);
    return <div className="flex border border-slate-200 rounded p-4 items-center">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
}