import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
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
        type: 'JPG', 
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

// Custom hook để quản lý scroll lock
const useScrollLock = () => {
    useEffect(() => {
        return () => {
            // Cleanup khi component unmount
            document.body.style.overflow = 'unset';
        };
    }, []);

    const lockScroll = useCallback(() => {
        document.body.style.overflow = 'hidden';
    }, []);

    const unlockScroll = useCallback(() => {
        document.body.style.overflow = 'unset';
    }, []);

    return { lockScroll, unlockScroll };
};

// Hàm lấy URL ảnh gốc (original image) - DÙNG CHO BROCHURE
const getOriginalImageUrl = (image) => {
    if (!image) return '';
    
    // Ưu tiên key cho ảnh gốc
    const imageKey = image.key || (image.url && typeof image.url === 'string' && !image.url.startsWith('http') ? image.url : '');
    
    if (!imageKey) {
        // Fallback: Nếu image.url là URL đầy đủ
        if (image.url && typeof image.url === 'string' && image.url.startsWith('http')) {
            return image.url;
        }
        return '';
    }
    
    // Tạo URL đầy đủ cho ảnh gốc
    return `https://cdn.latelia.com/latelia/${imageKey}`;
};

// Hàm tạo URL từ key - DÙNG THUMBNAIL CHO TIẾN ĐỘ & CONCEPT
const getThumbnailUrl = (image) => {
    if (!image) return '';
    
    // Ưu tiên thumbnailKey, nếu không có thì dùng key
    const imageKey = image.thumbnailKey || image.key || '';
    
    if (!imageKey) return '';
    
    return `https://cdn.latelia.com/latelia/${imageKey}`;
};

