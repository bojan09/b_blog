import React, { useState, useEffect } from "react";

// next link
import Link from "next/link";

// categories graphql data
import { getCategories } from "@/services";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  // fetching data from graphCMS
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-12">Categories</h3>
      {categories.map((category) => (
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <span className="cursor-pointer block pb-3 mb-3">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
