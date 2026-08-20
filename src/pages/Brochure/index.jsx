import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, Youtube } from "lucide-react";
import brochureAndFloorPlans from '../../assets/images/brochure-and-floorplans.png'
import currentStatePhotos from '../../assets/images/current-state-photos.png'
import rendersShowingPotential from '../../assets/images/renders-showing-potential.png'
import Footer from "../../layouts/components/Footer";
import LazyImage from "../../components/LazyImage";
import { projectsService } from "../../services/projectsService";
import logo from '../../assets/images/logo.png'
import { LocalizedLink } from "../../components/LocalizedLink";

const getThumbnailUrl = (image) => {
    if (!image) return '';
    
    // Ưu tiên thumbnailKey, nếu không có thì dùng key
    const imageKey = image.thumbnailKey || image.key || '';
    // const imageKey = image.thumbnailUrl || image.url || '';
    if (!imageKey) return '';
    return `https://cdn.latelia.com/latelia/${imageKey}`;
    // return imageKey;
};

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

function Brochure() {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { projectId } = useParams();
    

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
                        <h2 className="text-xl ">Error</h2>
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
                        <h2 className="text-xl ">Project Not Found</h2>
                        <p>The requested project could not be found.</p>
                    </div>
                </div>
            </div>
        );
    }
    console.log(project)
    return ( 
        <>

            <div className="flex justify-center mb-10 lg:mb-20 px-4 lg:px-0">
                <div className="lg:max-w-screen-3xl w-full">
                    {/* HEADER */}
                    <div  style={{backgroundColor:'#F4F1E8',padding:'100px 30px 30px 30px'}}>
                        <div className="w-1/2">
                            <img src={logo} style={{width:'120px'}}/>
                            <h1 className="text-[32px] md:text-[45px] lg:text-[30px] font-subtitle text-txt-secondary mb-2 leading-tight mt-4">
                                {project.title}
                            </h1>
                            <p className="text-[18px] md:text-[20px] lg:text-[16px] text-txt-gray leading-relaxed" style={{fontFamily:'Nunito Sans'}}>
                                {project.description}
                            </p>
                            {/* PROPERTY FEATURES */}
                            <div className="flex flex-row mt-4 lg:text-[16px]" style={{fontFamily:'Nunito Sans'}}>
                                <p className="font-bold mr-2">Property Features:</p>
                                <ul className='flex flex-row'>
                                    {project && project.propertyFeatures.map((feature, index) => (
                                        <li key={feature.id}>
                                            {feature.text}
                                            {index < project.propertyFeatures.length - 1 ? ', ' : ''}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* PRICE */}
                            <div style={{fontFamily:'Nunito Sans'}} className="mt-4 lg:text-[16px] flex flex-row">
                                <p className="font-bold">Price:</p>
                                {project && project.price && <p >{project.price.toLocaleString()}</p>}
                            </div>
                        </div>
                    </div>
                    {/* CONTENT */}
                    <div className="lg:max-w-screen-3xl w-full" style={{padding:'30px',fontFamily:'Nunito Sans'}}>
                        <div className="relative inline-block">
                            <p className="text-bg-secondary">Brochure & Tiến độ xây dựng</p>
                            <span className="absolute left-1/2 -bottom-1 w-1/5 h-[1px] bg-bg-secondary -translate-x-1/2"></span>
                        </div>

                        <div className="grid grid-cols-4 sm:grid-cols-4 gap-6 lg:gap-8 mt-8">
                            {project?.brochure.length > 0 && (
                                <div className="cursor-pointer">
                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-black/5 bg-gray-100 shadow-sm  transition-transform duration-300 hover:-translate-y-2">
                                        <LocalizedLink
                                            to={`/view-brochure/${projectId}/detail?doc=brochure`}
                                            >
                                                <img
                                                    src={getThumbnailUrl(project.brochure[0])}
                                                    alt="Brochure"
                                                    loading="lazy"
                                                    className="w-full h-full object-cover"
                                                />
                                        </LocalizedLink>
                                    </div>
                                  <p className="mt-3 text-sm md:text-base font-medium">Brochure</p>

                                </div>
                            )}

                            {project?.constructionProgress.length > 0 && (
                                <div className="cursor-pointer">
                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-black/5 bg-gray-100 shadow-sm  transition-transform duration-300 hover:-translate-y-2">
                                         <LocalizedLink
                                            to={`/view-brochure/${projectId}/detail?doc=construction-progress`}
                                            >
                                                <img
                                                src={getThumbnailUrl(project.constructionProgress[0])}
                                                alt="Tiến độ xây dựng"
                                                loading="lazy"
                                                className="w-full h-full object-cover"
                                        />
                                        </LocalizedLink>
                                        
                                        
                                    </div>
                                    <p className="mt-3 text-sm md:text-base font-medium">Tiến độ xây dựng</p>
                                </div>
                            )}
                            {project?.designImages.length > 0 && (
                                <div className="cursor-pointer">
                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-black/5 bg-gray-100 shadow-sm  transition-transform duration-300 hover:-translate-y-2">
                                         <LocalizedLink
                                            to={`/view-brochure/${projectId}/detail?doc=design-images`}
                                            >
                                                <img
                                                src={getThumbnailUrl(project.designImages[0])}
                                                alt="Hình ảnh thiết kế"
                                                loading="lazy"
                                                className="w-full h-full object-cover"
                                        />
                                        </LocalizedLink>
                                    </div>
                                    <p className="mt-3 text-sm md:text-base font-medium">Hình ảnh thiết kế</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer withContact={false}/> */}
        </>
    );
}

export default Brochure;