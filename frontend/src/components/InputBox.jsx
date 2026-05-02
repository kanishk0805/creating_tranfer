export default function InputBox({ label, type = "text", placeholder , onChange}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-left py-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-200"
        onChange={onChange}
      />
    </div>
  );
}