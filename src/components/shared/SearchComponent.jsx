import { useState, useEffect, useCallback, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Star, Loader2 } from 'lucide-react';
import { searchProductsByName } from '@/api/productsApi';
import { getRecentlyViewed } from '@/utils/recentlyViewed';
import { debounce } from 'lodash';

const SearchComponent = ({ onResultClick }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [recentlyViewedItems, setRecentlyViewedItems] = useState(getRecentlyViewed());
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);

  const fetchResults = async (searchQuery) => {
    if (searchQuery.length > 1) {
      setIsLoading(true);
      try {
        const data = await searchProductsByName(searchQuery);
        setResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  const debouncedFetchResults = useCallback(debounce(fetchResults, 300), []);

  useEffect(() => {
    debouncedFetchResults(query);
    return () => {
      debouncedFetchResults.cancel();
    };
  }, [query, debouncedFetchResults]);

  const handleResultClick = () => {
    setQuery('');
    setResults([]);
    setIsFocused(false);
    setRecentlyViewedItems(getRecentlyViewed()); 
    if (onResultClick) {
      onResultClick();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
    setRecentlyViewedItems(getRecentlyViewed());
  }

  const showResults = isFocused && query.length > 1;
  const showRecent = isFocused && query.length === 0 && recentlyViewedItems.length > 0;

  return (
    <div className="relative w-full md:w-auto" ref={containerRef}>
      <div className="relative">
        <input
          type="text"
          placeholder={t('search.placeholder')}
          className="bg-secondary-gray px-4 py-2 rounded-md text-sm w-full md:w-48 lg:w-60 focus:outline-none focus:ring-2 focus:ring-primary-red transition-all"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
        </div>
      </div>

      {(showResults || showRecent) && (
        <div className="absolute top-full mt-2 w-full md:w-96 max-h-[60vh] overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg z-50">
          {showRecent && (
             <div className="p-2">
              <div className="flex justify-between items-center px-2 py-1">
                <h4 className="text-sm font-semibold text-gray-600">{t('search.recentlyViewed')}</h4>
              </div>
              <ul>
                {recentlyViewedItems.map((product) => (
                  <li key={`recent-${product.id}`}>
                     <NavLink
                        to={`/product/${product.id}`}
                        className="flex items-start gap-4 p-3 hover:bg-gray-100 transition-colors"
                        onClick={handleResultClick}
                      >
                        <img src={product.thumbnail} alt={product.title} className="w-16 h-16 object-cover rounded-md" />
                        <div className="flex-1">
                          <p className="font-medium text-sm text-primary-black mb-1">{product.title}</p>
                          <div className="flex items-center mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 transition-colors ${
                                  i < Math.round(product.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-primary-red font-semibold">${product.price}</p>
                        </div>
                      </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {showResults && (
            <>
              {isLoading && results.length === 0 && (
                <div className="p-4 text-center text-gray-500">{t('search.searching')}</div>
              )}
              {!isLoading && results.length === 0 && query.length > 1 && (
                <div className="p-4 text-center text-gray-500">{t('search.noProductsFound')}</div>
              )}
              {results.length > 0 && (
                <ul>
                  {results.map((product) => (
                    <li key={product.id}>
                      <NavLink
                        to={`/product/${product.id}`}
                        className="flex items-start gap-4 p-3 hover:bg-gray-100 transition-colors"
                        onClick={handleResultClick}
                      >
                        <img src={product.thumbnail} alt={product.title} className="w-16 h-16 object-cover rounded-md" />
                        <div className="flex-1">
                          <p className="font-medium text-sm text-primary-black mb-1">{product.title}</p>
                          <div className="flex items-center mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 transition-colors ${
                                  i < Math.round(product.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-primary-red font-semibold">${product.price}</p>
                        </div>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
