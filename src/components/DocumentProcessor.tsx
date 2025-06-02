import React, { useState } from 'react';
import FileUpload from './FileUpload';
import ActionButtons from './ActionButtons';
import ResultDisplay from './ResultDisplay';
import ChatInterface from './ChatInterface';

export interface ProcessedResult {
  content: string;
  type: 'translation' | 'summary';
}

const DocumentProcessor = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ProcessedResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setResult(null);
    setError(null);
  };

  const sendFileToWebhook = async (webhookUrl: string, type: 'translation' | 'summary') => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      setResult({
        content: responseText,
        type: type
      });
    } catch (err) {
      setError(`Failed to process file: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTranslate = () => {
    sendFileToWebhook('http://localhost:5678/webhook/TranslatorAIAgent', 'translation');
  };

  const handleSummarize = () => {
    sendFileToWebhook('http://localhost:5678/webhook/SummarizerAIAgent', 'summary');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Document Processor
          </h1>
          <p className="text-lg text-gray-600">
            Upload your PDF or Excel file to translate, summarize, or chat about its contents
          </p>
        </div>

        <div className="space-y-8">
          <FileUpload onFileUpload={handleFileUpload} />
          
          <ActionButtons
            onTranslate={handleTranslate}
            onSummarize={handleSummarize}
            disabled={!uploadedFile || isProcessing}
            isProcessing={isProcessing}
          />

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {result && (
            <>
              <ResultDisplay result={result} />
              <ChatInterface />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentProcessor;
