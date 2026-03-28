import mongoose, { Schema, models } from 'mongoose';

const ProfileSchema = new Schema(
  {
    profileImageUrl: { type: String, required: true },
    profileImageAbt: { type: String, required: true },
    homeDescription: { type: String, required: true },
    aboutDescription: { type: String, required: true },
    skills: { type: [String], default: [] },
    cvUrl: { type: String, default: "" },
    instagramUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    emailUrl: { type: String, default: "" },
    discordUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

const Profile = models.Profile || mongoose.model('Profile', ProfileSchema);

export default Profile;