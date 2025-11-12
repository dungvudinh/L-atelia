import { memo, useCallback, useEffect, useState } from 'react';
import Footer from '../../layouts/components/Footer';
import { LocalizedLink } from '../../components/LocalizedLink';
import { ArrowRight } from 'lucide-react';
import LazyImage from '../../components/LazyImage';
import { projectsService } from '../../services/projectsService';

// Fallback images in case API fails
const FALLBACK_IMAGES = [
  { id: 1, src: '../../assets/images/projects/project1.png', alt: "Project 1", title: "Modern Villa", type: 'for sale' },
  { id: 2, src: '../../assets/images/projects/project2.png', alt: "Project 2", title: "Luxury Apartment", type: 'for sale' },
  { id: 3, src: '../../assets/images/projects/project3.png', alt: "Project 3", title: "Office Building", type: 'for sale' },
  { id: 4, src: '../../assets/images/projects/project4.png', alt: "Project 4", title: "Restaurant Design", type: 'for sale' },
  { id: 5, src: '../../assets/images/projects/project5.png', alt: "Project 5", title: "Hotel Resort", type: 'for sale' },
  { id: 6, src: '../../assets/images/projects/project6.png', alt: "Project 6", title: "Beach House", type: 'for sale' },
  { id: 7, src: '../../assets/images/projects/project7.png', alt: "Project 7", title: "Beach House", type: 'for sale' },
  { id: 8, src: '../../assets/images/projects/project8.png', alt: "Project 8", title: "Beach House", type: 'for sale' },
];

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [preloadedImages, setPreloadedImages] = useState(new Set());

  // Fetch projects from API
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🚀 Starting to fetch projects...');
      const response = await projectsService.getProjects();
      
      // Transform API data to match your component structure với field mapping chính xác
      const transformedProjects = response.data?.projects?.map(project => ({
        id: project._id || project.id,
        src: project.heroImage || project.gallery?.[0] || project.designImages?.[0],
        alt: project.title,
        title: project.title,
        type: 'for sale', // Tất cả projects đều là For Sale
        description: project.description,
        location: project.location,
        status: project.status,
        brochure: project.brochure,
        constructionProgress: project.constructionProgress,
        designImages: project.designImages,
        floorPlans: project.floorPlans,
        gallery: project.gallery,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt
      })) || [];
      
      console.log('✅ Transformed projects:', transformedProjects);
      setProjects(transformedProjects.length > 0 ? transformedProjects : FALLBACK_IMAGES);
      
    } catch (err) {
      console.error('❌ Failed to fetch projects:', err);
      setError('Failed to load projects. Using fallback data.');
      setProjects(FALLBACK_IMAGES); // Use fallback data
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      if (projects.length === 0) return;

      const imagesToPreload = projects.slice(0, 4);
      
      const preloadPromises = imagesToPreload.map((project) => {
        return new Promise((resolve) => {
          if (!project.src) {
            resolve();
            return;
          }
          
          const img = new Image();
          img.src = project.src;
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
  }, [projects]);

  const handleImageClick = useCallback((projectId) => {
    console.log('🖱️ Project clicked:', projectId);
    // You can add navigation or modal opening logic here
  }, []);

  const convertToSlug = (title) => {
    return title
      ?.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '') || 'project';
  };

  if (loading) {
    return (
      <div className="mt-20 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-txt-secondary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-txt-gray text-lg">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-20 flex justify-center mb-20">
        <div className="xl:max-w-screen-xl lg:max-w-[900px] w-full mt-10">
          <h1 className="text-[60px] font-subtitle text-txt-secondary font-semibold">ALL PROJECTS</h1>
          <p className="mt-10 text-txt-gray text-[26px]">
            The mission in reforming the historic mansion was to create a home with an uncompromised year round living experience, while ensuring the heritage not only lived on but enhanced its lavish style.
          </p>
          
          {error && (
            <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
              {error}
            </div>
          )}

          {/* LIST PROJECTS */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => {
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
                />
              );
            })}
          </div>
        </div>
      </div>
      <Footer withContact={false}/>
    </div>
  );
}

const ProjectItem = memo(({ project, onImageClick, isPriority, isEager, preloadedImages, titleSlug }) => {
  const handleClick = useCallback(() => {
    onImageClick(project.id);
  }, [onImageClick, project.id]);

  // Construct full image URL (adjust based on your backend URL structure)
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `${'http://localhost:3000'}/${imagePath}`;
  };

  const imageUrl = getImageUrl(project.src);

  return (
    <div 
      className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {/* Ảnh chính */}
      <LazyImage 
        src={imageUrl} 
        alt={project.alt}
        className="w-full h-100 object-cover transition-transform duration-300 group-hover:scale-105"
        
        priority={isPriority}
        eager={isEager}
        placeholder={
          <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
            <div className={`w-6 h-6 border-3 border-txt-secondary border-t-transparent rounded-full animate-spin ${
              preloadedImages.has(project.id) ? 'opacity-50' : ''
            }`}></div>
          </div>
        }
      />
      
      {/* Badge type - Luôn là For Sale */}
      <button className='absolute right-5 bg-txt-secondary top-5 p-2 text-white text-[18px] uppercase z-20'>
        for sale
      </button>

      {/* Overlay khi hover */}
      <div className='w-full h-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <div className='w-full h-full relative'>
          <LazyImage 
            src={imageUrl} 
            alt={project.alt}
            className="w-full h-full object-cover brightness-50"
            eager={isEager}
          />
        </div>
        
        <div className='absolute inset-0 flex flex-col justify-center items-start p-6 z-30 mt-40 ml-4'>
          <div className="text-left max-w-md">
            <h4 className='text-white text-[18px] font-light mb-6 leading-relaxed'>
              {project.description || 'Soller Tennis Club is a wellness and lifestyle community for local neighbours, international friends and touring pros'}
            </h4>
            <LocalizedLink to={`/projects/${project.id}`}>
              <button className='flex items-center font-light uppercase text-[18px] border-2 border-white px-6 py-3 text-white 
              hover:bg-txt-secondary hover:border-txt-secondary hover:text-white transition-all duration-300'>
                view more
                <ArrowRight className='ml-4' size={20}/>
              </button>
            </LocalizedLink>
          </div>
        </div>
      </div>

      {/* Title hiển thị mặc định */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 group-hover:opacity-0 transition-opacity duration-300 z-20">
        <h3 className="text-white text-xl font-semibold">{project.title}</h3>
        {/* <p className="text-gray-200 text-sm">For Sale</p> */}
        {project.location && (
          <p className="text-gray-300 text-xs mt-1">{project.location}</p>
        )}
      </div>
    </div>
  );
});

export default Projects;