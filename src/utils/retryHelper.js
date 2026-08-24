/**
 * Asynchronous retry utility with configurable exponential backoff and jitter.
 * Designed for Soroban RPC calls, Horizon queries, and transaction submission retries.
 */

/**
 * Execute an async operation with exponential retry logic.
 * @template T
 * @param {() => Promise<T>} fn Async function to execute
 * @param {Object} options Retry configuration
 * @param {number} [options.maxRetries=3] Maximum retry attempts
 * @param {number} [options.initialDelayMs=300] Initial delay in ms
 * @param {number} [options.backoffFactor=2] Exponential multiplier
 * @param {(err: Error) => boolean} [options.shouldRetry] Optional predicate filter
 * @returns {Promise<T>} Result of the operation
 */
export async function withRetry(fn, options = {}) {
  const {
    maxRetries = 3,
    initialDelayMs = 300,
    backoffFactor = 2,
    shouldRetry = () => true
  } = options;

  let attempt = 0;
  let delay = initialDelayMs;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      attempt += 1;

      if (attempt > maxRetries || !shouldRetry(error)) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= backoffFactor;
    }
  }
}
