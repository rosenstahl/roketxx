// Kopiere das hier in src/utils/logger.js
class Logger {
  static log(level, message, data = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data
    };

    // In Entwicklung in Konsole ausgeben
    if (import.meta.env.DEV) {
      console[level](message, data);
      return;
    }

    // In Produktion an Backend senden
    fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logEntry)
    }).catch(() => {
      // Fallback zur Konsole wenn API nicht erreichbar
      console[level](message, data);
    });
  }

  static info(message, data) {
    this.log('info', message, data);
  }

  static warn(message, data) {
    this.log('warn', message, data);
  }

  static error(message, data) {
    this.log('error', message, data);
  }
}

export default Logger;