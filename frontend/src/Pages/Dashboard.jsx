import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const Navigate = useNavigate();
  if(localStorage.getItem("token") == null){
    Navigate("/signin");
  }
  return(
    <div >
        <Appbar/>
        <Balance balance={1000}/>
        <Users/>
    </div>
  )
}