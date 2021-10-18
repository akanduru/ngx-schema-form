import { InjectionToken, Inject, Injectable, Optional } from "@angular/core";
export const LOG_LEVEL = new InjectionToken('Logging level');
export class LogService {
    constructor(level /* should be of type `LogLevel` but AOT fails with : 'Error encountered in metadata generated for exported symbol 'DefaultLogService':"Could not resolve type LogLevel." */) {
        this.level = level;
        this.logLevel = 3 /* off */;
        this.logLevel = level;
    }
    isWarnEnabled() {
        return 4 /* all */ === this.logLevel || 1 /* warn */ === this.logLevel;
    }
    isErrorEnabled() {
        return 4 /* all */ === this.logLevel || 2 /* error */ === this.logLevel;
    }
    isLogEnabled() {
        return 4 /* all */ === this.logLevel || 0 /* log */ === this.logLevel;
    }
}
LogService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LOG_LEVEL,] }] }
];
/**
 * Very simple abstraction of logging
 */
export class DefaultLogService extends LogService {
    constructor(logLevel /* should be of type `LogLevel` but AOT fails with : 'Error encountered in metadata generated for exported symbol 'DefaultLogService':"Could not resolve type LogLevel." */) {
        super(logLevel);
        this.logLevel = logLevel;
        this.warn = (!this.isWarnEnabled() ? () => { } : console.warn);
        this.error = (!this.isErrorEnabled() ? () => { } : console.error);
        this.log = (!this.isLogEnabled() ? () => { } : console.log);
        this.logLevel = logLevel;
    }
}
DefaultLogService.decorators = [
    { type: Injectable }
];
DefaultLogService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LOG_LEVEL,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9zY2hlbWEtZm9ybS9zcmMvbGliL2xvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0UsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLElBQUksY0FBYyxDQUFXLGVBQWUsQ0FBQyxDQUFDO0FBYXZFLE1BQU0sT0FBZ0IsVUFBVTtJQUU1QixZQUFrRCxLQUFVLENBQUMsMktBQTJLO1FBQXRMLFVBQUssR0FBTCxLQUFLLENBQUs7UUFEckQsYUFBUSxlQUFnQjtRQUUzQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQWlCLENBQUE7SUFDckMsQ0FBQztJQW9CRCxhQUFhO1FBQ1QsT0FBTyxnQkFBaUIsSUFBSSxDQUFDLFFBQVEsSUFBSSxpQkFBa0IsSUFBSSxDQUFDLFFBQVEsQ0FBQTtJQUM1RSxDQUFDO0lBRUQsY0FBYztRQUNWLE9BQU8sZ0JBQWlCLElBQUksQ0FBQyxRQUFRLElBQUksa0JBQW1CLElBQUksQ0FBQyxRQUFRLENBQUE7SUFDN0UsQ0FBQztJQUVELFlBQVk7UUFDUixPQUFPLGdCQUFpQixJQUFJLENBQUMsUUFBUSxJQUFJLGdCQUFpQixJQUFJLENBQUMsUUFBUSxDQUFBO0lBQzNFLENBQUM7Ozs0Q0FoQ1ksUUFBUSxZQUFJLE1BQU0sU0FBQyxTQUFTOztBQW1DN0M7O0dBRUc7QUFFSCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsVUFBVTtJQUU3QyxZQUFrRCxRQUFhLENBQUMsMktBQTJLO1FBQ3ZPLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUQrQixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBSS9ELFNBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN6RCxVQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDNUQsUUFBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBSmxELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBb0IsQ0FBQTtJQUN4QyxDQUFDOzs7WUFOSixVQUFVOzs7NENBR00sUUFBUSxZQUFJLE1BQU0sU0FBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4sIEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5leHBvcnQgY29uc3QgTE9HX0xFVkVMID0gbmV3IEluamVjdGlvblRva2VuPExvZ0xldmVsPignTG9nZ2luZyBsZXZlbCcpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGRpZmZlcmVudCBsb2dnaW5nIGxldmVscyBvZiB0aGUgYGNvbnNvbGVgIG91dHB1dC5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gTG9nTGV2ZWwge1xuICAgIGxvZyxcbiAgICB3YXJuLFxuICAgIGVycm9yLFxuICAgIG9mZixcbiAgICBhbGxcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIExvZ1NlcnZpY2Uge1xuICAgIHB1YmxpYyBsb2dMZXZlbCA9IExvZ0xldmVsLm9mZjtcbiAgICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASW5qZWN0KExPR19MRVZFTCkgcHVibGljIGxldmVsOiBhbnkgLyogc2hvdWxkIGJlIG9mIHR5cGUgYExvZ0xldmVsYCBidXQgQU9UIGZhaWxzIHdpdGggOiAnRXJyb3IgZW5jb3VudGVyZWQgaW4gbWV0YWRhdGEgZ2VuZXJhdGVkIGZvciBleHBvcnRlZCBzeW1ib2wgJ0RlZmF1bHRMb2dTZXJ2aWNlJzpcIkNvdWxkIG5vdCByZXNvbHZlIHR5cGUgTG9nTGV2ZWwuXCIgKi8pIHtcbiAgICAgICAgdGhpcy5sb2dMZXZlbCA9IGxldmVsIGFzIExvZ0xldmVsXG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVxdWFscyBgY29uc29sZS53YXJuYFxuICAgICAqIEBwYXJhbSBtZXNzYWdlIFxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtcyBcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3Qgd2FybihtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkXG4gICAgLyoqXG4gICAgICogRXF1YWxzIGBjb25zb2xlLmVycm9yYFxuICAgICAqIEBwYXJhbSBtZXNzYWdlIFxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtcyBcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgZXJyb3IobWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZFxuICAgIC8qKlxuICAgICAqIEVxdWFscyBgY29uc29sZS5sb2dgXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgXG4gICAgICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zIFxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBsb2cobWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZFxuXG4gICAgaXNXYXJuRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIExvZ0xldmVsLmFsbCA9PT0gdGhpcy5sb2dMZXZlbCB8fCBMb2dMZXZlbC53YXJuID09PSB0aGlzLmxvZ0xldmVsXG4gICAgfVxuXG4gICAgaXNFcnJvckVuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiBMb2dMZXZlbC5hbGwgPT09IHRoaXMubG9nTGV2ZWwgfHwgTG9nTGV2ZWwuZXJyb3IgPT09IHRoaXMubG9nTGV2ZWxcbiAgICB9XG5cbiAgICBpc0xvZ0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiBMb2dMZXZlbC5hbGwgPT09IHRoaXMubG9nTGV2ZWwgfHwgTG9nTGV2ZWwubG9nID09PSB0aGlzLmxvZ0xldmVsXG4gICAgfVxufVxuXG4vKipcbiAqIFZlcnkgc2ltcGxlIGFic3RyYWN0aW9uIG9mIGxvZ2dpbmdcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlZmF1bHRMb2dTZXJ2aWNlIGV4dGVuZHMgTG9nU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASW5qZWN0KExPR19MRVZFTCkgcHVibGljIGxvZ0xldmVsOiBhbnkgLyogc2hvdWxkIGJlIG9mIHR5cGUgYExvZ0xldmVsYCBidXQgQU9UIGZhaWxzIHdpdGggOiAnRXJyb3IgZW5jb3VudGVyZWQgaW4gbWV0YWRhdGEgZ2VuZXJhdGVkIGZvciBleHBvcnRlZCBzeW1ib2wgJ0RlZmF1bHRMb2dTZXJ2aWNlJzpcIkNvdWxkIG5vdCByZXNvbHZlIHR5cGUgTG9nTGV2ZWwuXCIgKi8pIHtcbiAgICAgICAgc3VwZXIobG9nTGV2ZWwpXG4gICAgICAgIHRoaXMubG9nTGV2ZWwgPSBsb2dMZXZlbCBhcyBMb2dMZXZlbFxuICAgIH1cbiAgICB3YXJuID0gKCF0aGlzLmlzV2FybkVuYWJsZWQoKSA/ICgpID0+IHsgfSA6IGNvbnNvbGUud2FybilcbiAgICBlcnJvciA9ICghdGhpcy5pc0Vycm9yRW5hYmxlZCgpID8gKCkgPT4geyB9IDogY29uc29sZS5lcnJvcilcbiAgICBsb2cgPSAoIXRoaXMuaXNMb2dFbmFibGVkKCkgPyAoKSA9PiB7IH0gOiBjb25zb2xlLmxvZylcbn0iXX0=