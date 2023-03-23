import React from "react";

// next image component
import Image from "next/image";

const Author = ({ author }) => {
  return (
    <div className="text-center mt-20 mb-8 p-6 relative rounded-lg bg-black bg-opacity-25">
      {/* Author Image Container */}
      <div className="absolute left-0 right-0 -top-14">
        <Image
          unoptimized
          height="100"
          width="100"
          src={author.photo.url}
          alt={author.name}
          className="align-middle rounded-full"
        />
      </div>
      {/* Author Name & Bio */}
      <h3 className="text-white my-4 text-xl font-bold">{author.name}</h3>
      <p className="text-white text-lg pb-2">{author.bio}</p>
    </div>
  );
};

export default Author;
