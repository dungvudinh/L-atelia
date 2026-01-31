// utils/imageOptimizer.js
export const optimizeB2Url = (url, width, height, quality = 75, format = 'auto') => {
  if (!url || !url.includes('backblazeb2.com')) {
    return url; // Trả về URL gốc nếu không phải B2
  }

  try {
    const urlObj = new URL(url);
    
    // Xử lý URL B2 để tối ưu
    const isImage = /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(url);
    
    if (!isImage) {
      return url;
    }

    // Thêm query parameters cho optimization
    const params = new URLSearchParams();
    
    if (width) params.append('w', Math.min(width, 1920)); // Max width 1920px
    if (height) params.append('h', Math.min(height, 1080)); // Max height 1080px
    if (quality) params.append('q', Math.min(quality, 100));
    
    // Format optimization
    if (format === 'auto') {
      // Auto chọn format tốt nhất
      params.append('fm', 'webp'); // Ưu tiên WebP
      params.append('auto', 'format,compress');
    } else if (format) {
      params.append('fm', format);
    }
    
    // B2 có hỗ trợ CDN với query params
    if (params.toString()) {
      // B2 thường dùng pattern: ?Authorization=...&response-content-disposition=...
      // Cần giữ các params có sẵn
      const existingParams = urlObj.searchParams;
      
      // Merge params
      params.forEach((value, key) => {
        existingParams.set(key, value);
      });
      
      // Thêm optimization flags
      existingParams.set('response-content-disposition', 'inline');
      
      urlObj.search = existingParams.toString();
    }

    return urlObj.toString();
  } catch (error) {
    console.error('Error optimizing B2 URL:', error);
    return url;
  }
};

// CDN URL converter (nếu bạn dùng CDN cho B2)
export const getCDNUrl = (b2Url, options = {}) => {
  if (!b2Url) return '';
  
  const {
    width,
    height,
    quality = 80,
    format = 'webp',
    fit = 'cover'
  } = options;
  
  // Chuyển từ B2 URL sang CDN URL
  // Ví dụ: https://f002.backblazeb2.com/file/bucket-name/path/to/image.jpg
  // → https://cdn.yourdomain.com/path/to/image.jpg
  
  const cdnBase = 'https://cdn.yourdomain.com'; // Thay bằng CDN của bạn
  
  // Extract path từ B2 URL
  const b2PathMatch = b2Url.match(/\/file\/[^/]+\/(.+)$/);
  if (!b2PathMatch) return b2Url;
  
  const imagePath = b2PathMatch[1];
  let cdnUrl = `${cdnBase}/${imagePath}`;
  
  // Thêm transformation params cho CDN (nếu CDN hỗ trợ)
  const params = new URLSearchParams();
  
  if (width) params.append('width', width);
  if (height) params.append('height', height);
  if (quality) params.append('quality', quality);
  if (format) params.append('format', format);
  if (fit) params.append('fit', fit);
  
  if (params.toString()) {
    cdnUrl += `?${params.toString()}`;
  }
  
  return cdnUrl;
};

// Preload critical images
export const preloadImages = (imageUrls) => {
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

// Lazy load images với Intersection Observer
export const lazyLoadImages = () => {
  if (typeof window === 'undefined') return;
  
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if (!('IntersectionObserver' in window)) {
    // Fallback cho browser cũ
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
    return;
  }
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px', // Load trước 50px
    threshold: 0.01
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
};