export enum ProfessionalROLES {
  Builder = 'Builder',
  Architect = 'Architect',
  Designer = 'Designer',
  Student = 'Student',
  Other = 'Other',
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
  status: string;
}
