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
        title: 'Tiến độ thi công', 
        type: 'JPG', 
        banner: currentStatePhotos
    },
    {
        id: 2, 
        title: 'Hình ảnh thiết kế', 
        type: 'JPG', 
        banner: rendersShowingPotential
    }
]

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
        if (!image.url) return;
        
        const dateKey = image.uploaded_at ? new Date(image.uploaded_at).toDateString() : 'Unknown Date';
        
        if (!grouped[dateKey]) {
            grouped[dateKey] = {
                uploadDate: image.uploaded_at,
                images: []
            };
        }
        
        grouped[dateKey].images.push({
            id: image.id || Math.random().toString(36).substr(2, 9),
            src: image.url,
            uploaded_at: image.uploaded_at
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

    // Memoize hàm getCurrentFilterImageUrls
    const getCurrentFilterImageUrls = useCallback(() => {
        if (!project) return [];
        
        if (filterId === 0) {
            if (Array.isArray(project.brochure)) {
                return project.brochure.map(item => item.url).filter(url => url);
            } else if (project.brochure && project.brochure.url) {
                return [project.brochure.url];
            }
            return [];
        } else if (filterId === 1) {
            if (!project.constructionProgress || !Array.isArray(project.constructionProgress)) return [];
            return project.constructionProgress.map(item => item.url).filter(url => url);
        } else if (filterId === 2) {
            if (!project.designImages || !Array.isArray(project.designImages)) return [];
            return project.designImages.map(item => item.url).filter(url => url);
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
            if (Array.isArray(project.brochure)) {
                return project.brochure.map((item, index) => ({
                    id: item.id || `brochure-${index}`,
                    url: item.url,
                }));
            } else if (project.brochure && project.brochure.url) {
                return [{ id: 1, url: project.brochure.url }];
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
        : "grid grid-cols-3 gap-4";

    // Hàm xác định mức độ ưu tiên cho từng ảnh
    const getImagePriority = useCallback((index, groupIndex = 0) => {
        if (groupIndex === 0 && index < 2) return { priority: true };
        if (groupIndex === 0 && index < 6) return { eager: true };
        return {};
    }, []);

    // Loading state
    if (loading) {
        return (
            <div className="mt-20 flex justify-center items-center min-h-screen">
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
            <div className="mt-20 flex justify-center items-center min-h-screen">
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
            <div className="mt-20 flex justify-center items-center min-h-screen">
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
            <div className="mt-20 flex justify-center mb-20">
                <div className="xl:max-w-screen-xl lg:max-w-[900px] mt-10">
                    <h1 className="text-[60px] font-subtitle text-txt-secondary mb-10">
                        {project.title}
                    </h1>
                    
                    <p className="text-[26px] text-txt-gray">
                        {project.description}
                    </p>
                    
                    <ul className="mt-20 text-[25px] flex font-subtitle font-semibold">
                        {FILTERS.map(filterItem => (
                            <li 
                                className={`w-[370px] rounded-4xl text-center text-txt-gray border border-txt-secondary px-10 py-2 cursor-pointer select-none ${filterId === filterItem.id ? 'bg-txt-secondary text-white' : ''}`} 
                                key={filterItem.id} 
                                onClick={() => handleSetFilterId(filterItem)}
                            >
                                {filterItem.title}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-10">
                        {currentFilterData.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-txt-gray text-lg">No data available for this section.</p>
                            </div>
                        )}

                        {isBrochure && currentFilterData.length > 0 && (
                            <div className={gridClass}>
                                {currentFilterData.map((item, index) => (
                                    <div key={item.id} className="w-full">
                                        <LazyImage 
                                            src={item.url} 
                                            alt="" 
                                            className="w-full h-[325px] object-cover"
                                            {...getImagePriority(index)}
                                            placeholder={
                                                <div className="w-full h-64 bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                                                    <div className={`w-6 h-6 border-3 border-txt-secondary border-t-transparent rounded-full animate-spin ${
                                                        preloadedImages.has(item.url) ? 'opacity-50' : ''
                                                    }`}></div>
                                                </div>
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {!isBrochure && currentFilterData.map((dateGroup, groupIndex) => (
                            <div key={groupIndex} className="mb-12">
                                <div className="flex items-center mb-6 pl-2">
                                    <div className="w-full h-[2px] bg-txt-primary opacity-50"></div>
                                    <p className="w-150 text-center font-semibold text-lg">{dateGroup.uploadDate}</p>
                                    <div className="w-full h-[2px] bg-txt-primary opacity-50"></div>
                                </div>
                                
                                <div className={gridClass}>
                                    {dateGroup.images.map((imageItem, imageIndex) => (
                                        <div key={imageItem.id} className="w-full h-[325px]">
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