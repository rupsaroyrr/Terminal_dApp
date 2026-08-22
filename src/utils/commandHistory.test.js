import { describe, it, expect, beforeEach } from 'vitest';
import { CommandHistory } from './commandHistory.js';

describe('CommandHistory Unit Tests', () => {
  let history;

  beforeEach(() => {
    history = new CommandHistory(5);
  });

  it('should push valid command entries to history', () => {
    history.push('help');
    history.push('balance');
    expect(history.size()).toBe(2);
  });

  it('should ignore empty or whitespace-only commands', () => {
    history.push('');
    history.push('   ');
    expect(history.size()).toBe(0);
  });

  it('should deduplicate consecutive identical commands', () => {
    history.push('mint nft');
    history.push('mint nft');
    expect(history.size()).toBe(1);
  });

  it('should navigate up (previous) and down (next) correctly', () => {
    history.push('cmd1');
    history.push('cmd2');
    history.push('cmd3');

    expect(history.previous()).toBe('cmd3');
    expect(history.previous()).toBe('cmd2');
    expect(history.previous()).toBe('cmd1');
    expect(history.previous()).toBe('cmd1');

    expect(history.next()).toBe('cmd2');
    expect(history.next()).toBe('cmd3');
    expect(history.next()).toBe('');
  });

  it('should respect maximum history capacity limit', () => {
    history.push('cmd1');
    history.push('cmd2');
    history.push('cmd3');
    history.push('cmd4');
    history.push('cmd5');
    history.push('cmd6');

    expect(history.size()).toBe(5);
    expect(history.previous()).toBe('cmd6');
  });

  it('should clear history and reset pointer', () => {
    history.push('status');
    history.clear();
    expect(history.size()).toBe(0);
    expect(history.previous()).toBeNull();
  });
});
