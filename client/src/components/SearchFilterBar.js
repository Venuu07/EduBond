// client/src/components/SearchFilterBar.js
'use client';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

// 'onSearch' is a function passed from the parent page
// 'placeholder' is the text for the search bar
export default function SearchFilterBar({ onSearch, placeholder = "Search..." }) {
    // This state holds what the user is *currently* typing
    const [searchTerm, setSearchTerm] = useState('');

    // This useEffect implements the debounce
    useEffect(() => {
        // Set a timer to call onSearch after 300ms
        const delayDebounceFn = setTimeout(() => {
            // onSearch is the function from the parent (e.g., setApiQuery)
            // It will be called with the final search term
            onSearch(searchTerm);
        }, 300); // Wait 300ms after user stops typing

        // Cleanup function: This runs if the user starts typing *again*
        // before the 300ms is up. It clears the old timer.
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, onSearch]); // Rerun effect if searchTerm changes

    return (
        <div className="mb-6 max-w-lg mx-auto">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={20} className="text-gray-400" />
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-input w-full pl-10 pr-4 py-2" // Use form-input for consistent styling
                    placeholder={placeholder}
                />
            </div>
            {/* We can add filter dropdowns here later */}
        </div>
    );
}