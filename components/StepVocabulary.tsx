import React from 'react';
import { VocabularyItem } from '../types';

interface Props {
  vocabulary: VocabularyItem[];
  showReplacement: boolean;
}

const StepVocabulary: React.FC<Props> = ({ vocabulary, showReplacement }) => {
  return (
    <div className="overflow-hidden bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Expression</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Explanation & Pronunciation</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Example</th>
              {showReplacement && (
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider text-blue-600">Replacement (Band 6+)</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {vocabulary.map((item, index) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-normal text-sm font-bold text-slate-900">
                  {item.expression}
                </td>
                <td className="px-6 py-4 whitespace-normal text-sm text-slate-600">
                  {item.explanation}
                </td>
                <td className="px-6 py-4 whitespace-normal text-sm text-slate-600 italic">
                  "{item.example}"
                </td>
                {showReplacement && (
                  <td className="px-6 py-4 whitespace-normal text-sm text-blue-600 font-medium">
                    {item.replacement || '-'}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StepVocabulary;
