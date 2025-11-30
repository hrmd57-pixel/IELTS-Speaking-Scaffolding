import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    mermaid: any;
  }
}

interface Props {
  mindmap: string;
}

const StepMindmap: React.FC<Props> = ({ mindmap }) => {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (window.mermaid) {
      window.mermaid.initialize({ 
        startOnLoad: true,
        theme: 'neutral',
        flowchart: { curve: 'basis' },
        securityLevel: 'loose',
      });
    }
  }, []);

  useEffect(() => {
    const renderMermaid = async () => {
      if (!window.mermaid || !mindmap) return;
      
      try {
        // Clean up markdown markers if present
        const cleanMindmap = mindmap.replace(/```mermaid/g, '').replace(/```/g, '').trim();
        
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await window.mermaid.render(id, cleanMindmap);
        setSvgContent(svg);
        setError(null);
      } catch (err) {
        console.error('Mermaid render error:', err);
        setError('Could not render visual mindmap. Showing code instead.');
      }
    };

    renderMermaid();
  }, [mindmap]);

  return (
    <div className="bg-white p-4 md:p-8 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center">
      {error ? (
        <div className="w-full">
           <p className="text-red-500 mb-2 text-sm">{error}</p>
           <pre className="bg-slate-100 p-4 rounded text-xs font-mono overflow-auto">{mindmap}</pre>
        </div>
      ) : (
        <div 
          ref={mermaidRef}
          className="w-full overflow-x-auto flex justify-center items-center min-h-[300px]"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      )}
      <p className="mt-6 text-sm text-slate-500 text-center italic">
        Visual Mindmap: Use these keywords as triggers to reconstruct your story.
      </p>
    </div>
  );
};

export default StepMindmap;