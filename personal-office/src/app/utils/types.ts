export type SignUpData = {
  login: string;
  password: string;
};

export type UserData = SignUpData & {
  id: string;
};
