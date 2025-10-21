import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    // Who received the review
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // Who wrote the review
    authorUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // The rating (e.g., 1 to 5 stars)
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    // Optional text comment
    comment: {
      type: String,
      maxlength: 500,
    },
    // What context does this review relate to?
    context: {
      id: { // ID of the Gig, Exchange, etc.
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      type: { // Type of interaction
        type: String,
        required: true,
        enum: ['Gig', 'SkillExchange', 'Mentorship'],
      },
    },
    // Prevent duplicate reviews for the same interaction by the same author
    uniqueConstraint: {
         type: String,
         unique: true, // Combination of author + context must be unique
         required: true,
    }
  },
  {
    timestamps: true,
  }
);

 // Create the unique index before model creation
reviewSchema.index({ authorUser: 1, 'context.id': 1, 'context.type': 1 }, { unique: true });


// Pre-save hook to generate the unique constraint string
reviewSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('authorUser') || this.isModified('context')) {
        this.uniqueConstraint = `${this.authorUser}-${this.context.type}-${this.context.id}`;
    }
    next();
});


const Review = mongoose.model('Review', reviewSchema);
export default Review;