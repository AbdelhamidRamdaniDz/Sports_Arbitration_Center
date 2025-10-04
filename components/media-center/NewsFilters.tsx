import React from "react"

interface NewsFiltersProps {
  categories: string[]
  onFilter: (category: string) => void
  onSearch: (term: string) => void
  selectedCategory: string
  searchTerm: string
}

export const NewsFilters: React.FC<NewsFiltersProps> = ({ categories, onFilter, onSearch, selectedCategory, searchTerm }) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-8 rtl:flex-row-reverse">
      <div className="flex gap-2 flex-wrap">
        <button
          className={`px-3 py-1 rounded-full border text-sm transition-colors ${selectedCategory === '' ? 'bg-corporate-green text-white' : 'bg-white text-corporate-green border-corporate-green'} focus-visible:ring-2 focus-visible:ring-corporate-green`}
          onClick={() => onFilter('')}
          aria-label="عرض كل التصنيفات"
        >
          الكل
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            className={`px-3 py-1 rounded-full border text-sm transition-colors ${selectedCategory === cat ? 'bg-corporate-green text-white' : 'bg-white text-corporate-green border-corporate-green'} focus-visible:ring-2 focus-visible:ring-corporate-green`}
            onClick={() => onFilter(cat)}
            aria-label={`تصفية حسب ${cat}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <input
        type="search"
        className="border rounded-md px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-corporate-green w-full md:w-64"
        placeholder="ابحث في الأخبار..."
        value={searchTerm}
        onChange={e => onSearch(e.target.value)}
        aria-label="بحث في الأخبار"
        dir="rtl"
      />
    </div>
  )
}
