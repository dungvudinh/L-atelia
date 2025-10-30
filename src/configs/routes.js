const routes = {
    landingPage: '', // không có '/'
    propertiesForSale: 'properties-for-sale', 
    propertiesForSaleDetail: 'properties-for-sale/:propertyId', // Thêm route cho detail
    projects: 'projects', 
    propertiesForRent:'properties-for-rent', 
    propertiesForRentDetail:'properties-for-rent/:propertyId', 
    media:'media', 
    mediaDetail:'media/:mediaId', 
    about:'about',
    brochure:'view-brochure/:brochureId',
    contact:'/contact'
  };
  
  export default routes;