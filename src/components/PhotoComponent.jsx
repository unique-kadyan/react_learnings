import { useEffect, useState, useRef, useCallback } from "react";
import { PHOTO_BASE_URL } from "../assets/ApiResources";

const LIMIT = 5;
// const TOTAL_PAGES = 50;

const PhotoComponent = () => {
  const [imageUrl, setImageUrl] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef(null);

  const fetchPhotos = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${PHOTO_BASE_URL}/products?limit=${LIMIT}`
      );
      const data = await response.json();
      const newImages = data.map((photo) => photo.image);
      setImageUrl((prev) => {
        const existing = new Set(prev);
        const unique = newImages.filter((img) => !existing.has(img));
        if (unique.length === 0) return prev;
        return [...prev, ...unique];
      });
      setHasMore(false);
    } catch (error) {
      console.error("Error fetching image:", error);
      setError("Failed to fetch image");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const lastImageRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPhotos();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchPhotos]
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
        {imageUrl.length > 0 ? (
          imageUrl.map((image, id) => (
            <li
              key={id}
              ref={id === imageUrl.length - 1 ? lastImageRef : null}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={image}
                alt={`Image ${id + 1}`}
                style={{ width: "100%", height: "150px", objectFit: "contain" }}
              />
            </li>
          ))
        ) : (
          !loading && <p>No images found.</p>
        )}
      </ul>
      {loading && <p>Loading more photos...</p>}
      {!hasMore && <p>All photos loaded.</p>}
    </div>
  );
};

export default PhotoComponent;
