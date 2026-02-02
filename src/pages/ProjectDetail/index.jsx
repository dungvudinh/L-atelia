import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import propertyDetailBanner from '../../assets/images/property-detail-banner.png';
import { ArrowRight, ChevronRight } from "lucide-react";
import patikiTownhouse from '../../assets/images/patiki-townhouse.png';
import propertyFeatures from '../../assets/images/property-features.png';
import architecture1 from '../../assets/images/architecture1.png'
import architecture2 from '../../assets/images/architecture2.png'
import history from '../../assets/images/history.png'
import Footer from "../../layouts/components/Footer";
import OptimizedImage from "../../components/OptimizedImage";
import CustomAccordion from "../../components/Accordion";
import { LocalizedLink } from "../../components/LocalizedLink";
import { projectsService } from "../../services/projectsService";
const BASE_CDN_URL = 'https://cdn.latelia.com/latelia/'
function ProjectDetail() {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch project detail from API
    const fetchProjectDetail = async () => {
        try {
            setLoading(true);
            setError(null);
            
            console.log('🚀 Fetching project detail for ID:', projectId);
            
            if (!projectId) {
                throw new Error('Project ID is required');
            }

            const response = await projectsService.getProjectById(projectId);
            console.log(response)
            console.log('✅ Project detail response:', response);
            
            // Set project data
            setProject(response.data || response);
            
        } catch (err) {
            console.error('❌ Failed to fetch project detail:', err);
            setError(err.message || 'Failed to load project details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (projectId) {
            fetchProjectDetail();
        }
    }, [projectId]);

    // Loading state
    if (loading) {
        return (
            <div className="mt-20 flex justify-center items-center min-h-screen px-4">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-txt-secondary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-txt-gray text-lg">Loading project details...</p>
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
                            onClick={fetchProjectDetail}
                            className="mt-4 px-4 py-2 bg-txt-secondary text-white rounded hover:bg-blue-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Project not found
    if (!project) {
        return (
            <div className="mt-20 flex justify-center items-center min-h-screen px-4">
                <div className="text-center">
                    <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                        <h2 className="text-xl font-semibold">Project Not Found</h2>
                        <p>The requested project could not be found.</p>
                        <LocalizedLink to="/projects">
                            <button className="mt-4 px-4 py-2 bg-txt-secondary text-white rounded hover:bg-blue-700">
                                Back to Projects
                            </button>
                        </LocalizedLink>
                    </div>
                </div>
            </div>
        );
    }

    // Debug info

    return (
        <div className="mt-20">
            {/* BANNER */}
            <div className="w-full h-[300px] md:h-[500px] lg:h-[840px] relative">
                <OptimizedImage 
                    src={project && `${BASE_CDN_URL}${project.heroImage.key}`} 
                    alt="" 
                    className="object-cover w-full h-full object-[25%_75%] filter brightness-75"
                />
                <div className="absolute left-1/2 -translate-x-1/2 top-[50%] text-bg-primary text-center w-full px-4 flex flex-col items-center">
                    <h1 className="font-subtitle text-[32px] md:text-[48px] lg:text-[60px]">FOR SALE</h1>
                    <LocalizedLink to={`/view-brochure/${project._id}?filter=0`}>
                        <button className="border border-bg-primary px-4 py-2 flex justify-between items-center
                            text-[14px] md:text-[18px] uppercase transition-all duration-300 cursor-pointer 
                            hover:bg-txt-secondary hover:text-bg-primary hover:border-txt-secondary mt-4">
                            VIEW BROCHURE
                            <ArrowRight size={18} className="md:ml-10 ml-2" />
                        </button>
                    </LocalizedLink>
                </div>
            </div>
            
            {/* Project Details */}
            <div className="flex justify-center mt-10 lg:mt-20 px-4 lg:px-0">
                <div className="flex flex-col lg:flex-row xl:max-w-screen-xl lg:max-w-[900px] gap-8 lg:gap-20 w-full">
                    {/* LEFT */}
                    <div className="flex-basis lg:basis-1/2 mt-0 lg:mt-7 order-2 lg:order-1">
                        <h1 className="text-[32px] md:text-[48px] lg:text-[60px] text-txt-secondary font-subtitle leading-tight">
                            {project.title || 'Patiki Townhouse'}
                        </h1>
                        <p className="mt-6 lg:mt-10 text-[16px] md:text-[18px] lg:text-[22px] leading-relaxed">
                            {project.description || 'An architectural gem immaculately restored and modernized from its 1896 creation with no compromise on luxury. The mission in reforming the historic mansion was to create a home with an uncompromised year round living experience, while ensuring the heritage not only lived on but enhanced its lavish style.'}
                        </p>
                    </div>
                    {/* RIGHT */}
                    <div className="flex-basis lg:basis-1/2 order-1 lg:order-2">
                        <OptimizedImage 
                            src={project && `${BASE_CDN_URL}${project.gallery[0].key}`} 
                            alt={project.title} 
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>

            {/* PROPERTY FEATURES */}
            <div className="bg-bg-primary mt-10 lg:mt-20 flex justify-center px-4 lg:px-0">
                <div className="xl:max-w-screen-xl lg:max-w-[900px] mt-10 lg:mt-20 w-full">
                    <ul className="flex flex-col md:flex-row justify-start gap-8 md:gap-10 lg:gap-30">
                        <li className="md:mr-10 lg:mr-30">
                            <h4 className="text-[20px] md:text-[22px] lg:text-[25px] font-subtitle text-txt-secondary font-semibold">PROPERTY FEATURES</h4>
                            <p className="flex flex-col text-[16px] lg:text-[18px] mt-3 lg:mt-4 text-txt-gray space-y-2">
                                {
                                    project?.propertyFeatures?.length > 0 && project.propertyFeatures.map(propertyFeature=>(
                                        <span key={propertyFeature._id}>{propertyFeature.text}</span>
                                    ))
                                }
                            </p>
                        </li>
                        <li className="md:mr-10 lg:mr-30">
                            <h4 className="text-[20px] md:text-[22px] lg:text-[25px] font-subtitle text-txt-secondary font-semibold">SPECIFICATION</h4>
                            <p className="flex flex-col text-[16px] lg:text-[18px] mt-3 lg:mt-4 text-txt-gray space-y-2">
                                {
                                    project?.specifications?.length > 0 && project.specifications.map(specification=>(
                                        <span key={specification._id}>{specification.text}</span>
                                    ))
                                }
                            </p>
                        </li>
                        <li>
                            <h4 className="text-[20px] md:text-[22px] lg:text-[25px] font-subtitle text-txt-secondary font-semibold">LOCATION</h4>
                            <p className="flex flex-col text-[16px] lg:text-[18px] mt-3 lg:mt-4 text-txt-gray">
                                <span>{project?.location}</span>
                            </p>
                        </li>
                    </ul>
                    <div className="mt-10 lg:mt-20 flex flex-col lg:flex-row gap-8 lg:gap-20">
                        {/* LEFT */}
                        <div className="flex-basis lg:basis-1/2">
                            <h4 className="text-[20px] md:text-[22px] lg:text-[25px] font-subtitle text-txt-secondary font-semibold">
                                {project?.propertyHighlights?.length > 0 && project.propertyHighlights[0].title}
                            </h4>
                            <p className="mt-6 lg:mt-10 text-txt-gray text-[18px] md:text-[22px] lg:text-[26px] leading-relaxed">
                                {project?.propertyHighlights?.length > 0 && project.propertyHighlights[0].description}
                            </p>
                            {
                                project?.propertyHighlights?.[0]?.featureSections?.length > 0 && (
                                    <div className="mt-6 lg:mt-10">
                                        <CustomAccordion data={project.propertyHighlights[0].featureSections}/>
                                    </div>
                                )
                            }
                        </div>
                        {/* RIGHT */}
                        <div className="flex-basis lg:basis-1/2 h-[300px] lg:h-150">
                            <OptimizedImage src={`${BASE_CDN_URL}${project?.gallery?.[1]?.key}`} alt="" className="h-full w-full object-cover"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* ARCHITECTURE SECTION */}
            <div className="relative mt-10 lg:mt-0">
                <OptimizedImage src={`${BASE_CDN_URL}${project?.gallery?.[2]?.key}`} alt="" className="w-full h-[200px] md:h-[250px] lg:h-300 object-cover"/>
                <OptimizedImage src={`${BASE_CDN_URL}${project?.gallery?.[3]?.key}`} alt="" className="w-full h-[200px] md:h-[250px] lg:h-300 object-cover"/>
                <div className="absolute top-1/2 left-1/2 lg:left-50 transform -translate-x-1/2 lg:-translate-x-0 -translate-y-1/2 bg-white p-4 md:p-6 lg:p-8 w-[90%] md:w-[80%] lg:w-150">
                    <h4 className="text-[18px] md:text-[22px] lg:text-[25px] font-subtitle text-txt-secondary font-semibold">
                        {project?.specialSections?.[0]?.title}
                    </h4>
                    <p className="mt-3 lg:mt-4 text-[14px] md:text-[16px] lg:text-[18px] text-txt-gray leading-relaxed">
                        {project?.specialSections?.[0]?.shortDescription}
                    </p>
                    {
                        project?.specialSections?.[0]?.isExpandable && (
                            <div className="mt-4">
                                <CustomAccordion data={[{name:'READ MORE', description:project.specialSections[0].fullDescription}]} />
                            </div>
                        )
                    }
                </div>
            </div>

            {/* HISTORY SECTION */}
            <div className="flex flex-col lg:flex-row">
                <div className="flex-basis lg:basis-1/2">
                    <OptimizedImage src={`${BASE_CDN_URL}${project?.gallery?.[4]?.key}`} alt="" className="w-full h-[300px] lg:h-auto object-cover" />
                </div>
                <div className="p-6 md:p-10 lg:p-20 flex-basis lg:basis-1/2">
                    <h4 className="text-[18px] md:text-[22px] lg:text-[25px] font-subtitle text-txt-secondary font-semibold">
                        {project?.specialSections?.[1]?.title}
                    </h4>
                    <p className="mt-3 lg:mt-4 text-[14px] md:text-[16px] lg:text-[18px] text-txt-gray leading-relaxed">
                        {project?.specialSections?.[1]?.shortDescription}
                    </p>
                    {
                        project?.specialSections?.[1]?.isExpandable && (
                            <div className="mt-4">
                                <CustomAccordion data={[{name:'READ MORE', description:project.specialSections[1].fullDescription}]} />
                            </div>
                        )
                    }
                </div>
            </div>

            {/* DETAILS SECTION */}
            <div className="relative mt-10 lg:mt-0">
                <OptimizedImage src={`${BASE_CDN_URL}${project?.gallery?.[5]?.key}`} alt="" className="w-full h-[200px] md:h-[250px] lg:h-300 object-cover"/>
                <OptimizedImage src={`${BASE_CDN_URL}${project?.gallery?.[6]?.key}`} alt="" className="w-full h-[200px] md:h-[250px] lg:h-300 object-cover"/>
                <div className="absolute top-1/2 right-1/2 lg:right-50 transform translate-x-1/2 lg:translate-x-0 -translate-y-1/2 bg-white p-4 md:p-6 lg:p-8 w-[90%] md:w-[80%] lg:w-150">
                    <h4 className="text-[18px] md:text-[22px] lg:text-[25px] font-subtitle text-txt-secondary font-semibold">
                         {project?.specialSections?.[2]?.title}
                    </h4>
                    <p className="mt-3 lg:mt-4 text-[14px] md:text-[16px] lg:text-[18px] text-txt-gray leading-relaxed">
                        {project?.specialSections?.[2]?.shortDescription}
                    </p>
                    {
                        project?.specialSections?.[2]?.isExpandable && (
                            <div className="mt-4">
                                <CustomAccordion data={[{name:'READ MORE', description:project.specialSections[2].fullDescription}]} />
                            </div>
                        )
                    }
                </div>
            </div>

            {/* CONTACT US & TRACKING */}
            <div className="flex justify-center mt-10 lg:mt-20 px-4 lg:px-0">
                <div className="xl:max-w-screen-xl lg:max-w-[900px] flex flex-col lg:flex-row w-full gap-8 lg:gap-30">
                    {/* LEFT - TRACKING */}
                    <div className="flex-basis lg:basis-1/2 order-2 lg:order-1 mb-4">
                        <h1 className="text-[32px] md:text-[48px] lg:text-[60px] font-subtitle text-txt-secondary leading-tight">Theo Dõi Dự Án</h1>
                        <ul className="mt-8 lg:mt-15">
                            <li className="text-[18px] md:text-[22px] lg:text-[25px] mt-8 lg:mt-15">
                                <p className="font-subtitle font-semibold">Brochure</p>
                                <LocalizedLink to={`/view-brochure/${project._id}?filter=0`}>
                                    <button className="text-[14px] md:text-[16px] lg:text-[18px] border border-txt-gray text-txt-gray px-4 py-2 mt-3 lg:mt-4 w-full lg:w-auto">
                                        READ MORE
                                    </button>
                                </LocalizedLink>
                            </li>
                            <li className="text-[18px] md:text-[22px] lg:text-[25px] mt-8 lg:mt-15">
                                <p className="font-subtitle font-semibold">Tiến độ xây dựng</p>
                                <LocalizedLink to={`/view-brochure/${project._id}?filter=1`}>
                                    <button className="text-[14px] md:text-[16px] lg:text-[18px] border border-txt-gray text-txt-gray px-4 py-2 mt-3 lg:mt-4 w-full lg:w-auto">
                                        READ MORE
                                    </button>
                                </LocalizedLink>
                            </li>
                            <li className="text-[18px] md:text-[22px] lg:text-[25px] mt-8 lg:mt-15">
                                <p className="font-subtitle font-semibold">Hình ảnh Concept</p>
                                <LocalizedLink to={`/view-brochure/${project._id}?filter=2`}>
                                    <button className="text-[14px] md:text-[16px] lg:text-[18px] border border-txt-gray text-txt-gray px-4 py-2 mt-3 lg:mt-4 w-full lg:w-auto">
                                        READ MORE
                                    </button>
                                </LocalizedLink>
                            </li>
                        </ul>
                    </div>
                    
                    {/* RIGHT - CONTACT FORM */}
                    <div className="flex-basis lg:basis-1/2 mb-20 lg:mb-40 order-1 lg:order-2">
                        <h1 className="text-[32px] md:text-[48px] lg:text-[60px] font-subtitle text-txt-secondary leading-tight">Liên Hệ Ngay</h1>
                        <div className="mt-6 lg:mt-10 text-[16px] lg:text-[18px]">
                            <div className="flex flex-col">
                                <label htmlFor="firstName" className="mb-2">First Name *</label>
                                <input 
                                    type="text" 
                                    id="firstName"
                                    placeholder="First Name" 
                                    className="border p-3 md:p-4 border-txt-gray outline-none rounded-md"
                                />
                            </div>
                            <div className="flex flex-col mt-6 lg:mt-10">
                                <label htmlFor="lastName" className="mb-2">Last Name *</label>
                                <input 
                                    type="text" 
                                    id="lastName"
                                    placeholder="Last Name" 
                                    className="border p-3 md:p-4 border-txt-gray outline-none rounded-md"
                                />
                            </div>
                            <div className="flex flex-col mt-6 lg:mt-10">
                                <label htmlFor="email" className="mb-2">Email *</label>
                                <input 
                                    type="email" 
                                    id="email"
                                    placeholder="Email" 
                                    className="border p-3 md:p-4 border-txt-gray outline-none rounded-md"
                                />
                            </div>
                            <div className="flex flex-col mt-6 lg:mt-10">
                                <label htmlFor="phone" className="mb-2">Phone *</label>
                                <input 
                                    type="tel" 
                                    id="phone"
                                    placeholder="Phone" 
                                    className="border p-3 md:p-4 border-txt-gray outline-none rounded-md"
                                />
                            </div>
                            <button className="cursor-pointer mt-8 lg:mt-10 rounded-md bg-txt-secondary text-white w-full py-3 md:py-4 transition-colors duration-300 text-[16px] md:text-[18px]">
                                GỬI THÔNG TIN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer withContact={false}/>
        </div>
    );
}

export default ProjectDetail;