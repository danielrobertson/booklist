import React from 'react'

type Props = {}

export default function BookTile({}: Props) {
  return (
    <div className="m-5 flex border p-3 shadow-xl">
      <img
        src="data:image/jpeg;base64,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"
        alt="book cover"
      />
      <div className="text-left">
        <h2 className="text-2xl">The Great Gatsby</h2>
        <div className="text-gray-500">F. Scott Fitzgerald</div>
        <div className="mt-4 w-fit rounded bg-gray-200 px-2 italic text-gray-800">
          Tragedy
        </div>
        <ul className="mt-5 flex">
          <li>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="star"
              className="mr-1 w-4 text-yellow-500"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
              ></path>
            </svg>
          </li>
          <li>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="star"
              className="mr-1 w-4 text-yellow-500"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
              ></path>
            </svg>
          </li>
          <li>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="star"
              className="mr-1 w-4 text-yellow-500"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
              ></path>
            </svg>
          </li>
          <li>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="star"
              className="mr-1 w-4 text-yellow-500"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
              ></path>
            </svg>
          </li>
          <li>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="star"
              className="w-4 text-yellow-500"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
              ></path>
            </svg>
          </li>
        </ul>
      </div>
    </div>
  )
}
