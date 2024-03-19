import React, { useState } from "react";
import {
  ArrowCounterclockwise,
  Paperclip,
  PlayFill,
  ShareFill,
} from "react-bootstrap-icons";
import toast from "react-hot-toast";

const ButtonRow = () => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyURL = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    toast.success("Share Link Copied!", {
      duration: 3000,
    });
    setTimeout(() => {
      setIsCopied(false);
    }, 700);
  };

  return (
    <div className="mt-4">
      <button
        className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold w-full mb-4 flex items-center justify-center disabled:opacity-50"
        disabled
      >
        <PlayFill size={20} className="mr-1" />
        Simulate
      </button>
      <div className="grid grid-cols-2 gap-4">
        <button
          className="bg-gray-200 text-primary-600 px-6 py-2 rounded-lg font-semibold flex items-center justify-center disabled:opacity-50"
          onClick={handleCopyURL}
          disabled={isCopied}
        >
          {isCopied ? (
            <>
              <Paperclip size={14} className="mr-1" />
              Copied
            </>
          ) : (
            <>
              <ShareFill size={14} className="mr-1" />
              Share
            </>
          )}
        </button>
        <button
          className="bg-gray-200 text-red-500 px-6 py-2 rounded-lg font-semibold flex items-center justify-center disabled:opacity-50"
          disabled
        >
          <ArrowCounterclockwise size={14} className="mr-1" />
          Reset
        </button>
      </div>
    </div>
  );
};

export default ButtonRow;
