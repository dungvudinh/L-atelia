// components/LazyMediaGrid.jsx
import { useState, useEffect, useRef, useCallback, memo } from 'react';
import OptimizedImage from '../OptimizedImage';

function LazyMediaGrid({ mediaItems, onLoadMore, hasMore, loading }) {
  const [visibleItems, setVisibleItems] = useState([]);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);
  const itemsPerPage = 6; // Load 6 ảnh mỗi lần

  // Intersection Observer để detect khi scroll đến cuối
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]);

  // Load thêm items
  const loadMore = useCallback(() => {
    if (!hasMore || loading) return;
    
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    const newItems = mediaItems.slice(startIndex, endIndex);
    if (newItems.length > 0) {
      setVisibleItems(prev => [...prev, ...newItems]);
      setPage(nextPage);
    }
    
    // Gọi callback để fetch thêm data nếu cần
    if (endIndex >= mediaItems.length && onLoadMore) {
      onLoadMore();
    }
  }, [page, mediaItems, hasMore, loading, onLoadMore]);

  // Reset khi mediaItems thay đổi
  useEffect(() => {
    setVisibleItems(mediaItems.slice(0, itemsPerPage));
    setPage(1);
  }, [mediaItems]);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {visibleItems.map((item) => (
          <MediaCard key={item._id} item={item} />
        ))}
      </div>
      
      {/* Loading indicator */}
      {(loading || hasMore) && (
        <div ref={loaderRef} className="flex justify-center items-center py-8">
          <div className="w-12 h-12 border-4 border-txt-secondary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

// Card component riêng để optimize re-renders
const MediaCard = memo(({ item }) => {
  
  return (
    <div className='cursor-pointer group'>
      <div className='h-60 lg:h-80 w-full overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300'>
        <OptimizedImage 
          src={item.featuredImage?.url} 
          alt={item.title}
          className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
          width={400}
          height={300}
        />
      </div>
      <div className='mt-4 p-2'>
        <h4 className='text-[14px] lg:text-[18px] text-txt-gray mb-2 lg:mb-4'>
          {item.category?.toUpperCase()}
        </h4>
        <h4 className='text-[20px] lg:text-[25px] font-subtitle text-txt-secondary font-semibold mb-3 lg:mb-4 line-clamp-2'>
          {item.title}
        </h4>
        <p className='text-[14px] lg:text-[18px] mb-4 line-clamp-3'>
          {item.excerpt || 'No description'}
        </p>
        <button 
          onClick={() => window.location.href = `/${currentLanguage}/media/${item._id}`}
          className='border border-txt-gray p-2 text-[14px] lg:text-[18px] hover:bg-txt-secondary hover:text-white transition-colors duration-200 w-full'
        >
          READ MORE
        </button>
      </div>
    </div>
  );
});

export default LazyMediaGrid;