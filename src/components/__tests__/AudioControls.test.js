import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AudioControls from '../AudioControls';

// Mock Web Audio API
const mockAudioContext = {
  createOscillator: jest.fn(() => ({
    connect: jest.fn(),
    frequency: { setValueAtTime: jest.fn() },
    type: 'sine',
    start: jest.fn(),
    stop: jest.fn()
  })),
  createGain: jest.fn(() => ({
    connect: jest.fn(),
    gain: {
      setValueAtTime: jest.fn(),
      linearRampToValueAtTime: jest.fn(),
      exponentialRampToValueAtTime: jest.fn()
    }
  })),
  destination: {},
  currentTime: 0
};

global.AudioContext = jest.fn(() => mockAudioContext);
global.webkitAudioContext = jest.fn(() => mockAudioContext);

describe('AudioControls', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders mute button by default', () => {
    render(<AudioControls isChristmas={false} />);
    
    expect(screen.getByText('Unmute')).toBeInTheDocument();
    expect(screen.getByLabelText('Unmute audio')).toBeInTheDocument();
  });

  test('shows music controls when unmuted', () => {
    render(<AudioControls isChristmas={false} />);
    
    const muteButton = screen.getByLabelText('Unmute audio');
    fireEvent.click(muteButton);
    
    expect(screen.getByText('Mute')).toBeInTheDocument();
    expect(screen.getByText('Chime')).toBeInTheDocument();
  });

  test('toggles mute state correctly', () => {
    render(<AudioControls isChristmas={false} />);
    
    const muteButton = screen.getByLabelText('Unmute audio');
    expect(screen.getByText('Unmute')).toBeInTheDocument();
    
    fireEvent.click(muteButton);
    expect(screen.getByText('Mute')).toBeInTheDocument();
    
    fireEvent.click(screen.getByLabelText('Mute audio'));
    expect(screen.getByText('Unmute')).toBeInTheDocument();
  });

  test('plays chime when chime button is clicked', () => {
    render(<AudioControls isChristmas={false} />);
    
    // Unmute first
    fireEvent.click(screen.getByLabelText('Unmute audio'));
    
    // Click chime button
    const chimeButton = screen.getByText('Chime');
    fireEvent.click(chimeButton);
    
    expect(screen.getByText('Playing...')).toBeInTheDocument();
  });

  test('shows celebrate button when it is Christmas', () => {
    render(<AudioControls isChristmas={true} />);
    
    // Unmute first
    fireEvent.click(screen.getByLabelText('Unmute audio'));
    
    expect(screen.getByText('🔔 Celebrate!')).toBeInTheDocument();
    expect(screen.getByLabelText('Play celebration sound')).toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    render(<AudioControls isChristmas={false} />);
    
    const muteButton = screen.getByLabelText('Unmute audio');
    expect(muteButton).toHaveAttribute('aria-label', 'Unmute audio');
    expect(muteButton).toHaveClass('focus:ring-2', 'focus:ring-red-500', 'focus:outline-none');
  });

  test('disables chime button while playing', () => {
    render(<AudioControls isChristmas={false} />);
    
    // Unmute first
    fireEvent.click(screen.getByLabelText('Unmute audio'));
    
    // Click chime button
    const chimeButton = screen.getByText('Chime');
    fireEvent.click(chimeButton);
    
    const playingButton = screen.getByText('Playing...');
    expect(playingButton).toBeDisabled();
    expect(playingButton).toHaveClass('disabled:bg-gray-100', 'disabled:cursor-not-allowed');
  });

  test('handles audio context creation gracefully', () => {
    // Test when AudioContext is not available
    const originalAudioContext = global.AudioContext;
    delete global.AudioContext;
    delete global.webkitAudioContext;
    
    render(<AudioControls isChristmas={false} />);
    
    // Should still render without errors
    expect(screen.getByText('Unmute')).toBeInTheDocument();
    
    // Restore AudioContext
    global.AudioContext = originalAudioContext;
  });
});