import { useCallback, useRef, useId } from "react";




interface SearchBarProps {
  onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const handleSubmit = useCallback( (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      onSearch(inputRef.current.value);
      localStorage.setItem("lastCityInputId", inputRef.current.id);
      inputRef.current.value = "";
    }
  },[onSearch]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full max-w-md mx-auto my-10"
    >
      <input
        ref={inputRef}
        id = {inputId}
        type="text"
        placeholder="Enter city..."
        className="flex-1 px-4 py-2 rounded-xl bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl shadow-md transition text-white"
      >
        Search
      </button>
    </form>
  );
}
