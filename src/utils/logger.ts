export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

interface LogContext {
  component?: string;
  userId?: string;
  businessId?: string;
  pageId?: string;
  action?: string;
  [key: string]: any;
}

class Logger {
  private static level = process.env.NODE_ENV === 'production'
    ? LogLevel.WARN
    : LogLevel.DEBUG;

  private static formatMessage(level: string, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : '';
    return `[${level}] ${timestamp}: ${message}${contextStr}`;
  }

  static debug(message: string, context?: LogContext) {
    if (this.level <= LogLevel.DEBUG) {
      console.debug(this.formatMessage('DEBUG', message, context));
    }
  }

  static info(message: string, context?: LogContext) {
    if (this.level <= LogLevel.INFO) {
      console.info(this.formatMessage('INFO', message, context));
    }
  }

  static warn(message: string, context?: LogContext) {
    if (this.level <= LogLevel.WARN) {
      console.warn(this.formatMessage('WARN', message, context));
    }
  }

  static error(message: string, error?: any, context?: LogContext) {
    if (this.level <= LogLevel.ERROR) {
      console.error(this.formatMessage('ERROR', message, context));
      if (error) {
        console.error('Error details:', error);
      }
    }

    // In production, send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      this.sendToErrorService(message, error, context);
    }
  }

  private static sendToErrorService(message: string, error?: any, context?: LogContext) {
    // Integration with error tracking service (Sentry, LogRocket, etc.)
    // For now, we'll just store in a structured format
    const errorReport = {
      message,
      error: error?.message || error,
      stack: error?.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // In a real app, send this to your error tracking service
    console.error('ERROR_REPORT:', errorReport);
  }
}

export default Logger;
