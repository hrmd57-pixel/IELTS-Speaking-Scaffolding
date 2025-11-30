import React, { useState, useEffect } from 'react';

interface Props {
  clozeContent: string;
}

const StepCloze: React.FC<Props> = ({ clozeContent }) => {
  // We need to parse content like "The [weather] was good."
  // into parts: "The ", "weather", " was good."
  
  const [parts, setParts] = useState<(string | { answer: string; id: number })[]>([]);
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    // Regex to match [content]
    const regex = /\[(.*?)\]/g;
    const newParts: (string | { answer: string; id: number })[] = [];
    let lastIndex = 0;
    let match;
    let idCounter = 0;

    while ((match = regex.exec(clozeContent)) !== null) {
      // Push preceding text
      if (match.index > lastIndex) {
        newParts.push(clozeContent.substring(lastIndex, match.index));
      }
      
      // Push cloze item
      newParts.push({ answer: match[1], id: idCounter++ });
      lastIndex = regex.lastIndex;
    }

    // Push remaining text
    if (lastIndex < clozeContent.length) {
      newParts.push(clozeContent.substring(lastIndex));
    }

    setParts(newParts);
    setInputs({});
    setShowAnswers(false);
  }, [clozeContent]);

  const handleInputChange = (id: number, value: string) => {
    setInputs(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-lg font-medium text-slate-700">Fill in the missing logical words & collocations</h3>
        <button 
          onClick={() => setShowAnswers(!showAnswers)}
          className="px-4 py-2 text-sm font-medium text-primary bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          {showAnswers ? 'Hide Answers' : 'Show Answers'}
        </button>
      </div>

      <div className="leading-10 text-lg text-slate-800">
        {parts.map((part, index) => {
          if (typeof part === 'string') {
            return <span key={index}>{part}</span>;
          } else {
            const isCorrect = inputs[part.id]?.toLowerCase().trim() === part.answer.toLowerCase().trim();
            const isEmpty = !inputs[part.id];
            
            return (
              <span key={index} className="inline-block mx-1 relative">
                <input
                  type="text"
                  value={showAnswers ? part.answer : (inputs[part.id] || '')}
                  onChange={(e) => handleInputChange(part.id, e.target.value)}
                  disabled={showAnswers}
                  className={`
                    border-b-2 outline-none text-center min-w-[80px] px-1 font-medium transition-all
                    ${showAnswers 
                      ? 'border-green-500 text-green-700' 
                      : (isEmpty ? 'border-slate-300 bg-slate-50' : (isCorrect ? 'border-green-500 text-green-700' : 'border-blue-400'))}
                  `}
                  placeholder={showAnswers ? '' : '???'}
                />
              </span>
            );
          }
        })}
      </div>
    </div>
  );
};

export default StepCloze;
