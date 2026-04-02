import { useState, useEffect } from "react";
import { getAllProductsService } from "../../services/product.service";

export const useHomeProducts = () => {
  
  const [latestProducts, setLatestProducts] = useState([]);
  const [highestRatedProducts, setHighestRatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      setLoading(true);

      
      const reusult = await Promise.allSettled([
        getAllProductsService({ sort: "created_at_desc", pageSize: 8 }),
        getAllProductsService({ sort: "rating", pageSize: 8 }),
      ]);

      const latestRes = reusult[0].status === "fulfilled" ? reusult[0].value : { success: false };
      const ratedRes = reusult[1].status === "fulfilled" ? reusult[1].value : { success: false };
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