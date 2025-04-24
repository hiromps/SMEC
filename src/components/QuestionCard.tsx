import React, { useState } from 'react';
import { Star } from 'lucide-react';
import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  onNext: () => void;
  onAnswer: (isCorrect: boolean) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onNext,
  onAnswer,
  isFavorite,
  onToggleFavorite,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerSubmit = () => {
    if (selectedIndex !== null) {
      setIsAnswered(true);
      onAnswer(selectedIndex === question.answerIndex);
    }
  };

  const handleNext = () => {
    setSelectedIndex(null);
    setIsAnswered(false);
    onNext();
  };

  const isCorrect = selectedIndex === question.answerIndex;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
      <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {question.category}
        </h2>
        <button
          onClick={onToggleFavorite}
          className="focus:outline-none transition-transform hover:scale-110"
          aria-label={isFavorite ? "お気に入りから削除" : "お気に入りに追加"}
        >
          <Star
            size={24}
            fill={isFavorite ? "#FBBF24" : "none"}
            className={isFavorite ? "text-amber-400" : "text-white"}
          />
        </button>
      </div>
      
      <div className="p-5">
        <p className="text-lg mb-5 leading-relaxed">{question.question}</p>
        
        <div className="space-y-3 mb-6">
          {question.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => !isAnswered && setSelectedIndex(index)}
              disabled={isAnswered}
              className={`w-full text-left p-3 rounded-md border transition-colors duration-200 ${
                isAnswered
                  ? index === question.answerIndex
                    ? "bg-green-100 border-green-500"
                    : index === selectedIndex
                    ? "bg-red-100 border-red-500"
                    : "bg-gray-50 border-gray-300"
                  : selectedIndex === index
                  ? "bg-blue-100 border-blue-500"
                  : "bg-gray-50 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
              }`}
            >
              <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
              {choice}
            </button>
          ))}
        </div>
        
        {!isAnswered ? (
          <button
            onClick={handleAnswerSubmit}
            disabled={selectedIndex === null}
            className={`w-full py-3 rounded-md font-semibold transition-colors ${
              selectedIndex === null
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            答える
          </button>
        ) : (
          <div className="space-y-5">
            <div className={`p-4 rounded-md ${isCorrect ? "bg-green-100" : "bg-red-100"}`}>
              <h3 className={`font-bold mb-2 ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                {isCorrect ? "正解！" : "不正解"}
              </h3>
              <p className="text-gray-800">
                正解: {String.fromCharCode(65 + question.answerIndex)}. {question.choices[question.answerIndex]}
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="font-bold mb-2 text-gray-700">解説</h3>
              <p className="text-gray-800 leading-relaxed">{question.explanation}</p>
            </div>
            
            <button
              onClick={handleNext}
              className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
            >
              次の問題へ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;