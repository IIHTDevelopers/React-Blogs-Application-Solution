import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [editBlog, setEditBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const addBlog = async (blog) => {
    try {
      const addedBlog = await axios.post('http://localhost:4000/blogs', blog);
      setBlogs([...blogs, addedBlog.data]);
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      await axios.delete(`http://localhost:4000/blogs/${blogId}`);
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const updateBlog = async (blog) => {
    try {
      await axios.put(`http://localhost:4000/blogs/${blog.id}`, blog);
      setBlogs(
        blogs.map((b) => (b.id === blog.id ? { ...b, ...blog } : b))
      );
      setEditBlog(null);
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div>
      <h2>Welcome to your Blog</h2>
      <h2>Blog Form</h2>
      <BlogForm addBlog={addBlog} editBlog={editBlog} updateBlog={updateBlog} />
      <h2>Blog List</h2>
      <BlogList
        blogs={blogs}
        deleteBlog={deleteBlog}
        setEditBlog={setEditBlog}
      />
    </div>
  );
}

export default App;
