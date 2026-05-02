import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Subheading from "../components/Subheading";
import Button from "../components/Button";
import { Link, Navigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWaring";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import zod from "zod";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
        <p className="text-red-600">
            {email.length > 0 && !zod.string().email().safeParse(email).success ? "Invalid email address" : ""}
        </p>
        <InputBox label="Password" type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
        <p className="text-sm text-red-500 text-left mt-1"> 
          {password.length > 0 && !passwordRegex.test(password) ? "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character" : ""}
        </p>
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
                    if(!zod.string().email().safeParse(email).success){
                        alert("Invalid email address");
                        return;
                    }
                    if(!passwordRegex.test(password)){
                        alert("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
                        return;
                    }
                    console.log(firstName, lastName, email, password, confirmPassword);
                    // Make API call to sign up the user
                    fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            firstname: firstName,
                            lastname: lastName,
                            email,
                            password,
                            confirmPassword
                        })
                    }).then(res => res.json()).then(data => {
                        console.log(data);
                        if(data.token){
                            alert("User created successfully");
                            localStorage.setItem("token", data.token);
                            localStorage.setItem("username", data.user.firstname+ " " + data.user.lastname);
                            localStorage.setItem("email", data.user.email);
                            Navigate("/Dashboard");
                        }else{
                            alert(data.message || "Something went wrong in storing the token");
                        }
                    }).catch(err => {
                        console.log(err);
                        alert(err.message || "Something went wrong in signing up");
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