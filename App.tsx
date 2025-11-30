import React, { useState } from 'react';
import { generateScaffolding } from './services/geminiService';
import { TopicType, ScaffoldingResponse, UserInput } from './types';
import StepSmartPalette from './components/StepSmartPalette';
import StepVocabulary from './components/StepVocabulary';
import StepCloze from './components/StepCloze';
import StepMindmap from './components/StepMindmap';
import StepQnA from './components/StepQnA';

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [topicType, setTopicType] = useState<TopicType>(TopicType.Person);
  const [targetScore, setTargetScore] = useState<number>(6.5);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScaffoldingResponse | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const input: UserInput = { text, topicType, targetScore };
      const response = await generateScaffolding(input);
      setResult(response);
    } catch (err: any) {
      setError(err.message || 'Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadSample = () => {
    setText(`I'd like to talk about a traditional market I visited in Kyoto, Japan, called Nishiki Market. It is located in downtown Kyoto and is known as "Kyoto's Kitchen". I went there last spring with my best friend during our trip to Japan.

The market is essentially a long, narrow shopping street lined with more than one hundred shops and restaurants. What makes it unique is the incredible variety of food available, from fresh seafood and local produce to Japanese sweets and pickles. The atmosphere was vibrant and bustling, filled with the aroma of grilled foods and the sounds of merchants calling out to customers.

We spent the whole afternoon there, trying different snacks like octopus crackers and soy milk donuts. It was a memorable experience not only because of the delicious food but also because it gave me a glimpse into the local culinary culture of Kyoto. I definitely want to visit it again.`);
    setTopicType(TopicType.Place);
    setTargetScore(7.0);
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      {/* Sidebar Input */}
      <aside className="w-full md:w-96 bg-white border-r border-slate-200 p-6 flex flex-col h-auto md:h-screen md:sticky md:top-0 overflow-y-auto z-10">
        <h1 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
          <span className="text-3xl">🎤</span> IELTS AI 
        </h1>
        <p className="text-sm text-slate-500 mb-6">Speaking Scaffolding Tool</p>

        <div className="space-y-6 flex-1">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Topic Type</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(TopicType).map((type) => (
                <button
                  key={type}
                  onClick={() => setTopicType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    topicType === type
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
             <label className="block text-sm font-semibold text-slate-700 mb-2">Target Score</label>
             <div className="flex items-center gap-4">
               <input 
                  type="range" 
                  min="4.0" 
                  max="9.0" 
                  step="0.5" 
                  value={targetScore}
                  onChange={(e) => setTargetScore(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
               />
               <span className="text-lg font-bold text-blue-600 w-12">{targetScore}</span>
             </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-slate-700">Part 2 Story</label>
              <button onClick={loadSample} className="text-xs text-blue-500 hover:underline">Load Sample</button>
            </div>
            <textarea
              className="w-full h-64 p-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none text-slate-700"
              placeholder="Paste your story here (Opening, Body, Conclusion)..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleGenerate}
            disabled={loading || !text}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform active:scale-95 flex justify-center items-center gap-2 ${
              loading || !text ? 'bg-slate-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200/50'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Generate Scaffolding'
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto bg-slate-50">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {!result && !loading && !error && (
            <div className="text-center py-20 opacity-50">
              <div className="text-6xl mb-4">🚀</div>
              <h2 className="text-2xl font-bold text-slate-700">Ready to boost your Speaking Score?</h2>
              <p className="text-slate-500">Enter your story on the left to generate your custom learning guide.</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 rounded-r-lg">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {result && (
            <>
              {/* Step 1 */}
              <section className="animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">1</div>
                   <h2 className="text-2xl font-bold text-slate-800">Smart Palette & Translation</h2>
                </div>
                <StepSmartPalette 
                  translation={result.translation}
                  highlightedContent={result.highlightedContent}
                />
              </section>

              {/* Step 2 */}
              <section className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                 <div className="flex items-center gap-3 mb-6">
                   <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">2</div>
                   <h2 className="text-2xl font-bold text-slate-800">Core Vocabulary Library</h2>
                </div>
                <StepVocabulary 
                  vocabulary={result.vocabulary} 
                  showReplacement={targetScore >= 6.0}
                />
              </section>

              {/* Step 3 */}
              <section className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                 <div className="flex items-center gap-3 mb-6">
                   <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">3</div>
                   <h2 className="text-2xl font-bold text-slate-800">Semi-Structured Cloze</h2>
                </div>
                <StepCloze clozeContent={result.clozeContent} />
              </section>

              {/* Step 4 */}
              <section className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                 <div className="flex items-center gap-3 mb-6">
                   <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">4</div>
                   <h2 className="text-2xl font-bold text-slate-800">Logical Mindmap</h2>
                </div>
                <StepMindmap mindmap={result.mindmap} />
              </section>

              {/* Step 5 */}
              <section className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                 <div className="flex items-center gap-3 mb-6">
                   <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">5</div>
                   <h2 className="text-2xl font-bold text-slate-800">Self-Check Q&A</h2>
                </div>
                <StepQnA questions={result.questions} />
              </section>
            </>
          )}
        </div>
      </main>

      {/* Styles for simple animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
