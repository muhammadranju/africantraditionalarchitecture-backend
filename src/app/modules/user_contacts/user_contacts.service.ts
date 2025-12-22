import MailChecker from 'mailchecker';
import { IUserContact } from './user_contacts.interface';
import UserContact from './user_contacts.model';

const createContentToDB = async (contactData: IUserContact) => {
  const mailChecker = MailChecker.isValid(contactData.email);

  const result = await UserContact.create(contactData);
  return result;
};

const getAllContentFromDB = async () => {
  const result = await UserContact.find();
  return result;
};

const updateContentToDB = async (id: string, contactData: IUserContact) => {
  const result = await UserContact.findByIdAndUpdate(id, contactData, {
    new: true,
  });
  return result;
};

const deleteContentToDB = async (id: string) => {
  const result = await UserContact.findByIdAndDelete(id);
  return result;
};

export const UserContactService = {
  createContentToDB,
  getAllContentFromDB,
  updateContentToDB,
  deleteContentToDB,
};
