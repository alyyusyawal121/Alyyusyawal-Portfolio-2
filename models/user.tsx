import mongoose, { Schema, models } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Tidak boleh ada 2 user dengan email yang sama!
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user", // Otomatis menjadi 'user' biasa saat mendaftar
    }
  },
  { timestamps: true }
);

const User = models.User || mongoose.model('User', UserSchema);

export default User;