
import React from 'react';
import { Languages, FileText, Copy, Check } from 'lucide-react';
import { ProcessedResult } from './DocumentProcessor';

interface ResultDisplayProps {
  result: ProcessedResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const icon = result.type === 'translation' ? Languages : FileText;
  const title = result.type === 'translation' ? 'Translation Result' : 'Summary Result';
  const bgColor = result.type === 'translation' ? 'bg-blue-50' : 'bg-purple-50';
  const borderColor = result.type === 'translation' ? 'border-blue-200' : 'border-purple-200';
  const iconColor = result.type === 'translation' ? 'text-blue-600' : 'text-purple-600';

  const Icon = icon;

  return (
    <div className={`${bgColor} ${borderColor} border rounded-lg p-6`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon className={`w-6 h-6 ${iconColor}`} />
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="text-sm">Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="bg-white rounded-lg p-4 border">
        <pre className="whitespace-pre-wrap text-gray-800 font-sans leading-relaxed">
          {result.content}
        </pre>
      </div>
    </div>
  );
};

export default ResultDisplay;
