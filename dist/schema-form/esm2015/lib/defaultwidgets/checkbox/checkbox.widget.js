import { Component } from '@angular/core';
import { ControlWidget } from '../../widget';
// tslint:disable-next-line:component-class-suffix
export class CheckboxWidget extends ControlWidget {
    constructor() {
        super(...arguments);
        this.checked = {};
    }
    ngAfterViewInit() {
        const control = this.control;
        this.formProperty.valueChanges.subscribe((newValue) => {
            if (control.value !== newValue) {
                this.checked = {};
                control.setValue(newValue, { emitEvent: false });
                if (newValue && Array.isArray(newValue)) {
                    newValue.map(v => this.checked[v] = true);
                }
            }
        });
        this.formProperty.errorsChanges.subscribe((errors) => {
            control.setErrors(errors, { emitEvent: true });
        });
        control.valueChanges.subscribe((newValue) => {
            this.formProperty.setValue(newValue, false);
        });
    }
    onCheck(el) {
        if (el.checked) {
            this.checked[el.value] = true;
        }
        else {
            delete this.checked[el.value];
        }
        this.formProperty.setValue(Object.keys(this.checked), false);
    }
}
CheckboxWidget.decorators = [
    { type: Component, args: [{
                selector: 'sf-checkbox-widget',
                template: `<div class="widget form-group">
    <label [attr.for]="id" class="horizontal control-label">
        {{ schema.title }}
    </label>
	<div *ngIf="schema.type!='array'" class="checkbox">
		<label class="horizontal control-label">
			<input [formControl]="control" [attr.name]="name" [attr.id]="id" [indeterminate]="control.value !== false && control.value !== true ? true :null" type="checkbox" [disabled]="schema.readOnly">
			<input *ngIf="schema.readOnly" [attr.name]="name" type="hidden" [formControl]="control">
			{{schema.description}}
		</label>
	</div>
	<ng-container *ngIf="schema.type==='array'">
		<div *ngFor="let option of schema.items.oneOf" class="checkbox">
			<label class="horizontal control-label">
				<input [attr.name]="name"
					value="{{option.enum[0]}}" type="checkbox"
					[attr.disabled]="schema.readOnly"
					(change)="onCheck($event.target)"
					[attr.checked]="checked[option.enum[0]] ? true : null"
					[attr.id]="id + '.' + option.enum[0]"
					>
				{{option.description}}
			</label>
		</div>
	</ng-container>
</div>`
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gud2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2NoZW1hLWZvcm0vc3JjL2xpYi9kZWZhdWx0d2lkZ2V0cy9jaGVja2JveC9jaGVja2JveC53aWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQStCN0Msa0RBQWtEO0FBQ2xELE1BQU0sT0FBTyxjQUFlLFNBQVEsYUFBYTtJQTlCakQ7O1FBZ0NDLFlBQU8sR0FBUSxFQUFFLENBQUM7SUE2Qm5CLENBQUM7SUEzQkEsZUFBZTtRQUNkLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDckQsSUFBSSxPQUFPLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQ2pELElBQUksUUFBUSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ3hDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2lCQUMxQzthQUNEO1FBQ0YsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNwRCxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsT0FBTyxDQUFDLEVBQUU7UUFDVCxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7WUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDOUI7YUFBTTtZQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUI7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs7WUE1REQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCTDthQUNOIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbnRyb2xXaWRnZXQgfSBmcm9tICcuLi8uLi93aWRnZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1jaGVja2JveC13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ3aWRnZXQgZm9ybS1ncm91cFwiPlxuICAgIDxsYWJlbCBbYXR0ci5mb3JdPVwiaWRcIiBjbGFzcz1cImhvcml6b250YWwgY29udHJvbC1sYWJlbFwiPlxuICAgICAgICB7eyBzY2hlbWEudGl0bGUgfX1cbiAgICA8L2xhYmVsPlxuXHQ8ZGl2ICpuZ0lmPVwic2NoZW1hLnR5cGUhPSdhcnJheSdcIiBjbGFzcz1cImNoZWNrYm94XCI+XG5cdFx0PGxhYmVsIGNsYXNzPVwiaG9yaXpvbnRhbCBjb250cm9sLWxhYmVsXCI+XG5cdFx0XHQ8aW5wdXQgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiBbYXR0ci5pZF09XCJpZFwiIFtpbmRldGVybWluYXRlXT1cImNvbnRyb2wudmFsdWUgIT09IGZhbHNlICYmIGNvbnRyb2wudmFsdWUgIT09IHRydWUgPyB0cnVlIDpudWxsXCIgdHlwZT1cImNoZWNrYm94XCIgW2Rpc2FibGVkXT1cInNjaGVtYS5yZWFkT25seVwiPlxuXHRcdFx0PGlucHV0ICpuZ0lmPVwic2NoZW1hLnJlYWRPbmx5XCIgW2F0dHIubmFtZV09XCJuYW1lXCIgdHlwZT1cImhpZGRlblwiIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCI+XG5cdFx0XHR7e3NjaGVtYS5kZXNjcmlwdGlvbn19XG5cdFx0PC9sYWJlbD5cblx0PC9kaXY+XG5cdDxuZy1jb250YWluZXIgKm5nSWY9XCJzY2hlbWEudHlwZT09PSdhcnJheSdcIj5cblx0XHQ8ZGl2ICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygc2NoZW1hLml0ZW1zLm9uZU9mXCIgY2xhc3M9XCJjaGVja2JveFwiPlxuXHRcdFx0PGxhYmVsIGNsYXNzPVwiaG9yaXpvbnRhbCBjb250cm9sLWxhYmVsXCI+XG5cdFx0XHRcdDxpbnB1dCBbYXR0ci5uYW1lXT1cIm5hbWVcIlxuXHRcdFx0XHRcdHZhbHVlPVwie3tvcHRpb24uZW51bVswXX19XCIgdHlwZT1cImNoZWNrYm94XCJcblx0XHRcdFx0XHRbYXR0ci5kaXNhYmxlZF09XCJzY2hlbWEucmVhZE9ubHlcIlxuXHRcdFx0XHRcdChjaGFuZ2UpPVwib25DaGVjaygkZXZlbnQudGFyZ2V0KVwiXG5cdFx0XHRcdFx0W2F0dHIuY2hlY2tlZF09XCJjaGVja2VkW29wdGlvbi5lbnVtWzBdXSA/IHRydWUgOiBudWxsXCJcblx0XHRcdFx0XHRbYXR0ci5pZF09XCJpZCArICcuJyArIG9wdGlvbi5lbnVtWzBdXCJcblx0XHRcdFx0XHQ+XG5cdFx0XHRcdHt7b3B0aW9uLmRlc2NyaXB0aW9ufX1cblx0XHRcdDwvbGFiZWw+XG5cdFx0PC9kaXY+XG5cdDwvbmctY29udGFpbmVyPlxuPC9kaXY+YFxufSlcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgQ2hlY2tib3hXaWRnZXQgZXh0ZW5kcyBDb250cm9sV2lkZ2V0IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cblx0Y2hlY2tlZDogYW55ID0ge307XG5cblx0bmdBZnRlclZpZXdJbml0KCkge1xuXHRcdGNvbnN0IGNvbnRyb2wgPSB0aGlzLmNvbnRyb2w7XG5cdFx0dGhpcy5mb3JtUHJvcGVydHkudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcblx0XHRcdGlmIChjb250cm9sLnZhbHVlICE9PSBuZXdWYWx1ZSkge1xuXHRcdFx0ICB0aGlzLmNoZWNrZWQgPSB7fTtcblx0XHRcdFx0Y29udHJvbC5zZXRWYWx1ZShuZXdWYWx1ZSwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuXHRcdFx0XHRpZiAobmV3VmFsdWUgJiYgQXJyYXkuaXNBcnJheShuZXdWYWx1ZSkpIHtcblx0XHRcdFx0XHRuZXdWYWx1ZS5tYXAodiA9PiB0aGlzLmNoZWNrZWRbdl0gPSB0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuZm9ybVByb3BlcnR5LmVycm9yc0NoYW5nZXMuc3Vic2NyaWJlKChlcnJvcnMpID0+IHtcblx0XHRcdGNvbnRyb2wuc2V0RXJyb3JzKGVycm9ycywgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XG5cdFx0fSk7XG5cdFx0Y29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xuXHRcdFx0dGhpcy5mb3JtUHJvcGVydHkuc2V0VmFsdWUobmV3VmFsdWUsIGZhbHNlKTtcblx0XHR9KTtcblx0fVxuXG5cdG9uQ2hlY2soZWwpIHtcblx0XHRpZiAoZWwuY2hlY2tlZCkge1xuXHRcdFx0dGhpcy5jaGVja2VkW2VsLnZhbHVlXSA9IHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlbGV0ZSB0aGlzLmNoZWNrZWRbZWwudmFsdWVdO1xuXHRcdH1cblx0XHR0aGlzLmZvcm1Qcm9wZXJ0eS5zZXRWYWx1ZShPYmplY3Qua2V5cyh0aGlzLmNoZWNrZWQpLCBmYWxzZSk7XG5cdH1cbn1cbiJdfQ==