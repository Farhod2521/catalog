import React from "react";
import clsx from "clsx";

const Template = ({ handleClickFormat = () => {}, active = 0 }) => {
  return (
    <div className={"col-span-12 hidden mobile:flex gap-x-[10px] mb-[30px]"}>
      <button
        onClick={() => handleClickFormat(0)}
        className={clsx("bg-transparent text-[#28366D] rounded-[5px]", {
          "!bg-[#1890FF] !text-white": active == 0,
        })}
      >
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_475_3020)">
            <path
              d="M7.3335 11H17.4168"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.3335 18.3335H17.4168"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.3335 25.6665H17.4168"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.3335 33H17.4168"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26.5835 11H36.6668"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26.5835 18.3335H36.6668"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26.5835 25.6665H36.6668"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26.5835 33H36.6668"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_475_3020">
              <rect width="44" height="44" rx="5" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>

      <button
        onClick={() => handleClickFormat(1)}
        className={clsx("bg-transparent text-[#28366D] rounded-[5px]", {
          "!bg-[#1890FF] !text-white": active == 1,
        })}
      >
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_475_3032)">
            <path
              d="M7.3335 9.16683C7.3335 8.6806 7.52665 8.21428 7.87047 7.87047C8.21428 7.52665 8.6806 7.3335 9.16683 7.3335H16.5002C16.9864 7.3335 17.4527 7.52665 17.7965 7.87047C18.1403 8.21428 18.3335 8.6806 18.3335 9.16683V16.5002C18.3335 16.9864 18.1403 17.4527 17.7965 17.7965C17.4527 18.1403 16.9864 18.3335 16.5002 18.3335H9.16683C8.6806 18.3335 8.21428 18.1403 7.87047 17.7965C7.52665 17.4527 7.3335 16.9864 7.3335 16.5002V9.16683Z"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M25.6665 9.16683C25.6665 8.6806 25.8597 8.21428 26.2035 7.87047C26.5473 7.52665 27.0136 7.3335 27.4998 7.3335H34.8332C35.3194 7.3335 35.7857 7.52665 36.1295 7.87047C36.4734 8.21428 36.6665 8.6806 36.6665 9.16683V16.5002C36.6665 16.9864 36.4734 17.4527 36.1295 17.7965C35.7857 18.1403 35.3194 18.3335 34.8332 18.3335H27.4998C27.0136 18.3335 26.5473 18.1403 26.2035 17.7965C25.8597 17.4527 25.6665 16.9864 25.6665 16.5002V9.16683Z"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.3335 27.4998C7.3335 27.0136 7.52665 26.5473 7.87047 26.2035C8.21428 25.8597 8.6806 25.6665 9.16683 25.6665H16.5002C16.9864 25.6665 17.4527 25.8597 17.7965 26.2035C18.1403 26.5473 18.3335 27.0136 18.3335 27.4998V34.8332C18.3335 35.3194 18.1403 35.7857 17.7965 36.1295C17.4527 36.4734 16.9864 36.6665 16.5002 36.6665H9.16683C8.6806 36.6665 8.21428 36.4734 7.87047 36.1295C7.52665 35.7857 7.3335 35.3194 7.3335 34.8332V27.4998Z"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M25.6665 27.4998C25.6665 27.0136 25.8597 26.5473 26.2035 26.2035C26.5473 25.8597 27.0136 25.6665 27.4998 25.6665H34.8332C35.3194 25.6665 35.7857 25.8597 36.1295 26.2035C36.4734 26.5473 36.6665 27.0136 36.6665 27.4998V34.8332C36.6665 35.3194 36.4734 35.7857 36.1295 36.1295C35.7857 36.4734 35.3194 36.6665 34.8332 36.6665H27.4998C27.0136 36.6665 26.5473 36.4734 26.2035 36.1295C25.8597 35.7857 25.6665 35.3194 25.6665 34.8332V27.4998Z"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_475_3032">
              <rect width="44" height="44" rx="5" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>

      <button
        onClick={() => handleClickFormat(2)}
        className={clsx("bg-transparent text-[#28366D] rounded-[5px]", {
          "!bg-[#1890FF] !text-white": active == 2,
        })}
      >
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_475_3038)">
            <path
              d="M7.3335 9.16683C7.3335 9.65306 7.52665 10.1194 7.87047 10.4632C8.21428 10.807 8.6806 11.0002 9.16683 11.0002C9.65306 11.0002 10.1194 10.807 10.4632 10.4632C10.807 10.1194 11.0002 9.65306 11.0002 9.16683C11.0002 8.6806 10.807 8.21428 10.4632 7.87047C10.1194 7.52665 9.65306 7.3335 9.16683 7.3335C8.6806 7.3335 8.21428 7.52665 7.87047 7.87047C7.52665 8.21428 7.3335 8.6806 7.3335 9.16683Z"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.1665 9.16683C20.1665 9.65306 20.3597 10.1194 20.7035 10.4632C21.0473 10.807 21.5136 11.0002 21.9998 11.0002C22.4861 11.0002 22.9524 10.807 23.2962 10.4632C23.64 10.1194 23.8332 9.65306 23.8332 9.16683C23.8332 8.6806 23.64 8.21428 23.2962 7.87047C22.9524 7.52665 22.4861 7.3335 21.9998 7.3335C21.5136 7.3335 21.0473 7.52665 20.7035 7.87047C20.3597 8.21428 20.1665 8.6806 20.1665 9.16683Z"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M33 9.16683C33 9.65306 33.1932 10.1194 33.537 10.4632C33.8808 10.807 34.3471 11.0002 34.8333 11.0002C35.3196 11.0002 35.7859 10.807 36.1297 10.4632C36.4735 10.1194 36.6667 9.65306 36.6667 9.16683C36.6667 8.6806 36.4735 8.21428 36.1297 7.87047C35.7859 7.52665 35.3196 7.3335 34.8333 7.3335C34.3471 7.3335 33.8808 7.52665 33.537 7.87047C33.1932 8.21428 33 8.6806 33 9.16683Z"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.3335 21.9998C7.3335 22.4861 7.52665 22.9524 7.87047 23.2962C8.21428 23.64 8.6806 23.8332 9.16683 23.8332C9.65306 23.8332 10.1194 23.64 10.4632 23.2962C10.807 22.9524 11.0002 22.4861 11.0002 21.9998C11.0002 21.5136 10.807 21.0473 10.4632 20.7035C10.1194 20.3597 9.65306 20.1665 9.16683 20.1665C8.6806 20.1665 8.21428 20.3597 7.87047 20.7035C7.52665 21.0473 7.3335 21.5136 7.3335 21.9998Z"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.1665 21.9998C20.1665 22.4861 20.3597 22.9524 20.7035 23.2962C21.0473 23.64 21.5136 23.8332 21.9998 23.8332C22.4861 23.8332 22.9524 23.64 23.2962 23.2962C23.64 22.9524 23.8332 22.4861 23.8332 21.9998C23.8332 21.5136 23.64 21.0473 23.2962 20.7035C22.9524 20.3597 22.4861 20.1665 21.9998 20.1665C21.5136 20.1665 21.0473 20.3597 20.7035 20.7035C20.3597 21.0473 20.1665 21.5136 20.1665 21.9998Z"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M33 21.9998C33 22.4861 33.1932 22.9524 33.537 23.2962C33.8808 23.64 34.3471 23.8332 34.8333 23.8332C35.3196 23.8332 35.7859 23.64 36.1297 23.2962C36.4735 22.9524 36.6667 22.4861 36.6667 21.9998C36.6667 21.5136 36.4735 21.0473 36.1297 20.7035C35.7859 20.3597 35.3196 20.1665 34.8333 20.1665C34.3471 20.1665 33.8808 20.3597 33.537 20.7035C33.1932 21.0473 33 21.5136 33 21.9998Z"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.3335 34.8333C7.3335 35.3196 7.52665 35.7859 7.87047 36.1297C8.21428 36.4735 8.6806 36.6667 9.16683 36.6667C9.65306 36.6667 10.1194 36.4735 10.4632 36.1297C10.807 35.7859 11.0002 35.3196 11.0002 34.8333C11.0002 34.3471 10.807 33.8808 10.4632 33.537C10.1194 33.1932 9.65306 33 9.16683 33C8.6806 33 8.21428 33.1932 7.87047 33.537C7.52665 33.8808 7.3335 34.3471 7.3335 34.8333Z"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.1665 34.8333C20.1665 35.3196 20.3597 35.7859 20.7035 36.1297C21.0473 36.4735 21.5136 36.6667 21.9998 36.6667C22.4861 36.6667 22.9524 36.4735 23.2962 36.1297C23.64 35.7859 23.8332 35.3196 23.8332 34.8333C23.8332 34.3471 23.64 33.8808 23.2962 33.537C22.9524 33.1932 22.4861 33 21.9998 33C21.5136 33 21.0473 33.1932 20.7035 33.537C20.3597 33.8808 20.1665 34.3471 20.1665 34.8333Z"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M33 34.8333C33 35.3196 33.1932 35.7859 33.537 36.1297C33.8808 36.4735 34.3471 36.6667 34.8333 36.6667C35.3196 36.6667 35.7859 36.4735 36.1297 36.1297C36.4735 35.7859 36.6667 35.3196 36.6667 34.8333C36.6667 34.3471 36.4735 33.8808 36.1297 33.537C35.7859 33.1932 35.3196 33 34.8333 33C34.3471 33 33.8808 33.1932 33.537 33.537C33.1932 33.8808 33 34.3471 33 34.8333Z"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_475_3038">
              <rect width="44" height="44" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
};

export default Template;
