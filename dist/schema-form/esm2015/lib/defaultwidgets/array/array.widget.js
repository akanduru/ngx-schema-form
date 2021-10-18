import { Component } from '@angular/core';
import { ArrayLayoutWidget } from '../../widget';
export class ArrayWidget extends ArrayLayoutWidget {
    addItem() {
        this.formProperty.addItem();
        this.updateButtonDisabledState();
    }
    removeItem(item) {
        this.formProperty.removeItem(item);
        this.updateButtonDisabledState();
    }
    trackByIndex(index, item) {
        return index;
    }
    updateButtonDisabledState() {
        this.buttonDisabledAdd = this.isAddButtonDisabled();
        this.buttonDisabledRemove = this.isRemoveButtonDisabled();
    }
    isAddButtonDisabled() {
        if (this.schema.hasOwnProperty('maxItems') && Array.isArray(this.formProperty.properties)) {
            if (this.formProperty.properties.length >= this.schema.maxItems) {
                return true;
            }
        }
        return false;
    }
    isRemoveButtonDisabled() {
        if (this.schema.hasOwnProperty('minItems') && Array.isArray(this.formProperty.properties)) {
            if (this.formProperty.properties.length <= this.schema.minItems) {
                return true;
            }
        }
        return false;
    }
}
ArrayWidget.decorators = [
    { type: Component, args: [{
                selector: 'sf-array-widget',
                template: `<div class="widget form-group">
	<label [attr.for]="id" class="horizontal control-label">
		{{ schema.title }}
	</label>
	<span *ngIf="schema.description" class="formHelp">{{schema.description}}</span>
	<div *ngFor="let itemProperty of formProperty.properties">
		<sf-form-element [formProperty]="itemProperty"></sf-form-element>
		<button (click)="removeItem(itemProperty)" class="btn btn-default array-remove-button"
			[disabled]="isRemoveButtonDisabled()" 
			*ngIf="!(schema.hasOwnProperty('minItems') && schema.hasOwnProperty('maxItems') && schema.minItems === schema.maxItems)"
			>
			<span class="glyphicon glyphicon-minus" aria-hidden="true"></span> Remove
		</button>
	</div>
	<button (click)="addItem()" class="btn btn-default array-add-button"
		[disabled]="isAddButtonDisabled()"
		*ngIf="!(schema.hasOwnProperty('minItems') && schema.hasOwnProperty('maxItems') && schema.minItems === schema.maxItems)"
	>
		<span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add
	</button>
</div>`
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkud2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2NoZW1hLWZvcm0vc3JjL2xpYi9kZWZhdWx0d2lkZ2V0cy9hcnJheS9hcnJheS53aWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUEyQmpELE1BQU0sT0FBTyxXQUFZLFNBQVEsaUJBQWlCO0lBSWhELE9BQU87UUFDUixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFBO0lBQy9CLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBa0I7UUFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUE7SUFDL0IsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFhLEVBQUUsSUFBUztRQUNuQyxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRix5QkFBeUI7UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO1FBQ25ELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQTtJQUMxRCxDQUFDO0lBQ0QsbUJBQW1CO1FBQ2xCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzFGLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUNoRSxPQUFPLElBQUksQ0FBQTthQUNYO1NBQ0Q7UUFDRCxPQUFPLEtBQUssQ0FBQTtJQUNiLENBQUM7SUFFRCxzQkFBc0I7UUFDckIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDMUYsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQ2hFLE9BQU8sSUFBSSxDQUFBO2FBQ1g7U0FDRDtRQUNELE9BQU8sS0FBSyxDQUFBO0lBQ2IsQ0FBQzs7O1lBOURELFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bb0JMO2FBQ04iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQXJyYXlMYXlvdXRXaWRnZXQgfSBmcm9tICcuLi8uLi93aWRnZXQnO1xuaW1wb3J0IHsgRm9ybVByb3BlcnR5IH0gZnJvbSAnLi4vLi4vbW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1hcnJheS13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ3aWRnZXQgZm9ybS1ncm91cFwiPlxuXHQ8bGFiZWwgW2F0dHIuZm9yXT1cImlkXCIgY2xhc3M9XCJob3Jpem9udGFsIGNvbnRyb2wtbGFiZWxcIj5cblx0XHR7eyBzY2hlbWEudGl0bGUgfX1cblx0PC9sYWJlbD5cblx0PHNwYW4gKm5nSWY9XCJzY2hlbWEuZGVzY3JpcHRpb25cIiBjbGFzcz1cImZvcm1IZWxwXCI+e3tzY2hlbWEuZGVzY3JpcHRpb259fTwvc3Bhbj5cblx0PGRpdiAqbmdGb3I9XCJsZXQgaXRlbVByb3BlcnR5IG9mIGZvcm1Qcm9wZXJ0eS5wcm9wZXJ0aWVzXCI+XG5cdFx0PHNmLWZvcm0tZWxlbWVudCBbZm9ybVByb3BlcnR5XT1cIml0ZW1Qcm9wZXJ0eVwiPjwvc2YtZm9ybS1lbGVtZW50PlxuXHRcdDxidXR0b24gKGNsaWNrKT1cInJlbW92ZUl0ZW0oaXRlbVByb3BlcnR5KVwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGFycmF5LXJlbW92ZS1idXR0b25cIlxuXHRcdFx0W2Rpc2FibGVkXT1cImlzUmVtb3ZlQnV0dG9uRGlzYWJsZWQoKVwiIFxuXHRcdFx0Km5nSWY9XCIhKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnbWluSXRlbXMnKSAmJiBzY2hlbWEuaGFzT3duUHJvcGVydHkoJ21heEl0ZW1zJykgJiYgc2NoZW1hLm1pbkl0ZW1zID09PSBzY2hlbWEubWF4SXRlbXMpXCJcblx0XHRcdD5cblx0XHRcdDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1taW51c1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4gUmVtb3ZlXG5cdFx0PC9idXR0b24+XG5cdDwvZGl2PlxuXHQ8YnV0dG9uIChjbGljayk9XCJhZGRJdGVtKClcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBhcnJheS1hZGQtYnV0dG9uXCJcblx0XHRbZGlzYWJsZWRdPVwiaXNBZGRCdXR0b25EaXNhYmxlZCgpXCJcblx0XHQqbmdJZj1cIiEoc2NoZW1hLmhhc093blByb3BlcnR5KCdtaW5JdGVtcycpICYmIHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnbWF4SXRlbXMnKSAmJiBzY2hlbWEubWluSXRlbXMgPT09IHNjaGVtYS5tYXhJdGVtcylcIlxuXHQ+XG5cdFx0PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+IEFkZFxuXHQ8L2J1dHRvbj5cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgQXJyYXlXaWRnZXQgZXh0ZW5kcyBBcnJheUxheW91dFdpZGdldCB7XG4gIGJ1dHRvbkRpc2FibGVkQWRkOmJvb2xlYW5cbiAgYnV0dG9uRGlzYWJsZWRSZW1vdmU6Ym9vbGVhblxuXG4gIGFkZEl0ZW0oKSB7XG5cdHRoaXMuZm9ybVByb3BlcnR5LmFkZEl0ZW0oKTtcblx0dGhpcy51cGRhdGVCdXR0b25EaXNhYmxlZFN0YXRlKClcbiAgfVxuXG4gIHJlbW92ZUl0ZW0oaXRlbTogRm9ybVByb3BlcnR5KSB7XG5cdHRoaXMuZm9ybVByb3BlcnR5LnJlbW92ZUl0ZW0oaXRlbSk7XG5cdHRoaXMudXBkYXRlQnV0dG9uRGlzYWJsZWRTdGF0ZSgpXG4gIH1cblxuICB0cmFja0J5SW5kZXgoaW5kZXg6IG51bWJlciwgaXRlbTogYW55KSB7XG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cblx0dXBkYXRlQnV0dG9uRGlzYWJsZWRTdGF0ZSgpIHtcblx0XHR0aGlzLmJ1dHRvbkRpc2FibGVkQWRkID0gdGhpcy5pc0FkZEJ1dHRvbkRpc2FibGVkKClcblx0XHR0aGlzLmJ1dHRvbkRpc2FibGVkUmVtb3ZlID0gdGhpcy5pc1JlbW92ZUJ1dHRvbkRpc2FibGVkKClcblx0fVxuXHRpc0FkZEJ1dHRvbkRpc2FibGVkKCkge1xuXHRcdGlmICh0aGlzLnNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnbWF4SXRlbXMnKSAmJiBBcnJheS5pc0FycmF5KHRoaXMuZm9ybVByb3BlcnR5LnByb3BlcnRpZXMpKSB7XG5cdFx0XHRpZiAodGhpcy5mb3JtUHJvcGVydHkucHJvcGVydGllcy5sZW5ndGggPj0gdGhpcy5zY2hlbWEubWF4SXRlbXMpIHtcblx0XHRcdFx0cmV0dXJuIHRydWVcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblxuXHRpc1JlbW92ZUJ1dHRvbkRpc2FibGVkKCkge1xuXHRcdGlmICh0aGlzLnNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnbWluSXRlbXMnKSAmJiBBcnJheS5pc0FycmF5KHRoaXMuZm9ybVByb3BlcnR5LnByb3BlcnRpZXMpKSB7XG5cdFx0XHRpZiAodGhpcy5mb3JtUHJvcGVydHkucHJvcGVydGllcy5sZW5ndGggPD0gdGhpcy5zY2hlbWEubWluSXRlbXMpIHtcblx0XHRcdFx0cmV0dXJuIHRydWVcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cbn1cbiJdfQ==