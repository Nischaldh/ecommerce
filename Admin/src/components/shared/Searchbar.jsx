import { Search, X } from "lucide-react";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-9 pr-9 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 transition-colors"
    />
    {value && (
      <button
        onClick={() => onChange("")}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <X className="size-4" />
      </button>
    )}
  </div>
);

export default SearchBar;