export interface User {
  artist_id?: string;
  slug?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: number;
  country?: string;
  profile_pic_url?: string;
  timezone?: string;
  bio?: string;
  age?: number;
  last_active?: number;
  gender?: string;
  created_at?: number;
  updated_at?: number;
  date_of_birth?: Date;
  new_user?: boolean;
  skills?: string[];
  sample?: string[];
}

export interface Artist {
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

export interface UserSample {
  originalUrl: string;
  thumbnailUrl: string;
  fileType: string;
  caption: string;
  createdAt: Date;
}

export interface UserSocialProspectus {
  socialPlaformName: string;
  handle: string;
  description: string;
  upForCollab: string;
}
