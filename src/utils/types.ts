export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Capsule {
  id: number;
  user_id: number;
  user_name?: string;
  title: string;
  message: string;
  private: boolean;
  surprise: boolean;
  imagePath?: string; 
  audioPath?: string;
  color: string;
  revealed_at?: Date;
  createdAt: Date;
  updatedAt: Date;
}