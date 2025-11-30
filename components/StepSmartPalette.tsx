import React from 'react';

interface Props {
  translation: string;
  highlightedContent: string;
}

const StepSmartPalette: React.FC<Props> = ({ translation, highlightedContent }) => {
  // Helper to render text that might contain pronunciation markers (^)
  const renderTextWithPronunciation = (text: string) => {
    if (!text.includes('^')) return text;
    
    return text.split('^').map((sp, i) => (
      <React.Fragment key={i}>
        {i > 0 && <span className="text-purple-600 font-bold text-sm align-top select-none">^</span>}
        {sp}
      </React.Fragment>
    ));
  };

  // Function to parse the marked-down text into React nodes
  const renderHighlightedText = (text: string) => {
    // We need to parse:
    // 1. **bold** -> FC (Red)
    // 2. *italic* -> LR (Blue)
    // 3. <u>underline</u> -> GRA (Green)
    // 4. ^Text -> P (Purple marker)

    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|<u>.*?<\/u>)/g);

    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={index} className="font-bold text-red-600 mx-1" title="Fluency & Coherence">
            {renderTextWithPronunciation(part.slice(2, -2))}
          </span>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <span key={index} className="italic text-blue-600 mx-1" title="Lexical Resource">
             {renderTextWithPronunciation(part.slice(1, -1))}
          </span>
        );
      }
      if (part.startsWith('<u>') && part.endsWith('</u>')) {
        return (
          <span key={index} className="underline decoration-green-500 text-green-700 decoration-2 underline-offset-2 mx-1" title="Grammar">
             {renderTextWithPronunciation(part.slice(3, -4))}
          </span>
        );
      }
      
      // Handle pronunciation carets within standard text
      return <span key={index}>{renderTextWithPronunciation(part)}</span>;
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">🇨🇳 Translation</h3>
        <p className="text-slate-600 leading-relaxed text-lg font-serif">
            {translation}
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex flex-wrap gap-4 mb-4 text-sm bg-slate-50 p-3 rounded-lg">
           <span className="flex items-center"><span className="w-3 h-3 bg-red-600 mr-2 rounded-full"></span><strong>FC (Bold)</strong></span>
           <span className="flex items-center"><span className="w-3 h-3 bg-blue-600 mr-2 rounded-full"></span><span className="italic">LR (Italic)</span></span>
           <span className="flex items-center"><span className="w-3 h-3 bg-green-600 mr-2 rounded-full"></span><span className="underline decoration-green-600">GRA (Underline)</span></span>
           <span className="flex items-center"><span className="text-purple-600 font-bold mr-2">^</span>Pronunciation</span>
        </div>
        <div className="text-lg leading-loose text-slate-800 font-sans">
          {renderHighlightedText(highlightedContent)}
        </div>
      </div>
    </div>
  );
};

export default StepSmartPalette;