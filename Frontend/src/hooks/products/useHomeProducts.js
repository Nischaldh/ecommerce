import { useState, useEffect } from "react";
import { getAllProductsService } from "../../services/product.service";

export const useHomeProducts = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [highestRatedProducts, setHighestRatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      setLoading(true);

      // fetch both in parallel
      const [latestRes, ratedRes] = await Promise.all([
        getAllProductsService({ sort: "created_at_desc", pageSize: 8 }),
        getAllProductsService({ sort: "rating", pageSize: 8 }),
      ]);

      if (latestRes.success) setLatestProducts(latestRes.products);
      if (ratedRes.success) setHighestRatedProducts(ratedRes.products);

      setLoading(false);
    };

    fetchHomeProducts();
  }, []);

  return {
    latestProducts,
    highestRatedProducts,
    loading,
  };
};