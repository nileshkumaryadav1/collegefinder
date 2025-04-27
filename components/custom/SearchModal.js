"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [data, setData] = useState({
    colleges: [],
    exams: [],
    scholarships: [],
  });
  const router = useRouter();
  const inputRef = useRef(null);

  // Fetch data when modal opens
  useEffect(() => {
    if (isOpen) {
      fetch("/api/search")
        .then((res) => res.json())
        .then((resData) => setData(resData))
        .catch((err) => console.error("Error fetching data:", err));
    }
  }, [isOpen]);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100); // small delay for smoother focus
    }
  }, [isOpen]);

  // Filter search results
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredResults([]);
      return;
    }

    const combinedResults = [
      ...data.colleges.map((item) => ({ ...item, type: "college" })),
      ...data.exams.map((item) => ({ ...item, type: "exam" })),
      ...data.scholarships.map((item) => ({ ...item, type: "scholarship" })),
    ];

    const results = combinedResults.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(results);
  }, [searchTerm, data]);

  // Redirect on clicking a result
  const handleResultClick = (item) => {
    router.push(`/${item.type}s/${item.slug}`);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Blurred Background */}
      <div
        className="absolute inset-0 backdrop-blur-md bg-black/40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-lg p-6 animate-fadeIn">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Search Colleges, Exams & Scholarships
        </h2>

        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          placeholder="Type to search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
        />

        {filteredResults.length > 0 && (
          <ul className="mt-4 border border-gray-200 rounded-lg max-h-56 overflow-y-auto bg-white">
            {filteredResults.map((item) => (
              <li
                key={item.slug}
                onClick={() => handleResultClick(item)}
                className="p-3 border-b last:border-0 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
              >
                <span className="font-semibold text-gray-700">{item.name}</span>
                <span className="text-xs text-gray-500 capitalize">
                  {item.type}
                </span>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:from-red-600 hover:to-red-700 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SearchModal;
