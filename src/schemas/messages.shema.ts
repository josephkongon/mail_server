import * as mongoose from 'mongoose';

export interface MessageDocument extends mongoose.Document {
  id: string;
  userId: string;
  subject: string;
  content: string;
  isRead: boolean;
}
export interface MessageType {
  id: string;
  userId: string;
  subject: string;
  content: string;
  isRead: boolean;
}

export interface MessageSecType {
  id: string;
  userId: string;
  subject: string;
  content: string;
  isRead: boolean;
}

export const MessageShema = new mongoose.Schema({
  userId: { type: String, required: true },
  messages: [
    {
      subject: { type: String, required: true },
      content: { type: String, required: true },
      isRead: { type: Boolean, required: true },
    },
  ],
});
