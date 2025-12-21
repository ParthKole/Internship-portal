// src/student/components/InterviewReviews.jsx
import React, { useState } from 'react';
import { 
  Star, User, Calendar, AlertCircle, CheckCircle, 
  XCircle, MessageSquare, ThumbsUp, ChevronDown, ChevronUp,
  Target, Clock, BookOpen, Lightbulb, TrendingUp, Award
} from 'lucide-react';

const InterviewReviews = ({ company = "Barclays", role = "Technology Analyst Intern" }) => {
  const [expandedReview, setExpandedReview] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [helpfulReviews, setHelpfulReviews] = useState([1, 3]);

  // Sample reviews data - matches your theme companies
  const reviews = [
    {
      id: 1,
      studentName: 'Amit Patel',
      college: 'IIT Bombay',
      batch: '2023 Graduate',
      status: 'selected',
      statusText: 'Selected',
      rating: 4.5,
      rounds: 4,
      experience: 'The interview process was well-structured. Focus on DSA and system design. HR round was more about cultural fit.',
      questions: [
        'Design URL shortening service like Bitly',
        'Implement LRU Cache from scratch',
        'SQL query optimization for large datasets',
        'Rate limiter implementation'
      ],
      mistakes: [
        'Took too much time on first question',
        'Could have explained system design better'
      ],
      advice: 'Practice system design questions thoroughly. Barclays focuses heavily on scalable architecture.',
      preparationTime: '6 weeks',
      difficulty: 4,
      helpful: 24,
      date: 'Oct 2023',
      anonymous: false,
      verified: true
    },
    {
      id: 2,
      studentName: 'Priya Sharma',
      college: 'Delhi University',
      batch: '2023 Graduate',
      status: 'not-selected',
      statusText: 'Not Selected',
      rating: 3.5,
      rounds: 3,
      experience: 'Failed in the technical round. Questions were more practical than expected. Should have focused on real-world scenarios.',
      questions: [
        'Database indexing and optimization',
        'REST vs GraphQL implementation',
        'Microservices communication patterns',
        'Error handling strategies'
      ],
      mistakes: [
        'Underestimated system design round',
        'Poor time management during coding',
        'Didn\'t practice SQL optimization enough'
      ],
      advice: 'Focus on practical implementation, not just theory. Barclays wants candidates who can think on their feet.',
      preparationTime: '3 weeks',
      difficulty: 4,
      helpful: 18,
      date: 'Sep 2023',
      anonymous: true,
      verified: true
    },
    {
      id: 3,
      studentName: 'Rohit Kumar',
      college: 'VIT Chennai',
      batch: '2024 Graduate',
      status: 'selected',
      statusText: 'Selected',
      rating: 4,
      rounds: 3,
      experience: 'Smooth process with friendly interviewers. Technical round was challenging but fair. They value communication skills.',
      questions: [
        'Design payment gateway system',
        'Implement JWT authentication',
        'Database transaction management',
        'Caching strategies'
      ],
      mistakes: [
        'Could have asked more clarifying questions',
        'Should have practiced more behavioral questions'
      ],
      advice: 'Be confident and explain your thought process clearly. They appreciate good communication.',
      preparationTime: '4 weeks',
      difficulty: 3,
      helpful: 15,
      date: 'Nov 2023',
      anonymous: false,
      verified: false
    },
    {
      id: 4,
      studentName: 'Neha Gupta',
      college: 'NIT Trichy',
      batch: '2023 Graduate',
      status: 'not-selected',
      statusText: 'Not Selected',
      rating: 3,
      rounds: 2,
      experience: 'Failed in the online assessment. Questions were time-bound and required quick thinking. Should have practiced more timed tests.',
      questions: [
        'Array manipulation problems',
        'String algorithms',
        'Dynamic programming basics',
        'Graph traversal questions'
      ],
      mistakes: [
        'Poor time management',
        'Didn\'t practice enough mock tests',
        'Anxiety affected performance'
      ],
      advice: 'Practice under time pressure. Take lots of mock tests before the actual assessment.',
      preparationTime: '2 weeks',
      difficulty: 4,
      helpful: 32,
      date: 'Aug 2023',
      anonymous: false,
      verified: true
    }
  ];

  const filters = [
    { id: 'all', label: 'All Reviews', count: reviews.length },
    { id: 'selected', label: 'Selected', count: reviews.filter(r => r.status === 'selected').length },
    { id: 'not-selected', label: 'Not Selected', count: reviews.filter(r => r.status === 'not-selected').length },
    { id: 'verified', label: 'Verified Only', count: reviews.filter(r => r.verified).length }
  ];

  const getStatusColor = (status) => {
    return status === 'selected' 
      ? 'bg-[#059669]/10 text-[#059669] border border-[#059669]/20'
      : 'bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20';
  };

  const toggleHelpful = (reviewId) => {
    setHelpfulReviews(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const filteredReviews = reviews.filter(review => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'verified') return review.verified;
    return review.status === selectedFilter;
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Interview Experiences</h2>
            <p className="text-gray-600 mt-1">
              Real experiences from students who interviewed at <span className="font-semibold text-[#4F46E5]">{company}</span>
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{reviews.length}</div>
              <div className="text-sm text-gray-600">Total Reviews</div>
            </div>
            <div className="w-px h-10 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {(reviews.filter(r => r.status === 'selected').length / reviews.length * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600">Selection Rate</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                selectedFilter === filter.id
                  ? 'bg-[#4F46E5] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
              <span className={`ml-2 px-2 py-0.5 text-xs rounded ${
                selectedFilter === filter.id
                  ? 'bg-[#4338CA] text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Insights Summary */}
        <div className="bg-[#4F46E5]/5 border border-[#4F46E5]/20 rounded-xl p-4 mb-6">
          <div className="flex items-center mb-3">
            <Lightbulb className="text-[#4F46E5] mr-2" size={20} />
            <h3 className="font-semibold text-gray-900">Key Insights</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <Target className="text-[#4F46E5] mr-2" size={16} />
              <span className="text-sm text-gray-700">Average Rounds: <strong>3.5</strong></span>
            </div>
            <div className="flex items-center">
              <Clock className="text-[#4F46E5] mr-2" size={16} />
              <span className="text-sm text-gray-700">Prep Time: <strong>3-6 weeks</strong></span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="text-[#4F46E5] mr-2" size={16} />
              <span className="text-sm text-gray-700">Difficulty: <strong>7/10</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map(review => (
          <div 
            key={review.id} 
            className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            {/* Review Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
              <div className="flex items-start space-x-3 mb-4 sm:mb-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center text-white font-bold">
                  {review.studentName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center flex-wrap gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{review.anonymous ? 'Anonymous Student' : review.studentName}</h3>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${getStatusColor(review.status)}`}>
                      {review.statusText}
                    </span>
                    {review.verified && (
                      <span className="px-2 py-0.5 bg-[#059669]/10 text-[#059669] text-xs font-medium rounded">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {review.college} • {review.batch}
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < Math.floor(review.rating)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{review.rating}/5</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center justify-end text-sm text-gray-600 mb-1">
                  <Calendar size={14} className="mr-1" />
                  {review.date}
                </div>
                <div className="text-sm text-gray-600">
                  {review.rounds} rounds • {review.preparationTime} prep
                </div>
              </div>
            </div>

            {/* Experience Summary */}
            <div className="mb-4">
              <p className="text-gray-700">{review.experience}</p>
            </div>

            {/* Expandable Details */}
            {expandedReview === review.id ? (
              <div className="space-y-4">
                {/* Questions Asked */}
                <div>
                  <div className="flex items-center mb-2">
                    <MessageSquare size={16} className="text-[#4F46E5] mr-2" />
                    <h4 className="font-semibold text-gray-900">Questions Asked</h4>
                  </div>
                  <div className="space-y-2">
                    {review.questions.map((question, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-[#4F46E5] rounded-full mt-2 mr-3"></div>
                        <span className="text-sm text-gray-700">{question}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mistakes */}
                <div>
                  <div className="flex items-center mb-2">
                    <AlertCircle size={16} className="text-[#DC2626] mr-2" />
                    <h4 className="font-semibold text-gray-900">Mistakes & Learnings</h4>
                  </div>
                  <div className="space-y-2">
                    {review.mistakes.map((mistake, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-[#DC2626] rounded-full mt-2 mr-3"></div>
                        <span className="text-sm text-gray-700">{mistake}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advice */}
                <div>
                  <div className="flex items-center mb-2">
                    <Lightbulb size={16} className="text-[#D97706] mr-2" />
                    <h4 className="font-semibold text-gray-900">Advice for Future Candidates</h4>
                  </div>
                  <p className="text-sm text-gray-700 bg-[#D97706]/5 p-3 rounded-lg">
                    {review.advice}
                  </p>
                </div>
              </div>
            ) : null}

            {/* Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={() => toggleHelpful(review.id)}
                className="flex items-center text-sm text-gray-600 hover:text-[#4F46E5]"
              >
                <ThumbsUp 
                  size={16} 
                  className={`mr-2 ${helpfulReviews.includes(review.id) ? 'text-[#4F46E5]' : ''}`}
                />
                Helpful ({review.helpful})
              </button>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                  className="text-sm text-[#4F46E5] hover:text-[#4338CA] font-medium flex items-center"
                >
                  {expandedReview === review.id ? (
                    <>
                      Show Less
                      <ChevronUp size={16} className="ml-1" />
                    </>
                  ) : (
                    <>
                      Read Full Experience
                      <ChevronDown size={16} className="ml-1" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review CTA */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Your Experience</h3>
          <p className="text-gray-600 mb-4">
            Help other students by sharing your interview experience with {company}
          </p>
          <button className="px-6 py-3 bg-[#4F46E5] text-white font-medium rounded-lg hover:bg-[#4338CA] transition-colors">
            Add Your Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewReviews;