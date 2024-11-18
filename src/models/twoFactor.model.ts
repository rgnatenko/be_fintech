import mongoose from 'mongoose';

const TwoFactorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

TwoFactorSchema.index({ userId: 1, code: 1 }, { unique: true });

export default mongoose.model('TwoFactor', TwoFactorSchema);
