import { Component } from '@angular/core';
import { ControlWidget } from '../../widget';
export class SelectWidget extends ControlWidget {
}
SelectWidget.decorators = [
    { type: Component, args: [{
                selector: 'sf-select-widget',
                template: `<div class="widget form-group">
	<label [attr.for]="id" class="horizontal control-label">
		{{ schema.title }}
	</label>

	<span *ngIf="schema.description" class="formHelp">
		{{schema.description}}
	</span>

	<select *ngIf="schema.type!='array'" [formControl]="control" [attr.name]="name" [attr.id]="id" [disabled]="schema.readOnly" [disableControl]="schema.readOnly" class="form-control">
		<ng-container *ngIf="schema.oneOf; else use_enum">
			<option *ngFor="let option of schema.oneOf" [ngValue]="option.enum[0]" >{{option.description}}</option>
		</ng-container>
		<ng-template #use_enum>
			<option *ngFor="let option of schema.enum" [ngValue]="option" >{{option}}</option>
		</ng-template>
	</select>

	<select *ngIf="schema.type==='array'" multiple [formControl]="control" [attr.name]="name" [attr.id]="id" [disabled]="schema.readOnly" [disableControl]="schema.readOnly" class="form-control">
    <option *ngFor="let option of schema.items.oneOf" [ngValue]="option.enum[0]" [disabled]="option.readOnly">{{option.description}}</option>
	</select>

	<input *ngIf="schema.readOnly" [attr.name]="name" type="hidden" [formControl]="control">
</div>`
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LndpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NjaGVtYS1mb3JtL3NyYy9saWIvZGVmYXVsdHdpZGdldHMvc2VsZWN0L3NlbGVjdC53aWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBNkI3QyxNQUFNLE9BQU8sWUFBYSxTQUFRLGFBQWE7OztZQTNCOUMsU0FBUyxTQUFDO2dCQUNWLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qko7YUFDTiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb250cm9sV2lkZ2V0IH0gZnJvbSAnLi4vLi4vd2lkZ2V0JztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnc2Ytc2VsZWN0LXdpZGdldCcsXG5cdHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIndpZGdldCBmb3JtLWdyb3VwXCI+XG5cdDxsYWJlbCBbYXR0ci5mb3JdPVwiaWRcIiBjbGFzcz1cImhvcml6b250YWwgY29udHJvbC1sYWJlbFwiPlxuXHRcdHt7IHNjaGVtYS50aXRsZSB9fVxuXHQ8L2xhYmVsPlxuXG5cdDxzcGFuICpuZ0lmPVwic2NoZW1hLmRlc2NyaXB0aW9uXCIgY2xhc3M9XCJmb3JtSGVscFwiPlxuXHRcdHt7c2NoZW1hLmRlc2NyaXB0aW9ufX1cblx0PC9zcGFuPlxuXG5cdDxzZWxlY3QgKm5nSWY9XCJzY2hlbWEudHlwZSE9J2FycmF5J1wiIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgW2F0dHIuaWRdPVwiaWRcIiBbZGlzYWJsZWRdPVwic2NoZW1hLnJlYWRPbmx5XCIgW2Rpc2FibGVDb250cm9sXT1cInNjaGVtYS5yZWFkT25seVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG5cdFx0PG5nLWNvbnRhaW5lciAqbmdJZj1cInNjaGVtYS5vbmVPZjsgZWxzZSB1c2VfZW51bVwiPlxuXHRcdFx0PG9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHNjaGVtYS5vbmVPZlwiIFtuZ1ZhbHVlXT1cIm9wdGlvbi5lbnVtWzBdXCIgPnt7b3B0aW9uLmRlc2NyaXB0aW9ufX08L29wdGlvbj5cblx0XHQ8L25nLWNvbnRhaW5lcj5cblx0XHQ8bmctdGVtcGxhdGUgI3VzZV9lbnVtPlxuXHRcdFx0PG9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHNjaGVtYS5lbnVtXCIgW25nVmFsdWVdPVwib3B0aW9uXCIgPnt7b3B0aW9ufX08L29wdGlvbj5cblx0XHQ8L25nLXRlbXBsYXRlPlxuXHQ8L3NlbGVjdD5cblxuXHQ8c2VsZWN0ICpuZ0lmPVwic2NoZW1hLnR5cGU9PT0nYXJyYXknXCIgbXVsdGlwbGUgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiBbYXR0ci5pZF09XCJpZFwiIFtkaXNhYmxlZF09XCJzY2hlbWEucmVhZE9ubHlcIiBbZGlzYWJsZUNvbnRyb2xdPVwic2NoZW1hLnJlYWRPbmx5XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cbiAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygc2NoZW1hLml0ZW1zLm9uZU9mXCIgW25nVmFsdWVdPVwib3B0aW9uLmVudW1bMF1cIiBbZGlzYWJsZWRdPVwib3B0aW9uLnJlYWRPbmx5XCI+e3tvcHRpb24uZGVzY3JpcHRpb259fTwvb3B0aW9uPlxuXHQ8L3NlbGVjdD5cblxuXHQ8aW5wdXQgKm5nSWY9XCJzY2hlbWEucmVhZE9ubHlcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiB0eXBlPVwiaGlkZGVuXCIgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIj5cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0V2lkZ2V0IGV4dGVuZHMgQ29udHJvbFdpZGdldCB7fVxuIl19