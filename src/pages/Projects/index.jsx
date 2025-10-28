import project1 from '../../assets/images/projects/project1.png'
import Footer from '../../layouts/components/Footer';
import { LocalizedLink } from '../../components/LocalizedLink';
const IMAGES = [
    { id: 1, src: '../../assets/images/projects/project1.png', alt: "Project 1", title: "Modern Villa" },
    { id: 2, src: '../../assets/images/projects/project2.png', alt: "Project 2", title: "Luxury Apartment" },
    { id: 3, src: '../../assets/images/projects/project3.png', alt: "Project 3", title: "Office Building" },
    { id: 4, src: '../../assets/images/projects/project4.png', alt: "Project 4", title: "Restaurant Design" },
    { id: 5, src: '../../assets/images/projects/project5.png', alt: "Project 5", title: "Hotel Resort" },
    { id: 6, src: '../../assets/images/projects/project6.png', alt: "Project 6", title: "Beach House" },
    { id: 7, src: '../../assets/images/projects/project7.png', alt: "Project 6", title: "Beach House" },
    { id: 8, src: '../../assets/images/projects/project8.png', alt: "Project 6", title: "Beach House" },
];
function Projects() {
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
                        {IMAGES.map((image) => (
                            <div key={image.id} className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300
                            cursor-pointer">
                                <LocalizedLink to={`/projects/${image.title}/view-brochure`}>
                                    <img 
                                        src={project1} 
                                        alt={image.alt}
                                        className="w-full h-100 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <button className='absolute right-5 bg-txt-secondary top-5 p-2 text-white text-[18px]'>FOR RENT</button>
                                </LocalizedLink>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer withContact={false}/>
        </div>
     );
}

export default Projects;