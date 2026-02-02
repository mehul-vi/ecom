import React, { useContext, useCallback, useMemo, useState } from 'react';
import { FaChevronRight, FaChevronDown, FaTimes, FaFilter, FaBars } from "react-icons/fa";
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';

function Collections() {
  let [showFilter, setShowFilter] = useState(false);
  let [isSidebarOpen, setIsSidebarOpen] = useState(true);
  let { products, search, showSearch } = useContext(shopDataContext);
  let [category, setCategory] = useState([]);
  let [subCategory, setSubCategory] = useState([]);
  let [sortType, setSortType] = useState("relavent");

  // Memoized filter functions
  const toggleCategory = useCallback((e) => {
    const value = e.target.value;
    setCategory(prev => prev.includes(value)
      ? prev.filter(item => item !== value)
      : [...prev, value]
    );
  }, []);

  const toggleSubCategory = useCallback((e) => {
    const value = e.target.value;
    setSubCategory(prev => prev.includes(value)
      ? prev.filter(item => item !== value)
      : [...prev, value]
    );
  }, []);

  // Memoized filtered products
  const filterProduct = useMemo(() => {
    let filtered = products;

    // Apply search filter
    if (showSearch && search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (category.length > 0) {
      filtered = filtered.filter(item =>
        category.includes(item.category)
      );
    }

    // Apply subcategory filter
    if (subCategory.length > 0) {
      filtered = filtered.filter(item =>
        subCategory.includes(item.subCategory)
      );
    }

    return filtered;
  }, [products, search, showSearch, category, subCategory]);

  // Memoized sorted products
  const sortedProducts = useMemo(() => {
    const productsCopy = [...filterProduct];

    switch (sortType) {
      case 'low-high':
        return productsCopy.sort((a, b) => a.price - b.price);
      case 'high-low':
        return productsCopy.sort((a, b) => b.price - a.price);
      default:
        return productsCopy;
    }
  }, [filterProduct, sortType]);

  // Optimized card rendering
  const renderProducts = useMemo(() => {
    if (sortedProducts.length === 0) {
      return (
        <div className="w-full flex justify-center items-center py-16">
          <p className="text-xl text-gray-500">No products found matching your criteria.</p>
        </div>
      );
    }

    return (
      <div className="w-full min-h-[70vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-8">
        {sortedProducts.map((item) => (
          <Card
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image1}
          />
        ))}
      </div>
    );
  }, [sortedProducts]);

  return (
    <div className="w-full min-h-screen bg-base flex md:flex-row flex-col pt-[70px] overflow-x-hidden pb-28">
      {/* Mobile Filter Toggle Button */}
      <button
        className="md:hidden fixed bottom-6 right-6 z-50 bg-secondary text-white p-4 rounded-full shadow-lg hover:bg-[#7A6D63] transition-colors"
        onClick={() => setShowFilter(prev => !prev)}
      >
        {showFilter ? <FaTimes className="text-xl" /> : <FaFilter className="text-xl" />}
      </button>

      {/* Filter Sidebar */}
      <div className={`
        md:w-[30vw] lg:w-[20vw] w-full md:min-h-[100vh] 
        ${showFilter ? "h-auto" : "h-[70px]"} 
        p-5 border-r border-border text-secondary bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] 
        transition-all duration-300
        ${isSidebarOpen ? 'lg:block' : 'lg:hidden'}
        ${showFilter ? 'block' : 'hidden md:block'}
        relative
      `}>

        {/* Desktop Sidebar Toggle */}
        <button
          className="hidden lg:flex absolute -right-3 top-6 bg-secondary text-white p-2 rounded-full shadow-lg hover:bg-[#7A6D63] transition-colors z-10"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FaTimes className="text-sm" /> : <FaBars className="text-sm" />}
        </button>

        {/* Mobile Filter Header */}
        <div className="flex items-center justify-between">
          <p
            className="text-2xl font-semibold flex items-center cursor-pointer select-none"
            onClick={() => setShowFilter(prev => !prev)}
          >
            FILTERS
            <span className="ml-2 md:hidden">
              {showFilter ? <FaChevronDown className="text-xl" /> : <FaChevronRight className="text-xl" />}
            </span>
          </p>

          {/* Mobile Close Button */}
          {showFilter && (
            <button
              className="md:hidden text-secondary hover:text-primary transition-colors"
              onClick={() => setShowFilter(false)}
            >
              <FaTimes className="text-xl" />
            </button>
          )}
        </div>

        {/* Categories Filter */}
        <div className={`
          border border-border p-4 mt-6 rounded-xl bg-base 
          transition-all duration-300 
          ${showFilter ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0 overflow-hidden"} 
          md:opacity-100 md:max-h-[500px] md:overflow-visible
        `}>
          <p className="text-xl font-semibold text-primary mb-3">CATEGORIES</p>
          <div className="flex flex-col gap-3 text-base font-light">
            {['Men', 'Women', 'Kids'].map((cat) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors">
                <input
                  type="checkbox"
                  value={cat}
                  className="w-4 h-4 accent-secondary cursor-pointer"
                  onChange={toggleCategory}
                  checked={category.includes(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Sub-categories Filter */}
        <div className={`
          border border-border p-4 mt-6 rounded-xl bg-base 
          transition-all duration-300 
          ${showFilter ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0 overflow-hidden"} 
          md:opacity-100 md:max-h-[500px] md:overflow-visible
        `}>
          <p className="text-xl font-semibold text-primary mb-3">SUB-CATEGORIES</p>
          <div className="flex flex-col gap-3 text-base font-light">
            {['TopWear', 'BottomWear', 'WinterWear'].map((subCat) => (
              <label key={subCat} className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors">
                <input
                  type="checkbox"
                  value={subCat}
                  className="w-4 h-4 accent-secondary cursor-pointer"
                  onChange={toggleSubCategory}
                  checked={subCategory.includes(subCat)}
                />
                {subCat}
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className={`
          mt-6 transition-all duration-300 
          ${showFilter ? "opacity-100 max-h-[100px]" : "opacity-0 max-h-0 overflow-hidden"} 
          md:opacity-100 md:max-h-[100px] md:overflow-visible
        `}>
          <button
            className="w-full bg-secondary text-white py-3 px-4 rounded-xl hover:bg-[#7A6D63] transition-colors font-medium"
            onClick={() => {
              setCategory([]);
              setSubCategory([]);
            }}
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:pl-[20%]' : 'lg:pl-4'} md:py-3`}>

        {/* Header with Toggle Button for Desktop */}
        <div className="flex items-center justify-between px-4 md:px-8 py-5">
          <div className="flex items-center gap-4">
            {/* Desktop Toggle Button */}
            <button
              className="hidden lg:flex bg-secondary text-white p-3 rounded-xl hover:bg-[#7A6D63] transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
            <Title text1={"ALL"} text2={"COLLECTIONS"} />
          </div>

          <select
            value={sortType}
            className="bg-white text-primary w-full lg:w-44 h-12 px-4 rounded-full border border-secondary hover:border-primary focus:outline-none focus:ring-2 focus:ring-secondary transition-colors cursor-pointer"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavent">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* Active Filters Display */}
        {(category.length > 0 || subCategory.length > 0) && (
          <div className="px-4 md:px-8 mb-4">
            <div className="flex flex-wrap gap-2">
              {category.map(cat => (
                <span key={cat} className="bg-secondary text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {cat}
                  <button
                    onClick={() => setCategory(prev => prev.filter(item => item !== cat))}
                    className="hover:text-gray-200"
                  >
                    ×
                  </button>
                </span>
              ))}
              {subCategory.map(subCat => (
                <span key={subCat} className="bg-[#7A6D63] text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {subCat}
                  <button
                    onClick={() => setSubCategory(prev => prev.filter(item => item !== subCat))}
                    className="hover:text-gray-200"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {renderProducts}
      </div>
    </div>
  );
}

export default Collections;