// Hàm tạo URL từ URL string (cho backward compatibility)
const getUrlFromString = (urlString) => {
    if (!urlString) return '';
    
    if (urlString.startsWith('http')) {
        return urlString;
    }
    
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

// Hàm nhóm hình ảnh theo ngày - CHỈ DÙNG CHO TIẾN ĐỘ & CONCEPT
const groupImagesByDate = (images) => {
    if (!images || !Array.isArray(images)) return [];
    
    const grouped = {};
    
    images.forEach(image => {
        const originalUrl = getOriginalImageUrl(image);
        const thumbUrl = getThumbnailUrl(image) || (image.url ? getUrlFromString(image.url) : '');
        
        if (!originalUrl && !thumbUrl) return;
        
        const dateKey = image.uploaded_at ? new Date(image.uploaded_at).toDateString() : 'Unknown Date';
        
        if (!grouped[dateKey]) {
            grouped[dateKey] = {
                uploadDate: image.uploaded_at,
                images: []
            };
        }
        
        grouped[dateKey].images.push({
            id: image.id || Math.random().toString(36).substr(2, 9),
            src: thumbUrl, // URL thumbnail để hiển thị trong grid
            originalSrc: originalUrl, // URL ảnh gốc để hiển thị trong popup
            uploaded_at: image.uploaded_at,
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

// Image Popup Component - CHỈ DÙNG CHO TIẾN ĐỘ & CONCEPT
const ImagePopup = ({ 
    isOpen, 
    onClose, 
    currentImage,
    onNext, 
    onPrev,
    hasNext,
    hasPrev 
}) => {
    if (!isOpen || !currentImage) return null;

    const [isLoading, setIsLoading] = useState(true);
    const { lockScroll, unlockScroll } = useScrollLock();

    useEffect(() => {
        if (currentImage) {
            setIsLoading(true);
            const img = new Image();
            img.src = currentImage.originalSrc || currentImage.src;
            img.onload = () => setIsLoading(false);
            img.onerror = () => setIsLoading(false);
        }
    }, [currentImage]);

    // Handle body scroll lock
    useEffect(() => {
        if (isOpen) {
            lockScroll();
        } else {
            unlockScroll();
        }

        return () => {
            unlockScroll();
        };
    }, [isOpen, lockScroll, unlockScroll]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowRight' && hasNext) {
                onNext();
            } else if (e.key === 'ArrowLeft' && hasPrev) {
                onPrev();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, hasNext, hasPrev, onNext, onPrev, onClose]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 transition-opacity duration-300"
            onClick={handleBackdropClick}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Close"
            >
                <X size={32} />
            </button>

            {/* Navigation Buttons */}
            {hasPrev && (
                <button
                    onClick={onPrev}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
                    aria-label="Previous image"
                >
                    <ChevronLeft size={32} />
                </button>
            )}
            
            {hasNext && (
                <button
                    onClick={onNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
                    aria-label="Next image"
                >
                    <ChevronRight size={32} />
                </button>
            )}

            {/* Image Container */}
            <div className="relative max-w-7xl max-h-[90vh] w-full mx-4">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                
                <img
                    src={currentImage.originalSrc || currentImage.src}
                    alt=""
                    className={`max-w-full max-h-[90vh] object-contain mx-auto transition-opacity duration-300 ${
                        isLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                />
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded">
                {currentImage.index + 1} / {currentImage.total}
            </div>
        </div>
    );
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
    
    // State for image popup - CHỈ DÙNG CHO FILTER ID 1 & 2
    const [popupOpen, setPopupOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [allImages, setAllImages] = useState([]);
    const { unlockScroll } = useScrollLock();

    // Fetch project data từ API
    const fetchProjectData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            if (!projectId) {
                throw new Error('Project ID is required');
            }

            const response = await projectsService.getProjectById(projectId);
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

    // Cleanup khi component unmount
    useEffect(() => {
        return () => {
            unlockScroll();
        };
    }, [unlockScroll]);

    // Memoize hàm getCurrentFilterImageUrls
    const getCurrentFilterImageUrls = useCallback(() => {
        if (!project) return [];
        
        if (filterId === 0) {
            // BROCHURE - Dùng ảnh gốc
            if (Array.isArray(project.brochure)) {
                return project.brochure
                    .map(item => getOriginalImageUrl(item) || (item.url ? getUrlFromString(item.url) : ''))
                    .filter(url => url);
            } else if (project.brochure) {
                const url = getOriginalImageUrl(project.brochure) || 
                           (project.brochure.url ? getUrlFromString(project.brochure.url) : '');
                return url ? [url] : [];
            }
            return [];
        } else if (filterId === 1) {
            if (!project.constructionProgress || !Array.isArray(project.constructionProgress)) return [];
            return project.constructionProgress
                .map(item => getThumbnailUrl(item) || (item.url ? getUrlFromString(item.url) : ''))
                .filter(url => url);
        } else if (filterId === 2) {
            if (!project.designImages || !Array.isArray(project.designImages)) return [];
            return project.designImages
                .map(item => getThumbnailUrl(item) || (item.url ? getUrlFromString(item.url) : ''))
                .filter(url => url);
        }
        
        return [];
    }, [project, filterId]);

    // Memoize imageUrls
    const imageUrls = useMemo(() => {
        return getCurrentFilterImageUrls();
    }, [getCurrentFilterImageUrls]);

    const preloadedImages = usePriorityPreload(imageUrls, 8);

    // Memoize hàm getCurrentFilterData
    const getCurrentFilterData = useCallback(() => {
        if (!project) return [];
        
        if (filterId === 0) {
            // BROCHURE - Dùng ảnh gốc, KHÔNG có popup
            if (Array.isArray(project.brochure)) {
                return project.brochure.map((item, index) => ({
                    id: item.id || `brochure-${index}`,
                    url: getOriginalImageUrl(item) || (item.url ? getUrlFromString(item.url) : ''),
                    thumbUrl: getOriginalImageUrl(item), // Brochure cũng dùng ảnh gốc
                }));
            } else if (project.brochure) {
                const url = getOriginalImageUrl(project.brochure) || 
                           (project.brochure.url ? getUrlFromString(project.brochure.url) : '');
                return url ? [{ 
                    id: 1, 
                    url, 
                    thumbUrl: url
                }] : [];
            }
            return [];
        } else if (filterId === 1) {
            // TIẾN ĐỘ XÂY DỰNG - Dùng thumbnail, có popup
            return groupImagesByDate(project.constructionProgress || []);
        } else if (filterId === 2) {
            // HÌNH ẢNH CONCEPT - Dùng thumbnail, có popup
            return groupImagesByDate(project.designImages || []);
        }
        return [];
    }, [project, filterId]);

    const currentFilterData = useMemo(() => {
        return getCurrentFilterData();
    }, [getCurrentFilterData]);

    // Prepare all images array for popup navigation - CHỈ CHO FILTER ID 1 & 2
    useEffect(() => {
        if (filterId !== 0 && currentFilterData.length > 0) {
            const images = [];
            let index = 0;
            
            currentFilterData.forEach(dateGroup => {
                dateGroup.images.forEach(imageItem => {
                    images.push({
                        ...imageItem,
                        index: index,
                        total: 0 // Will be updated after loop
                    });
                    index++;
                });
            });
            
            // Update total for each image
            const total = images.length;
            images.forEach(img => { img.total = total; });
            
            setAllImages(images);
        } else {
            setAllImages([]);
        }
    }, [currentFilterData, filterId]);

    const handleSetFilterId = useCallback((filterItem) => {
        setFilterId(filterItem.id);
        navigate(`?filter=${filterItem.id}`);
        // Close popup when switching filters và restore scroll
        setPopupOpen(false);
        unlockScroll();
    }, [navigate, unlockScroll]);

    // Handle image click - CHỈ MỞ POPUP CHO FILTER ID 1 & 2
    const handleImageClick = useCallback((imageIndex, isGrouped = false, groupIndex = 0, imageInGroupIndex = 0) => {
        // Không mở popup cho Brochure (filterId === 0)
        if (filterId === 0) {
            return;
        }
        
        let targetIndex = 0;
        
        if (isGrouped) {
            let absoluteIndex = 0;
            for (let i = 0; i < groupIndex; i++) {
                absoluteIndex += currentFilterData[i].images.length;
            }
            targetIndex = absoluteIndex + imageInGroupIndex;
        } else {
            targetIndex = imageIndex;
        }
        
        setCurrentImageIndex(targetIndex);
        setPopupOpen(true);
    }, [currentFilterData, filterId]);

    const handleNextImage = useCallback(() => {
        if (currentImageIndex < allImages.length - 1) {
            setCurrentImageIndex(prev => prev + 1);
        } else {
            setCurrentImageIndex(0);
        }
    }, [currentImageIndex, allImages.length]);

    const handlePrevImage = useCallback(() => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(prev => prev - 1);
        } else {
            setCurrentImageIndex(allImages.length - 1);
        }
    }, [currentImageIndex, allImages.length]);

    const handleClosePopup = useCallback(() => {
        setPopupOpen(false);
        unlockScroll();
    }, [unlockScroll]);

    const isBrochure = filterId === 0;
    // Brochure: 1 cột, full width
    // Tiến độ & Concept: 3 cột
    const gridClass = isBrochure 
        ? "grid grid-cols-1 gap-8" // Brochure 1 cột, gap lớn hơn
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

    const currentImage = allImages[currentImageIndex];

    return ( 
        <div className="">
            {/* Image Popup - CHỈ HIỂN THỊ KHI KHÔNG PHẢI BROCHURE */}
            {!isBrochure && (
                <ImagePopup
                    isOpen={popupOpen}
                    onClose={handleClosePopup}
                    currentImage={currentImage}
                    onNext={handleNextImage}
                    onPrev={handlePrevImage}
                    hasNext={currentImageIndex < allImages.length - 1}
                    hasPrev={currentImageIndex > 0}
                />
            )}

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
                                {currentFilterData.map((item, index) => (
                                    <div 
                                        key={item.id} 
                                        className="w-full"
                                    >
                                        {/* Brochure - Ảnh gốc, full width, không hover scale, không cursor-pointer */}
                                        <LazyImage 
                                            src={item.url} 
                                            alt={`Brochure ${index + 1}`} 
                                            className="w-full h-auto object-contain border border-gray-200 shadow-lg"
                                            {...getImagePriority(index)}
                                            placeholder={
                                                <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                                                    <div className="w-8 h-8 border-3 border-txt-secondary border-t-transparent rounded-full animate-spin"></div>
                                                </div>
                                            }
                                        />
                                        {/* Thêm số trang brochure */}
                                        <p className="text-center text-txt-gray mt-2 text-sm">
                                            Page {index + 1} of {currentFilterData.length}
                                        </p>
                                    </div>
                                ))}
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
                                
                                {/* IMAGE GRID - TIẾN ĐỘ & CONCEPT */}
                                <div className={gridClass}>
                                    {dateGroup.images.map((imageItem, imageIndex) => (
                                        <div 
                                            key={imageItem.id} 
                                            className="w-full h-[200px] md:h-[250px] lg:h-[325px] cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                                            onClick={() => handleImageClick(imageIndex, true, groupIndex, imageIndex)}
                                        >
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