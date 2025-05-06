import React, { useContext, useEffect, useState } from "react";
import MyContext from "../context/context";
import ProductCards from "../components/ProductCards";

const AllProducts = () => {
  const { products, searchQuery } = useContext(MyContext);
  console.log("products", products);
  const [filteresProducts, setFilteresProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteresProducts(
        products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteresProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
        {filteresProducts
          .filter((product) => product.inStock)
          .map((product, index) => (
            <ProductCards key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
