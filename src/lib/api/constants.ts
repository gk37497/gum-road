export const endpoints = {
   // Auth
   login: '/auth/login',
   register: '/auth/register',

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

   // Checkout
   'checkout-product': '/create-invoice',
   'checkout-affliate': '/create-invoice/affiliate',
   'check-invoice': '/qpay/check/transaction'
};
