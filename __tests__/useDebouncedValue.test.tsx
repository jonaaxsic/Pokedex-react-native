import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { useDebouncedValue } from '../src/shared/hooks/useDebouncedValue';

// Helper component that exposes the debounced value via a ref
let capturedValue: string = '';
function Harness({ value, delay }: { value: string; delay: number }) {
  const debounced = useDebouncedValue(value, delay);
  capturedValue = debounced;
  return null;
}

describe('useDebouncedValue', () => {
  beforeEach(() => { capturedValue = ''; });

  it('returns initial value immediately', () => {
    act(() => { TestRenderer.create(<Harness value="hello" delay={300} />); });
    expect(capturedValue).toBe('hello');
  });

  it('debounces value changes', () => {
    jest.useFakeTimers();
    let renderer: any;
    act(() => { renderer = TestRenderer.create(<Harness value="a" delay={300} />); });
    expect(capturedValue).toBe('a');

    act(() => { renderer.update(<Harness value="b" delay={300} />); });
    expect(capturedValue).toBe('a'); // not yet

    act(() => { jest.advanceTimersByTime(300); });
    expect(capturedValue).toBe('b');

    jest.useRealTimers();
  });

  it('cancels pending update on rapid changes', () => {
    jest.useFakeTimers();
    let renderer: any;
    act(() => { renderer = TestRenderer.create(<Harness value="a" delay={300} />); });

    act(() => { renderer.update(<Harness value="b" delay={300} />); });
    act(() => { jest.advanceTimersByTime(200); }); // 200ms — not yet
    act(() => { renderer.update(<Harness value="c" delay={300} />); });
    act(() => { jest.advanceTimersByTime(300); }); // 300ms from second change
    expect(capturedValue).toBe('c'); // 'b' was cancelled

    jest.useRealTimers();
  });
});
