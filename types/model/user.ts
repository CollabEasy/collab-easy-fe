export interface User {
  userId: string;
  userHandle: string;
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber: number;
  country: string;
  profilePicUrl: string;
  timezone: string;
  bio: string;
  age: number;
  lastActive: number;
  gender: string;
  createdAt: number;
  updatedAt: number;
  skills: string[];
  sample: string[];
}

export interface Login{
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber: number;
  country: string;
  profilePicUrl: string;
  timezone: string;
  bio: string;
  age: number;
  lastActive: number;
  token: string;
}
