export default function Balance({ balance = 0 }){
    return <div className="flex border border-slate-200 rounded p-4 items-center">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
}