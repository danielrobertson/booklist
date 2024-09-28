'use client';

import React, { useEffect, useState } from 'react';

type Props = {
  listId: string;
};

function ShareLink({ listId }: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const [url, setUrl] = useState(`book-list.io/${listId}`);

  useEffect(() => {
    const copyableUrl = `${window.location.host}/${listId}`;
    if (copyableUrl !== url) {
      setUrl(copyableUrl);
    }
  }, [listId]);

  const handleClick = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => setIsCopied(true))
      .catch(function (err) {
        console.error('Error in copying text: ', err);
      });
  };

  return (
    <div className="mt-4 w-full lg:max-w-[20rem]">
      <div className="mb-2 flex justify-between items-center">
        <label htmlFor="copy-url" className="text-sm font-medium text-gray-900">
          Link to share
        </label>
      </div>
      <div className="relative">
        <input
          id="copy-url"
          type="text"
          className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4"
          value={url}
          disabled
          readOnly
        />
        <button
          className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 hover:bg-gray-100 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border"
          onClick={handleClick}
        >
          {isCopied ? (
            <span id="success-message" className="inline-flex items-center">
              <svg
                className="w-3 h-3 text-blue-700  me-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-500">
                Copied
              </span>
            </span>
          ) : (
            <span id="default-message" className="inline-flex items-center">
              <svg
                className="w-3 h-3 me-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
              </svg>
              <span className="text-xs font-semibold">Copy</span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default ShareLink;
