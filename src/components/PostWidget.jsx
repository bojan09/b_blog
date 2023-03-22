import React, { useState, useEffect } from "react";

// moment library for date formatting
import moment from "moment";

// next link
import Link from "next/link";
import { getRecentPosts, getSimmilarPosts } from "@/services";

// post widget graphql data
const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimmilarPosts(category, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);

  console.log(relatedPosts);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>

      {relatedPosts.map((post) => (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img
              alt={post.title}
              className="align-middle rounded-full w-16 h-16"
              src={post.featuredImage.url}
            />
          </div>

          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-light ">
              {moment(post.createdAt).format("DD MMM YYYY")}
            </p>

            <Link
              href={`/post/${post.slug}`}
              className="text-md font-extralight hover:font-normal text-gray-800"
              key={post.title}
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
