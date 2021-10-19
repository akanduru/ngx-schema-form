import { InjectionToken } from "@angular/core";
import * as ɵngcc0 from '@angular/core';
export declare const LOG_LEVEL: InjectionToken<LogLevel>;
/**
 * Represents the different logging levels of the `console` output.
 */
export declare const enum LogLevel {
    log = 0,
    warn = 1,
    error = 2,
    off = 3,
    all = 4
}
export declare abstract class LogService {
    level: any;
    logLevel: LogLevel;
    constructor(level: any);
    /**
     * Equals `console.warn`
     * @param message
     * @param optionalParams
     */
    abstract warn(message?: any, ...optionalParams: any[]): void;
    /**
     * Equals `console.error`
     * @param message
     * @param optionalParams
     */
    abstract error(message?: any, ...optionalParams: any[]): void;
    /**
     * Equals `console.log`
     * @param message
     * @param optionalParams
     */
    abstract log(message?: any, ...optionalParams: any[]): void;
    isWarnEnabled(): boolean;
    isErrorEnabled(): boolean;
    isLogEnabled(): boolean;
}
/**
 * Very simple abstraction of logging
 */
export declare class DefaultLogService extends LogService {
    logLevel: any;
    constructor(logLevel: any);
    warn: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    error: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    log: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DefaultLogService, [{ optional: true; }]>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<DefaultLogService>;
}

//# sourceMappingURL=log.service.d.ts.map