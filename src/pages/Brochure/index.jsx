import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import brochureAndFloorPlans from '../../assets/images/brochure-and-floorplans.png'
import currentStatePhotos from '../../assets/images/current-state-photos.png'
import rendersShowingPotential from '../../assets/images/renders-showing-potential.png'
import Footer from "../../layouts/components/Footer";
import LazyImage from "../../components/LazyImage";
import { projectsService } from "../../services/projectsService";

const FILTERS = [
    {
        id: 0, 
        title: 'Brochure', 
        type: 'PDF', 
        banner: brochureAndFloorPlans
    },
    {
        id: 1, 
        title: 'Tiến độ xây dựng', 
        type: 'JPG', 
        banner: currentStatePhotos
    },
    {
        id: 2, 
        title: 'Hình ảnh Concept', 
        type: 'JPG', 
        banner: rendersShowingPotential
    }
]

// Hàm tạo URL từ key - ƯU TIÊN thumbnailKey
const getImageUrl = (image) => {
    if (!image) return '';
    
    // Ưu tiên thumbnailKey trước, nếu không có thì dùng key
    const imageKey = image.thumbnailKey || image.key || '';
    
    if (!imageKey) return '';
    
    // Tạo URL đầy đủ
    return `https://cdn.latelia.com/latelia/${imageKey}`;
};

// Hàm tạo URL từ URL string (cho backward compatibility)
const getUrlFromString = (urlString) => {
    console.log(urlString)
    if (!urlString) return '';
    
    // Nếu đã là URL đầy đủ
    if (urlString.startsWith('http')) {
        return urlString;
    }
    
    // Nếu chỉ là key hoặc path
    if (urlString.includes('/')) {
        return `https://cdn.latelia.com/latelia/${urlString}`;
    }
    
    return urlString;
};

function usePriorityPreload(imageUrls, count = 6) {
    const [preloadedImages, setPreloadedImages] = useState(new Set());
  
    useEffect(() => {
        if (imageUrls.length === 0) return;

        const preloadImages = async () => {
            const imagesToPreload = imageUrls.slice(0, count);
            
            const preloadPromises = imagesToPreload.map((url) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = url;
                    img.onload = () => {
                        setPreloadedImages(prev => {
                            if (prev.has(url)) return prev;
                            return new Set([...prev, url]);
                        });
                        resolve();
                    };
                    img.onerror = resolve;
                });
            });

            await Promise.all(preloadPromises);
        };

        preloadImages();
    }, [imageUrls, count]);

    return preloadedImages;
}

