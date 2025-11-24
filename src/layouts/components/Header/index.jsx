import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector} from "react-redux";
import { Menu, X } from "lucide-react";
import logo from '../../../assets/images/logo.png';
import {setLanguage} from '../../../redux/actions/languageActions';
import {LocalizedLink} from '../../../components/LocalizedLink';

const MENU_ITEMS = [
    {id:1, title:'projects', to:'/projects'},
    // {id:2, title:'properties for sale', to:'/properties-for-sale'}, 
    {id:3, title:'properties for rent', to:'/properties-for-rent'}, 
    {id:4, title:'about us', to:'/about'}, 
    {id:5, title:'media', to:'/media'}, 
    {id:6, title:'contact', to:'/contact'}
]

function Header() {
    const {t,i18n} = useTranslation('header');
    const dispatch = useDispatch();
    const {language} = useSelector(state=>state.language);
    const [currentItem, setCurrentItem] = useState();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleChangeLanguage = (lang) => {
        if (lang === language) return;
        
        // Thay đổi ngôn ngữ trong state và i18n
        i18n.changeLanguage(lang);
        dispatch(setLanguage(lang));
        localStorage.setItem("language", lang);
        
        // Lấy path hiện tại (loại bỏ phần ngôn ngữ)
        const currentPath = location.pathname;
        
        // Tách path để lấy phần sau ngôn ngữ (bao gồm cả nested paths)
        const pathWithoutLang = currentPath.replace(/^\/(en|vi)/, '') || '/';
        
        // Chuyển đến cùng path với ngôn ngữ mới
        navigate(`/${lang}${pathWithoutLang}`, { replace: true });
    };

    const handleMenuItemClick = (menuItemId) => {
        setCurrentItem(menuItemId);
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Đóng menu khi click ra ngoài (optional)
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsMenuOpen(false);
        }
    };
    
    return ( 
        <div className="bg-bg-primary flex justify-center items-center fixed top-0 left-0 z-100 w-full">
            <div className="w-full xl:max-w-screen-xl flex items-center justify-between lg:max-w-[900px] mx-auto px-4 md:px-0">
                {/* LEFT HEADER - Logo */}
                <Link to={'/'} className="flex-1 md:flex-none">
                    <img src={logo} alt="" className="w-16 md:w-20  md:mx-0" />
                </Link>

                {/* MOBILE MENU ICON */}
                <div className="md:hidden flex-1 flex justify-end">
                    <button 
                        onClick={toggleMenu}
                        className="text-txt-secondary p-2 transition-transform duration-300 hover:scale-110"
                    >
                        {isMenuOpen ? (
                            <X size={24} className="rotate-90 transition-all duration-300" />
                        ) : (
                            <Menu size={24} className="transition-all duration-300" />
                        )}
                    </button>
                </div>

                {/* RIGHT HEADER - Menu Items */}
                <div className="hidden md:flex">
                    <ul className="text-txt-secondary flex">
                        {
                            MENU_ITEMS.map(menuItem=>(
                                <li key={menuItem.id} className={`ml-7 cursor-pointer relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 
                                    ${currentItem === menuItem.id ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`} >
                                        <LocalizedLink 
                                            to={menuItem.to} 
                                            onClick={()=>setCurrentItem(menuItem.id)} 
                                            className="text-[18px]"
                                        >
                                            {t(`${menuItem.title}`)}
                                        </LocalizedLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                {/* MOBILE MENU OVERLAY */}
                <div 
                    className={`md:hidden fixed top-0 left-0 w-full h-screen bg-bg-primary z-50 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
                        isMenuOpen 
                            ? 'opacity-100 visible translate-y-0' 
                            : 'opacity-0 invisible -translate-y-4'
                    }`}
                    onClick={handleBackdropClick}
                >
                    {/* Close Button với hiệu ứng */}
                    <button 
                        onClick={toggleMenu}
                        className="absolute top-6 right-6 text-txt-secondary p-2 transition-all duration-300 hover:rotate-90 hover:scale-110"
                    >
                        <X size={24} />
                    </button>

                    {/* Logo trong menu với hiệu ứng */}
                    <div className={`absolute top-6 left-6 transition-all duration-700 delay-100 ${
                        isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}>
                        <img src={logo} alt="" className="w-16" />
                    </div>

                    {/* Mobile Menu Items với hiệu ứng xuất hiện từng item */}
                    <ul className="text-txt-secondary flex flex-col items-center space-y-8">
                        {MENU_ITEMS.map((menuItem, index) => (
                            <li 
                                key={menuItem.id} 
                                className={`cursor-pointer transition-all duration-500 ease-out ${
                                    isMenuOpen 
                                        ? 'opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-4'
                                }`}
                                style={{
                                    transitionDelay: isMenuOpen ? `${index * 100 + 200}ms` : '0ms'
                                }}
                            >
                                <LocalizedLink 
                                    to={menuItem.to} 
                                    onClick={() => handleMenuItemClick(menuItem.id)} 
                                    className="text-[24px] font-medium relative group"
                                >
                                    {t(`${menuItem.title}`)}
                                    {/* Hiệu ứng underline khi hover trên mobile */}
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-txt-secondary transition-all duration-300 group-hover:w-full"></span>
                                </LocalizedLink>
                            </li>
                        ))}
                    </ul>

                    {/* Language Switcher với hiệu ứng (optional) */}
                    {/* <div className={`flex items-center space-x-4 text-txt-secondary font-medium mt-8 transition-all duration-500 delay-700 ${
                        isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                        <button
                            onClick={() => handleChangeLanguage("en")}
                            className={`relative pb-1 ${
                            language === "en" && 
                            "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-txt-secondary"} cursor-pointer text-[18px]`}
                        >
                            En
                        </button>

                        <span className="text-gray-400">/</span>

                        <button
                            onClick={() => handleChangeLanguage("vi")}
                            className={`relative pb-1 ${
                            language === "vi" && "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-txt-secondary"} cursor-pointer text-[18px]`}
                        >
                            Vie
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
     );
}

export default Header;