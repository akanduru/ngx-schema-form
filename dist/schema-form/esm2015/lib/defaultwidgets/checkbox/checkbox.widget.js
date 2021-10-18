import { Component } from '@angular/core';
import { ControlWidget } from '../../widget';
export class CheckboxWidget extends ControlWidget {
    constructor() {
        super(...arguments);
        this.checked = {};
    }
    ngAfterViewInit() {
        const control = this.control;
        this.formProperty.valueChanges.subscribe((newValue) => {
            if (control.value !== newValue) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gud2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2NoZW1hLWZvcm0vc3JjL2xpYi9kZWZhdWx0d2lkZ2V0cy9jaGVja2JveC9jaGVja2JveC53aWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQStCN0MsTUFBTSxPQUFPLGNBQWUsU0FBUSxhQUFhO0lBN0JqRDs7UUErQkMsWUFBTyxHQUFRLEVBQUUsQ0FBQztJQTRCbkIsQ0FBQztJQTFCQSxlQUFlO1FBQ2QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNyRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUMvQixPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLFFBQVEsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUN4QyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztpQkFDMUM7YUFDRDtRQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDcEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELE9BQU8sQ0FBQyxFQUFFO1FBQ1QsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQzlCO2FBQU07WUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQzs7O1lBMURELFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qkw7YUFDTiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb250cm9sV2lkZ2V0IH0gZnJvbSAnLi4vLi4vd2lkZ2V0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2YtY2hlY2tib3gtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwid2lkZ2V0IGZvcm0tZ3JvdXBcIj5cbiAgICA8bGFiZWwgW2F0dHIuZm9yXT1cImlkXCIgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cbiAgICAgICAge3sgc2NoZW1hLnRpdGxlIH19XG4gICAgPC9sYWJlbD5cblx0PGRpdiAqbmdJZj1cInNjaGVtYS50eXBlIT0nYXJyYXknXCIgY2xhc3M9XCJjaGVja2JveFwiPlxuXHRcdDxsYWJlbCBjbGFzcz1cImhvcml6b250YWwgY29udHJvbC1sYWJlbFwiPlxuXHRcdFx0PGlucHV0IFtmb3JtQ29udHJvbF09XCJjb250cm9sXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgW2F0dHIuaWRdPVwiaWRcIiBbaW5kZXRlcm1pbmF0ZV09XCJjb250cm9sLnZhbHVlICE9PSBmYWxzZSAmJiBjb250cm9sLnZhbHVlICE9PSB0cnVlID8gdHJ1ZSA6bnVsbFwiIHR5cGU9XCJjaGVja2JveFwiIFtkaXNhYmxlZF09XCJzY2hlbWEucmVhZE9ubHlcIj5cblx0XHRcdDxpbnB1dCAqbmdJZj1cInNjaGVtYS5yZWFkT25seVwiIFthdHRyLm5hbWVdPVwibmFtZVwiIHR5cGU9XCJoaWRkZW5cIiBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiPlxuXHRcdFx0e3tzY2hlbWEuZGVzY3JpcHRpb259fVxuXHRcdDwvbGFiZWw+XG5cdDwvZGl2PlxuXHQ8bmctY29udGFpbmVyICpuZ0lmPVwic2NoZW1hLnR5cGU9PT0nYXJyYXknXCI+XG5cdFx0PGRpdiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHNjaGVtYS5pdGVtcy5vbmVPZlwiIGNsYXNzPVwiY2hlY2tib3hcIj5cblx0XHRcdDxsYWJlbCBjbGFzcz1cImhvcml6b250YWwgY29udHJvbC1sYWJlbFwiPlxuXHRcdFx0XHQ8aW5wdXQgW2F0dHIubmFtZV09XCJuYW1lXCJcblx0XHRcdFx0XHR2YWx1ZT1cInt7b3B0aW9uLmVudW1bMF19fVwiIHR5cGU9XCJjaGVja2JveFwiIFxuXHRcdFx0XHRcdFthdHRyLmRpc2FibGVkXT1cInNjaGVtYS5yZWFkT25seVwiXG5cdFx0XHRcdFx0KGNoYW5nZSk9XCJvbkNoZWNrKCRldmVudC50YXJnZXQpXCJcblx0XHRcdFx0XHRbYXR0ci5jaGVja2VkXT1cImNoZWNrZWRbb3B0aW9uLmVudW1bMF1dID8gdHJ1ZSA6IG51bGxcIlxuXHRcdFx0XHRcdFthdHRyLmlkXT1cImlkICsgJy4nICsgb3B0aW9uLmVudW1bMF1cIlxuXHRcdFx0XHRcdD5cblx0XHRcdFx0e3tvcHRpb24uZGVzY3JpcHRpb259fVxuXHRcdFx0PC9sYWJlbD5cblx0XHQ8L2Rpdj5cblx0PC9uZy1jb250YWluZXI+XG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrYm94V2lkZ2V0IGV4dGVuZHMgQ29udHJvbFdpZGdldCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG5cdGNoZWNrZWQ6IGFueSA9IHt9O1xuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHRjb25zdCBjb250cm9sID0gdGhpcy5jb250cm9sO1xuXHRcdHRoaXMuZm9ybVByb3BlcnR5LnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XG5cdFx0XHRpZiAoY29udHJvbC52YWx1ZSAhPT0gbmV3VmFsdWUpIHtcblx0XHRcdFx0Y29udHJvbC5zZXRWYWx1ZShuZXdWYWx1ZSwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuXHRcdFx0XHRpZiAobmV3VmFsdWUgJiYgQXJyYXkuaXNBcnJheShuZXdWYWx1ZSkpIHtcblx0XHRcdFx0XHRuZXdWYWx1ZS5tYXAodiA9PiB0aGlzLmNoZWNrZWRbdl0gPSB0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuZm9ybVByb3BlcnR5LmVycm9yc0NoYW5nZXMuc3Vic2NyaWJlKChlcnJvcnMpID0+IHtcblx0XHRcdGNvbnRyb2wuc2V0RXJyb3JzKGVycm9ycywgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XG5cdFx0fSk7XG5cdFx0Y29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xuXHRcdFx0dGhpcy5mb3JtUHJvcGVydHkuc2V0VmFsdWUobmV3VmFsdWUsIGZhbHNlKTtcblx0XHR9KTtcblx0fVxuXG5cdG9uQ2hlY2soZWwpIHtcblx0XHRpZiAoZWwuY2hlY2tlZCkge1xuXHRcdFx0dGhpcy5jaGVja2VkW2VsLnZhbHVlXSA9IHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlbGV0ZSB0aGlzLmNoZWNrZWRbZWwudmFsdWVdO1xuXHRcdH1cblx0XHR0aGlzLmZvcm1Qcm9wZXJ0eS5zZXRWYWx1ZShPYmplY3Qua2V5cyh0aGlzLmNoZWNrZWQpLCBmYWxzZSk7XG5cdH1cbn1cbiJdfQ==