// Hàm format ngày tháng
const formatDate = (dateString) => {
    if (!dateString) return 'Unknown Date';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

// Hàm nhóm hình ảnh theo ngày
const groupImagesByDate = (images) => {
    if (!images || !Array.isArray(images)) return [];
    
    const grouped = {};
    
    images.forEach(image => {
        // Sử dụng hàm getImageUrl để lấy URL ưu tiên thumbnail
        const imageUrl = getImageUrl(image) || (image.url ? getUrlFromString(image.url) : '');
        
        if (!imageUrl) return;
        
        const dateKey = image.uploaded_at ? new Date(image.uploaded_at).toDateString() : 'Unknown Date';
        
        if (!grouped[dateKey]) {
            grouped[dateKey] = {
                uploadDate: image.uploaded_at,
                images: []
            };
        }
        
        grouped[dateKey].images.push({
            id: image.id || Math.random().toString(36).substr(2, 9),
            src: imageUrl, // Sử dụng URL ưu tiên thumbnail
            uploaded_at: image.uploaded_at,
            // Lưu thêm thông tin gốc để debug
            originalImage: image
        });
    });
    
    return Object.values(grouped)
        .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
        .map(group => ({
            ...group,
            uploadDate: formatDate(group.uploadDate)
        }));
};

function Brochure() {
    const [filterId, setFilterId] = useState(0);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const { projectId } = useParams();
    const navigate = useNavigate();
    const filter = searchParams.get('filter');
    
    // Fetch project data từ API
    const fetchProjectData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            if (!projectId) {
                throw new Error('Project ID is required');
            }

            const response = await projectsService.getProjectById(projectId);
            console.log(response)
            setProject(response.data || response);
            
        } catch (err) {
            console.error('❌ Failed to fetch project data:', err);
            setError(err.message || 'Failed to load project data');
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    useEffect(() => {
        if (projectId) {
            fetchProjectData();
        }
    }, [projectId, fetchProjectData]);

    // Set filterId từ URL parameter
    useEffect(() => {
        if (filter !== null) {
            setFilterId(parseInt(filter) || 0);
        }
    }, [filter]);

    // Memoize hàm getCurrentFilterImageUrls với ưu tiên thumbnail
    const getCurrentFilterImageUrls = useCallback(() => {
        if (!project) return [];
        
        if (filterId === 0) {
            if (Array.isArray(project.brochure)) {
                return project.brochure
                    .map(item => getImageUrl(item) || (item.url ? getUrlFromString(item.url) : ''))
                    .filter(url => url);
            } else if (project.brochure) {
                const url = getImageUrl(project.brochure) || 
                           (project.brochure.url ? getUrlFromString(project.brochure.url) : '');
                return url ? [url] : [];
            }
            return [];
        } else if (filterId === 1) {
            if (!project.constructionProgress || !Array.isArray(project.constructionProgress)) return [];
            return project.constructionProgress
                .map(item => getImageUrl(item) || (item.url ? getUrlFromString(item.url) : ''))
                .filter(url => url);
        } else if (filterId === 2) {
            if (!project.designImages || !Array.isArray(project.designImages)) return [];
            return project.designImages
                .map(item => getImageUrl(item) || (item.url ? getUrlFromString(item.url) : ''))
                .filter(url => url);
        }
        
        return [];
    }, [project, filterId]);

    // Memoize imageUrls
    const imageUrls = useMemo(() => {
        return getCurrentFilterImageUrls();
    }, [getCurrentFilterImageUrls]);

    const preloadedImages = usePriorityPreload(imageUrls, 8);

    // Memoize hàm getCurrentFilterData với ưu tiên thumbnail
    const getCurrentFilterData = useCallback(() => {
        if (!project) return [];
        
        if (filterId === 0) {
            if (Array.isArray(project.brochure)) {
                const data = project.brochure.map((item, index) => ({
                    id: item.id || `brochure-${index}`,
                    url:'https://cdn.latelia.com/latelia/' + (item.key || item.thumbnailKey),
                    // url: getImageUrl(item) || (item.url ? getUrlFromString(item.url) : ''),
                    thumbUrl: getImageUrl(item), // Luôn là thumbnail nếu có
                }));
                console.log(data)
                return data;
            } else if (project.brochure) {
                const url = getImageUrl(project.brochure) || 
                           (project.brochure.url ? getUrlFromString(project.brochure.url) : '');
                return url ? [{ id: 1, url, thumbUrl: getImageUrl(project.brochure) }] : [];
            }
            return [];
        } else if (filterId === 1) {
            return groupImagesByDate(project.constructionProgress || []);
        } else if (filterId === 2) {
            return groupImagesByDate(project.designImages || []);
        }
        return [];
    }, [project, filterId]);

    const currentFilterData = useMemo(() => {
        return getCurrentFilterData();
    }, [getCurrentFilterData]);

    const handleSetFilterId = useCallback((filterItem) => {
        setFilterId(filterItem.id);
        navigate(`?filter=${filterItem.id}`);
    }, [navigate]);

    const isBrochure = filterId === 0;
    const gridClass = isBrochure 
        ? "grid grid-cols-1 gap-4"
        : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4";

    // Hàm xác định mức độ ưu tiên cho từng ảnh
    const getImagePriority = useCallback((index, groupIndex = 0) => {
        if (groupIndex === 0 && index < 2) return { priority: true };
        if (groupIndex === 0 && index < 6) return { eager: true };
        return {};
    }, []);

    // Loading state
    if (loading) {
        return (
            <div className="mt-20 flex justify-center items-center min-h-screen px-4">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-txt-secondary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-txt-gray text-lg">Loading project data...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="mt-20 flex justify-center items-center min-h-screen px-4">
                <div className="text-center">
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        <h2 className="text-xl font-semibold">Error</h2>
                        <p>{error}</p>
                        <button 
                            onClick={fetchProjectData}
                            className="mt-4 px-4 py-2 bg-txt-secondary text-white rounded hover:bg-blue-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="mt-20 flex justify-center items-center min-h-screen px-4">
                <div className="text-center">
                    <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                        <h2 className="text-xl font-semibold">Project Not Found</h2>
                        <p>The requested project could not be found.</p>
                    </div>
                </div>
            </div>
        );
    }

    return ( 
        <div className="">
            <div className="mt-20 flex justify-center mb-10 lg:mb-20 px-4 lg:px-0">
                <div className="xl:max-w-screen-xl lg:max-w-[900px] mt-6 lg:mt-10 w-full">
                    {/* HEADER */}
                    <h1 className="text-[32px] md:text-[48px] lg:text-[60px] font-subtitle text-txt-secondary mb-6 lg:mb-10 leading-tight">
                        {project.title}
                    </h1>
                    
                    <p className="text-[18px] md:text-[22px] lg:text-[26px] text-txt-gray leading-relaxed">
                        {project.description}
                    </p>
                    
                    {/* FILTER TABS */}
                    <ul className="mt-10 lg:mt-20 text-[16px] md:text-[20px] lg:text-[25px] flex flex-col sm:flex-row font-subtitle font-semibold gap-4 sm:gap-2 lg:gap-0">
                        {FILTERS.map(filterItem => (
                            <li 
                                className={`w-full sm:w-[200px] md:w-[300px] lg:w-[370px] rounded-4xl text-center text-txt-gray border border-txt-secondary px-4 md:px-6 lg:px-10 py-2 md:py-2 cursor-pointer select-none transition-all duration-300 ${
                                    filterId === filterItem.id 
                                        ? 'bg-txt-secondary text-white' 
                                        : 'hover:bg-gray-100'
                                }`} 
                                key={filterItem.id} 
                                onClick={() => handleSetFilterId(filterItem)}
                            >
                                {filterItem.title}
                            </li>
                        ))}
                    </ul>

                    {/* CONTENT */}
                    <div className="mt-8 lg:mt-10">
                        {currentFilterData.length === 0 && (
                            <div className="text-center py-8 lg:py-12">
                                <p className="text-txt-gray text-base lg:text-lg">No data available for this section.</p>
                            </div>
                        )}

                        {isBrochure && currentFilterData.length > 0 && (
                            <div className={gridClass}>
                                {currentFilterData.map((item, index) => {
                                    return (
                                        <div key={item.id} className="w-full">
                                            <LazyImage 
                                                src={item.url} 
                                                alt="" 
                                                className="w-full h-full object-cover"
                                                {...getImagePriority(index)}
                                                placeholder={
                                                    <div className="w-full h-[200px] md:h-[250px] lg:h-[325px] bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                                                        <div className={`w-6 h-6 border-3 border-txt-secondary border-t-transparent rounded-full animate-spin ${
                                                            preloadedImages.has(item.url) ? 'opacity-50' : ''
                                                        }`}></div>
                                                    </div>
                                                }
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        
                        {!isBrochure && currentFilterData.map((dateGroup, groupIndex) => (
                            <div key={groupIndex} className="mb-8 lg:mb-12">
                                {/* DATE HEADER */}
                                <div className="flex items-center mb-4 lg:mb-6 px-2">
                                    <div className="w-full h-[1px] md:h-[2px] bg-txt-primary opacity-50"></div>
                                    <p className="w-full md:w-150 text-center font-semibold text-sm md:text-base lg:text-lg px-2 md:px-0">
                                        {dateGroup.uploadDate}
                                    </p>
                                    <div className="w-full h-[1px] md:h-[2px] bg-txt-primary opacity-50"></div>
                                </div>
                                
                                {/* IMAGE GRID */}
                                <div className={gridClass}>
                                    {dateGroup.images.map((imageItem, imageIndex) => (
                                        <div key={imageItem.id} className="w-full h-[200px] md:h-[250px] lg:h-[325px]">
                                            <LazyImage 
                                                src={imageItem.src} 
                                                alt="" 
                                                className="w-full h-full object-cover"
                                                {...getImagePriority(imageIndex, groupIndex)}
                                                placeholder={
                                                    <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                                                        <div className={`w-6 h-6 border-3 border-txt-secondary border-t-transparent rounded-full animate-spin ${
                                                            preloadedImages.has(imageItem.src) ? 'opacity-50' : ''
                                                        }`}></div>
                                                    </div>
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer withContact={false}/>
        </div>
    );
}

export default Brochure;