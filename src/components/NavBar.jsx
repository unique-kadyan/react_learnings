import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav style={{
            position: "sticky",
            top: 0,
            backgroundColor: "#333",
            padding: "10px 20px",
            width: "fit-content",
            margin: "0 auto",
            zIndex: 500,
        }}>
            <ul style={{
                display: "flex",
                listStyle: "none",
                margin: 0,
                padding: 0,
                gap: "20px",
                alignItems: "center",
            }}>
                <li><Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link></li>
                <li><Link to="/photo" style={{ color: "white", textDecoration: "none" }}>Photo</Link></li>
                <li><Link to="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</Link></li>
                <li><Link to="/posts" style={{ color: "white", textDecoration: "none" }}>Posts</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;