/**
 * ANSI Color & Style Formatter for Terminal output view.
 * Converts ANSI escape sequences into structured styled tokens or HTML representations.
 */

const ANSI_COLOR_MAP = {
  30: 'terminal-black',
  31: 'terminal-red',
  32: 'terminal-green',
  33: 'terminal-yellow',
  34: 'terminal-blue',
  35: 'terminal-magenta',
  36: 'terminal-cyan',
  37: 'terminal-white',
  90: 'terminal-bright-black',
  91: 'terminal-bright-red',
  92: 'terminal-bright-green',
  93: 'terminal-bright-yellow',
  94: 'terminal-bright-blue',
  95: 'terminal-bright-magenta',
  96: 'terminal-bright-cyan',
  97: 'terminal-bright-white'
};

/**
 * Format string with ANSI color tags into HTML spans or clean text.
 * @param {string} input String containing ANSI escape codes
 * @param {boolean} stripIfUnsupported Strip raw codes if non-browser format
 * @returns {string} Formatted output string
 */
export function formatAnsiOutput(input, stripIfUnsupported = false) {
  if (!input || typeof input !== 'string') return '';

  const ansiRegex = /\x1b\[([0-9;]+)m/g;

  if (stripIfUnsupported) {
    return input.replace(ansiRegex, '');
  }

  let result = input;
  let hasOpenSpan = false;

  result = result.replace(ansiRegex, (match, p1) => {
    const codes = p1.split(';').map(Number);
    
    if (codes.includes(0)) {
      const closing = hasOpenSpan ? '</span>' : '';
      hasOpenSpan = false;
      return closing;
    }

    const classes = [];
    for (const code of codes) {
      if (ANSI_COLOR_MAP[code]) {
        classes.push(ANSI_COLOR_MAP[code]);
      } else if (code === 1) {
        classes.push('terminal-bold');
      } else if (code === 4) {
        classes.push('terminal-underline');
      }
    }

    if (classes.length > 0) {
      const prefix = hasOpenSpan ? '</span>' : '';
      hasOpenSpan = true;
      return `${prefix}<span class="${classes.join(' ')}">`;
    }

    return '';
  });

  if (hasOpenSpan) {
    result += '</span>';
  }

  return result;
}

/**
 * Strip all ANSI formatting escape sequences.
 * @param {string} text 
 * @returns {string} Plain unformatted text
 */
export function stripAnsi(text) {
  if (!text || typeof text !== 'string') return '';
  return text.replace(/\x1b\[[0-9;]*m/g, '');
}
