import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Subheading from "../components/Subheading";
import Button from "../components/Button";
import { Link, Navigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWaring";
import { useState } from "react";
export default function Signin() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const Navigate = useNavigate();
  return <div className="bg-slate-300 h-screen flex justify-center"> 
     <div className="flex flex-col gap-2 justify-center items-center">
         <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label="Sign Up" />
        <Subheading label="Create a new account" />
        <InputBox label="First Name" placeholder="kanishk" onChange={(e) => setFirstName(e.target.value)} />
        <InputBox label="Last Name" placeholder="gupta" onChange={(e) => setLastName(e.target.value)} />
        <InputBox label="Email" type="email" placeholder="kanishk@gmail.com" onChange={(e) => setEmail(e.target.value)} />
        <InputBox label="Password" type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
        <InputBox label="Confirm Password" type="password" placeholder="Confirm your password" onChange={(e) => setConfirmPassword(e.target.value)} />
        <p className="text-sm text-red-500 text-left mt-1">
            {password !== confirmPassword && confirmPassword.length > 0 && "Passwords do not match"}
        </p>
        <Button label="Sign Up" onClick={
            () => {
                try{
                    if(password !== confirmPassword){
                        alert("Passwords do not match");
                        return;
                    }
                    // Make API call to sign up the user
                    fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            firstName,
                            lastName,
                            email,
                            password
                        })
                    }).then(res => res.json()).then(data => {
                        if(data.success){
                            alert("User created successfully");
                            Navigate("/signin");
                        }else{
                            alert(data.message || "Something went wrong");
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }catch(err){
                    console.log(err);
                }
            }
        }/>
        <BottomWarning label="Already have an account?" buttonText="Sign In" to="/signin" />
    </div>
    </div>
  </div>
}