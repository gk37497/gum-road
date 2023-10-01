export const endpoints = {
   // Auth
   login: '/auth/login',
   googleLogin: '/auth/google',
   register: '/auth/signup',
   sendOTP: '/otp/send',
   forgotPassword: '/auth/forgot-password',
   resetPassword: '/auth/password-reset',
   refreshToken: '/auth/refresh-token',
   checkEmail: '/auth/signup/token',

   // Products
   product: '/product',
   upload: '/image/upload',
   'product-get-by-id': '/product/store/uid',

   // Merchant
   'merchant-list': '/merchant/list',
   // :id
   'merchant-product-list': '/product/store',

   // Affiliate
   affiliate: '/affiliate',
   'affliate-list': '/affiliate/merchant',
   'affliate-list-own': '/affiliate/own',
   'affiliate-by-id': '/affiliate/uid',
   'affiliate-by-merchant': '/affiliate/list/uid',

   // Checkout
   'checkout-product': '/create-invoice',
   'checkout-affliate': '/create-invoice/affiliate',
   'check-invoice': '/qpay/check/transaction',

   // Payouts
   payouts: '/payout',

   // Customer
   customer: '/customer'
};
