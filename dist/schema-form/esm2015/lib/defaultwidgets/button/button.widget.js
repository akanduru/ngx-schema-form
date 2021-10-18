import { Component } from "@angular/core";
export class ButtonWidget {
}
ButtonWidget.decorators = [
    { type: Component, args: [{
                selector: 'sf-button-widget',
                template: '<button (click)="button.action($event)">{{button.label}}</button>'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLndpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NjaGVtYS1mb3JtL3NyYy9saWIvZGVmYXVsdHdpZGdldHMvYnV0dG9uL2J1dHRvbi53aWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQU14QyxNQUFNLE9BQU8sWUFBWTs7O1lBSnhCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUUsbUVBQW1FO2FBQzlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWJ1dHRvbi13aWRnZXQnLFxuICB0ZW1wbGF0ZTogJzxidXR0b24gKGNsaWNrKT1cImJ1dHRvbi5hY3Rpb24oJGV2ZW50KVwiPnt7YnV0dG9uLmxhYmVsfX08L2J1dHRvbj4nXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbldpZGdldCB7XG4gIHB1YmxpYyBidXR0b25cbiAgcHVibGljIGZvcm1Qcm9wZXJ0eVxufVxuIl19