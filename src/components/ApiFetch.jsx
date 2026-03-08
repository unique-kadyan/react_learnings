import { useState, useEffect } from "react";
import { API_BASE_URL } from "../assets/ApiResources";

function ApiFetch() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_BASE_URL}/posts`);
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ color: "red", fontSize: 16 }}>API Fetch Example</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul
        style={{
          maxHeight: "500px",
          overflowY: "auto",
          listStyle: "none",
          padding: "auto",
        //   marginTop: 100,
          
        }}
      >
        {posts.map((post) => (
          <>
            <li key={post.id} style={{ color: "blue", fontSize: "12px", marginBlockStart: 20 }}>
              User id : {post.userId}
            </li>
            <li key={post.id} style={{ color: "orange", fontSize: "10px" }}>
              Post id : {post.id}
            </li>
            <li key={post.id} style={{ color: "green", fontSize: "14px" }}>
              <h3>{post.title}</h3>
            </li>
            <li key={post.id} style={{ color: "gray", fontSize: "16px", marginBottom: 50 }}>
              {post.body}
            </li>
          </>
        ))}
      </ul>
    </div>
  );
}

export default ApiFetch;
