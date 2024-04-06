import { Schema } from "mongoose";

export const TaskSchema = new Schema({
  title: String,
  description: String,
  state: String,
  project:String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  created_at: { type: Date },
  updated_at: { type: Date }

},
)

TaskSchema.pre('save', function (next) {
  const now = new Date();
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
})
TaskSchema.pre('findOneAndUpdate', async function (next) {
  this.updateOne({}, { $set: { updated_at: new Date() } })
  next()
})