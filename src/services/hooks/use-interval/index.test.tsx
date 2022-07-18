import React from 'react';
import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useInterval } from '.';

describe('useInterval', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should invoke callback according to delay', () => {
    const callback: () => void = vi.fn();
    const TestComponent = () => {
      useInterval(callback, 1000);
      return null;
    };
    render(<TestComponent />);
    expect(callback).toBeCalledTimes(0);
    vi.advanceTimersByTime(1000);
    expect(callback).toBeCalledTimes(1);
    vi.advanceTimersByTime(4000);
    expect(callback).toBeCalledTimes(5);
  });
});
