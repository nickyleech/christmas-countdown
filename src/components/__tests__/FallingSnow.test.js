import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FallingSnow from '../FallingSnow';

// Mock requestAnimationFrame and cancelAnimationFrame
global.requestAnimationFrame = jest.fn();
global.cancelAnimationFrame = jest.fn();

// Mock canvas context
const mockGetContext = jest.fn(() => ({
  clearRect: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  fillStyle: '',
}));

// Mock canvas element
HTMLCanvasElement.prototype.getContext = mockGetContext;

// Mock window.matchMedia
const mockMatchMedia = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
});

describe('FallingSnow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    });
  });

  test('renders canvas element', () => {
    render(<FallingSnow />);
    
    const canvas = screen.getByRole('img', { hidden: true });
    expect(canvas).toBeInTheDocument();
    expect(canvas.tagName).toBe('CANVAS');
  });

  test('canvas has proper styling and accessibility', () => {
    render(<FallingSnow />);
    
    const canvas = screen.getByRole('img', { hidden: true });
    expect(canvas).toHaveClass('fixed', 'inset-0', 'pointer-events-none', 'z-10');
    expect(canvas).toHaveAttribute('aria-hidden', 'true');
    expect(canvas).toHaveStyle('background: transparent');
  });

  test('does not render when reduced motion is preferred', () => {
    // Mock prefers-reduced-motion: reduce
    mockMatchMedia.mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { container } = render(<FallingSnow />);
    expect(container.firstChild).toBeNull();
  });

  test('initializes canvas context', () => {
    render(<FallingSnow />);
    
    expect(mockGetContext).toHaveBeenCalledWith('2d');
  });

  test('sets up resize event listener', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    
    render(<FallingSnow />);
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  test('handles mobile detection correctly', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 480,
    });

    render(<FallingSnow />);
    
    const canvas = screen.getByRole('img', { hidden: true });
    expect(canvas).toBeInTheDocument();
  });

  test('cleans up event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    
    const { unmount } = render(<FallingSnow />);
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});