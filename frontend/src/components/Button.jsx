export default function Button({ label, onClick }) {
    return (
    <button type="button" className="bg-brand-dark text-white box-border border border-transparent hover:bg-brand-dark-strong focus:ring-4 shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none w-full my-2" onClick={onClick}>
        {label}
    </button>
    );
  }
