export interface BuyerInterface {
  email: string;
  id: number;
}

export interface SellerInterface {
  email: string;
  type_organization: string;
  country: string;
  itn: number;
  name: string;
  last_name: string;
  patronymic: string;
  company_name: string;
}
