import delve from '@/utils';

export const getError = (error: any) => {
   const a = delve(error, 'response.data.message') || 'Something went wrong';
   return a as string;
};
