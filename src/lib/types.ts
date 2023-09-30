export interface APIResponse<T> {
   success: boolean;
   message: string;
   body?: T;
}

export interface LoginResponseBody {
   accessToken: string;
   refreshToken: string;
   expires_in: number;
   refresh_expires_in: number;
}

// Generated by https://quicktype.io

export interface OtpResponse {
   foundOtp: {
      _id: string;
      email: string;
      otpCode: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
   };
}

export type FetchQueryParams = {
   endpoint: string;
   queryKey: string;
   type?: 'basic-auth' | 'token';
   headers?: Record<string, string>;
};

export interface UploadResponse {
   _id: string;
   phone: string;
   tablet: string;
   desktop: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
}

// Generated by https://quicktype.io

export interface AddProductPayload {
   title: string;
   description: string;
   price: string;
   summary: string;
   storeName: string;
   coverImageId: string;
   thumbnailId: string;
   additionalInformation: { attribute: string; value: string }[];
   term: {
      title: string;
      description: string;
   };
   options: {
      price: string;
      duration: string;
      type: string;
   }[];
}

export interface AddProductResponse {
   product: Product;
}

export interface Product {
   id: string;
   title: string;
   uid: string;
   thumbnail: TImage;
   option: Option[];
   reveune: number;
   sales: number;
   members: number;
}

export interface Merchant {
   _id: string;
   storeName: string;
   customer: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
}

export interface Option {
   price: number;
   duration: string;
   type: string;
   _id: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
}
// Generated by https://quicktype.io

export interface AddAffiliatePayload {
   email: string;
   list: { commission: number; productId: string }[];
}

export interface BuyProductPayload {
   productId: string;
   email: string;
}

// Generated by https://quicktype.io

export interface BuyProductResponse {
   invoice_id: string;
   qr_text: string;
   qr_image: string;
   qPay_shortUrl: string;
   urls: URL[];
}

export interface URL {
   name: string;
   description: string;
   logo: string;
   link: string;
}

// Generated by https://quicktype.io

export interface Affliate {
   email: string;
   link: string;
   commission: number;
   productTitle: string;
   status: string;
   productId: string;
   uid: string;
   id: string;
   sales: number;
   reveune: number;
}

// Generated by https://quicktype.io

export interface Merchant {
   _id: string;
   storeName: string;
   customer: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
}

export interface MerchantProductsResponse {
   merchant: Merchant;
   product: MerchantProduct[];
}

export interface TImage {
   _id: string;
   phone: string;
   tablet: string;
   desktop: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
}

export interface MerchantProduct {
   _id: string;
   title: string;
   description: string;
   price: string;
   summary: string;
   uid: string;
   merchant: string;
   additionalInformation: AdditionalInformation[];
   term: Term;
   coverImage: TImage;
   thumbnail: TImage;
   option: Option[];
   createdAt: string;
   updatedAt: string;
   __v: number;
}

// Generated by https://quicktype.io

export interface Term {
   _id: string;
   title: string;
   description: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
}

export interface AdditionalInformation {
   _id: string;
   attribute: string;
   value: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
}

export interface Option {
   _id: string;
   price: number;
   duration: string;
   type: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
}

// Generated by https://quicktype.io

export interface Payout {
   cards: Cards;
   overview: Overview;
   tranList: TranList[];
}

export interface Cards {
   revenue: CardItem[];
   sales: CardItem[];
   members: CardItem[];
}

export interface CardItem {
   merchant: string;
   title: string;
   value: number;
}

export interface Overview {
   revenueByDay: RevenueByDay[];
   revenueByWeek: RevenueByWeek[];
   revenueByMonth: RevenueByMonth[];
}

export interface RevenueByDay {
   day: string;
   totalAmount: number;
}

export interface RevenueByMonth {
   month: string;
   totalAmount: number;
}

export interface RevenueByWeek {
   week: string;
   totalAmount: number;
}

export interface TranList {
   _id: string;
   transactions: Transaction[];
}

export interface Transaction {
   totalAmount: number;
   updatedAt: string;
   customerEmail: string;
}
// Generated by https://quicktype.io

export interface Customer {
   _id: string;
   email: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
}
