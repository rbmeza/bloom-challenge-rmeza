export type Brand = {
    id: string;
    name: string;
    url: string;
    settings?: BrandSettings;
};

export type BrandSettings = {
    brandId: string;
    homePickup: boolean;
    blueExpress: boolean;
    coupon: boolean;
    wireTransfer: boolean;
    additionalCharges?: string;
};

export type Brands = Brand[];
