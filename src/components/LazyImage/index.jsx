import { useState, useRef, useEffect } from 'react';

function LazyImage({ 
  src, 
  alt, 
  className, 
  placeholder, 
  priority = false, // Thêm prop priority cho ảnh quan trọng
  eager = false // Load ngay lập tức không cần lazy
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // Nếu là ảnh priority hoặc eager thì load ngay lập tức
    if (priority || eager) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: '100px' // Load sớm hơn 100px trước khi vào viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [priority, eager]);

  return (
    <div ref={imgRef} className="relative">
      {/* Placeholder chỉ hiện khi chưa load xong */}
      {!isLoaded && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse z-10 ${className}`}>
          {placeholder || <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-txt-secondary border-t-transparent rounded-full animate-spin"></div>
          </div>}
        </div>
      )}
      
      {/* Ảnh thực tế - với priority thì load ngay */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => {
            setIsLoaded(true);
          }}
          loading={priority || eager ? "eager" : "lazy"}
          decoding="async"
        />
      )}
    </div>
  );
}
export default LazyImage;