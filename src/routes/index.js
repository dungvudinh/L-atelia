import Landing from '../pages/Landing';
import PropertiesForSale from '../pages/PropertiesForSale';
import routes from '../configs/routes';
import Projectdetail from '../pages/ProjectDetail'
import Projects from '../pages/Projects';
import PropertiesForRent from '../pages/PropertiesForRent'
import Media from '../pages/Media';
import MediaDetail from '../pages/MediaDetail';
import About from '../pages/About';
import Brochure from '../pages/Brochure';
import Contact from '../pages/Contact';

const publicRoutes = [
  {
    path: routes.landingPage,
    component: Landing,
  },
  {
    path: routes.propertiesForSale,
    component: PropertiesForSale,
  },
  // {
  //   path:routes.propertiesForSaleDetail, 
  //   component:PropertyDetail
  // }, 
  {
    path:routes.projects, 
    component:Projects
  }, 
  {
    path:routes.projectDetail, 
    component:Projectdetail
  },
  {
    path: routes.propertiesForRent,
    component: PropertiesForRent,
  },
  {
    path:routes.media,
    component:Media  
  }, 
  {
    path:routes.mediaDetail, 
    component:MediaDetail
  }, 
  {
    path:routes.about, 
    component:About
  }, 
  {
    path:routes.brochure, 
    component:Brochure
  }, 
  {
    path:routes.propertiesForRentDetail,
    component:PropertiesForRent
  }, 
  {
    path:routes.contact, 
    component:Contact
  }
];

export { publicRoutes };
