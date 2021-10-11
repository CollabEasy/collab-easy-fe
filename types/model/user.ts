export interface User {
  userId?: string;
  userHandle?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: number;
  country?: string;
  profilePicUrl?: string;
  timezone?: string;
  bio?: string;
  age?: number;
  lastActive?: number;
  gender?: string;
  createdAt?: number;
  updatedAt?: number;
  skills?: string[];
  sample?: string[];
}

export interface Login{
  artistId: string,
  artistHandle: string,
  slug: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  country: string,
  profilePicUrl: string,
  timezone: string,
  bio: string,
  age: string,
  lastActive: string,
  gender: string,
  createdAt: string,
  updatedAt: string,
  newUser: string,
  role: string,
  detailsUpdated: string,
  isNewUser: string,
  token: string
}
