import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApiFetch from "./ApiFetch";
import NavBar from "./NavBar";
import ProfileComponent from "./ProfileCompoent";
import PhotoComponent from "./PhotoComponent";

const About = () => <h2>About</h2>;
const Contact = () => <h2>Contact</h2>;

export const RouterComponent = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProfileComponent />} />
        <Route path="/posts" element={<ApiFetch />} />
        <Route path="/photo" element={<PhotoComponent />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};
