import { Injectable, EventEmitter } from '@angular/core';
export class TemplateSchemaService {
    constructor() {
        this.changes = new EventEmitter();
    }
    changed() {
        this.changes.emit();
    }
}
TemplateSchemaService.decorators = [
    { type: Injectable }
];
TemplateSchemaService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtc2NoZW1hLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zY2hlbWEtZm9ybS9zcmMvbGliL3RlbXBsYXRlLXNjaGVtYS90ZW1wbGF0ZS1zY2hlbWEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd6RCxNQUFNLE9BQU8scUJBQXFCO0lBSWhDO1FBRkEsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFYixDQUFDO0lBRWpCLE9BQU87UUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RCLENBQUM7OztZQVRGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlU2NoZW1hU2VydmljZSB7XG5cbiAgY2hhbmdlcyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGNoYW5nZWQoKSB7XG4gICAgdGhpcy5jaGFuZ2VzLmVtaXQoKTtcbiAgfVxuXG59XG4iXX0=