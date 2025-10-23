import Landing from '../pages/Landing';
import PropertiesForSale from '../pages/PropertiesForSale';
import routes from '../configs/routes';
import PropertyDetail from '../pages/PropertyDetail';
import Projects from '../pages/Projects';
import PropertiesForRent from '../pages/PropertiesForRent'
import Media from '../pages/Media';
import MediaDetail from '../pages/MediaDetail';

const publicRoutes = [
  {
    path: routes.landingPage,
    component: Landing,
  },
  {
    path: routes.propertiesForSale,
    component: PropertiesForSale,
  },
  {
    path:routes.propertiesForSaleDetail, 
    component:PropertyDetail
  }, 
  {
    path:routes.projects, 
    component:Projects
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
  }
];

export { publicRoutes };
