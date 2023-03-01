import React from 'react';

const Down = () => {
  return (
    <svg
      className="h-6 w-6 text-white  hover:text-zinc-700/20"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path
        d="M18 15l-6-6l-6 6h12"
        transform="rotate(180 12 12)"
        fill="white"
      />
    </svg>
  );
};

export default Down;
