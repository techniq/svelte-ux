const logLevels = ['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR'] as const;
type LogLevel = typeof logLevels[number];

export default class Logger {
  level: LogLevel = 'INFO';

  constructor(options?: { level: LogLevel }) {
    this.level = options?.level ?? 'INFO';
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
    const shouldLog = logLevels.indexOf(level) >= logLevels.indexOf(this.level);

    if (shouldLog) {
      switch (level) {
        case 'TRACE':
          console.trace(`%c ${level}`, 'color: hsl(200deg, 40%, 50%)', ...message);
          break;

        case 'DEBUG':
          console.log(`%c ${level}`, 'color: hsl(200deg, 40%, 50%)', ...message);
          break;

        case 'INFO':
          console.log(`%c ${level}`, 'color: hsl(60deg, 100%, 50%)', ...message);
          break;

        case 'WARN':
          console.warn(`%c ${level}`, 'color: hsl(30deg, 100%, 50%)', ...message);
          break;

        case 'ERROR':
          console.warn(`%c ${level}`, 'color: hsl(0deg, 100%, 50%)', ...message);
          break;
      }
    }
  }
}
