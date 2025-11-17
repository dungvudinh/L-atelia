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
            <div className="mt-20 flex justify-center items-center min-h-screen">
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
            <div className="mt-20 flex justify-center items-center min-h-screen">
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
            <div className="mt-20 flex justify-center items-center min-h-screen">
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
    console.log('📊 Project data to render:', project);

    return (
        <div className="mt-20">
            {/* BANNER */}
            <div className="w-full h-[840px] relative">
                <OptimizedImage 
                    src={project && project.heroImage.url} 
                    alt="" 
                    className="object-cover w-full h-full object-[25%_75%] filter brightness-75"
                />
                <div className="absolute left-1/2 -translate-x-1/2  top-[50%] text-bg-primary">
                    <h1 className="font-subtitle text-[60px]">FOR SALE</h1>
                    <LocalizedLink to={`/view-brochure/${project._id}?filter=0`}>
                        <button className="border  border-bg-primary px-4 py-2 w-full flex justify-between 
                            text-[18px] uppercase transition-all duration-300 cursor-pointer hover:bg-txt-secondary hover:text-bg-primary hover:border-txt-secondary">
                            VIEW BROCHURE
                            <ArrowRight  />
                        </button>
                    </LocalizedLink>
                </div>
            </div>
            
            {/* Project Details */}
            <div className="flex justify-center mt-20">
                <div className="flex xl:max-w-screen-xl lg:max-w-[900px] gap-20">
                    {/* LEFT */}
                    <div className="flex-basis basis-1/2 mt-7">
                        <h1 className="text-[60px] text-txt-secondary font-subtitle">
                            {project.title || 'Patiki Townhouse'}
                        </h1>
                        <p className="mt-10 text-[22px]">
                            {project.description || 'An architectural gem immaculately restored and modernized from its 1896 creation with no compromise on luxury. The mission in reforming the historic mansion was to create a home with an uncompromised year round living experience, while ensuring the heritage not only lived on but enhanced its lavish style.'}
                        </p>
                    </div>
                    {/* RIGHT */}
                    <div className="flex-basis basis-1/2">
                        <OptimizedImage 
                            src={project && project.gallery[0].url} 
                            alt={project.title} 
                        />
                    </div>
                </div>
            </div>

            {/* PROPERTY FEATURES */}
            <div className="bg-bg-primary mt-20 flex justify-center">
                <div className="xl:max-w-screen-xl lg:max-w-[900px] mt-20 w-full">
                    <ul className="flex justify-start">
                        <li className="mr-30">
                            <h4 className="text-[25px] font-subtitle text-txt-secondary font-semibold">PROPERTY FEATURES</h4>
                            <p className="flex flex-col text-[18px] mt-4 text-txt-gray">
                                {
                                    project?.propertyFeatures.length > 0 && project.propertyFeatures.map(propertyFeature=>(
                                        <span key={propertyFeature._id}>{propertyFeature.text}</span>
                                    ))
                                }
                            </p>
                        </li>
                        <li className="mr-30">
                            <h4 className="text-[25px] font-subtitle text-txt-secondary font-semibold">SPECIFICATION</h4>
                            <p className="flex flex-col text-[18px] mt-4 text-txt-gray">
                                {
                                    project?.specifications.length > 0 && project.specifications.map(specification=>(
                                        <span key={specification._id}>{specification.text}</span>
                                    ))
                                }
                            </p>
                        </li>
                        <li>
                            <h4 className="text-[25px] font-subtitle text-txt-secondary font-semibold">LOCATION</h4>
                            <p className="flex flex-col text-[18px] mt-4 text-txt-gray">
                                <span >{project?.location}</span>
                            </p>
                        </li>
                    </ul>
                    <div className="mt-20 flex gap-20">
                        {/* LEFT */}
                        <div className="flex-basis basis-1/2">
                            <h4 className="text-[25px] font-subtitle text-txt-secondary font-semibold">{project?.propertyHighlights.length > 0 && project.propertyHighlights[0].title}</h4>
                            <p className="mt-10 text-txt-gray text-[26px]">
                            {project?.propertyHighlights.length > 0 && project.propertyHighlights[0].description}
                            </p>
                            {
                                project?.propertyHighlights[0]?.featureSections.length > 0 && (
                                    <CustomAccordion data={project.propertyHighlights[0].featureSections}/>
                                )
                            }
                        </div>
                        {/* RIGHT */}
                        <div className="flex-basis basis-1/2 h-150">
                            <OptimizedImage src={project?.gallery[1]?.src} alt="" className="h-full w-full"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* ARCHITECTURE SECTION */}
            <div className="relative">
                <OptimizedImage src={project?.gallery[2]?.url} alt="" className="w-full h-300"/>
                <OptimizedImage src={project?.gallery[3]?.url} alt="" className="w-full h-300"/>
                <div className="absolute top-1/2 left-50 bg-white p-8 w-150 -translate-y-1/2">
                    <h4 className="text-[25px] font-subtitle text-txt-secondary">
                        SPECTACULAR ARCHITECTURE
                    </h4>
                    <p className="mt-4 text-[18px] text-txt-gray">
                        {project?.specialSections[0].shortDescription}
                    </p>
                    {
                        project?.specialSections[0]?.isExpandable && (
                            <CustomAccordion data={[{name:'READ MORE', description:project.specialSections[0].fullDescription}]} />
                        )
                    }
                </div>
            </div>

            {/* HISTORY SECTION */}
            <div className="flex">
                <div className="flex-basis basis-1/2">
                    <OptimizedImage src={project?.gallery[4]} alt="" />
                </div>
                <div className="p-20 flex-basis basis-1/2">
                    <h4 className="text-[25px] font-subtitle text-txt-secondary font-semibold">THE HISTORY</h4>
                    <p className="mt-4 text-[18px] text-txt-gray">
                        {project?.specialSections[1].shortDescription}
                    </p>
                    {
                        project?.specialSections[1]?.isExpandable && (
                            <CustomAccordion data={[{name:'READ MORE', description:project.specialSections[1].fullDescription}]} />
                        )
                    }
                </div>
            </div>

            {/* DETAILS SECTION */}
            <div className="relative">
                <OptimizedImage src={project?.gallery[5]} alt="" className="w-full h-300"/>
                <OptimizedImage src={project?.gallery[6]} alt="" className="w-full h-300"/>
                <div className="absolute top-1/2 right-50 bg-white p-8 w-150 -translate-y-1/2">
                    <h4 className="text-[25px] font-subtitle text-txt-secondary">
                        IMMACULATE DETAILS
                    </h4>
                    <p className="mt-4 text-[18px] text-txt-gray">
                        {project?.specialSections[2].shortDescription}
                    </p>
                    {
                        project?.specialSections[2]?.isExpandable && (
                            <CustomAccordion data={[{name:'READ MORE', description:project.specialSections[2].fullDescription}]} />
                        )
                    }
                </div>
            </div>

            {/* CONTACT US & TRACKING */}
            <div className="flex justify-center mt-20">
                <div className="xl:max-w-screen-xl lg:max-w-[900px] flex w-full gap-30">
                    {/* LEFT - TRACKING */}
                    <div className="flex-basis basis-1/2">
                        <h1 className="text-[60px] font-subtitle text-txt-secondary">Tracking Your Project</h1>
                        <ul>
                            <li className="text-[25px] mt-15">
                                <p className="font-subtitle font-semibold">Brochure</p>
                                <LocalizedLink to={`/projects/brochure/view-brochure/${project.id}?filter=0`}>
                                    <button className="text-[18px] border border-txt-gray text-txt-gray px-4 py-2 mt-4">
                                        READ MORE
                                    </button>
                                </LocalizedLink>
                            </li>
                            <li className="text-[25px] mt-15">
                                <p className="font-subtitle font-semibold">Current State Photos</p>
                                <LocalizedLink to={`/projects/current-state-photos/view-brochure/${project.id}?filter=1`}>
                                    <button className="text-[18px] border border-txt-gray text-txt-gray px-4 py-2 mt-4">
                                        READ MORE
                                    </button>
                                </LocalizedLink>
                            </li>
                            <li className="text-[25px] mt-15">
                                <p className="font-subtitle font-semibold">Renders Showing Potential</p>
                                <LocalizedLink to={`/projects/renders-showing-potential/view-brochure/${project.id}?filter=2`}>
                                    <button className="text-[18px] border border-txt-gray text-txt-gray px-4 py-2 mt-4">
                                        READ MORE
                                    </button>
                                </LocalizedLink>
                            </li>
                        </ul>
                    </div>
                    
                    {/* RIGHT - CONTACT FORM */}
                    <div className="flex-basis basis-1/2 mb-40">
                        <h1 className="text-[60px] font-subtitle text-txt-secondary">Contact Us</h1>
                        <div className="mt-10 text-[18px]">
                            <div className="flex flex-col">
                                <label htmlFor="firstName" className="mb-2">First Name *</label>
                                <input 
                                    type="text" 
                                    id="firstName"
                                    placeholder="First Name" 
                                    className="border p-4 border-txt-gray outline-none rounded-md"
                                />
                            </div>
                            <div className="flex flex-col mt-10">
                                <label htmlFor="lastName" className="mb-2">Last Name *</label>
                                <input 
                                    type="text" 
                                    id="lastName"
                                    placeholder="Last Name" 
                                    className="border p-4 border-txt-gray outline-none rounded-md"
                                />
                            </div>
                            <div className="flex flex-col mt-10">
                                <label htmlFor="email" className="mb-2">Email *</label>
                                <input 
                                    type="email" 
                                    id="email"
                                    placeholder="Email" 
                                    className="border p-4 border-txt-gray outline-none rounded-md"
                                />
                            </div>
                            <div className="flex flex-col mt-10">
                                <label htmlFor="phone" className="mb-2">Phone *</label>
                                <input 
                                    type="tel" 
                                    id="phone"
                                    placeholder="Phone" 
                                    className="border p-4 border-txt-gray outline-none rounded-md"
                                />
                            </div>
                            <button className="mt-10 rounded-md bg-txt-secondary text-white w-full py-4 hover:bg-blue-700 transition-colors duration-300">
                                SUBMIT MESSAGE
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