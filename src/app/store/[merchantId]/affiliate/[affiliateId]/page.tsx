type Props = {
   params: {
      merchantId: string;
      affiliateId: string;
   };
};

export default function AffiliateDetailPage({ params }: Props) {
   const { affiliateId, merchantId } = params;
   return (
      <div>
         <div>
            Merchant {merchantId} Affiliate {affiliateId}
         </div>
      </div>
   );
}
