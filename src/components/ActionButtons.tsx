
import React from 'react';
import { Languages, FileText, Loader2 } from 'lucide-react';

interface ActionButtonsProps {
  onTranslate: () => void;
  onSummarize: () => void;
  disabled: boolean;
  isProcessing: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onTranslate,
  onSummarize,
  disabled,
  isProcessing
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        onClick={onTranslate}
        disabled={disabled}
        className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
      >
        {isProcessing ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Languages className="w-5 h-5" />
        )}
        <span>Translate</span>
      </button>

      <button
        onClick={onSummarize}
        disabled={disabled}
        className="flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
      >
        {isProcessing ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <FileText className="w-5 h-5" />
        )}
        <span>Summarize</span>
      </button>
    </div>
  );
};

export default ActionButtons;
