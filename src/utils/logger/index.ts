import path from 'node:path'
import type { LoggingEvent } from 'log4js'
import log4js from 'log4js'
import type { ChalkInstance } from 'chalk'
import chalk from 'chalk'
import { formatDate } from '@/utils'

type LevelEmoji = Record<string, string>
//  unused-imports/no-unused-vars
type LevelColor = Record<string, ChalkInstance>

const levelEmoji: LevelEmoji = {
  TRACE: '🔍',
  DEBUG: '🐞',
  INFO: 'ℹ️',
  WARN: '⚠️',
  ERROR: '❌',
  FATAL: '💥',
}

const levelColor: LevelColor = {
  TRACE: chalk.gray,
  DEBUG: chalk.cyan,
  INFO: chalk.green,
  WARN: chalk.yellow,
  ERROR: chalk.red,
  FATAL: chalk.bgRed.white,
}

const filePath = path.join(__dirname, 'logs')

// Configure appenders and categories
log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: { type: 'file', filename: `${filePath}/app.log` },
    traceFile: { type: 'file', filename: `${filePath}/trace.log` },
    debugFile: { type: 'file', filename: `${filePath}/debug.log` },
    infoFile: { type: 'file', filename: `${filePath}/info.log` },
    warnFile: { type: 'file', filename: `${filePath}/warn.log` },
    errorFile: { type: 'file', filename: `${filePath}/error.log` },
    fatalFile: { type: 'file', filename: `${filePath}/fatal.log` },
  },
  categories: {
    default: { appenders: ['console', 'file'], level: 'info' },
    trace: { appenders: ['console', 'traceFile'], level: 'trace' },
    debug: { appenders: ['console', 'debugFile'], level: 'debug' },
    info: { appenders: ['console', 'infoFile'], level: 'info' },
    warn: { appenders: ['console', 'warnFile'], level: 'warn' },
    error: { appenders: ['console', 'errorFile'], level: 'error' },
    fatal: { appenders: ['console', 'fatalFile'], level: 'fatal' },
  },
})

export const logger = log4js.getLogger()

// Custom layout for colored log output
log4js.addLayout('coloredLayout', (): ((logEvent: LoggingEvent) => string) => {
  return (logEvent: LoggingEvent): string => {
    const level = logEvent.level.toString()
    const emoji = levelEmoji[level] || ''
    const now = formatDate()
    const message = logEvent.data[0]
    const colorFn = levelColor[level] || chalk.reset
    const formattedMessage = `${colorFn(emoji)} ${colorFn(now)} ${colorFn(level)} ${colorFn(
      message,
    )}`
    return formattedMessage
  }
})

// Configure console appender with colored layout
log4js.configure({
  appenders: {
    console: { type: 'console', layout: { type: 'coloredLayout' } },
    file: { type: 'file', filename: `${filePath}/app.log` },
    traceFile: { type: 'file', filename: `${filePath}/trace.log` },
    debugFile: { type: 'file', filename: `${filePath}/debug.log` },
    infoFile: { type: 'file', filename: `${filePath}/info.log` },
    warnFile: { type: 'file', filename: `${filePath}/warn.log` },
    errorFile: { type: 'file', filename: `${filePath}/error.log` },
    fatalFile: { type: 'file', filename: `${filePath}/fatal.log` },
  },
  categories: {
    default: { appenders: ['console', 'file'], level: 'info' },
    trace: { appenders: ['console', 'traceFile'], level: 'trace' },
    debug: { appenders: ['console', 'debugFile'], level: 'debug' },
    info: { appenders: ['console', 'infoFile'], level: 'info' },
    warn: { appenders: ['console', 'warnFile'], level: 'warn' },
    error: { appenders: ['console', 'errorFile'], level: 'error' },
    fatal: { appenders: ['console', 'fatalFile'], level: 'fatal' },
  },
})

export default logger
