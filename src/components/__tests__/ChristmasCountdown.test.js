import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChristmasCountdown from '../ChristmasCountdown';

// Mock the FallingSnow component to avoid canvas issues in tests
jest.mock('../FallingSnow', () => {
  return function MockFallingSnow() {
    return <div data-testid="falling-snow" />;
  };
});

describe('ChristmasCountdown', () => {
  beforeEach(() => {
    // Mock current date to ensure consistent tests
    const mockDate = new Date('2024-12-01T12:00:00Z');
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    Date.now = jest.fn(() => mockDate.getTime());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders countdown title and components', () => {
    render(<ChristmasCountdown />);
    
    expect(screen.getByText('Christmas Countdown')).toBeInTheDocument();
    expect(screen.getByText('Time until Christmas Day')).toBeInTheDocument();
    expect(screen.getByLabelText(/Christmas countdown application/i)).toBeInTheDocument();
  });

  test('displays countdown timer elements', () => {
    render(<ChristmasCountdown />);
    
    expect(screen.getByText('Days')).toBeInTheDocument();
    expect(screen.getByText('Hours')).toBeInTheDocument();
    expect(screen.getByText('Minutes')).toBeInTheDocument();
    expect(screen.getByText('Seconds')).toBeInTheDocument();
  });

  test('displays timezone selector', () => {
    render(<ChristmasCountdown />);
    
    expect(screen.getByLabelText(/Select timezone for Christmas countdown/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('Local Time')).toBeInTheDocument();
  });

  test('allows timezone selection', async () => {
    render(<ChristmasCountdown />);
    
    const timezoneSelect = screen.getByLabelText(/Select timezone for Christmas countdown/i);
    
    fireEvent.change(timezoneSelect, { target: { value: 'UTC' } });
    
    await waitFor(() => {
      expect(timezoneSelect.value).toBe('UTC');
    });
  });

  test('has proper accessibility attributes', () => {
    render(<ChristmasCountdown />);
    
    const timerElement = screen.getByRole('timer');
    expect(timerElement).toHaveAttribute('aria-live', 'polite');
    expect(timerElement).toHaveAttribute('aria-label');
    
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveAttribute('aria-label', 'Christmas countdown application');
  });

  test('countdown elements are keyboard accessible', () => {
    // Mock a non-Christmas date
    const mockDate = new Date('2024-12-01T12:00:00Z');
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    
    render(<ChristmasCountdown />);
    
    const daysElement = screen.getByText('Days').parentElement;
    const hoursElement = screen.getByText('Hours').parentElement;
    const minutesElement = screen.getByText('Minutes').parentElement;
    const secondsElement = screen.getByText('Seconds').parentElement;
    
    expect(daysElement).toHaveAttribute('tabIndex', '0');
    expect(hoursElement).toHaveAttribute('tabIndex', '0');
    expect(minutesElement).toHaveAttribute('tabIndex', '0');
    expect(secondsElement).toHaveAttribute('tabIndex', '0');
  });

  test('renders falling snow component', () => {
    render(<ChristmasCountdown />);
    
    expect(screen.getByTestId('falling-snow')).toBeInTheDocument();
  });

  test('displays Christmas message when it is Christmas', () => {
    // Mock Christmas day
    const christmasDate = new Date('2024-12-25T12:00:00Z');
    jest.spyOn(global, 'Date').mockImplementation(() => christmasDate);
    Date.now = jest.fn(() => christmasDate.getTime());

    render(<ChristmasCountdown />);
    
    expect(screen.getByText('🎄 Merry Christmas! 🎄')).toBeInTheDocument();
    expect(screen.getByText('Hope your day is filled with joy and wonder!')).toBeInTheDocument();
  });
});