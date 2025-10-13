import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import {setLanguage} from './redux/actions/languageActions';
import { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import {publicRoutes} from './routes';
import MainLayout from './layouts/MainLayout';
function App() {
  // const {t, i18n} = useTranslation();
  // const dispatch = useDispatch();
  // const {language} = useSelector(state=>state.language);
  // useEffect(()=>
  // {
  //   i18n.changeLanguage(language);
  //   localStorage.setItem('language', language);
  // },[language, i18n])
  // const changeLanguage = (lang)=>{
  //   dispatch(setLanguage(lang))
  // }
  return (
    <>
      <Routes>
        {
          publicRoutes.map((route, index)=>{
            const Page = route.component;
            let Layout = route.layout || MainLayout;
            if(route.layout === null)
              Layout = ({children})=><>{children}</>
            return <Route key={index} path={route.path} element={<Layout><Page /></Layout>}/>
          })
        }
      </Routes>
    </>
    // <div>
    //   <h1 className="text-3xl font-bold underline text-red">
    //     {t('welcome')}
    //   </h1>
    //   <button
    //     onClick={() => changeLanguage("en")}
    //     className={`px-4 py-2 mx-2 rounded ${
    //       language === "en" ? "bg-blue-600 text-white" : "bg-gray-200"
    //     }`}
    //   >
    //     English
    //   </button>

    //   <button
    //     onClick={() => changeLanguage("vi")}
    //     className={`px-4 py-2 mx-2 rounded ${
    //       language === "vi" ? "bg-green-600 text-white" : "bg-gray-200"
    //     }`}
    //   >
    //     Tiếng Việt
    //   </button>
    // </div>
    )
}

export default App
