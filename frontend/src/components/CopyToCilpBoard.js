import { useState } from 'react';

const CopyToClipboard = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={text}
        readOnly
        className="mr-2 p-2 border border-gray-300 rounded-md w-64"
      />
      <button
        onClick={handleCopyToClipboard}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default CopyToClipboard;
