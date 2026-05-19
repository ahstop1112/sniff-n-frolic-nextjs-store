'use client';
 
import { useLocale } from '@/i18n/LocaleProvider';
import Link from 'next/link';
import type { Product } from './types';
import styles from './AIChatbot.module.scss';
 
const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;
 
const ProductCard = ({ product }: { product: Product }) => {
    const locale = useLocale();
    const onSale = product.sale_price !== null && product.sale_price < product.regular_price;
    const effectivePrice = product.effective_price;

    return (
        <Link href={`/${locale}/products/${product.slug}`} className={styles.link}>
            <div className={styles.card}>
                {product.featured_image_url && (
                    <div className={styles.imgWrap}>
                        <img
                            src={product.featured_image_url ?? ''}
                            alt={product.name}
                            className={styles.img}
                        />
                    </div>
                )}
                <div className={styles.info}>
                <div className={styles.name}>{product.name}</div>
            </div>
            <div className={styles.prices}>
                <span className={styles.effectivePrice}>{formatPrice(effectivePrice)}</span>
                {onSale && (
                    <span className={styles.originalPrice}>{formatPrice(product.regular_price)}</span>
                )}
            </div>
        </div>
        </Link>
    );
}

export default ProductCard;
 