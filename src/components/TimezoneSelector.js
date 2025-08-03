import React from 'react';
import { Globe } from 'lucide-react';

const TimezoneSelector = ({ selectedTimezone, onTimezoneChange }) => {
  const timezones = [
    { value: 'local', label: 'Local Time', offset: 'auto' },
    { value: 'UTC', label: 'UTC', offset: '+0' },
    { value: 'America/New_York', label: 'New York (EST/EDT)', offset: '-5/-4' },
    { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)', offset: '-8/-7' },
    { value: 'America/Chicago', label: 'Chicago (CST/CDT)', offset: '-6/-5' },
    { value: 'Europe/London', label: 'London (GMT/BST)', offset: '+0/+1' },
    { value: 'Europe/Paris', label: 'Paris (CET/CEST)', offset: '+1/+2' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)', offset: '+9' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)', offset: '+8' },
    { value: 'Australia/Sydney', label: 'Sydney (AEDT/AEST)', offset: '+11/+10' },
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-center mb-3">
        <Globe className="w-4 h-4 mr-2 text-gray-600" aria-hidden="true" />
        <label htmlFor="timezone-select" className="text-sm text-gray-600 font-medium">
          Choose timezone:
        </label>
      </div>
      <select
        id="timezone-select"
        value={selectedTimezone}
        onChange={(e) => onTimezoneChange(e.target.value)}
        className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
        aria-label="Select timezone for Christmas countdown"
      >
        {timezones.map((tz) => (
          <option key={tz.value} value={tz.value}>
            {tz.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimezoneSelector;