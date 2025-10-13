import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector} from "react-redux";
import logo from '../../../assets/images/logo.png';
import {setLanguage} from '../../../redux/actions/languageActions';

function Header() {
    const {t,i18n} = useTranslation();
    const dispatch = useDispatch();
    const {language} = useSelector(state=>state.language);
    console.log(language)
    const handleChangeLanguage = (lang) => {
        if (lang === language) return;
        i18n.changeLanguage(lang);
        dispatch(setLanguage(lang));
        localStorage.setItem("language", lang);
        // Điều hướng URL để đồng bộ
        window.location.href = `/${lang}`;
      };
    return ( 
        <div className="bg-bg-primary flex justify-center items-center">
            <div className="container flex items-center justify-between">
                {/* LEFT HEADER */}
                <Link to={'/'}>
                    <img src={logo} alt="" className="w-20" />
                </Link>
                {/* RIGHT HEADER */}
                <div className="flex items-center space-x-4 text-txt-secondary font-medium">
                    <button
                        onClick={() => handleChangeLanguage("en")}
                        className={`relative pb-1 ${
                        language === "en" && 
                        "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-txt-secondary cursor-pointer"}`}
                    >
                        En
                    </button>

                    <span className="text-gray-400">/</span>

                    <button
                        onClick={() => handleChangeLanguage("vi")}
                        className={`relative pb-1 ${
                        language === "vi" && "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-txt-secondary cursor-pointer"}`}
                    >
                        Vi
                    </button>
                </div>
            </div>
        </div>
     );
}

export default Header;