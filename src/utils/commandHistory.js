/**
 * Command History Manager for Terminal dApp interface.
 * Manages input buffer, command navigation (Up/Down arrow key support), and command sanitization.
 */

export class CommandHistory {
  /**
   * @param {number} maxCapacity Maximum number of commands stored in history
   */
  constructor(maxCapacity = 50) {
    this.maxCapacity = maxCapacity;
    this.history = [];
    this.pointer = -1;
  }

  /**
   * Add a new command entry to history.
   * @param {string} cmd 
   */
  push(cmd) {
    if (!cmd || typeof cmd !== 'string') return;
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Remove duplicate if same as last entry
    if (this.history.length > 0 && this.history[this.history.length - 1] === trimmed) {
      this.pointer = this.history.length;
      return;
    }

    this.history.push(trimmed);
    if (this.history.length > this.maxCapacity) {
      this.history.shift();
    }
    this.pointer = this.history.length;
  }

  /**
   * Navigate backwards (Up key).
   * @returns {string|null}
   */
  previous() {
    if (this.history.length === 0) return null;
    if (this.pointer > 0) {
      this.pointer -= 1;
    }
    return this.history[this.pointer] || null;
  }

  /**
   * Navigate forwards (Down key).
   * @returns {string}
   */
  next() {
    if (this.history.length === 0) return '';
    if (this.pointer < this.history.length - 1) {
      this.pointer += 1;
      return this.history[this.pointer];
    }
    this.pointer = this.history.length;
    return '';
  }

  /**
   * Reset position pointer to the end of history.
   */
  resetPointer() {
    this.pointer = this.history.length;
  }

  /**
   * Clear all history entries.
   */
  clear() {
    this.history = [];
    this.pointer = -1;
  }

  /**
   * Get count of stored commands.
   * @returns {number}
   */
  size() {
    return this.history.length;
  }
}
