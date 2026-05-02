import React from "react";
import Button from "./Button";
export default function Appbar() {
    return (
        <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            {import.meta.env.VITE_APP_NAME} APP
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {localStorage.getItem("username") ? localStorage.getItem("username").charAt(0) : "U"}
                </div>
            </div>
            <div>
                <Button label={"Logout"} onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("username");
                    window.location.href = "/signin";
                }} />
            </div>
        </div>
    </div>
    );
}