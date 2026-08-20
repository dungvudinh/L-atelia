import { useState, useEffect, useRef } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector} from "react-redux";
import { Menu, X } from "lucide-react";
import logo from '../../../assets/images/logo.png';
import {setLanguage} from '../../../redux/actions/languageActions';
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {LocalizedLink} from '../../../components/LocalizedLink';
import { useLocation } from "react-router-dom";
const MENU_ITEMS = [
    {id:1, title:'Dự án', to:'/projects', children: [
        {id:11, title:'Homestay', to:'/properties-for-rent'}
    ]},
    {id:2, title:'media', to:'/media'},
    {id:4, title:'Về chúng tôi', to:'/about'}, 
    {id:6, title:'Liên hệ', to:'/contact'}
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
    const isRentPage = location.pathname.includes('/properties-for-rent');
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

    const textColor = isRentPage || isContactPage || isBrochurePage || isMediaPage || isPastScreen ? "bg-secondary" : "white"
    
    return ( 
        <div className={`bg-transparent flex justify-center items-center fixed top-0 left-0 z-100 w-full
            transition-transform duration-500 ease-in-out
            ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
        >
            <div className="w-full xl:max-w-screen-2xl flex items-center justify-between lg:max-w-[900px] mx-auto pr-4 pl-2 relative pt-2">
                {/* Logo */}
                <LocalizedLink to={'/'} className="flex-1 md:flex-none">
                    <img src={logo} alt="" className="w-16 md:w-20 md:mx-0" />
                </LocalizedLink>

                {/* Mobile menu icon */}
                <div className="md:hidden flex-1 flex justify-end">
                    <button 
                        onClick={toggleMenu}
                        className={`text-black transition-all duration-300 hover:scale-110 space-y-[6px]`}
                    >
                        <div class={`h-[1.5px] w-[27px] transition ease transform duration-500 delay-0 bg-black`} data-menu-line="true"></div>
                        <div class="h-[1.5px] w-[27px] transition ease transform duration-500 delay-0 ml-auto !w-3 bg-black" data-menu-line="true"></div>
                        <div class="h-[1.5px] w-[27px] transition ease transform duration-500 delay-0 bg-black" data-menu-line="true"></div>
                    </button>
                </div>

                {/* Desktop menu */}
                <div className="hidden md:flex">
                    <NavigationMenu.Root>
                        <NavigationMenu.List className={`flex list-none m-0 p-0 transition-colors duration-300 text-${textColor}`}>
                            {MENU_ITEMS.map(menuItem => (
                                <NavigationMenu.Item key={menuItem.id} className="ml-7 relative">
                                    {menuItem.children ? (
                                        <>
                                            <NavigationMenu.Trigger
                                                onClick={() => setCurrentItem(menuItem.id)}
                                                className={`bg-transparent text-[20px] cursor-pointer relative transition-colors duration-300 text-${textColor}
                                                after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-current after:transition-all after:duration-300
                                                ${currentItem === menuItem.id ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}
                                            >
                                            <LocalizedLink to={menuItem.to} >
                                                {t(`${menuItem.title}`)}
                                            </LocalizedLink>
                                            </NavigationMenu.Trigger>

                                            <NavigationMenu.Content
                                                className="absolute top-full left-1/2 -translate-x-1/2 mt-3
                                                bg-black/35 backdrop-blur-md border border-white/20
                                                px-6 py-3 whitespace-nowrap"
                                            >
                                                {menuItem.children.map(child => (
                                                    <NavigationMenu.Link asChild key={child.id}>
                                                        <LocalizedLink
                                                            to={child.to}
                                                            onClick={() => setCurrentItem(menuItem.id)}
                                                            className="block text-[16px] font-light text-[#f0e6de] hover:opacity-70 transition-opacity"
                                                        >
                                                            {t(`${child.title}`)}
                                                        </LocalizedLink>
                                                    </NavigationMenu.Link>
                                                ))}
                                            </NavigationMenu.Content>
                                        </>
                                    ) : (
                                        <LocalizedLink 
                                            to={menuItem.to} 
                                            onClick={() => setCurrentItem(menuItem.id)} 
                                            className={`text-[20px] relative transition-colors duration-300 text-${textColor}
                                            after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-current after:transition-all after:duration-300
                                            ${currentItem === menuItem.id ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}
                                        >
                                            {t(`${menuItem.title}`)}
                                        </LocalizedLink>
                                    )}
                                </NavigationMenu.Item>
                            ))}
                        </NavigationMenu.List>
                    </NavigationMenu.Root>
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