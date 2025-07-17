export interface BuyerInterface {
  profile: {
    email: string;
    id: number;
  };
}

export interface SellerInterface {
  profile: {
    email: string;
    type_organization: string;
    country: string;
    itn: number;
    name: string;
    last_name: string;
    patronymic: string;
    company_name: string;
  };
}
