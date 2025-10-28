const OptimizedImage = ({ src, alt, className, ...props }) => {
  const originalSrc = src;
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/, '.webp');
  
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <source srcSet={originalSrc} type="image/jpeg" />
      <img 
        src={originalSrc} 
        alt={alt} 
        className={className}
        loading="lazy"
        {...props}
      />
    </picture>
  );
};
export default OptimizedImage;