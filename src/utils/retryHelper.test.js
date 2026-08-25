import { describe, it, expect, vi } from 'vitest';
import { withRetry } from './retryHelper.js';

describe('retryHelper Unit Tests', () => {
  it('should return result immediately if function succeeds on first attempt', async () => {
    const fn = vi.fn().mockResolvedValue('success');
    const result = await withRetry(fn, { maxRetries: 3, initialDelayMs: 10 });
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should retry operation upon failure and succeed if subsequent call succeeds', async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error('Network glitch'))
      .mockResolvedValueOnce('retry success');

    const result = await withRetry(fn, { maxRetries: 2, initialDelayMs: 10 });
    expect(result).toBe('retry success');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should throw error after exceeding maxRetries limit', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('Persistent RPC error'));

    await expect(
      withRetry(fn, { maxRetries: 2, initialDelayMs: 10 })
    ).rejects.toThrow('Persistent RPC error');

    expect(fn).toHaveBeenCalledTimes(3); // 1 initial + 2 retries
  });

  it('should stop retrying if shouldRetry predicate returns false', async () => {
    const fatalError = new Error('Invalid signature');
    const fn = vi.fn().mockRejectedValue(fatalError);

    const shouldRetry = (err) => err.message !== 'Invalid signature';

    await expect(
      withRetry(fn, { maxRetries: 3, initialDelayMs: 10, shouldRetry })
    ).rejects.toThrow('Invalid signature');

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
