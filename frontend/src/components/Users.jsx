import {useState, useEffect} from "react"
import Button from "./Button"
import { useNavigate } from "react-router-dom";
export default function Users() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const Navigate = useNavigate();
    useEffect(() => {
        console.log("Fetching users with filter:", filter);
        fetch(`${import.meta.env.VITE_API_URL}/user/bulk?filter=${filter}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
            setUsers(data);
        }).catch(err => {
            console.log(err);
        });
    }, [filter]);

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2">
                <SearchBar filter={filter} setFilter={setFilter} />
            </div>
            <div>
                {users.map(user => <User key={user.email} user={user} Navigate={Navigate}/>)}
            </div>
        </div>
    );
}


function User({user, Navigate}) {
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button label={"Send Money"} onClick={() => {
                alert(`Send money to ${user.firstname} ${user.lastname}`);
                Navigate(`/Send?recipient=${user.email}&name=${user.firstname} ${user.lastname}`);
            }} />
        </div>
    </div>
}

function SearchBar({filter, setFilter}) {
    const [localFilter, setLocalFilter] = useState(filter);
    useEffect(() => {
        const timer = setTimeout(() => {
            setFilter(localFilter);
        }, 500);
       return () => clearTimeout(timer);
    }, [localFilter]);

    return <div className="my-2">
        <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200" value={localFilter} onChange={(e) => setLocalFilter(e.target.value)}>
        </input>
    </div>
}