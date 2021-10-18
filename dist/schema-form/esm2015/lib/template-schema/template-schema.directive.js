import { Directive, ContentChildren, QueryList, SimpleChange, } from '@angular/core';
import { merge } from 'rxjs';
import { FormComponent } from '../form.component';
import { ActionRegistry } from '../model/actionregistry';
import { ValidatorRegistry } from '../model/validatorregistry';
import { TerminatorService } from '../terminator.service';
import { TemplateSchemaService } from './template-schema.service';
import { FieldComponent } from './field/field.component';
import { FieldType } from './field/field';
import { ButtonComponent } from './button/button.component';
import { FieldParent } from './field/field-parent';
export class TemplateSchemaDirective extends FieldParent {
    constructor(actionRegistry, validatorRegistry, formComponent, terminatorService, templateSchemaService) {
        super();
        this.actionRegistry = actionRegistry;
        this.validatorRegistry = validatorRegistry;
        this.formComponent = formComponent;
        this.terminatorService = terminatorService;
        this.templateSchemaService = templateSchemaService;
    }
    setFormDocumentSchema(fields) {
        this.actionRegistry.clear();
        this.validatorRegistry.clear();
        const schema = this.getFieldsSchema(fields);
        const validators = this.getFieldsValidators(fields);
        validators.forEach(({ path, validator }) => {
            this.validatorRegistry.register(path, validator);
        });
        const previousSchema = this.formComponent.schema;
        this.formComponent.schema = {
            type: FieldType.Object,
            properties: schema.properties
        };
        if (schema.required && schema.required.length > 0) {
            this.formComponent.schema.requred = schema.required;
        }
        const buttons = this.getButtons();
        if (buttons.length > 0) {
            this.formComponent.schema.buttons = buttons;
        }
        this.formComponent.ngOnChanges({
            schema: new SimpleChange(previousSchema, this.formComponent.schema, Boolean(previousSchema))
        });
    }
    ngAfterContentInit() {
        if (this.childFields.length > 0) {
            this.setFormDocumentSchema(this.childFields.toArray());
        }
        merge(this.childFields.changes, this.templateSchemaService.changes)
            .subscribe(() => {
            this.terminatorService.destroy();
            this.setFormDocumentSchema(this.childFields.toArray());
        });
    }
}
TemplateSchemaDirective.decorators = [
    { type: Directive, args: [{
                selector: 'sf-form[templateSchema]',
                providers: [
                    TemplateSchemaService
                ]
            },] }
];
TemplateSchemaDirective.ctorParameters = () => [
    { type: ActionRegistry },
    { type: ValidatorRegistry },
    { type: FormComponent },
    { type: TerminatorService },
    { type: TemplateSchemaService }
];
TemplateSchemaDirective.propDecorators = {
    childFields: [{ type: ContentChildren, args: [FieldComponent,] }],
    childButtons: [{ type: ContentChildren, args: [ButtonComponent,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtc2NoZW1hLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NjaGVtYS1mb3JtL3NyYy9saWIvdGVtcGxhdGUtc2NoZW1hL3RlbXBsYXRlLXNjaGVtYS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUVULFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTdCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFMUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQVVuRCxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsV0FBVztJQVF0RCxZQUNZLGNBQThCLEVBQzlCLGlCQUFvQyxFQUN0QyxhQUE0QixFQUM1QixpQkFBb0MsRUFDcEMscUJBQTRDO1FBRXBELEtBQUssRUFBRSxDQUFDO1FBTkUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDdEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO0lBR3RELENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxNQUF3QjtRQUMxQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUUvQixNQUFNLE1BQU0sR0FBWSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXJELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sY0FBYyxHQUFZLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQzFELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHO1lBQzFCLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtZQUN0QixVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVU7U0FDOUIsQ0FBQztRQUVGLElBQUksTUFBTSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDakQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FDckQ7UUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEMsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1NBQzdDO1FBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7WUFDN0IsTUFBTSxFQUFFLElBQUksWUFBWSxDQUN0QixjQUFjLEVBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQ3pCLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FDeEI7U0FDRixDQUFDLENBQUM7SUFFUCxDQUFDO0lBR0Qsa0JBQWtCO1FBRWhCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDeEQ7UUFFRCxLQUFLLENBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQ3hCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQ25DO2FBQ0QsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNiLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQzs7O1lBNUVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxTQUFTLEVBQUU7b0JBQ1QscUJBQXFCO2lCQUN0QjthQUNGOzs7WUFqQlEsY0FBYztZQUNkLGlCQUFpQjtZQUZqQixhQUFhO1lBR2IsaUJBQWlCO1lBRWpCLHFCQUFxQjs7OzBCQWdCM0IsZUFBZSxTQUFDLGNBQWM7MkJBRzlCLGVBQWUsU0FBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdCxcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgU2ltcGxlQ2hhbmdlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1lcmdlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEZvcm1Db21wb25lbnQgfSBmcm9tICcuLi9mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBY3Rpb25SZWdpc3RyeSB9IGZyb20gJy4uL21vZGVsL2FjdGlvbnJlZ2lzdHJ5JztcbmltcG9ydCB7IFZhbGlkYXRvclJlZ2lzdHJ5IH0gZnJvbSAnLi4vbW9kZWwvdmFsaWRhdG9ycmVnaXN0cnknO1xuaW1wb3J0IHsgVGVybWluYXRvclNlcnZpY2UgfSBmcm9tICcuLi90ZXJtaW5hdG9yLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBUZW1wbGF0ZVNjaGVtYVNlcnZpY2UgfSBmcm9tICcuL3RlbXBsYXRlLXNjaGVtYS5zZXJ2aWNlJztcbmltcG9ydCB7IEZpZWxkQ29tcG9uZW50IH0gZnJvbSAnLi9maWVsZC9maWVsZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmllbGRUeXBlIH0gZnJvbSAnLi9maWVsZC9maWVsZCc7XG5pbXBvcnQgeyBCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2J1dHRvbi9idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IEZpZWxkUGFyZW50IH0gZnJvbSAnLi9maWVsZC9maWVsZC1wYXJlbnQnO1xuaW1wb3J0IHtJU2NoZW1hfSBmcm9tICcuLi9tb2RlbC9JU2NoZW1hJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdzZi1mb3JtW3RlbXBsYXRlU2NoZW1hXScsXG4gIHByb3ZpZGVyczogW1xuICAgIFRlbXBsYXRlU2NoZW1hU2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlU2NoZW1hRGlyZWN0aXZlIGV4dGVuZHMgRmllbGRQYXJlbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcblxuICBAQ29udGVudENoaWxkcmVuKEZpZWxkQ29tcG9uZW50KVxuICBjaGlsZEZpZWxkczogUXVlcnlMaXN0PEZpZWxkQ29tcG9uZW50PjtcblxuICBAQ29udGVudENoaWxkcmVuKEJ1dHRvbkNvbXBvbmVudClcbiAgY2hpbGRCdXR0b25zOiBRdWVyeUxpc3Q8QnV0dG9uQ29tcG9uZW50PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYWN0aW9uUmVnaXN0cnk6IEFjdGlvblJlZ2lzdHJ5LFxuICAgIHByb3RlY3RlZCB2YWxpZGF0b3JSZWdpc3RyeTogVmFsaWRhdG9yUmVnaXN0cnksXG4gICAgcHJpdmF0ZSBmb3JtQ29tcG9uZW50OiBGb3JtQ29tcG9uZW50LFxuICAgIHByaXZhdGUgdGVybWluYXRvclNlcnZpY2U6IFRlcm1pbmF0b3JTZXJ2aWNlLFxuICAgIHByaXZhdGUgdGVtcGxhdGVTY2hlbWFTZXJ2aWNlOiBUZW1wbGF0ZVNjaGVtYVNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHNldEZvcm1Eb2N1bWVudFNjaGVtYShmaWVsZHM6IEZpZWxkQ29tcG9uZW50W10pIHtcbiAgICAgIHRoaXMuYWN0aW9uUmVnaXN0cnkuY2xlYXIoKTtcbiAgICAgIHRoaXMudmFsaWRhdG9yUmVnaXN0cnkuY2xlYXIoKTtcblxuICAgICAgY29uc3Qgc2NoZW1hOiBJU2NoZW1hID0gdGhpcy5nZXRGaWVsZHNTY2hlbWEoZmllbGRzKTtcblxuICAgICAgY29uc3QgdmFsaWRhdG9ycyA9IHRoaXMuZ2V0RmllbGRzVmFsaWRhdG9ycyhmaWVsZHMpO1xuICAgICAgdmFsaWRhdG9ycy5mb3JFYWNoKCh7IHBhdGgsIHZhbGlkYXRvciB9KSA9PiB7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yUmVnaXN0cnkucmVnaXN0ZXIocGF0aCwgdmFsaWRhdG9yKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBwcmV2aW91c1NjaGVtYTogSVNjaGVtYSA9IHRoaXMuZm9ybUNvbXBvbmVudC5zY2hlbWE7XG4gICAgICB0aGlzLmZvcm1Db21wb25lbnQuc2NoZW1hID0ge1xuICAgICAgICB0eXBlOiBGaWVsZFR5cGUuT2JqZWN0LFxuICAgICAgICBwcm9wZXJ0aWVzOiBzY2hlbWEucHJvcGVydGllc1xuICAgICAgfTtcblxuICAgICAgaWYgKHNjaGVtYS5yZXF1aXJlZCAmJiBzY2hlbWEucmVxdWlyZWQubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmZvcm1Db21wb25lbnQuc2NoZW1hLnJlcXVyZWQgPSBzY2hlbWEucmVxdWlyZWQ7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJ1dHRvbnMgPSB0aGlzLmdldEJ1dHRvbnMoKTtcbiAgICAgIGlmIChidXR0b25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5mb3JtQ29tcG9uZW50LnNjaGVtYS5idXR0b25zID0gYnV0dG9ucztcbiAgICAgIH1cblxuICAgICAgdGhpcy5mb3JtQ29tcG9uZW50Lm5nT25DaGFuZ2VzKHtcbiAgICAgICAgc2NoZW1hOiBuZXcgU2ltcGxlQ2hhbmdlKFxuICAgICAgICAgIHByZXZpb3VzU2NoZW1hLFxuICAgICAgICAgIHRoaXMuZm9ybUNvbXBvbmVudC5zY2hlbWEsXG4gICAgICAgICAgQm9vbGVhbihwcmV2aW91c1NjaGVtYSlcbiAgICAgICAgKVxuICAgICAgfSk7XG5cbiAgfVxuXG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuXG4gICAgaWYgKHRoaXMuY2hpbGRGaWVsZHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zZXRGb3JtRG9jdW1lbnRTY2hlbWEodGhpcy5jaGlsZEZpZWxkcy50b0FycmF5KCkpO1xuICAgIH1cblxuICAgIG1lcmdlKFxuICAgICAgdGhpcy5jaGlsZEZpZWxkcy5jaGFuZ2VzLFxuICAgICAgdGhpcy50ZW1wbGF0ZVNjaGVtYVNlcnZpY2UuY2hhbmdlc1xuICAgIClcbiAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy50ZXJtaW5hdG9yU2VydmljZS5kZXN0cm95KCk7XG4gICAgICB0aGlzLnNldEZvcm1Eb2N1bWVudFNjaGVtYSh0aGlzLmNoaWxkRmllbGRzLnRvQXJyYXkoKSk7XG4gICAgfSk7XG5cbiAgfVxuXG59XG4iXX0=