export interface User {
    userId: string;
    userHandle: string;
    firstName: string;
    lastName?: string;
    email: string;
    phoneNumber: number;
    country: String;
    profilePicUrl: String;
    timezone: String;
    bio: String;
    age: number;
    lastActive: number;
    gender: string;
    createdAt: number;
    updatedAt: number;
}