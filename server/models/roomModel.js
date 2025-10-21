import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    name: { // User-friendly name (e.g., "Coding & Dev")
      type: String,
      required: true,
      trim: true,
    },
    slug: { // URL-friendly identifier (e.g., "coding")
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 200,
    },
    category: { // Optional: For grouping rooms later
      type: String,
      enum: ['Academic', 'Career', 'Hobbies', 'General'],
      default: 'General',
    },
    // We could add moderators, member lists etc. later
  },
  {
    timestamps: true,
  }
);

// Add an index on the slug for faster lookups
roomSchema.index({ slug: 1 });

const Room = mongoose.model('Room', roomSchema);
export default Room;