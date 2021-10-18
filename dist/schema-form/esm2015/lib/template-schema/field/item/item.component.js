import { Component, ElementRef, Input, } from '@angular/core';
import { TemplateSchemaElement } from '../../template-schema-element';
export class ItemComponent extends TemplateSchemaElement {
    constructor(elementRef) {
        super();
        this.elementRef = elementRef;
    }
    ngOnInit() {
        this.description = this.getTextContent(this.elementRef);
    }
}
ItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'sf-item',
                template: "<ng-content></ng-content>\n"
            },] }
];
ItemComponent.ctorParameters = () => [
    { type: ElementRef }
];
ItemComponent.propDecorators = {
    value: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zY2hlbWEtZm9ybS9zcmMvbGliL3RlbXBsYXRlLXNjaGVtYS9maWVsZC9pdGVtL2l0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssR0FFTCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQU90RSxNQUFNLE9BQU8sYUFBYyxTQUFRLHFCQUFxQjtJQU90RCxZQUFvQixVQUFzQjtRQUN4QyxLQUFLLEVBQUUsQ0FBQztRQURVLGVBQVUsR0FBVixVQUFVLENBQVk7SUFFMUMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFELENBQUM7OztZQWpCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLHVDQUFvQzthQUNyQzs7O1lBWEEsVUFBVTs7O29CQWNSLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuIENvbXBvbmVudCxcbiBFbGVtZW50UmVmLFxuIElucHV0LFxuIE9uSW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFRlbXBsYXRlU2NoZW1hRWxlbWVudCB9IGZyb20gJy4uLy4uL3RlbXBsYXRlLXNjaGVtYS1lbGVtZW50JztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1pdGVtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2l0ZW0uY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1Db21wb25lbnQgZXh0ZW5kcyBUZW1wbGF0ZVNjaGVtYUVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIHZhbHVlOiBhbnk7XG5cbiAgZGVzY3JpcHRpb246IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMuZ2V0VGV4dENvbnRlbnQodGhpcy5lbGVtZW50UmVmKTtcbiAgfVxuXG59XG4iXX0=