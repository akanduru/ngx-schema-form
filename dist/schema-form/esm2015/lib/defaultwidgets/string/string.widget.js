import { Component } from '@angular/core';
import { ControlWidget } from '../../widget';
export class StringWidget extends ControlWidget {
    getInputType() {
        if (!this.schema.widget.id || this.schema.widget.id === 'string') {
            return 'text';
        }
        else {
            return this.schema.widget.id;
        }
    }
}
StringWidget.decorators = [
    { type: Component, args: [{
                selector: 'sf-string-widget',
                template: `<input *ngIf="this.schema.widget.id ==='hidden'; else notHiddenFieldBlock"
  [attr.name]="name" type="hidden" [formControl]="control">
<ng-template #notHiddenFieldBlock>
<div class="widget form-group">
    <label [attr.for]="id" class="horizontal control-label">
    	{{ schema.title }}
    </label>
    <span *ngIf="schema.description" class="formHelp">{{schema.description}}</span>
    <input [name]="name" [attr.readonly]="(schema.widget.id!=='color') && schema.readOnly?true:null"
    class="text-widget.id textline-widget form-control"
    [attr.type]="!this.schema.widget.id || this.schema.widget.id === 'string' ? 'text' : this.schema.widget.id"
    [attr.id]="id"  [formControl]="control" [attr.placeholder]="schema.placeholder"
    [attr.maxLength]="schema.maxLength || null"
    [attr.minLength]="schema.minLength || null"
    [attr.required]="schema.isRequired || null"
    [attr.disabled]="(schema.widget.id=='color' && schema.readOnly)?true:null">
    <input *ngIf="(schema.widget.id==='color' && schema.readOnly)" [attr.name]="name" type="hidden" [formControl]="control">
</div>
</ng-template>`
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLndpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NjaGVtYS1mb3JtL3NyYy9saWIvZGVmYXVsdHdpZGdldHMvc3RyaW5nL3N0cmluZy53aWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBd0I3QyxNQUFNLE9BQU8sWUFBYSxTQUFRLGFBQWE7SUFFM0MsWUFBWTtRQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLFFBQVEsRUFBRTtZQUM5RCxPQUFPLE1BQU0sQ0FBQztTQUNqQjthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7U0FDaEM7SUFDTCxDQUFDOzs7WUE5QkosU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBa0JHO2FBQ2QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29udHJvbFdpZGdldCB9IGZyb20gJy4uLy4uL3dpZGdldCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLXN0cmluZy13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYDxpbnB1dCAqbmdJZj1cInRoaXMuc2NoZW1hLndpZGdldC5pZCA9PT0naGlkZGVuJzsgZWxzZSBub3RIaWRkZW5GaWVsZEJsb2NrXCJcbiAgW2F0dHIubmFtZV09XCJuYW1lXCIgdHlwZT1cImhpZGRlblwiIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCI+XG48bmctdGVtcGxhdGUgI25vdEhpZGRlbkZpZWxkQmxvY2s+XG48ZGl2IGNsYXNzPVwid2lkZ2V0IGZvcm0tZ3JvdXBcIj5cbiAgICA8bGFiZWwgW2F0dHIuZm9yXT1cImlkXCIgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cbiAgICBcdHt7IHNjaGVtYS50aXRsZSB9fVxuICAgIDwvbGFiZWw+XG4gICAgPHNwYW4gKm5nSWY9XCJzY2hlbWEuZGVzY3JpcHRpb25cIiBjbGFzcz1cImZvcm1IZWxwXCI+e3tzY2hlbWEuZGVzY3JpcHRpb259fTwvc3Bhbj5cbiAgICA8aW5wdXQgW25hbWVdPVwibmFtZVwiIFthdHRyLnJlYWRvbmx5XT1cIihzY2hlbWEud2lkZ2V0LmlkIT09J2NvbG9yJykgJiYgc2NoZW1hLnJlYWRPbmx5P3RydWU6bnVsbFwiXG4gICAgY2xhc3M9XCJ0ZXh0LXdpZGdldC5pZCB0ZXh0bGluZS13aWRnZXQgZm9ybS1jb250cm9sXCJcbiAgICBbYXR0ci50eXBlXT1cIiF0aGlzLnNjaGVtYS53aWRnZXQuaWQgfHwgdGhpcy5zY2hlbWEud2lkZ2V0LmlkID09PSAnc3RyaW5nJyA/ICd0ZXh0JyA6IHRoaXMuc2NoZW1hLndpZGdldC5pZFwiXG4gICAgW2F0dHIuaWRdPVwiaWRcIiAgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJzY2hlbWEucGxhY2Vob2xkZXJcIlxuICAgIFthdHRyLm1heExlbmd0aF09XCJzY2hlbWEubWF4TGVuZ3RoIHx8IG51bGxcIlxuICAgIFthdHRyLm1pbkxlbmd0aF09XCJzY2hlbWEubWluTGVuZ3RoIHx8IG51bGxcIlxuICAgIFthdHRyLnJlcXVpcmVkXT1cInNjaGVtYS5pc1JlcXVpcmVkIHx8IG51bGxcIlxuICAgIFthdHRyLmRpc2FibGVkXT1cIihzY2hlbWEud2lkZ2V0LmlkPT0nY29sb3InICYmIHNjaGVtYS5yZWFkT25seSk/dHJ1ZTpudWxsXCI+XG4gICAgPGlucHV0ICpuZ0lmPVwiKHNjaGVtYS53aWRnZXQuaWQ9PT0nY29sb3InICYmIHNjaGVtYS5yZWFkT25seSlcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiB0eXBlPVwiaGlkZGVuXCIgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIj5cbjwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5gXG59KVxuZXhwb3J0IGNsYXNzIFN0cmluZ1dpZGdldCBleHRlbmRzIENvbnRyb2xXaWRnZXQge1xuXG4gICAgZ2V0SW5wdXRUeXBlKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2NoZW1hLndpZGdldC5pZCB8fCB0aGlzLnNjaGVtYS53aWRnZXQuaWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3RleHQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NoZW1hLndpZGdldC5pZDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==