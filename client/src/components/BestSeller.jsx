import React, { useContext } from "react";
import ProductCards from "./ProductCards";
import MyContext from "../context/context";

const BestSeller = () => {
  const { products } = useContext(MyContext);

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Best Seller</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCards key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default BestSeller;
