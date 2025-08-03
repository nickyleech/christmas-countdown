import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimezoneSelector from '../TimezoneSelector';

describe('TimezoneSelector', () => {
  const mockOnTimezoneChange = jest.fn();

  beforeEach(() => {
    mockOnTimezoneChange.mockClear();
  });

  test('renders timezone selector with label', () => {
    render(
      <TimezoneSelector
        selectedTimezone="local"
        onTimezoneChange={mockOnTimezoneChange}
      />
    );
    
    expect(screen.getByText('Choose timezone:')).toBeInTheDocument();
    expect(screen.getByLabelText(/Select timezone for Christmas countdown/i)).toBeInTheDocument();
  });

  test('displays current selected timezone', () => {
    render(
      <TimezoneSelector
        selectedTimezone="UTC"
        onTimezoneChange={mockOnTimezoneChange}
      />
    );
    
    const select = screen.getByLabelText(/Select timezone for Christmas countdown/i);
    expect(select.value).toBe('UTC');
  });

  test('calls onTimezoneChange when selection changes', () => {
    render(
      <TimezoneSelector
        selectedTimezone="local"
        onTimezoneChange={mockOnTimezoneChange}
      />
    );
    
    const select = screen.getByLabelText(/Select timezone for Christmas countdown/i);
    fireEvent.change(select, { target: { value: 'America/New_York' } });
    
    expect(mockOnTimezoneChange).toHaveBeenCalledWith('America/New_York');
  });

  test('contains all expected timezone options', () => {
    render(
      <TimezoneSelector
        selectedTimezone="local"
        onTimezoneChange={mockOnTimezoneChange}
      />
    );
    
    expect(screen.getByText('Local Time')).toBeInTheDocument();
    expect(screen.getByText('UTC')).toBeInTheDocument();
    expect(screen.getByText('New York (EST/EDT)')).toBeInTheDocument();
    expect(screen.getByText('Los Angeles (PST/PDT)')).toBeInTheDocument();
    expect(screen.getByText('London (GMT/BST)')).toBeInTheDocument();
    expect(screen.getByText('Tokyo (JST)')).toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    render(
      <TimezoneSelector
        selectedTimezone="local"
        onTimezoneChange={mockOnTimezoneChange}
      />
    );
    
    const select = screen.getByLabelText(/Select timezone for Christmas countdown/i);
    expect(select).toHaveAttribute('id', 'timezone-select');
    expect(select).toHaveAttribute('aria-label', 'Select timezone for Christmas countdown');
    
    const label = screen.getByText('Choose timezone:');
    expect(label).toHaveAttribute('for', 'timezone-select');
  });

  test('has proper focus styles', () => {
    render(
      <TimezoneSelector
        selectedTimezone="local"
        onTimezoneChange={mockOnTimezoneChange}
      />
    );
    
    const select = screen.getByLabelText(/Select timezone for Christmas countdown/i);
    expect(select).toHaveClass('focus:ring-2', 'focus:ring-red-500', 'focus:border-red-500');
  });
});