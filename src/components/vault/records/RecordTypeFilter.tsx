import React from 'react';

interface RecordTypeFilterProps {
  selectedType: string;
  onChange: (type: string) => void;
}

const TYPES = ['All', 'Lab Reports', 'Prescriptions', 'Visit Notes', 'Vaccinations', 'Insurance', 'Other'];

const RecordTypeFilter: React.FC<RecordTypeFilterProps> = ({ selectedType, onChange }) => {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
      {TYPES.map(type => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedType === type 
              ? 'bg-gray-900 text-white' 
              : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default RecordTypeFilter;
