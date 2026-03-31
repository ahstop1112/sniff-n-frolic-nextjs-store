export type ShippingPayload = {
  first_name: string;
  last_name: string;
  phone?: string;
  email: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
};

export type Pricing = {
  currency?: "CAD";
  subtotal?: number;
  shipping?: number;
  tax?: number;
  gst?: number;
  pst?: number;
  total?: number;
};
