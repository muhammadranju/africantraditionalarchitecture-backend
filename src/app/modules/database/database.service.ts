import DatabaseModel from './database.model';

const createContentToDB = async (databaseData: any) => {
  const result = await DatabaseModel.create(databaseData);
  return result;
};

const getContentsToDB = async ({ limitNumber, pageNumber }: any) => {
  const result = await DatabaseModel.find()
    .limit(limitNumber)
    .skip((pageNumber - 1) * limitNumber)
    .sort({ createdAt: -1 });
  return result;
};

export const DatabaseService = {
  createContentToDB,
  getContentsToDB,
};
