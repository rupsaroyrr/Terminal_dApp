import { describe, it, expect } from 'vitest';
import { formatAnsiOutput, stripAnsi } from './ansiFormatter.js';

describe('ANSI Formatter Unit Tests', () => {
  it('should return empty string for empty input', () => {
    expect(formatAnsiOutput('')).toBe('');
    expect(stripAnsi('')).toBe('');
  });

  it('should strip ANSI escape sequences accurately', () => {
    const ansiText = '\x1b[31mError:\x1b[0m Transaction failed';
    expect(stripAnsi(ansiText)).toBe('Error: Transaction failed');
  });

  it('should convert color escape codes into HTML span tags', () => {
    const input = '\x1b[32mSUCCESS:\x1b[0m Contract initialized';
    const output = formatAnsiOutput(input);
    expect(output).toContain('<span class="terminal-green">SUCCESS:</span> Contract initialized');
  });

  it('should handle bold and multi-attribute escape sequences', () => {
    const input = '\x1b[1;33mWARNING:\x1b[0m High gas fee';
    const output = formatAnsiOutput(input);
    expect(output).toContain('terminal-bold');
    expect(output).toContain('terminal-yellow');
  });

  it('should strip codes cleanly when stripIfUnsupported is set to true', () => {
    const input = '\x1b[36mInfo:\x1b[0m Balance updated';
    expect(formatAnsiOutput(input, true)).toBe('Info: Balance updated');
  });
});
