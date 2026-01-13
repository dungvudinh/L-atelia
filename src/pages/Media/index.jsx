// components/Media.jsx
import { useEffect, useState } from 'react';
import media1 from '../../assets/images/media1.webp';
import Footer from '../../layouts/components/Footer';
import OptimizedImage from '../../components/OptimizedImage';
import { LocalizedLink } from '../../components/LocalizedLink';
import mediaService from '../../services/mediaService';

// Categories available
const CATEGORIES = ['all', 'lifestyle', 'properties', 'product'];

function Media() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0
  });

  // Fetch media data
  const fetchMedia = async (category = 'all', page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page,
        limit: 12, // Hiển thị 12 items mỗi trang
        status: 'published' // Chỉ lấy media đã published
      };

      // Thêm filter category nếu không phải 'all'
      if (category !== 'all') {
        params.category = category;
      }

      const response = await mediaService.getAllMedia(params);
      
      if (response.success) {
        setMediaItems(response.data || []);
        setPagination(response.pagination || {
          current: 1,
          pages: 1,
          total: 0
        });
      } else {
        throw new Error(response.message || 'Failed to fetch media');
      }
    } catch (err) {
      console.error('Error fetching media:', err);
      setError(err.message || 'Failed to load media. Please try again.');
      setMediaItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia(selectedCategory);
  }, [selectedCategory]);

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    window.scrollTo(0, 0);
    fetchMedia(selectedCategory, page);
  };

  // Format category for display
  const formatCategory = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Get default image if featuredImage is not available
  const getMediaImage = (media) => {
    if (media.featuredImage) return media.featuredImage.url;
    return media1; // Fallback image
  };

  // Get excerpt or generate from content
  const getMediaExcerpt = (media) => {
    if (media.excerpt) return media.excerpt;
    
    // Generate excerpt from content (remove HTML tags)
    if (media.content) {
      const plainText = media.content.replace(/<[^>]*>/g, '');
      return plainText.length > 150 
        ? plainText.substring(0, 150) + '...' 
        : plainText;
    }
    
    return 'No description available';
  };

  if (loading) {
    return (
      <div className="mt-20 flex justify-center items-center min-h-screen px-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-txt-secondary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-txt-gray text-lg">Loading media...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 flex justify-center items-center min-h-screen px-4">
        <div className="text-center">
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <h2 className="text-xl font-semibold">Error</h2>
            <p>{error}</p>
            <button 
              onClick={() => fetchMedia(selectedCategory)}
              className="mt-4 px-4 py-2 bg-txt-secondary text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return ( 
    <div>
      <div className="mt-20 flex justify-center mb-10 lg:mb-20 px-4">
        <div className="xl:max-w-screen-xl lg:max-w-[900px] w-full mt-10 lg:mt-20 text-center">
          <h1 className="text-[32px] lg:text-[60px] font-subtitle font-semibold text-txt-secondary leading-tight">
            Media
          </h1>
          
          {/* FILTER */}
          <div className="flex flex-col lg:flex-row justify-center items-center mt-6 lg:mt-0 text-[16px] lg:text-[18px] text-txt-gray">
            <p className="mb-2 lg:mb-0">Filter by:</p>
            <ul className="flex flex-wrap justify-center lg:ml-2 gap-2 lg:gap-0">
              {CATEGORIES.map(category => (
                <li 
                  key={category}
                  className={`px-4 lg:px-8 py-1 lg:py-0 cursor-pointer transition-colors duration-200 ${
                    selectedCategory === category 
                      ? 'text-black font-semibold' 
                      : 'hover:text-txt-secondary'
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {formatCategory(category)}
                </li>
              ))}
            </ul>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-txt-gray text-[14px] lg:text-[16px]">
            <p>
              Showing {mediaItems.length} of {pagination.total} media item{pagination.total !== 1 ? 's' : ''}
              {selectedCategory !== 'all' && ` in ${formatCategory(selectedCategory)}`}
            </p>
          </div>

          {/* CONTENT */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-8 lg:mt-10">
            {mediaItems.length > 0 ? (
              mediaItems.map((item) => (
                <div key={item._id} className='cursor-pointer group'>
                  <a href={`/vi/media/${item._id}`}>
                    <div className='h-60 lg:h-80 w-full overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300'>
                      <OptimizedImage 
                        src={getMediaImage(item)} 
                        alt={item.title}
                        className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105' 
                      />
                    </div>
                  </a>
                  <div className='mt-4 p-2'>
                    <h4 className='text-[14px] lg:text-[18px] text-txt-gray mb-2 lg:mb-4'>
                      {formatCategory(item.category).toUpperCase()}
                    </h4>
                    <h4 className='text-[20px] lg:text-[25px] font-subtitle text-txt-secondary font-semibold mb-3 lg:mb-4 line-clamp-2 leading-tight'>
                      {item.title}
                    </h4>
                    <p className='text-[14px] lg:text-[18px] mb-4 line-clamp-3 leading-relaxed'>
                      {getMediaExcerpt(item)}
                    </p>
                    <LocalizedLink to={`/media/${item._id}`}>
                      <button className='border border-txt-gray p-2 cursor-pointer text-[14px] lg:text-[18px] hover:bg-txt-secondary hover:text-bg-primary hover:border-txt-secondary transition-colors duration-200 w-full lg:w-auto'>
                        READ MORE
                      </button>
                    </LocalizedLink>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-8 lg:py-12">
                <p className="text-txt-gray text-base lg:text-lg">
                  {selectedCategory !== 'all' 
                    ? `No media found in ${formatCategory(selectedCategory)} category.` 
                    : 'No media available.'
                  }
                </p>
                {selectedCategory !== 'all' && (
                  <button 
                    onClick={() => setSelectedCategory('all')}
                    className="mt-4 px-4 py-2 bg-txt-secondary text-white rounded hover:bg-blue-700 text-sm lg:text-base"
                  >
                    View All Media
                  </button>
                )}
              </div>
            )}
          </div>

          {/* PAGINATION */}
          {pagination.pages > 1 && (
            <div className="flex justify-center items-center mt-8 lg:mt-12 space-x-2 lg:space-x-4">
              <button
                onClick={() => handlePageChange(pagination.current - 1)}
                disabled={pagination.current === 1}
                className="px-3 lg:px-4 py-2 border border-txt-primary text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed hover:bg-txt-secondary hover:text-white transition-colors duration-200"
              >
                Previous
              </button>
              
              <div className="flex space-x-1 lg:space-x-2">
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-2 lg:px-3 py-1 lg:py-1 border text-sm lg:text-base ${
                      page === pagination.current
                        ? 'bg-txt-secondary text-white border-txt-secondary'
                        : 'border-txt-primary hover:bg-gray-100'
                    } transition-colors duration-200`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(pagination.current + 1)}
                disabled={pagination.current === pagination.pages}
                className="px-3 lg:px-4 py-2 border border-txt-primary text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed hover:bg-txt-secondary hover:text-white transition-colors duration-200"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer withContact={false}/>
    </div>
  );
}

export default Media;