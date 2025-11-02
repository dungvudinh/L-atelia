import project1 from '../../assets/images/projects/project1.webp'
import Footer from '../../layouts/components/Footer';
import { LocalizedLink } from '../../components/LocalizedLink';
import OptimizedImage from '../../components/OptimizedImage';
import { ArrowRight } from 'lucide-react'; 
import project2 from '../../assets/images/projects/project2.png'
import LazyImage from '../../components/LazyImage';
import { memo, useCallback, useEffect , useState} from 'react';
const IMAGES = [
    { id: 1, src: '../../assets/images/projects/project1.png', alt: "Project 1", title: "Modern Villa", type:'for rent' },
    { id: 2, src: '../../assets/images/projects/project2.png', alt: "Project 2", title: "Luxury Apartment", type:'for rent' },
    { id: 3, src: '../../assets/images/projects/project3.png', alt: "Project 3", title: "Office Building", type:'for rent' },
    { id: 4, src: '../../assets/images/projects/project4.png', alt: "Project 4", title: "Restaurant Design", type:'for rent' },
    { id: 5, src: '../../assets/images/projects/project5.png', alt: "Project 5", title: "Hotel Resort", type:'for sale' },
    { id: 6, src: '../../assets/images/projects/project6.png', alt: "Project 6", title: "Beach House", type:'for sale' },
    { id: 7, src: '../../assets/images/projects/project7.png', alt: "Project 6", title: "Beach House",type:'for sale' },
    { id: 8, src: '../../assets/images/projects/project8.png', alt: "Project 6", title: "Beach House", type:'for sale' },
];
function useImagePreload(imageUrls) {
    useEffect(() => {
      imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    }, [imageUrls]);
  }
