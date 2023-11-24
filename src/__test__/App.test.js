import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useEffect: jest.fn(),
}));

describe('boundary', () => {
    test('AppComponent boundary renders without crashing', () => {
        render(<App />);
    });

    test('AppComponent boundary has "Welcome to your Blog" h2', () => {
        render(<App />);
        expect(screen.queryByText('Welcome to your Blog')).toBeInTheDocument();
    });

    test('AppComponent boundary has "Blog Form" h2', () => {
        render(<App />);
        expect(screen.queryByText('Blog Form')).toBeInTheDocument();
    });

    test('AppComponent boundary has "Blog List" h2', () => {
        render(<App />);
        expect(screen.queryByText('Blog List')).toBeInTheDocument();
    });
});
