import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { BottomWarning } from "../components/BottomWaring";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();
  return <div className="bg-slate-300 h-screen flex justify-center"> 
     <div className="flex flex-col justify-center items-center">
         <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label="Sign In" />
        <Subheading label="Enter your credentials to access your account" />
        <InputBox label="Email" type="email" placeholder="your email" onChange={(e) => setEmail(e.target.value)} />
        <InputBox label="Password" type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}  />
        <Button label="Sign In" onClick={
            () => {
              try{
                    console.log(email, password);
                    // Make API call to sign in the user
                    fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email,
                            password
                        })
                    }).then(res => res.json()).then(data => {
                        console.log(data);
                        if(data.token){
                            alert("User Logged in successfully");
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
        <BottomWarning label="Don't have an account?" buttonText="Sign Up" to="/signup" />
    </div>
    </div>
  </div>
}