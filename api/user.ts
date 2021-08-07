import { Config } from "config/config";
import { User } from "types/core";
import api from "./client";

export const mockUser = (id: string): User => ({
  firstName: "Ankit",
  lastName: "bathla",
  email: "ankit.bathla6@gmail.com",
  userId: id,
  userHandle: "bathla18",
  phoneNumber: 8433200726,
  country: "India",
  profilePicUrl: "S3: url",
  timezone: "IST",
  bio: "Bio",
  age: 29,
  lastActive: 123,
  gender: "Male",
  createdAt: 123,
  updatedAt: 123,
})

export const getUserData = async (id: string): Promise<User> => {
  // uncomment below line to fetch data from user api
 // const result = await api.get<User>(`${Config.backendEndpoint}/user/${id}`);
  //return result;
  return mockUser(id)
}
