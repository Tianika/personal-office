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
  contactId: string;
  name: string;
  phone: string;
  address: string;
};

export type ContactsType = {
  id: string;
  list: Array<ContactType>;
};

export type ContactPropsType = ContactType & {
  userId: string;
};

export type ContactsPropsType = {
  userId: string;
  list: Array<ContactType>;
};
