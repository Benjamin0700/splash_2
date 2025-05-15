import React, { useState } from 'react';
import FilterModal from './FilterModal';

const ProductPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});

  const handleApplyFilters = (selectedFilters) => {
    setFilters(selectedFilters);
    console.log("Qo‘llanilgan filter:", selectedFilters);
    // Filteringni shu yerda amalga oshirish mumkin
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setIsFilterOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Open Filters
      </button>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
      />

      <div className="mt-4">
        <p><strong>Tanlangan maksimal narx:</strong> ${filters.price}</p>
        <p><strong>Saralash:</strong> {filters.sortBy}</p>
        {/* Bu yerda filtered mahsulotlar ro'yxatini chiqarish mumkin */}
      </div>
    </div>
  );
};

export default ProductPage;
