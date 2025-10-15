import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector} from "react-redux";
import logo from '../../../assets/images/logo.png';
import {setLanguage} from '../../../redux/actions/languageActions';

const MENU_ITEMS = [
    {id:1, title:'projects', to:''},
    {id:2, title:'properties for sale', to:''}, 
    {id:3, title:'about us', to:''}, 
    {id:4, title:'media', to:''}, 
    {id:5, title:'contact', to:''}
]

function Header() {
    const {t,i18n} = useTranslation('header');
    const dispatch = useDispatch();
    const {language} = useSelector(state=>state.language);
    const [currentItem, setCurrentItem] = useState();
    const handleChangeLanguage = (lang) => {
        if (lang === language) return;
        i18n.changeLanguage(lang);
        dispatch(setLanguage(lang));
        localStorage.setItem("language", lang);
        window.location.href = `/${lang}`;
      };
    
    return ( 
        <div className="bg-bg-primary flex justify-center items-center fixed top-0 left-0 z-50 w-full">
            <div className="w-full max-w-screen-xl flex items-center justify-between">
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
                                    {t(`${menuItem.title}`)}
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
                            Vi
                        </button>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Header;