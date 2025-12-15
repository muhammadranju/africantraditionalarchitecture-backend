import { IWaiting } from './waiting.interface';
import WaitingList from './waiting.model';

const createWaitingListToDB = async (waitingListData: IWaiting) => {
  const result = await WaitingList.create(waitingListData);
  return result;
};

const getAllWaitingListFromDB = async () => {
  const result = await WaitingList.find();
  return result;
};

const updateWaitingListToDB = async (id: string, waitingListData: IWaiting) => {
  const result = await WaitingList.findByIdAndUpdate(id, waitingListData, {
    new: true,
  });
  return result;
};

const deleteWaitingListToDB = async (id: string) => {
  const result = await WaitingList.findByIdAndDelete(id);
  return result;
};

export const WaitingListService = {
  createWaitingListToDB,
  getAllWaitingListFromDB,
  updateWaitingListToDB,
  deleteWaitingListToDB,
};
