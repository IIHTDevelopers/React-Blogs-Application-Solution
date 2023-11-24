import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BlogList from '../components/BlogList';

const blogs = [
    { id: 1, title: 'Blog 1', category: 'Category 1' },
    { id: 2, title: 'Blog 2', category: 'Category 2' },
];

const deleteBlog = jest.fn();
const setEditBlog = jest.fn();

describe('boundary', () => {
    beforeEach(() => {
        render(
            <BlogList
                blogs={blogs}
                deleteBlog={deleteBlog}
                setEditBlog={setEditBlog}
            />
        );
    });

    test('BlogListComponent boundary it has a "Filter by Title" text field', () => {
        const titleInput = screen.getByLabelText('Filter by Title:');
        expect(titleInput).toBeTruthy();
    });

    test('BlogListComponent boundary it displays the Title of a blog after assigning values', async () => {
        const filterInput = screen.getByLabelText('Filter by Title:');
        fireEvent.change(filterInput, { target: { value: 'Blog 1' } });
        const strongElement = await screen.findByText('Title:');
        expect(strongElement).toBeTruthy();
    });

    test('BlogListComponent boundary it displays the Category of a blog after assigning values', async () => {
        const filterInput = screen.getByLabelText('Filter by Title:');
        fireEvent.change(filterInput, { target: { value: 'Blog 1' } });
        const strongElement = await screen.findByText('Category:');
        expect(strongElement).toBeTruthy();
    });

    test('BlogListComponent boundary it displays the "Edit" button to edit the blog', async () => {
        const editButtons = screen.getAllByText('Edit');
        expect(editButtons).toBeTruthy();
    });

    test('BlogListComponent boundary it calls deleteBlog when "Delete" button is clicked', () => {
        const deleteButtons = screen.getAllByText('Delete');
        fireEvent.click(deleteButtons[0]);
        expect(deleteBlog).toHaveBeenCalledWith(blogs[0].id);
    });

    test('BlogListComponent boundary it removes the blog after clicking the "Delete" button', () => {
        const deleteButton = screen.getAllByText('Delete')[0];
        fireEvent.click(deleteButton);
        expect(screen.queryByText('Title: Blog 1')).toBeNull();
        expect(screen.queryByText('Category: Category 1')).toBeNull();
    });

    test('BlogListComponent boundary it displays "No blogs found" when there are no blogs', async () => {
        render(
            <BlogList blogs={[]} deleteBlog={deleteBlog} setEditBlog={setEditBlog} />
        );
        const noBlogsMessage = await screen.findByText('No blogs found');
        expect(noBlogsMessage).toBeTruthy();
    });
});
