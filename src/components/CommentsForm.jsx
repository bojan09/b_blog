import React, { useState, useEffect, useRef } from "react";

// comments data from services
import { submitComment } from "@/services";

const CommentsForm = ({ slug }) => {
  // states
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // using ref to read value from input field, and keeping track of the input state
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem("name");
    emailEl.current.value = window.localStorage.getItem("email");
  }, []);

  // Comment Submit Button
  const handleCommentSubbission = () => {
    setError(false);

    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    // If user wants his data to be stored, then we add it to localStorage. If not we don't
    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2500);
    });
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Пиши нешо, ако сакаш
      </h3>
      {/* Comment */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Comment"
          name="Comment"
        />
      </div>
      {/* Name */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 ">
        <input
          type="text"
          ref={nameEl}
          className="p-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Name"
          name="Name"
        />

        {/* Email */}
        <input
          type="email"
          ref={emailEl}
          className="p-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Email"
          name="Email"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            className="text-gray-500 ml-2 cursor-pointer"
            htmlFor="storeData"
          >
            Save my e-mail and name for the next time I comment
          </label>
        </div>
      </div>

      {error && (
        <p className="text-sx text-red-500">All fields are required.</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubbission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-blog bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Постирај коментар
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-indigo-900 bg-green-300 opacity-70 p-2 rounded-md">
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
