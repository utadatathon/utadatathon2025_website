// src/app/components/SearchableSchoolDropdown.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';

interface SearchableSchoolDropdownProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  required?: boolean;
}

const SearchableSchoolDropdown: React.FC<SearchableSchoolDropdownProps> = ({
  id,
  value,
  onChange,
  required = false
}) => {
  const [schools, setSchools] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSchools, setFilteredSchools] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchSchools() {
      try {
        // Fetch the local CSV file
        const response = await fetch("/data/schools.csv");
        const text = await response.text();
        
        // Process the schools from the CSV
        const processSchools = (csvText: string) => {
          const lines = csvText.split('\n');
          
          // Skip header line if it exists
          const startIndex = lines[0].includes("we've manually verified") ? 1 : 0;
          
          // Extract US schools
          const usSchools = lines.slice(startIndex)
            .filter(line => line.trim() !== '')
            .filter(line => {
              const lowerLine = line.toLowerCase();
              // Include schools that explicitly mention US or don't specify a country (assuming US)
              return lowerLine.includes("united states") || 
                     lowerLine.includes(", us") || 
                     lowerLine.includes(", usa") ||
                     !lowerLine.includes(","); // Many US schools might not specify country
            })
            .map(line => {
              // Try to extract just the school name by removing country info
              const parts = line.split(',');
              return parts[0].trim().replace(/^"|"$/g, '');
            });
            
          return Array.from(new Set(usSchools)); // Remove duplicates
        };
        
        // Get all schools
        let schoolNames = processSchools(text);
        
        // Add UTA manually if not in the list or to ensure it's included
        if (!schoolNames.some(s => s.toLowerCase().includes("texas at arlington"))) {
          schoolNames.push("University of Texas at Arlington");
        }
        
        // Make sure UTA is at the top
        const utaIndex = schoolNames.findIndex(
          school => school.toLowerCase().includes("texas at arlington")
        );
        
        if (utaIndex !== -1) {
          const uta = schoolNames.splice(utaIndex, 1)[0];
          schoolNames.unshift(uta);
        } else {
          schoolNames.unshift("University of Texas at Arlington");
        }
        
        // Sort the rest alphabetically
        const utaSchool = schoolNames[0];
        const restOfSchools = schoolNames.slice(1).sort((a, b) => 
          a.localeCompare(b, undefined, { sensitivity: 'base' })
        );
        
        const sortedSchools = [utaSchool, ...restOfSchools];
        console.log(`Loaded ${sortedSchools.length} US schools`);
        
        // Update state
        setSchools(sortedSchools);
        setFilteredSchools(sortedSchools);
        
      } catch (error) {
        console.error("Failed to fetch schools:", error);
        
        // Fallback with at least UTA and top US schools
        const fallbackSchools = [
          "University of Texas at Arlington",
          "Harvard University",
          "Stanford University",
          "Massachusetts Institute of Technology",
          "University of California, Berkeley",
          "Princeton University",
          "Yale University",
          "Columbia University",
          "University of Chicago",
          "University of Pennsylvania",
          "University of Texas at Austin",
          "Texas A&M University",
          "Rice University",
          "University of Houston",
          "Texas Tech University",
          "Southern Methodist University"
        ];
        setSchools(fallbackSchools);
        setFilteredSchools(fallbackSchools);
      }
    }
    
    fetchSchools();
    
    // Add click outside listener to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update input value when the value prop changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Filter schools based on input
    if (newValue) {
      // Improved search - handle partial matches better
      const searchTerms = newValue.toLowerCase().split(' ').filter(term => term.length > 0);
      
      const filtered = schools.filter(school => {
        const schoolName = school.toLowerCase();
        // Check if all search terms are found in the school name
        return searchTerms.every(term => schoolName.includes(term));
      });
      
      setFilteredSchools(filtered);
      
      // Always show at least UTA if no matches found
      if (filtered.length === 0) {
        const uta = schools.find(s => s.toLowerCase().includes("texas at arlington"));
        if (uta) {
          setFilteredSchools([uta]);
        }
      }
    } else {
      setFilteredSchools(schools);
    }
    
    setIsOpen(true);
    
    // Create a synthetic event to pass to the parent's onChange handler
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        id,
        value: newValue
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(syntheticEvent);
  };

  const handleSchoolSelect = (school: string) => {
    setInputValue(school);
    setIsOpen(false);
    
    // Create a synthetic event to pass to the parent's onChange handler
    const syntheticEvent = {
      target: {
        id,
        value: school
      }
    } as React.ChangeEvent<HTMLSelectElement>;
    
    onChange(syntheticEvent);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        id={id}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        className="form-input w-full"
        placeholder="Type to search for your school"
        required={required}
      />
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg">
          {filteredSchools.length > 0 ? (
            <ul className="text-gray-900">
              {filteredSchools.map((school, index) => {
                // Special highlighting for UTA
                const isUTA = school.toLowerCase().includes("texas at arlington");
                
                return (
                  <li
                    key={index}
                    onClick={() => handleSchoolSelect(school)}
                    className={`cursor-pointer px-3 py-2 hover:bg-gray-100 ${
                      isUTA ? 'bg-blue-50 font-semibold text-blue-800' : ''
                    }`}
                  >
                    {school}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-3 py-2 text-gray-700">
              No schools found. Try different search terms or select "University of Texas at Arlington"
              <div className="mt-2">
                <button
                  onClick={() => handleSchoolSelect("University of Texas at Arlington")}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Select UTA
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableSchoolDropdown;