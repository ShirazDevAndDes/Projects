import { BrowserRouter, Route, Routes } from "react-router-dom";

import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";
import Home from "./Home";
import Post from "./pages/post";
import Layout from "./components/layout";
import AdminLayout from "./components/adminLayout";
import Profile from "./pages/admin/profile";
import Dashboard from "./pages/admin/dashboard";
import AddCategory from "./pages/admin/addCategory";
import AddTags from "./pages/admin/addTags";
import CreatePost from "./pages/admin/createPost";
import EditPost from "./pages/admin/editPost";
import AdminLogin from "./pages/admin/adminLogin";
import Search from "./pages/search";
import Category from "./pages/caregory";
import LatestPosts from "./pages/latestPosts";
import LatestCategories from "./pages/latestCategory";
import ProtectedRoute from "./components/protectedRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/post" element={<LatestPosts />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/search/:search" element={<Search />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/category" element={<LatestCategories />} />
          </Route>
          <Route path="/admin/" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/addCategory" element={<AddCategory />} />
              <Route path="/admin/addTags" element={<AddTags />} />
              <Route path="/admin/createPost" element={<CreatePost />} />
              <Route path="/admin/editPost" element={<EditPost />} />
              <Route path="/admin/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
