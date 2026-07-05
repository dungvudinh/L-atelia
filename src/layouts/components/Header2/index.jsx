import { useState, useEffect, useRef } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector} from "react-redux";
import { Menu, X } from "lucide-react";
import logo from '../../../assets/images/logo.png';
import {setLanguage} from '../../../redux/actions/languageActions';
import {LocalizedLink} from '../../../components/LocalizedLink';
import { useLocation } from "react-router-dom";
const MENU_ITEMS = [
    {id:1, title:'projects', to:'/projects'},
    {id:2, title:'media', to:'/media'},
    // {id:3, title:'properties for rent', to:'/properties-for-rent'}, 
    {id:4, title:'about us', to:'/about'}, 
    // {id:5, title:'media', to:'/media'}, 
    {id:6, title:'contact', to:'/contact'}
]

function Header() {
    const location = useLocation();
    const {t,i18n} = useTranslation('header');
    const dispatch = useDispatch();
    const {language} = useSelector(state=>state.language);
    const [currentItem, setCurrentItem] = useState();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);   // hiện/ẩn header
    const [isPastScreen, setIsPastScreen] = useState(false); // đã cuộn qua 1 màn hình chưa
    const lastScrollY = useRef(0);
    const isContactPage = location.pathname.includes('/contact')
    const isBrochurePage = location.pathname.includes('/view-brochure');
    const isMediaPage = location.pathname.includes('/media');
    const isHomePage = location.pathname === '/vi' || location.pathname === '/en' || location.pathname === '/';
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const screenHeight = window.innerHeight;
            // Ẩn khi cuộn xuống, hiện khi cuộn lên
            if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }

            // Đổi màu chữ theo vị trí cuộn
            setIsPastScreen(currentScrollY > screenHeight)

            lastScrollY.current = currentScrollY
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleMenuItemClick = (menuItemId) => {
        setCurrentItem(menuItemId);
        setIsMenuOpen(false);
    };
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const screenHeight = window.innerHeight;
    
            if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
                // Cuộn xuống → ẩn
                setIsVisible(false)
            } else {
                // Cuộn lên → ẩn nếu homepage gần top, ngược lại hiện
                if (isHomePage && currentScrollY <= 20) {
                    setIsVisible(false)
                } else {
                    setIsVisible(true)
                }
            }
    
            setIsPastScreen(currentScrollY > screenHeight)
            lastScrollY.current = currentScrollY
        }
    
        // Set trạng thái ban đầu khi mount
        if (isHomePage && window.scrollY <= 20) {
            setIsVisible(false)
        }
    
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [isHomePage])
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) setIsMenuOpen(false);
    };

    const textColor = isContactPage || isBrochurePage || isMediaPage || isPastScreen ? "text-bg-secondary" : "text-white"
    
    return ( 
        <div className={`bg-transparent flex justify-center items-center fixed top-0 left-0 z-100 w-full
            transition-transform duration-500 ease-in-out
            ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
        >
            <div className="w-full xl:max-w-screen-2xl flex items-center justify-between lg:max-w-[900px] mx-auto !px-4 md:px-0">
                {/* Logo */}
                <Link to={'/'} className="flex-1 md:flex-none">
                    <img src={logo} alt="" className="w-16 md:w-20 md:mx-0" />
                </Link>

                {/* Mobile menu icon */}
                <div className="md:hidden flex-1 flex justify-end">
                    <button 
                        onClick={toggleMenu}
                        className={`${textColor} p-2 transition-all duration-300 hover:scale-110`}
                    >
                        {isMenuOpen ? (
                            <X size={24} className="rotate-90 transition-all duration-300" />
                        ) : (
                            <Menu size={24} className="transition-all duration-300" />
                        )}
                    </button>
                </div>

                {/* Desktop menu */}
                <div className="hidden md:flex">
                    <ul className={`flex transition-colors duration-300 ${textColor}`}>
                        {MENU_ITEMS.map(menuItem => (
                            <li key={menuItem.id} className={`ml-7 cursor-pointer relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 
                                ${currentItem === menuItem.id ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}>
                                <LocalizedLink 
                                    to={menuItem.to} 
                                    onClick={() => setCurrentItem(menuItem.id)} 
                                    className={`text-[20px] transition-colors duration-300 ${textColor}`}
                                >
                                    {t(`${menuItem.title}`)}
                                </LocalizedLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile overlay */}
                <div 
                    className={`md:hidden fixed top-0 left-0 w-full h-screen bg-bg-primary z-50 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
                        isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
                    }`}
                    onClick={handleBackdropClick}
                >
                    <button 
                        onClick={toggleMenu}
                        className="absolute top-6 right-6 text-txt-secondary p-2 transition-all duration-300 hover:rotate-90 hover:scale-110"
                    >
                        <X size={24} />
                    </button>

                    <div className={`absolute top-6 left-6 transition-all duration-700 delay-100 ${
                        isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}>
                        <img src={logo} alt="" className="w-16" />
                    </div>

                    <ul className="text-txt-secondary flex flex-col items-center space-y-8">
                        {MENU_ITEMS.map((menuItem, index) => (
                            <li 
                                key={menuItem.id} 
                                className={`cursor-pointer transition-all duration-500 ease-out ${
                                    isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}
                                style={{ transitionDelay: isMenuOpen ? `${index * 100 + 200}ms` : '0ms' }}
                            >
                                <LocalizedLink 
                                    to={menuItem.to} 
                                    onClick={() => handleMenuItemClick(menuItem.id)} 
                                    className="text-[24px] font-medium relative group"
                                >
                                    {t(`${menuItem.title}`)}
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-txt-secondary transition-all duration-300 group-hover:w-full"></span>
                                </LocalizedLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
     );
}
export default Header;