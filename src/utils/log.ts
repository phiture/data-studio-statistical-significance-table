const COMPONENT_NAME = 'Statistical Significance Table'
const PRODUCTION = process.env.NODE_ENV !== 'production'

const log = {
    log: (level: LogLevel, message: string, ...data: any[]) => {
        const logData = []
        for (const datum of data) if (datum !== undefined) logData.push(datum)
        console.log(generateLogLine(level, message), ...logData)
    },
    dev: (...data: any[]) => {
        if (PRODUCTION) console.log(generateLogLine(LogLevel.DEV, ''), ...data)
    },
    debug: (message: string, data: any) => log.log(LogLevel.DEBUG, message, data),
    info: (message: string, data: any) => log.log(LogLevel.INFO, message, data),
    warn: (message: string, data: any) => log.log(LogLevel.WARN, message, data),
    error: (message: string, data: any, error: Error) => log.log(LogLevel.WARN, message, data, error),
}

const generateLogLine = (level: LogLevel, message: string) => {
    // const time = new Date().toISOString()
    return `${COMPONENT_NAME} ${level}: ${message}`
}

enum LogLevel {
    DEV = 'DEV',
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
}

export default log
export {
    LogLevel
}
