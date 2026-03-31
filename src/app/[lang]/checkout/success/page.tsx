import CheckoutSuccess from "@/components/Checkout/CheckoutSuccess";

const CheckoutSuccessPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) => {
  const { orderId = "" } = await searchParams;

  return <CheckoutSuccess orderId={orderId} />;
};

export default CheckoutSuccessPage;