function Projects() {
    const [preloadedImages, setPreloadedImages] = useState(new Set());

  // Preload ảnh đầu tiên ngay khi component mount
  useEffect(() => {
    const preloadImages = async () => {
      const imagesToPreload = IMAGES.slice(0, 4); // Preload 4 ảnh đầu tiên
      
      const preloadPromises = imagesToPreload.map((image, index) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = image.src;
          img.onload = () => {
            setPreloadedImages(prev => new Set([...prev, image.id]));
            resolve();
          };
          img.onerror = resolve; // Vẫn resolve kể cả khi lỗi
        });
      });

      await Promise.all(preloadPromises);
    };

    preloadImages();
  }, []);
    // useImagePreload([project1, project2]);
    const handleImageClick = useCallback((imageId)=>{
        console.log('Image clicked');
    })
    return ( 
        
        <div>
            <div className="mt-20 flex justify-center mb-20">
                <div className="xl:max-w-screen-xl lg:max-w-[900px] w-full mt-10">
                    <h1 className="text-[60px] font-subtitle text-txt-secondary font-semibold">ALL PROJECTS</h1>
                    <p className="mt-10 text-txt-gray text-[26px]">
                        The mission in reforming the historic mansion was to create a home with an uncompromised year round living experience, while ensuring the heritage not only lived on but enhanced its lavish style.
                    </p>
                    {/* LIST IMAGES */}
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {IMAGES.map((image, index) => {
                            const isPriority = index < 2;
                            const isEager = index < 4 && !isPriority;
                             const convertToSlug = (title) => {
                                return title
                                    .toLowerCase()
                                    .replace(/\s+/g, '-')           // Thay khoảng trắng bằng dấu gạch ngang
                                    .replace(/[^\w\-]+/g, '')       // Loại bỏ ký tự đặc biệt
                                    .replace(/\-\-+/g, '-')         // Thay nhiều gạch ngang bằng một gạch
                                    .replace(/^-+/, '')             // Loại bỏ gạch ngang ở đầu
                                    .replace(/-+$/, '');            // Loại bỏ gạch ngang ở cuối
                            };
                            const titleSlug = convertToSlug(image.title);
                            return (
                                // <ProjectItem key={image.id} image={image} onImageClick={handleImageClick} isPriority={isPriority} isEager={isEager}/>
                                <div key={image.id} className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                                {/* Ảnh chính */}
                                <LazyImage 
                                    src={project2} 
                                    alt={image.alt}
                                    className="w-full h-100 object-cover transition-transform duration-300 group-hover:scale-105"
                                    priority={isPriority}
                                    eager={isEager}
                                    placeholder={
                                    <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                                        <div className={`w-6 h-6 border-3 border-txt-secondary border-t-transparent rounded-full animate-spin ${
                                        preloadedImages.has(image.id) ? 'opacity-50' : ''
                                        }`}></div>
                                    </div>
                                    }
                                />
                                
                                {/* Badge type */}
                                <button className='absolute right-5 bg-txt-secondary top-5 p-2 text-white text-[18px] uppercase z-20'>
                                    {image.type}
                                </button>

                                {/* Overlay khi hover */}
                                <div className='w-full h-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                    <div className='w-full h-full relative'>
                                    <LazyImage 
                                        src={project1} 
                                        alt={image.alt}
                                        className="w-full h-full object-cover brightness-50"
                                        eager={isEager} // Overlay cũng được ưu tiên tương tự
                                    />
                                    </div>
                                    
                                    <div className='absolute inset-0 flex flex-col justify-center items-start p-6 z-30 mt-40 ml-4'>
                                    <div className="text-left max-w-md">
                                        <h4 className='text-white text-[18px] font-light mb-6 leading-relaxed'>
                                        Soller Tennis Club is a wellness and lifestyle community for local neighbours, international friends and touring pros
                                        </h4>
                                        <LocalizedLink to={`/view-brochure/${titleSlug}?filter=0`}>
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
                                    <h3 className="text-white text-xl font-semibold">{image.title}</h3>
                                    <p className="text-gray-200 text-sm">{image.type}</p>
                                </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Footer withContact={false}/>
        </div>
     );
}
const ProjectItem = memo(({image, onImageClick, isPriority, isEager})=>{
    const convertToSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/\s+/g, '-')           // Thay khoảng trắng bằng dấu gạch ngang
            .replace(/[^\w\-]+/g, '')       // Loại bỏ ký tự đặc biệt
            .replace(/\-\-+/g, '-')         // Thay nhiều gạch ngang bằng một gạch
            .replace(/^-+/, '')             // Loại bỏ gạch ngang ở đầu
            .replace(/-+$/, '');            // Loại bỏ gạch ngang ở cuối
    };
    const titleSlug = convertToSlug(image.title);
    return (
        <div key={image.id} className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                  {/* Ảnh chính */}
                  <LazyImage 
                    src={project2} 
                    alt={image.alt}
                    className="w-full h-100 object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={isPriority}
                    eager={isEager}
                    placeholder={
                      <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                        <div className={`w-6 h-6 border-3 border-txt-secondary border-t-transparent rounded-full animate-spin ${
                          preloadedImages.has(image.id) ? 'opacity-50' : ''
                        }`}></div>
                      </div>
                    }
                  />
                  
                  {/* Badge type */}
                  <button className='absolute right-5 bg-txt-secondary top-5 p-2 text-white text-[18px] uppercase z-20'>
                    {image.type}
                  </button>

                  {/* Overlay khi hover */}
                  <div className='w-full h-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='w-full h-full relative'>
                      <LazyImage 
                        src={project1} 
                        alt={image.alt}
                        className="w-full h-full object-cover brightness-50"
                        eager={isEager} // Overlay cũng được ưu tiên tương tự
                      />
                    </div>
                    
                    <div className='absolute inset-0 flex flex-col justify-center items-start p-6 z-30 mt-40 ml-4'>
                      <div className="text-left max-w-md">
                        <h4 className='text-white text-[18px] font-light mb-6 leading-relaxed'>
                          Soller Tennis Club is a wellness and lifestyle community for local neighbours, international friends and touring pros
                        </h4>
                        <LocalizedLink to={`/view-brochure/${titleSlug}?filter=0`}>
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
                    <h3 className="text-white text-xl font-semibold">{image.title}</h3>
                    <p className="text-gray-200 text-sm">{image.type}</p>
                  </div>
                </div>
    )
})
export default Projects;