// pages/SellerDetail.jsx
import { useSellerDetail } from "@/hooks/sellers/useSellerDetail";
import SellerProfile from "@/components/Sellers/SellerProfile";
import SellerFilters from "@/components/Sellers/SellerFilters";
import SellerProducts from "@/components/Sellers/SellerProducts";
import SellerDetailSkeleton from "@/components/Sellers/SellerDetailSkeleton";

const SellerDetail = () => {
  const {
    seller,
    sellerLoading,
    products,
    productsTotal,
    loading,
    productFilters,
    totalPages,
    sortOptions,
    searchInput,
    setSearchInput,
    priceInput,
    setPriceInput,
    hasActiveFilters,
    handleSortChange,
    handlePriceApply,
    handlePriceClear,
    handlePageChange,
    handleClearFilters,
  } = useSellerDetail();

  if (sellerLoading) return (
    <div className="py-6 flex flex-col gap-6">
      <SellerDetailSkeleton/>
    </div>
  );

  if (!seller) return null;

  return (
    <div className="py-6 flex flex-col gap-6">

      {/* Seller profile */}
      <SellerProfile seller={seller} />

      {/* Products section */}
      <div className="flex gap-6">
        <SellerFilters
          sortOptions={sortOptions}
          productFilters={productFilters}
          priceInput={priceInput}
          setPriceInput={setPriceInput}
          handleSortChange={handleSortChange}
          handlePriceApply={handlePriceApply}
          handlePriceClear={handlePriceClear}
        />
        <SellerProducts
          sellerName={seller.name}
          products={products}
          productsTotal={productsTotal}
          loading={loading}
          productFilters={productFilters}
          totalPages={totalPages}
          sortOptions={sortOptions}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          hasActiveFilters={hasActiveFilters}
          handleSortChange={handleSortChange}
          handlePageChange={handlePageChange}
          handleClearFilters={handleClearFilters}
        />
      </div>
    </div>
  );
};

export default SellerDetail;