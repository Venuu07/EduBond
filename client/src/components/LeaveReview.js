// client/src/components/LeaveReview.js
'use client';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Star } from 'lucide-react'; // Import Star icon

export default function LeaveReview({ targetUserId, contextId, contextType, onReviewSubmitted }) {
    const [rating, setRating] = useState(0); // 0 = no rating selected
    const [hoverRating, setHoverRating] = useState(0); // For hover effect on stars
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // To disable button during submission

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error('Please select a star rating.');
            return;
        }
        setIsSubmitting(true);
        const reviewToast = toast.loading('Submitting review...');

        try {
            await axios.post(`${API_URL}/api/reviews`, {
                targetUserId,
                rating,
                comment,
                contextId,
                contextType,
            });
            toast.success('Review submitted successfully!', { id: reviewToast });
            if (onReviewSubmitted) onReviewSubmitted(); // Notify parent component
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to submit review';
            toast.error(message, { id: reviewToast });
            console.error('Review submission failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Leave a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Star Rating Input */}
                <div>
                    <label className="form-label mb-1">Rating</label>
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={24}
                                // Fill stars based on hover or selected rating
                                className={`cursor-pointer transition-colors ${
                                    (hoverRating || rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                }`}
                                // Set rating on click
                                onClick={() => setRating(star)}
                                // Handle hover effect
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                            />
                        ))}
                    </div>
                </div>

                {/* Comment Textarea */}
                <div>
                    <label className="form-label">Comment (Optional)</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="3"
                        className="form-input"
                        placeholder="Share your experience..."
                        maxLength="500"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn-primary w-auto px-6 disabled:bg-gray-400" // Adjust width
                    disabled={isSubmitting || rating === 0}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
}