import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector} from "react-redux";
import logo from '../../../assets/images/logo.png';
import {setLanguage} from '../../../redux/actions/languageActions';
import {LocalizedLink, useLocalizedPath} from '../../../components/LocalizedLink';
const MENU_ITEMS = [
    {id:1, title:'projects', to:'/projects'},
    {id:2, title:'properties for sale', to:'/properties-for-sale'}, 
    {id:3, title:'properties for rent', to:'/properties-for-rent'}, 
    {id:4, title:'about us', to:''}, 
    {id:5, title:'media', to:'/media'}, 
    {id:6, title:'contact', to:''}
]

function Header() {
    const getLocalizedLink = useLocalizedPath();
    const {t,i18n} = useTranslation('header');
    const dispatch = useDispatch();
    const {language} = useSelector(state=>state.language);
    const [currentItem, setCurrentItem] = useState();
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
    
    return ( 
        <div className="bg-bg-primary flex justify-center items-center fixed top-0 left-0 z-50 w-full">
            <div className="w-full xl:max-w-screen-xl flex items-center justify-between md:max-w-screen-md 
            lg:max-w-[900px] mx-auto md:max-w-screen-md">
                {/* LEFT HEADER */}
                <Link to={'/'}>
                    <img src={logo} alt="" className="w-20" />
                </Link>
                {/* RIGHT HEADER */}
                <div className="flex">
                    {/* MENU ITEMS */}
                    <ul className="text-txt-secondary flex mr-10!">
                        {
                            MENU_ITEMS.map(menuItem=>(
                                <li key={menuItem.id} className={`cursor-pointer mr-4 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 
                                    ${currentItem === menuItem.id ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`} onClick={()=>setCurrentItem(menuItem.id)}>
                                        <LocalizedLink to={menuItem.to}>
                                            {t(`${menuItem.title}`)}
                                        </LocalizedLink>
                                </li>
                            ))
                        }
                    </ul>
                    <div className="flex items-center space-x-4 text-txt-secondary font-medium">
                        <button
                            onClick={() => handleChangeLanguage("en")}
                            className={`relative pb-1 ${
                            language === "en" && 
                            "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-txt-secondary"} cursor-pointer`}
                        >
                            En
                        </button>

                        <span className="text-gray-400">/</span>

                        <button
                            onClick={() => handleChangeLanguage("vi")}
                            className={`relative pb-1 ${
                            language === "vi" && "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-txt-secondary"} cursor-pointer`}
                        >
                            Vie
                        </button>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Header;