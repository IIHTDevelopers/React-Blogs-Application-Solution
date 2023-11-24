// BlogList.js
import React, { useState } from 'react';

const BlogList = ({ blogs, deleteBlog, setEditBlog }) => {
    const [filters, setFilters] = useState({ title: '' });

    const filteredBlogs = blogs.filter((blog) => {
        return blog.title.toLowerCase().includes(filters.title.toLowerCase());
    });

    return (
        <div>
            <div>
                <label htmlFor="title">
                    Filter by Title:
                    <input
                        id="title"
                        type="text"
                        value={filters.title}
                        onChange={(e) => setFilters({ ...filters, title: e.target.value })}
                    />
                </label>
            </div>
            <ul>
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                        <li key={blog.id}>
                            <strong>Title:</strong> {blog.title}
                            <br />
                            <strong>Category:</strong> {blog.category}
                            <br />
                            <button onClick={() => setEditBlog(blog)}>Edit</button>
                            <button onClick={() => deleteBlog(blog.id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <li>No blogs found</li>
                )}
            </ul>
        </div>
    );
};

export default BlogList;
