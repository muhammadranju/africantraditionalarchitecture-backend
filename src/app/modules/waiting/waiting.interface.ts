export enum ProfessionalROLES {
  builder = 'builder',
  architect = 'architect',
  designer = 'designer',
  student = 'student',
  other = 'other',
}
export enum WaitingStatus {
  active = 'active',
  delete = 'delete',
  suspended = 'suspended',
}

export interface IWaiting {
  name: string;
  role: ProfessionalROLES;
  email: string;
  country: string;
  about: string;
  website: string;
  expertise: string;
  experience: string;
  image: string;
  bio: string;
  available: boolean;
  status: WaitingStatus;
}
export interface IWaitingModal extends IWaiting, Document {}
