import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from '../components/BlogForm';

const addBlogMock = jest.fn();
const updateBlogMock = jest.fn();

describe('boundary', () => {
    test('BlogFormComponent boundary it is rendered', () => {
        render(<BlogForm addBlog={addBlogMock} />);
        expect(screen.getByRole('heading')).toBeTruthy();
    });

    test('BlogFormComponent boundary it has "Add a Blog" h2', () => {
        render(<BlogForm addBlog={addBlogMock} />);
        const h2Element = screen.getByRole('heading');
        expect(h2Element.textContent).toBe('Add a Blog');
    });

    test('BlogFormComponent boundary it has "Edit Blog" h2 when in edit mode', () => {
        render(<BlogForm editBlog={{ title: 'Edit Blog' }} updateBlog={updateBlogMock} />);
        const h2Element = screen.getByRole('heading');
        expect(h2Element.textContent).toBe('Edit Blog');
    });

    test('BlogFormComponent boundary it has title input field', () => {
        render(<BlogForm addBlog={addBlogMock} />);
        const titleInput = screen.getByLabelText('Title:');
        expect(titleInput).toBeTruthy();
    });

    test('BlogFormComponent boundary it has content textarea field', () => {
        render(<BlogForm addBlog={addBlogMock} />);
        const contentTextarea = screen.getByLabelText('Content:');
        expect(contentTextarea).toBeTruthy();
    });

    test('BlogFormComponent boundary it has category input field', () => {
        render(<BlogForm addBlog={addBlogMock} />);
        const categoryInput = screen.getByLabelText('Category:');
        expect(categoryInput).toBeTruthy();
    });

    test('BlogFormComponent boundary it has an "Add Blog" button', () => {
        render(<BlogForm addBlog={addBlogMock} />);
        const addButton = screen.getByRole('button', { name: 'Add Blog' });
        expect(addButton).toBeTruthy();
    });

    test('BlogFormComponent boundary it has an "Update Blog" button when in edit mode', () => {
        render(<BlogForm editBlog={{ title: 'Edit Blog' }} updateBlog={updateBlogMock} />);
        const updateButton = screen.getByRole('button', { name: 'Update Blog' });
        expect(updateButton).toBeTruthy();
    });
});
