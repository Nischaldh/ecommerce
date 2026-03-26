import ProductDetailSkeleton from "@/components/Products/ProductDetailSkeleton";
import ProductImages from "@/components/Products/ProductImages";
import ProductInfo from "@/components/Products/ProductInfo";
import ProductReviews from "@/components/Products/ProductReviews";
import { useProductDetail } from "@/hooks/products/useProductDetail";

const ProductDetail = () => {
  const {
    product,
    productLoading,
    allImages,
    selectedImage,
    setSelectedImage,
    isSeller,
    handleDeleteProduct,
    addingToCart,
    handleAddToCart,
    handleBuyNow,
  } = useProductDetail();

  if (productLoading) return <ProductDetailSkeleton />;
  if (!product) return null;

  const formattedDate = new Date(product.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col gap-12 py-6">
      <section className="flex flex-col lg:flex-row gap-8">
        <ProductImages
          allImages={allImages}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          productName={product.name}
        />
        <ProductInfo
          product={product}
          formattedDate={formattedDate}
          isSeller={isSeller}
          addingToCart={addingToCart}
          handleAddToCart={handleAddToCart}
          handleBuyNow={handleBuyNow}
          handleDeleteProduct={handleDeleteProduct}
        />
      </section>
      <hr className="border-gray-100" />
      <ProductReviews />
    </div>
  );
};

export default ProductDetail;