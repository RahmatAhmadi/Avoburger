import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export default function SearchBar({ query, onQueryChange }: SearchBarProps) {
  return (
    <div className="relative mb-4 w-full max-w-2xl">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="w-full p-2 pl-10 pr-20 border rounded-xl"
      />
      <span className="absolute top-2 right-5 font-semibold text-gray-700">
        Search
      </span>
    </div>
  );
}
