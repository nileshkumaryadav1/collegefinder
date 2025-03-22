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
  const inputRef = useRef(null); // Create a reference for the input field

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
      inputRef.current.focus();
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

  // Redirect when clicking a search result
  const handleResultClick = (item) => {
    router.push(`/${item.type}s/${item._id}`);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          Search Colleges, Exams & Scholarships
        </h2>

        <input
          type="text"
          value={searchTerm}
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {filteredResults.length > 0 && (
          <ul className="mt-4 border rounded-md max-h-40 overflow-y-auto">
            {filteredResults.map((item) => (
              <li
                key={item._id}
                onClick={() => handleResultClick(item)}
                className="p-2 border-b last:border-none hover:bg-gray-100 cursor-pointer"
              >
                <strong>{item.name}</strong>{" "}
                <span className="text-gray-500 text-sm">({item.type})</span>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SearchModal;
