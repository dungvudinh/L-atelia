import { memo, useCallback, useEffect, useState } from 'react';
import Footer from '../../layouts/components/Footer';
import { LocalizedLink } from '../../components/LocalizedLink';
import { ArrowRight } from 'lucide-react';
import LazyImage from '../../components/LazyImage';
import { projectsService } from '../../services/projectsService';

// Fallback images in case API fails
const FALLBACK_IMAGES = [
  { id: 1, src: '../../assets/images/projects/project1.png', alt: "Project 1", title: "Modern Villa", type: 'for sale', status: 'available' },
  { id: 2, src: '../../assets/images/projects/project2.png', alt: "Project 2", title: "Luxury Apartment", type: 'for sale', status: 'available' },
  { id: 3, src: '../../assets/images/projects/project3.png', alt: "Project 3", title: "Office Building", type: 'for sale', status: 'sold' },
  { id: 4, src: '../../assets/images/projects/project4.png', alt: "Project 4", title: "Restaurant Design", type: 'for sale', status: 'available' },
  { id: 5, src: '../../assets/images/projects/project5.png', alt: "Project 5", title: "Hotel Resort", type: 'for sale', status: 'available' },
  { id: 6, src: '../../assets/images/projects/project6.png', alt: "Project 6", title: "Beach House", type: 'for sale', status: 'sold' },
  { id: 7, src: '../../assets/images/projects/project7.png', alt: "Project 7", title: "Beach House", type: 'for sale', status: 'available' },
  { id: 8, src: '../../assets/images/projects/project8.png', alt: "Project 8", title: "Beach House", type: 'for sale', status: 'available' },
];

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [preloadedImages, setPreloadedImages] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'available', 'sold'
  
  // Filter options
  const filters = [
    { id: 'all', label: 'All', count: projects.length },
    { id: 'available', label: 'Available', count: projects.filter(p => p.status === 'available').length },
    { id: 'sold', label: 'Sold', count: projects.filter(p => p.status === 'sold').length },
  ];
  
  // Fetch projects from API
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await projectsService.getProjects();
      console.log('Fetched projects:', response);
      // Transform API data to match your component structure với field mapping chính xác
      const transformedProjects = response.data?.projects?.map(project => ({
        id: project._id || project.id,
        src: project.heroImage?.thumbnailKey || project.gallery?.[0]?.thumbnailKey || project.heroImage?.key,
        alt: project.title,
        title: project.title,
        type: 'for sale',
        description: project.description,
        propertyFeatures: project.propertyFeatures,
        location: project.location,
        price: project.price,
        type: project.type, // Mặc định là 'sale' nếu không có type
        status: project.status || 'available', // Mặc định là available nếu không có status
        brochure: project.brochure,
        constructionProgress: project.constructionProgress,
        designImages: project.designImages,
        floorPlans: project.floorPlans,
        gallery: project.gallery,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt
      })) || [];
      
      const finalProjects = transformedProjects.length > 0 ? transformedProjects : FALLBACK_IMAGES;
      setProjects(finalProjects);
      setFilteredProjects(finalProjects); // Khởi tạo filtered projects với tất cả projects
      
    } catch (err) {
      console.error('❌ Failed to fetch projects:', err);
      setError('Failed to load projects. Using fallback data.');
      setProjects(FALLBACK_IMAGES);
      setFilteredProjects(FALLBACK_IMAGES);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter projects based on active filter
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.status === activeFilter);
      setFilteredProjects(filtered);
    }
  }, [activeFilter, projects]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
  
  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      if (filteredProjects.length === 0) return;

      const imagesToPreload = filteredProjects.slice(0, 4);
      
      const preloadPromises = imagesToPreload.map((project) => {
        return new Promise((resolve) => {
          if (!project.src) {
            resolve();
            return;
          }
          
          const img = new Image();
          img.src = getImageUrl(project.src);
          img.onload = () => {
            setPreloadedImages(prev => new Set([...prev, project.id]));
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed to preload image: ${project.src}`);
            resolve();
          };
        });
      });

      await Promise.all(preloadPromises);
    };

    preloadImages();
  }, [filteredProjects]);

  const handleImageClick = useCallback((projectId) => {
    // You can add navigation or modal opening logic here
  }, []);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  const convertToSlug = (title) => {
    return title
      ?.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '') || 'project';
  };

  // Construct full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    return `https://cdn.latelia.com/latelia/${imagePath}`;
  };

  if (loading) {
    return (
      <div className="mt-20 flex justify-center items-center min-h-screen px-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-txt-secondary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-txt-gray text-lg">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-20 flex justify-center mb-10 lg:mb-20 !px-4 lg:px-0">
        <div className="xl:max-w-screen-xl lg:max-w-[900px] w-full mt-6 lg:mt-10">
          {/* HEADER */}
          <h1 className="text-[36px] md:text-[45px] lg:text-[45px] font-subtitle text-txt-secondary font-semibold leading-tight">
            Các dự án của chúng tôi
          </h1>
          <p className="mt-6 lg:mt-10 text-txt-gray text-[18px] md:text-[20px] lg:text-[20px] leading-relaxed">
            Chúng tôi đồng hành cùng KH với mục tiêu rõ ràng đó là mang đến những sản phẩm bất động sản có giá trị thật – cả về trải nghiệm sống lẫn tiềm năng gia tăng trong tương lai.
          </p>
          
          {error && (
            <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded text-sm md:text-base">
              {error}
            </div>
          )}

          {/* FILTER SECTION */}
          <div className="mt-8 lg:mt-10 flex flex-wrap gap-4 border-b border-gray-200 pb-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`relative px-4 py-2 text-[16px] md:text-[18px] font-medium transition-colors duration-200 ${
                  activeFilter === filter.id
                    ? 'text-txt-secondary border-b-2 border-txt-secondary'
                    : 'text-gray-500 hover:text-txt-secondary'
                }`}
              >
                {filter.label}
                <span className={`ml-2 text-sm ${
                  activeFilter === filter.id ? 'text-txt-secondary' : 'text-gray-400'
                }`}>
                  ({filter.count})
                </span>
              </button>
            ))}
          </div>

          {/* RESULTS COUNT */}
          <div className="mt-4 text-gray-600">
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          </div>

          {/* LIST PROJECTS */}
          <div className="mt-6 lg:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => {
                const isPriority = index < 2;
                const isEager = index < 4 && !isPriority;
                const titleSlug = convertToSlug(project.title);
                
                return (
                  <ProjectItem 
                    key={project.id} 
                    project={project} 
                    onImageClick={handleImageClick} 
                    isPriority={isPriority} 
                    isEager={isEager}
                    preloadedImages={preloadedImages}
                    titleSlug={titleSlug}
                    getImageUrl={getImageUrl}
                  />
                );
              })
            ) : (
              <div className="col-span-2 text-center py-10">
                <p className="text-gray-500 text-lg">No projects found for the selected filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer withContact={false}/>
    </div>
  );
}

const ProjectItem = memo(({ project, onImageClick, isPriority, isEager, preloadedImages, getImageUrl }) => {
  const handleClick = useCallback(() => {
    onImageClick(project.id);
  }, [onImageClick, project.id]);
  
  const imageUrl = getImageUrl(project.src);

  // Format price function
  const formatPrice = (price) => {
    if (!price) return null;
    
    if (typeof price === 'number') {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    return price;
  };

  const formattedPrice = formatPrice(project.price);

  // Get status badge color
  // const getTypeBadgeColor = (type) => {
  //   switch(type) {
  //     case 'rent':
  //       return 'bg-green-600';
  //     case 'sold':
  //       return 'bg-gray-600';
  //     default:
  //       return 'bg-txt-secondary';
  //   }
  // };

  // Get status text
  // const getTypeText = (status) => {
  //   switch(status) {
  //     case 'available':
  //       return 'Available';
  //     case 'sold':
  //       return 'Sold';
  //     default:
  //       return project.status === 'sale' ? 'For Sale' : 'For Rent';
  //   }
  // };

  return (
    <div 
      className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
      onClick={handleClick}
    >
      {/* Image container */}
      <LocalizedLink className="relative block overflow-hidden" to={`/projects/${project.id}`}>
        {/* Main image with scale effect on hover */}
        <div className="overflow-hidden">
          <LazyImage 
            src={imageUrl} 
            alt={project.alt}
            className="w-full h-full lg:h-100 object-cover transition-transform duration-500 group-hover:scale-110"
            priority={isPriority}
            eager={isEager}
            placeholder={
              <div className="w-full h-[250px] md:h-[300px] lg:h-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                <div className={`w-6 h-6 border-3 border-txt-secondary border-t-transparent rounded-full animate-spin ${
                  preloadedImages.has(project.id) ? 'opacity-50' : ''
                }`}></div>
              </div>
            }
          />
        </div>
        
        {/* Type badge */}
        <button className='absolute right-3 md:right-5 top-3 md:top-5 bg-txt-secondary p-1 md:p-2 text-white text-[12px] md:text-[14px] lg:text-[18px] uppercase z-20'>
          {project.type === 'sale' ? 'For Sale' : project.type === 'rent' ? 'For Rent' : ''}
        </button>

        {/* Gradient overlay for desktop */}
        <div className="hidden lg:block absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-24 z-10"></div>
      </LocalizedLink>

      {/* Content section */}
      <div className="p-4 bg-white relative z-30">
        <h3 className="text-txt-secondary text-[18px] md:text-[20px] font-semibold mb-1 font-subtitle">{project.title}</h3>
        
        {/* Price */}
        {formattedPrice && (
          <p className="text-txt-secondary text-[18px] md:text-[20px] font-bold mb-3">
            {formattedPrice}
          </p>
        )}
        
        {/* Location */}
        {project.location && (
          <p className="text-txt-secondary text-[16px] md:text-[16px] mb-2">{project.location}</p>
        )}
        
        {/* Features */}
        {project.propertyFeatures && project.propertyFeatures.length > 0 && (
          <div className="mb-3">
            {project.propertyFeatures.map((feature, idx) => (
              <p key={idx} className="text-txt-secondary text-[16px] md:text-[16px] mb-1">{feature.text}</p>
            ))}
          </div>
        )}
        
        {/* View More button */}
        <div className="mt-4">
          <LocalizedLink to={`/projects/${project.id}`} className="cursor-pointer">
            <button className='flex items-center justify-center font-light uppercase text-[14px] py-2 text-txt-secondary 
              transition-all duration-300 w-full md:w-auto font-semibold hover:underline underline-offset-4'>
              view more
              <ArrowRight className='ml-2 transition-transform duration-300 group-hover:translate-x-1' size={16}/>
            </button>
          </LocalizedLink>
        </div>
      </div>
    </div>
  );
});

export default Projects;