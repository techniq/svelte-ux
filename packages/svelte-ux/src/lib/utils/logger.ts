import { browser } from './env.js';

const logLevels = ['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR'] as const;
type LogLevel = (typeof logLevels)[number];

/**
 * Enable:
 *   localStorage.logger = 'SelectField'
 *   localStorage.logger = 'SelectField:INFO'
 *   localStorage.logger = 'SelectField,Dialog'
 *   localStorage.logger = 'SelectField:INFO,Dialog'
 */

export class Logger {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  trace(...message: any[]) {
    this.log('TRACE', ...message);
  }

  debug(...message: any[]) {
    this.log('DEBUG', ...message);
  }

  info(...message: any[]) {
    this.log('INFO', ...message);
  }

  warn(...message: any[]) {
    this.log('WARN', ...message);
  }

  error(...message: any[]) {
    this.log('ERROR', ...message);
  }

  log(level: LogLevel, ...message: any) {
    // TODO: Consider checking `env` for SSR support?
    const enabledLoggers = browser
      ? localStorage
          .getItem('logger')
          ?.split(',')
          .map((x) => x.split(':') as [string, LogLevel?]) ?? []
      : [];

    const enabledLogger = enabledLoggers.find((x) => x[0] === this.name);

    const shouldLog =
      enabledLogger != null &&
      logLevels.indexOf(level) >= logLevels.indexOf(enabledLogger[1] ?? 'DEBUG');

    if (shouldLog) {
      switch (level) {
        case 'TRACE':
          console.trace(
            `%c${this.name} %c${level}`,
            'color: hsl(200deg, 10%, 50%)',
            'color: hsl(200deg, 40%, 50%)',
            ...message
          );
          break;

        case 'DEBUG':
          console.log(
            `%c${this.name} %c${level}`,
            'color: hsl(200deg, 10%, 50%)',
            'color: hsl(200deg, 40%, 50%)',
            ...message
          );
          break;

        case 'INFO':
          console.log(
            `%c${this.name} %c${level}`,
            'color: hsl(200deg, 10%, 50%)',
            'color: hsl(60deg, 100%, 50%)',
            ...message
          );
          break;

        case 'WARN':
          console.warn(
            `%c${this.name} %c${level}`,
            'color: hsl(200deg, 10%, 50%)',
            'color: hsl(30deg, 100%, 50%)',
            ...message
          );
          break;

        case 'ERROR':
          console.warn(
            `%c${this.name} %c${level}`,
            'color: hsl(200deg, 10%, 50%)',
            'color: hsl(0deg, 100%, 50%)',
            ...message
          );
          break;
      }
    }
  }
}
