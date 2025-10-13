import { useTranslation } from "react-i18next";
function Landing() {
    const {t} = useTranslation();
    return ( 
        <div>{t('welcome')}</div>
     );
}

export default Landing;