import React, { useState } from 'react';
import { QnAItem } from '../types';

interface Props {
  questions: QnAItem[];
}

const StepQnA: React.FC<Props> = ({ questions }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {questions.map((item, idx) => (
        <QnACard key={idx} item={item} index={idx} />
      ))}
    </div>
  );
};

const QnACard: React.FC<{ item: QnAItem; index: number }> = ({ item, index }) => {
  const [level, setLevel] = useState<0 | 1 | 2>(0);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
      {/* Level 0: Question */}
      <div className="p-6 bg-gradient-to-r from-indigo-50 to-white border-b border-indigo-100">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
            Q{index + 1}
          </div>
          <h3 className="text-lg font-semibold text-slate-800 leading-snug">
            {item.question}
          </h3>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Controls */}
        <div className="flex gap-3">
            {level === 0 && (
                <button 
                    onClick={() => setLevel(1)}
                    className="px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                >
                    Show Hints (Level 1)
                </button>
            )}
            {level === 1 && (
                <button 
                    onClick={() => setLevel(2)}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                >
                    Show Full Answer (Level 2)
                </button>
            )}
             {level === 2 && (
                <button 
                    onClick={() => setLevel(0)}
                    className="px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    Reset
                </button>
            )}
        </div>

        {/* Level 1: Hints */}
        {level >= 1 && (
          <div className="animate-fade-in-up">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Level 1 Hints (Keywords)
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.hints.map((hint, i) => (
                <span key={i} className="px-3 py-1 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-full text-sm font-medium">
                  {hint}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Level 2: Full Answer */}
        {level >= 2 && (
          <div className="animate-fade-in-up pt-4 border-t border-slate-100">
             <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Level 2 Full Answer
            </h4>
            <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg italic border-l-4 border-indigo-400">
              "{item.fullAnswer}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepQnA;