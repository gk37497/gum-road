type Props = {
  params: {
    merchantId: string;
    productId: string;
  };
};

export default function ProductDetailPage({ params }: Props) {
  const { productId, merchantId } = params;

  return (
    <div>
      <div>
        Merchant {merchantId} Product {productId}
      </div>
    </div>
  );
}
