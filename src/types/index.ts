export interface ScanResponse {
  data: ScanProduct;
}

export interface ScanProduct {
  code: string;
  product: ScanProductDetails;
}

export interface ScanProductDetails {
  brands?: string;
  product_name?: string;
  image_front_url?: string;
}
