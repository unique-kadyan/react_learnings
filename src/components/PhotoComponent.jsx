import { useEffect, useState, useRef, useCallback } from "react";
import { PHOTO_BASE_URL } from "../assets/ApiResources";

const BATCH_SIZE = 5;

const PhotoComponent = () => {
  const [imageUrl, setImageUrl] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);
  const observer = useRef(null);

  const fetchBatch = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const limit = pageRef.current * BATCH_SIZE;
      const response = await fetch(
        `${PHOTO_BASE_URL}/products?limit=${limit}`,
      );
      const data = await response.json();
      const newImages = data.map(({ id, title, image, price, description, rating }) => ({
        id, title, image, price, description, rating,
      }));
      if (newImages.length === imageUrl.length) {
        setHasMore(false);
      } else {
        setImageUrl(newImages);
        pageRef.current += 1;
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, imageUrl.length]);

  useEffect(() => {
    fetchBatch();
  }, []);

  const lastImageRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchBatch();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchBatch],
  );

  return (
    <div style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul
        style={{
          listStyle: "none",
          padding: "20px",
          margin: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {imageUrl.length > 0
          ? imageUrl.map((itr, index) => (
              <li
                key={itr.id}
                ref={index === imageUrl.length - 1 ? lastImageRef : null}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  padding: "15px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img
                  src={itr.image}
                  alt={itr.title}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "contain",
                  }}
                />
                <h3 style={{ color: "#333", fontSize: "14px", margin: 0, textAlign: "center" }}>
                  {itr.title}
                </h3>
                <p style={{ color: "green", fontSize: "16px", fontWeight: "bold", margin: 0 }}>
                  ${itr.price}
                </p>
                <p style={{ color: "#666", fontSize: "12px", margin: 0, textAlign: "center", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
                  {itr.description}
                </p>
                <p style={{ color: "orange", fontSize: "12px", margin: 0 }}>
                  ⭐ {itr.rating.rate} ({itr.rating.count} reviews)
                </p>
              </li>
            ))
          : !loading && <p>No images found.</p>}
      </ul>
      {loading && <p>Loading more photos...</p>}
      {!hasMore && <p>All photos loaded.</p>}
    </div>
  );
};

export default PhotoComponent;
