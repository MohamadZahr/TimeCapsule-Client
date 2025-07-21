export interface TagPivot {
  capsule_id: number;
  tag_id: number;
}

export interface Tag {
  id: number;
  name: string;
  mood: string;
  created_at: Date | null;
  updated_at: Date | null;
  pivot: TagPivot;
}

export interface Location {
  id: number;
  longitude: string;
  latitude: string;
  city: string;
  country: string;
  address: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Capsule {
  id: number;
  user_id: number;
  user_name?: string; 
  location_id: number;
  title: string;
  message: string;
  private: boolean;
  surprise: boolean;
  image_path: string | null;
  audio_path: string | null;
  color: string;
  revealed_at: Date;
  created_at: Date;
  updated_at: Date;
  tags: Tag[];
  location: Location;
  user?: User;
}