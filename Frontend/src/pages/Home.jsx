import Footer from "@/components/Footer";
import Hero from "@/components/Home/Hero";
import ProductSection from "@/components/Home/ProductSection";
import { useHomeProducts } from "@/hooks/products/useHomeProducts";
import React from "react";

const Home = () => {
  const { latestProducts, highestRatedProducts, loading } = useHomeProducts();
  return (
    <div className="flex flex-col">
      <Hero />
      <ProductSection
        title="Latest Products"
        subtitle="Fresh arrivals just added to the store"
        products={latestProducts}
        loading={loading}
        viewMoreLink="/products?sort=created_at_desc"
      />

      <hr />

      <ProductSection
        title="Highest Rated"
        subtitle="Loved by our customers"
        products={highestRatedProducts}
        loading={loading}
        viewMoreLink="/products?sort=rating"
      />
    </div>
  );
};

export default Home;
