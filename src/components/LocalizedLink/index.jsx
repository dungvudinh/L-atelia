// components/LocalizedLink.js
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function LocalizedLink({ to, children, ...props }) {
  console.log(to)
  const { i18n } = useTranslation();
  const { lng } = useParams();
  
  const currentLanguage = lng || i18n.language;
  
  const localizedTo = to === '/' || to === '' 
    ? `/${currentLanguage}`
    : `/${currentLanguage}${to.startsWith('/') ? to : `/${to}`}`;

  return (
    <Link to={localizedTo} {...props}>
      {children}
    </Link>
  );
}

export function useLocalizedPath() {
  const { i18n } = useTranslation();
  const { lng } = useParams();
  
  const currentLanguage = lng || i18n.language;
  
  return (path) => {
    if (path === '/' || path === '') {
      return `/${currentLanguage}`;
    }
    return `/${currentLanguage}${path.startsWith('/') ? path : `/${path}`}`;
  };
}