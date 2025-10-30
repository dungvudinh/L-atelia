import { Routes, Route, Navigate, useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import MainLayout from "./layouts/MainLayout";
import { publicRoutes } from "./routes/index";

// 🧩 Tự động chuyển hướng theo ngôn ngữ trình duyệt khi vào "/"
function LanguageRedirect() {
  const userLang = navigator.language.startsWith("vi") ? "vi" : "en";
  return <Navigate to={`/en`} replace />;
}

// 🧩 Đồng bộ i18n khi URL thay đổi (/:lng)
function LanguageSync({ children }) {
  const { lng } = useParams();
  const { i18n } = useTranslation();
  const { language } = useSelector((state) => state.language);

  // Nếu URL có ngôn ngữ → ưu tiên dùng nó
  useEffect(() => {
    if (lng && i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  // Nếu Redux thay đổi → cập nhật và lưu localStorage
  useEffect(() => {
      if (language && i18n.language !== language) {
        i18n.changeLanguage(language);
        localStorage.setItem("language", language);
      }
    }, [language, i18n]);

    return children;
  }


// 🧩 Component để xử lý routing với ngôn ngữ
function LocalizedRoutes() {
  const { lng } = useParams();

  return (
    
    <Routes>
      {publicRoutes.map((route, index) => {
        const Page = route.component;
        const Layout = route.layout === null
          ? ({ children }) => <>{children}</>
          : route.layout || MainLayout;
        
        // Tạo path với prefix ngôn ngữ
        const localizedPath = route.path === '' 
          ? '' // Trang chủ không cần thêm path
          : `${route.path}`; // Bỏ /* vì chúng ta sẽ xử lý nested routes riêng
        
        return (
          <Route
            key={index}
            path={localizedPath}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        );
      })}
      
      {/* Redirect từ /:lng đến /:lng/ (trang chủ) */}
      <Route 
        path="" 
        element={<Navigate to={`/${lng}`} replace />} 
      />
    </Routes>
  );
}

// 🧩 App chính
export default function App() {
  // const location= useLocation();
  // useEffect(()=>
  // {
  //   window.scrollTo(0,0);
  // }, [location.pathname])
  return (
    <Routes>
      {/* Nếu người dùng vào "/" → tự chuyển hướng */}
      <Route path="/" element={<LanguageRedirect />} />

      {/* Các route có prefix ngôn ngữ */}
      <Route
        path="/:lng/*"
        element={
          <LanguageSync>
            <LocalizedRoutes />
          </LanguageSync>
        }
      />
    </Routes>
  );
}