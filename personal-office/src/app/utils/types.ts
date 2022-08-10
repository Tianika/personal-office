export type SignUpData = {
  login: string;
  password: string;
};

export type UserData = {
  id: string;
  name: string;
  password: string;
};

export type ContactType = {
  name: string;
  phone: string;
  address: string;
};

export type ContactsType = {
  id: string;
  contacts: Array<ContactType>;
};
