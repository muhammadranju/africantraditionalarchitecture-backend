import { NewsLetterModel } from './news_latter.model';

const createNewsLetterToDB = async (email: string) => {
  const result = await NewsLetterModel.create({ email });
  return result;
};

const getAllNewsLetterToDB = async () => {
  const result = await NewsLetterModel.find().sort({ createdAt: -1 });
  return result;
};

const NewsLetterService = {
  createNewsLetterToDB,
  getAllNewsLetterToDB,
};

export default NewsLetterService;
