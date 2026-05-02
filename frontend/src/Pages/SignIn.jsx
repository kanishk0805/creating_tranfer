import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { BottomWarning } from "../components/BottomWaring";

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  return <div className="bg-slate-300 h-screen flex justify-center"> 
     <div className="flex flex-col justify-center items-center">
         <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label="Sign In" />
        <Subheading label="Enter your credentials to access your account" />
        <InputBox label="Email" type="email" placeholder="your email" onChange={(e) => setEmail(e.target.value)} />
        <InputBox label="Password" type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}  />
        <Button label="Sign In" />
        <BottomWarning label="Don't have an account?" buttonText="Sign Up" to="/signup" />
    </div>
    </div>
  </div>
}