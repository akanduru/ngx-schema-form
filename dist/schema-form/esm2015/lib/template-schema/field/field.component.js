import { Component, Input, ContentChildren, QueryList, ElementRef, } from '@angular/core';
import { ActionRegistry } from '../../model/actionregistry';
import { TemplateSchemaService } from '../template-schema.service';
import { ButtonComponent } from '../button/button.component';
import { FieldParent } from './field-parent';
import { FieldType } from './field';
import { ItemComponent } from './item/item.component';
import { merge } from 'rxjs';
export class FieldComponent extends FieldParent {
    constructor(elementRef, templateSchemaService, actionRegistry) {
        super();
        this.elementRef = elementRef;
        this.templateSchemaService = templateSchemaService;
        this.actionRegistry = actionRegistry;
        this.type = FieldType.String;
        this.schema = {};
    }
    getSchema() {
        const { properties, items, required } = this.getFieldsSchema(this.childFields.filter(field => field !== this));
        const oneOf = this.getOneOf();
        const schema = {
            type: this.type
        };
        if (this.title !== undefined) {
            schema.title = this.title;
        }
        if (properties !== undefined) {
            schema.properties = properties;
        }
        if (items !== undefined) {
            schema.items = items;
        }
        // requried child fields
        if (required !== undefined) {
            schema.required = required;
        }
        if (oneOf !== undefined) {
            schema.oneOf = oneOf;
        }
        if (this.description !== undefined) {
            schema.description = this.description;
        }
        if (this.placeholder !== undefined) {
            schema.placeholder = this.placeholder;
        }
        if (this.format !== undefined) {
            schema.format = this.format;
        }
        if (this.widget !== undefined) {
            schema.widget = this.widget;
        }
        if (this.readOnly !== undefined) {
            schema.readOnly = this.readOnly;
        }
        const buttons = this.getButtons();
        if (buttons.length > 0) {
            schema.buttons = buttons;
        }
        // @Input schema takes precedence
        return Object.assign(schema, this.schema);
    }
    getValidators() {
        // registering validator here is not possible since prop full path is needed
        const childValidators = this.getFieldsValidators(this.childFields.filter(field => field !== this));
        const validators = childValidators.map(({ path, validator }) => {
            return {
                path: this.path + path,
                validator
            };
        });
        if (!this.validator) {
            return validators;
        }
        validators.push({ path: this.path, validator: this.validator });
        return validators;
    }
    ngOnChanges(changes) {
        const keys = Object.keys(changes);
        if (keys.length > 0) {
            for (const key of keys) {
                if (!changes[key].isFirstChange()) {
                    // on any input change, force schema change generation
                    this.templateSchemaService.changed();
                    break;
                }
            }
        }
    }
    getOneOf() {
        if (this.childItems.length === 0) {
            return;
        }
        const items = this.childItems.map(({ value, description }) => {
            if (!Array.isArray(value)) {
                return { enum: [value], description };
            }
            return { enum: value, description };
        });
        if (items.length === 0) {
            return;
        }
        return items;
    }
    setTitleFromContent() {
        const textContent = this.getTextContent(this.elementRef);
        //  title as @Input takes priority over content text
        if (textContent && !this.title) {
            this.title = textContent;
        }
    }
    ngAfterContentInit() {
        // cache it
        this.setTitleFromContent();
        merge(this.childFields.changes, this.childItems.changes, this.childButtons.changes)
            .subscribe(() => this.templateSchemaService.changed());
    }
}
FieldComponent.decorators = [
    { type: Component, args: [{
                selector: 'sf-field',
                template: "<ng-content ></ng-content>\n"
            },] }
];
FieldComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: TemplateSchemaService },
    { type: ActionRegistry }
];
FieldComponent.propDecorators = {
    childFields: [{ type: ContentChildren, args: [FieldComponent,] }],
    childItems: [{ type: ContentChildren, args: [ItemComponent,] }],
    childButtons: [{ type: ContentChildren, args: [ButtonComponent,] }],
    name: [{ type: Input }],
    type: [{ type: Input }],
    format: [{ type: Input }],
    required: [{ type: Input }],
    readOnly: [{ type: Input }],
    title: [{ type: Input }],
    description: [{ type: Input }],
    placeholder: [{ type: Input }],
    widget: [{ type: Input }],
    validator: [{ type: Input }],
    schema: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2NoZW1hLWZvcm0vc3JjL2xpYi90ZW1wbGF0ZS1zY2hlbWEvZmllbGQvZmllbGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxHQUdYLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUc1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFN0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxTQUFTLEVBQVMsTUFBTSxTQUFTLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFRN0IsTUFBTSxPQUFPLGNBQWUsU0FBUSxXQUFXO0lBNkM3QyxZQUNVLFVBQXNCLEVBQ3RCLHFCQUE0QyxFQUMxQyxjQUE4QjtRQUV4QyxLQUFLLEVBQUUsQ0FBQztRQUpBLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUMxQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFoQzFDLFNBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBMkJ4QixXQUFNLEdBQVksRUFBRyxDQUFDO0lBUXRCLENBQUM7SUFFRCxTQUFTO1FBRVAsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FDMUQsSUFB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QUNILENBQUM7SUFFRCxrQkFBa0I7UUFFaEIsV0FBVztRQUNYLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRTNCLEtBQUssQ0FDSCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUMxQjthQUNBLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDOzs7WUF2TUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxVQUFVO2dCQUNwQix3Q0FBcUM7YUFDdEM7OztZQXJCQyxVQUFVO1lBUUgscUJBQXFCO1lBSHJCLGNBQWM7OzswQkFvQnBCLGVBQWUsU0FBQyxjQUFjO3lCQUc5QixlQUFlLFNBQUMsYUFBYTsyQkFHN0IsZUFBZSxTQUFDLGVBQWU7bUJBRy9CLEtBQUs7bUJBR0wsS0FBSztxQkFHTCxLQUFLO3VCQUdMLEtBQUs7dUJBR0wsS0FBSztvQkFHTCxLQUFLOzBCQUdMLEtBQUs7MEJBR0wsS0FBSztxQkFHTCxLQUFLO3dCQUdMLEtBQUs7cUJBR0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgUXVlcnlMaXN0LFxuICBFbGVtZW50UmVmLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPbkNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBY3Rpb25SZWdpc3RyeSB9IGZyb20gJy4uLy4uL21vZGVsL2FjdGlvbnJlZ2lzdHJ5JztcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gJy4uLy4uL21vZGVsL3ZhbGlkYXRvcic7XG5cbmltcG9ydCB7IFRlbXBsYXRlU2NoZW1hU2VydmljZSB9IGZyb20gJy4uL3RlbXBsYXRlLXNjaGVtYS5zZXJ2aWNlJztcbmltcG9ydCB7IEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4uL2J1dHRvbi9idXR0b24uY29tcG9uZW50JztcblxuaW1wb3J0IHsgRmllbGRQYXJlbnQgfSBmcm9tICcuL2ZpZWxkLXBhcmVudCc7XG5pbXBvcnQgeyBGaWVsZFR5cGUsIEZpZWxkIH0gZnJvbSAnLi9maWVsZCc7XG5pbXBvcnQgeyBJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9pdGVtL2l0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IG1lcmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0lTY2hlbWF9IGZyb20gJy4uLy4uL21vZGVsL0lTY2hlbWEnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NmLWZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpZWxkLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBGaWVsZENvbXBvbmVudCBleHRlbmRzIEZpZWxkUGFyZW50IGltcGxlbWVudHNcbkZpZWxkLCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQge1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRmllbGRDb21wb25lbnQpXG4gIGNoaWxkRmllbGRzOiBRdWVyeUxpc3Q8RmllbGRDb21wb25lbnQ+O1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oSXRlbUNvbXBvbmVudClcbiAgY2hpbGRJdGVtczogUXVlcnlMaXN0PEl0ZW1Db21wb25lbnQ+O1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oQnV0dG9uQ29tcG9uZW50KVxuICBjaGlsZEJ1dHRvbnM6IFF1ZXJ5TGlzdDxCdXR0b25Db21wb25lbnQ+O1xuXG4gIEBJbnB1dCgpXG4gIG5hbWU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICB0eXBlID0gRmllbGRUeXBlLlN0cmluZztcblxuICBASW5wdXQoKVxuICBmb3JtYXQ6IHN0cmluZztcblxuICBASW5wdXQoKVxuICByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICByZWFkT25seTogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICB0aXRsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICBASW5wdXQoKVxuICB3aWRnZXQ6IHN0cmluZyB8IG9iamVjdDtcblxuICBASW5wdXQoKVxuICB2YWxpZGF0b3I6IFZhbGlkYXRvcjtcblxuICBASW5wdXQoKVxuICBzY2hlbWE6IElTY2hlbWEgPSB7IH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgdGVtcGxhdGVTY2hlbWFTZXJ2aWNlOiBUZW1wbGF0ZVNjaGVtYVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGFjdGlvblJlZ2lzdHJ5OiBBY3Rpb25SZWdpc3RyeVxuICApIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgZ2V0U2NoZW1hKCk6IElTY2hlbWEge1xuXG4gICAgY29uc3QgeyBwcm9wZXJ0aWVzLCBpdGVtcywgcmVxdWlyZWQgfSA9IHRoaXMuZ2V0RmllbGRzU2NoZW1hKFxuICAgICAgdGhpcy5jaGlsZEZpZWxkcy5maWx0ZXIoZmllbGQgPT4gZmllbGQgIT09IHRoaXMpXG4gICAgKTtcblxuICAgIGNvbnN0IG9uZU9mID0gdGhpcy5nZXRPbmVPZigpO1xuXG4gICAgY29uc3Qgc2NoZW1hOiBJU2NoZW1hID0ge1xuICAgICAgdHlwZTogdGhpcy50eXBlXG4gICAgfTtcblxuICAgIGlmICh0aGlzLnRpdGxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjaGVtYS50aXRsZSA9IHRoaXMudGl0bGU7XG4gICAgfVxuXG4gICAgaWYgKHByb3BlcnRpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xuICAgIH1cblxuICAgIGlmIChpdGVtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2hlbWEuaXRlbXMgPSBpdGVtcztcbiAgICB9XG5cbiAgICAvLyByZXF1cmllZCBjaGlsZCBmaWVsZHNcbiAgICBpZiAocmVxdWlyZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLnJlcXVpcmVkID0gcmVxdWlyZWQ7XG4gICAgfVxuXG4gICAgaWYgKG9uZU9mICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjaGVtYS5vbmVPZiA9IG9uZU9mO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjaGVtYS5kZXNjcmlwdGlvbiA9IHRoaXMuZGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGxhY2Vob2xkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLnBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlcjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mb3JtYXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLmZvcm1hdCA9IHRoaXMuZm9ybWF0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLndpZGdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2hlbWEud2lkZ2V0ID0gdGhpcy53aWRnZXQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVhZE9ubHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLnJlYWRPbmx5ID0gdGhpcy5yZWFkT25seTtcbiAgICB9XG5cbiAgICBjb25zdCBidXR0b25zID0gdGhpcy5nZXRCdXR0b25zKCk7XG4gICAgaWYgKGJ1dHRvbnMubGVuZ3RoID4gMCkge1xuICAgICAgc2NoZW1hLmJ1dHRvbnMgPSBidXR0b25zO1xuICAgIH1cblxuICAgIC8vIEBJbnB1dCBzY2hlbWEgdGFrZXMgcHJlY2VkZW5jZVxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHNjaGVtYSwgdGhpcy5zY2hlbWEpO1xuXG4gIH1cblxuICBnZXRWYWxpZGF0b3JzKCk6IHsgcGF0aDogc3RyaW5nLCB2YWxpZGF0b3I6IFZhbGlkYXRvciB9W10ge1xuXG4gICAgLy8gcmVnaXN0ZXJpbmcgdmFsaWRhdG9yIGhlcmUgaXMgbm90IHBvc3NpYmxlIHNpbmNlIHByb3AgZnVsbCBwYXRoIGlzIG5lZWRlZFxuICAgIGNvbnN0IGNoaWxkVmFsaWRhdG9ycyA9IHRoaXMuZ2V0RmllbGRzVmFsaWRhdG9ycyhcbiAgICAgIHRoaXMuY2hpbGRGaWVsZHMuZmlsdGVyKGZpZWxkID0+IGZpZWxkICE9PSB0aGlzKVxuICAgICk7XG4gICAgY29uc3QgdmFsaWRhdG9ycyA9IGNoaWxkVmFsaWRhdG9ycy5tYXAoKHsgcGF0aCwgdmFsaWRhdG9yIH0pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdGg6IHRoaXMucGF0aCArIHBhdGgsXG4gICAgICAgIHZhbGlkYXRvclxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGlmICghdGhpcy52YWxpZGF0b3IpIHtcbiAgICAgIHJldHVybiB2YWxpZGF0b3JzO1xuICAgIH1cblxuICAgIHZhbGlkYXRvcnMucHVzaCh7IHBhdGg6IHRoaXMucGF0aCwgdmFsaWRhdG9yOiB0aGlzLnZhbGlkYXRvciB9KTtcbiAgICByZXR1cm4gdmFsaWRhdG9ycztcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcblxuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjaGFuZ2VzKTtcbiAgICBpZiAoa2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgIGlmICghY2hhbmdlc1trZXldLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgICAgIC8vIG9uIGFueSBpbnB1dCBjaGFuZ2UsIGZvcmNlIHNjaGVtYSBjaGFuZ2UgZ2VuZXJhdGlvblxuICAgICAgICAgIHRoaXMudGVtcGxhdGVTY2hlbWFTZXJ2aWNlLmNoYW5nZWQoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICB9XG5cblxuICBwcml2YXRlIGdldE9uZU9mKCkge1xuXG4gICAgaWYgKHRoaXMuY2hpbGRJdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuY2hpbGRJdGVtcy5tYXAoKHsgdmFsdWUsIGRlc2NyaXB0aW9uIH0pID0+IHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHsgZW51bTogW3ZhbHVlXSwgZGVzY3JpcHRpb24gfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgZW51bTogdmFsdWUsIGRlc2NyaXB0aW9uIH07XG4gICAgfSk7XG5cbiAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZW1zO1xuICB9XG5cblxuICBwcml2YXRlIHNldFRpdGxlRnJvbUNvbnRlbnQoKSB7XG4gICAgY29uc3QgdGV4dENvbnRlbnQgPSB0aGlzLmdldFRleHRDb250ZW50KHRoaXMuZWxlbWVudFJlZik7XG5cbiAgICAvLyAgdGl0bGUgYXMgQElucHV0IHRha2VzIHByaW9yaXR5IG92ZXIgY29udGVudCB0ZXh0XG4gICAgaWYgKHRleHRDb250ZW50ICYmICF0aGlzLnRpdGxlKSB7XG4gICAgICB0aGlzLnRpdGxlID0gdGV4dENvbnRlbnQ7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuXG4gICAgLy8gY2FjaGUgaXRcbiAgICB0aGlzLnNldFRpdGxlRnJvbUNvbnRlbnQoKTtcblxuICAgIG1lcmdlKFxuICAgICAgdGhpcy5jaGlsZEZpZWxkcy5jaGFuZ2VzLFxuICAgICAgdGhpcy5jaGlsZEl0ZW1zLmNoYW5nZXMsXG4gICAgICB0aGlzLmNoaWxkQnV0dG9ucy5jaGFuZ2VzXG4gICAgKVxuICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy50ZW1wbGF0ZVNjaGVtYVNlcnZpY2UuY2hhbmdlZCgpKTtcbiAgfVxuXG59XG4iXX0=