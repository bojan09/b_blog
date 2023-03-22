// context
import React, { useState, useEffect } from "react";

// next link
import Link from "next/link";

// categories graphql data
import { getCategories } from "@/services";

const Header = () => {
  const [categories, setCategories] = useState([]);

  // fetching data from graphCMS
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);
  return (
    <div className="container mx-auto px-10 mb-8 text-gray-800">
      <div className="border-b w-full inline-block border-purple-800 py-8">
        {/* Logo */}
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl">
              Stojanovska Blog
            </span>
          </Link>
        </div>

        {/* Categories */}
        <div className="hidden md:float-left md:contents">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className="md:float-right mt-2 ml-4 align-middle  cursor-pointer text-lg">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
