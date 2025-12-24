import React, { useState, useEffect } from 'react';
import { Star, Calendar, MessageSquare, ChevronDown, ChevronUp, ThumbsUp, User } from 'lucide-react';

const InterviewReviews = ({ companyId, companyName }) => {
  const [expandedReview, setExpandedReview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In a real scenario, you would fetch from: api.get(`/reviews/${companyId}`)
    const fetchReviews = async () => {
      setLoading(true);
      try {
        // Simulating API latency and response
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Mock data structure
        const mockReviews = [
          {
            id: 1,
            studentName: 'Amit Patel',
            status: 'selected',
            rating: 4,
            rounds: 3,
            experience: `The process at ${companyName || 'this company'} was very structured. Round 1 was an OA, followed by 2 technical rounds focusing on DSA and Core subjects.`,
            questions: ['Reverse a Linked List', 'Explain ACID properties', 'System Design: URL Shortener'],
            date: 'Oct 2023',
            helpfulCount: 12
          },
          {
            id: 2,
            studentName: 'Priya Sharma',
            status: 'rejected',
            rating: 3,
            rounds: 2,
            experience: 'The technical interviewer was friendly but asked very deep questions about Java concurrency which I struggled with.',
            questions: ['Java Thread Lifecycle', 'Difference between Process and Thread', 'SQL vs NoSQL'],
            date: 'Sept 2023',
            helpfulCount: 5
          }
        ];
        setReviews(mockReviews);
      } catch (error) {
        console.error("Failed to load reviews", error);
      } finally {
        setLoading(false);
      }
    };

    if (companyId || companyName) {
      fetchReviews();
    }
  }, [companyId, companyName]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4F46E5] mx-auto mb-4"></div>
        <p className="text-gray-500">Loading interview experiences...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Interview Experiences</h2>
          <p className="text-gray-600 mt-1">
            Insights for <span className="font-semibold text-[#4F46E5]">{companyName || 'Unknown Company'}</span>
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {reviews.length} reviews found
        </div>
      </div>

      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
              {/* Review Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold border border-gray-300">
                    {review.studentName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{review.studentName}</h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar size={12} className="mr-1" /> {review.date}
                    </div>
                  </div>
                </div>
                
                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full ${
                  review.status === 'selected' 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {review.status}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-3">
                 {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < review.rating ? "text-amber-400 fill-current" : "text-gray-300"} 
                    />
                 ))}
              </div>

              {/* Experience Text */}
              <p className="text-gray-700 mb-4 leading-relaxed">{review.experience}</p>

              {/* Expanded Questions Section */}
              {expandedReview === review.id && (
                 <div className="bg-indigo-50/50 p-4 rounded-lg mt-3 mb-4 border border-indigo-100">
                    <h4 className="text-sm font-bold text-[#4F46E5] mb-2 flex items-center">
                      <MessageSquare size={14} className="mr-2" /> Questions Asked
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-1">
                       {review.questions.map((q, idx) => <li key={idx}>{q}</li>)}
                    </ul>
                 </div>
              )}

              {/* Footer Actions */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-2">
                <button className="flex items-center text-xs text-gray-500 hover:text-gray-700 space-x-1">
                  <ThumbsUp size={14} />
                  <span>Helpful ({review.helpfulCount})</span>
                </button>

                <button
                  onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                  className="text-sm text-[#4F46E5] font-semibold flex items-center hover:text-[#4338CA] transition-colors"
                >
                  {expandedReview === review.id ? 'Show Less' : 'Read Full Experience'}
                  {expandedReview === review.id ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
             <MessageSquare className="text-gray-300 mb-3" size={40} />
             <p className="text-gray-500 font-medium">No reviews yet for {companyName}</p>
             <p className="text-gray-400 text-sm">Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewReviews;