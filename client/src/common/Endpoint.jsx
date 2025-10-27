const BaseUrl = import.meta.env.VITE_API_URL;

export const Endpoints = {
  register: {
    url: `${BaseUrl}/api/user/register_User`,
  },
  login: {
    url: `${BaseUrl}/api/user/login`,
  },
  forget_password: {
    url: `${BaseUrl}/api/user/forget-password`,
  },
  OTP_Verification: {
    url: `${BaseUrl}/api/user/verify-forgetpassword`,
  },
  Reset_password: {
    url: `${BaseUrl}/api/user/rest-password`,
  },
  Refresh_token: {
    url: `${BaseUrl}/api/user/Resfresh-token`,
  },
  userDetails: {
    url: `${BaseUrl}/api/user/userDetails`,
  },
  logout: {
    url: `${BaseUrl}/api/user/logout`,
  },
  upload_Image: {
    url: `${BaseUrl}/api/user/upload_Image`,
  },
  update_userDetails: {
    url: `${BaseUrl}/api/user/user_details`,
  },
  Addcategory: {
    url: `${BaseUrl}/api/category/addcategory`,
  },
  uploadedImage: {
    url: `${BaseUrl}/api/category/uploadImage`,
  },
  Getcategories: {
    url: `${BaseUrl}/api/category/Getcategories`,
  },
  updatecategory: {
    url: `${BaseUrl}/api/category/updatecategory`,
  },
  Deletecategory: {
    url: `${BaseUrl}/api/category/Deletecategory`,
  },

  ///Subcategory
  uploadimage: {
    url: `${BaseUrl}/api/subcategory/uploadimage`,
  },
  AddSubcategory: {
    url: `${BaseUrl}/api/subcategory/AddSubcategory`,
  },

  GetallSubcategory: {
    url: `${BaseUrl}/api/subcategory/GetallSubcategory`,
  },
  updateSubcategory: {
    url: `${BaseUrl}/api/subcategory/updateSubcategory`,
  },
  DeleteSubcategory: {
    url: `${BaseUrl}/api/subcategory/DeleteSubcategory`,
  },
  //product
  UploadImageproduct: {
    url: `${BaseUrl}/api/product/UploadImageproduct`,
  },
  createproduct: {
    url: `${BaseUrl}/api/product/createproduct`,
  },
  getallproduct: {
    url: `${BaseUrl}/api/product/getallproduct`,
  },
  getallproductsbycategory: {
    url: `${BaseUrl}/api/product/getallproductsbycategory`,
  },
  getproductbycategoryandsubcategory: {
    url: `${BaseUrl}/api/product/getproductbycategoryandsubcategory`,
  },
  getproductDetails: {
    url: `${BaseUrl}/api/product/getproductDetails`,
  },
  updateproduct: {
    url: `${BaseUrl}/api/product/updateproduct`,
  },
  Deleteproduct: {
    url: `${BaseUrl}/api/product/Deleteproduct`,
  },
  getproductsearch: {
    url: `${BaseUrl}/api/product/getproductsearch`,
  },

  //cart
  Addtocart: {
    url: `${BaseUrl}/api/cart/create`,
  },
  getallfromcart: {
    url: `${BaseUrl}/api/cart/getallfromcart`,
  },
  updatecartquantity: {
    url: `${BaseUrl}/api/cart/updatecartquantity`,
  },
  deletedproductfromcart: {
    url: `${BaseUrl}/api/cart/deletedproductfromcart`,
  },

  //address

  AddnewAddress: {
    url: `${BaseUrl}/api/address/add`,
  },
  getAddress: {
    url: `${BaseUrl}/api/address/get`,
  },

  editAddress: {
    url: `${BaseUrl}/api/address/update`,
  },
  deltedAddress: {
    url: `${BaseUrl}/api/address/delete`,
  },

  ///order
  PaymentCash: {
    url: `${BaseUrl}/api/order/PaymentCash`,
  },
  Paymentonline: {
    url: `${BaseUrl}/api/order/Paymentonline`,
  },
  getorders: {
    url: `${BaseUrl}/api/order/getorders`,
  },
  
};
