export interface ApiResponse {
  status: string;
  value?: Value;
}
export interface Value {
  node: Node;
  country: string;
}
export interface Node {
  offerCount: number;
  flatrate?: FlatrateEntity[] | null;
  buy?: (BuyEntity | null)[] | null;
  rent?: null[] | null;
  free?: null[] | null;
}
export interface FlatrateEntity {
  presentationType: string;
  monetizationType: string;
  retailPrice?: null;
  retailPriceValue?: null;
  currency: string;
  type: string;
  posterUrl: string;
  package: Package;
}
export interface Package {
  packageId: number;
  clearName: string;
}
export interface BuyEntity {
  presentationType: string;
  monetizationType: string;
  retailPrice: string;
  retailPriceValue: number;
  currency: string;
  type: string;
  package: Package;
}

export interface TitleResponse {
  data?: (DataEntity)[] | null;
}
export interface DataEntity {
  country: string;
  countryIcon: string;
  services: string;
}

