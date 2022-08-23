export type User = {
  full_name: string;
  msisdn: string;
  email: string;
  password_change_at: string;
} & EntityUser &
  UserTokens;

export type EntityUser = {
  orgName: string;
  account: string;
  contractNumber: string;
  isAdmin: boolean;
};

export type UserTokens = {
  token: string;
  refresh_token: string;
};
