const ProductImages = ({
  allImages,
  selectedImage,
  setSelectedImage,
  productName,
}) => {
  return (
    <div className="flex flex-col gap-3 lg:w-[45%] shrink-0">

      {/* Main Image */}
      <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
        <img
          src={selectedImage}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2">
          {allImages.map((img) => (
            <button
              key={img.id}
              onClick={() => setSelectedImage(img.url)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === img.url
                  ? "border-orange-500 shadow-sm"
                  : "border-gray-100 hover:border-orange-300"
              }`}
            >
              <img
                src={img.url}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImages;