import React, { useState, useEffect } from 'react';

const BlogForm = ({ addBlog, editBlog, updateBlog }) => {
    const [blog, setBlog] = useState({
        id: '',
        title: '',
        content: '',
        category: '',
    });

    useEffect(() => {
        if (editBlog) {
            setBlog({ ...editBlog });
        } else {
            setBlog({
                id: '',
                title: '',
                content: '',
                category: '',
            });
        }
    }, [editBlog]);

    const isEditForm = !!editBlog;

    const isFormIncomplete = !blog.title || !blog.content || !blog.category;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!blog.title.trim()) {
            alert('Please enter a title for the blog.');
            return;
        }
        if (isEditForm) {
            updateBlog(blog);
        } else {
            addBlog({ ...blog, id: Date.now() });
        }
        setBlog({ id: '', title: '', content: '', category: '' });
    };

    return (
        <div>
            <h2>{isEditForm ? 'Edit Blog' : 'Add a Blog'}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">
                    Title:
                    <input
                        id="title"
                        type="text"
                        value={blog.title}
                        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                        required
                    />
                </label>
                <label htmlFor="content">
                    Content:
                    <textarea
                        id="content"
                        value={blog.content}
                        onChange={(e) => setBlog({ ...blog, content: e.target.value })}
                        required
                    />
                </label>
                <label htmlFor="category">
                    Category:
                    <input
                        id="category"
                        type="text"
                        value={blog.category}
                        onChange={(e) => setBlog({ ...blog, category: e.target.value })}
                        required
                    />
                </label>
                <button type="submit" disabled={isFormIncomplete}>
                    {isEditForm ? 'Update Blog' : 'Add Blog'}
                </button>
            </form>
        </div>
    );
};

export default BlogForm;
