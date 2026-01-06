export type CartItem = {
    productId: number;
    variationId?: number;
    quantity: number;
    name: string;
    price: number; // display only (server will verify)
};