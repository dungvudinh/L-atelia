const OptimizedImage = ({ src, alt, className, priority = false, width, height, ...props }) => {
  return (
    <img 
      src={src} 
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      width={width}
      height={height}
      {...props}
    />
  );
};
export default OptimizedImage;