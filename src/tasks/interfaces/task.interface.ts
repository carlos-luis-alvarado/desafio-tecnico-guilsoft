import { Document } from 'mongoose';

export interface Task extends Document {
  readonly title: string;
  readonly description: string;
  readonly state: string;
  readonly user: string;
  readonly created_at: string;
  readonly updated_at: string;
}
