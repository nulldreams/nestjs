import { Schema } from 'mongoose'

export const DeveloperSchema = new Schema({
  name: String,
  sex: {
    type: String,
    required: true,
    enum: ['female', 'male'],
  },
  age: Number,
  hobby: String,
  birthdate: Date,
})
