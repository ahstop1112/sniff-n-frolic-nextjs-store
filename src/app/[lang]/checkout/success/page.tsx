import { isValidLocale, type Locale } from "@/i18n/config";
import CheckoutSuccess from "@/components/Checkout/CheckoutSuccess";
import { notFound } from 'next/navigation';

type CheckoutSuccessPageProps = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ orderId?: string }>;
};

const CheckoutSuccessPage = async ({ params, searchParams }: CheckoutSuccessPageProps) => {
  const { lang } = await params;
  if (lang !== 'en' && lang !== 'zh') {
    notFound();
  }
  const locale: Locale = lang;

  const { orderId = "" } = await searchParams;

  return (
    <CheckoutSuccess orderId={orderId} lang={lang} />
  );
};

export default CheckoutSuccessPage;
