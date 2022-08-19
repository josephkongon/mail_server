import * as mongoose from 'mongoose';

export interface UsersDocument extends mongoose.Document {
  id: string;
  username: string;
  password: string;
}
export interface UserType {
  id: string;
  username: string;
  password: string;
}

export interface UserSecType {
  id: string;
  username: string;
  password: string;
}

export const UsersShema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
