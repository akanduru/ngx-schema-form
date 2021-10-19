import { QueryList, AfterContentInit } from '@angular/core';
import { FormComponent } from '../form.component';
import { ActionRegistry } from '../model/actionregistry';
import { ValidatorRegistry } from '../model/validatorregistry';
import { TerminatorService } from '../terminator.service';
import { TemplateSchemaService } from './template-schema.service';
import { FieldComponent } from './field/field.component';
import { ButtonComponent } from './button/button.component';
import { FieldParent } from './field/field-parent';
import * as ɵngcc0 from '@angular/core';
export declare class TemplateSchemaDirective extends FieldParent implements AfterContentInit {
    protected actionRegistry: ActionRegistry;
    protected validatorRegistry: ValidatorRegistry;
    private formComponent;
    private terminatorService;
    private templateSchemaService;
    childFields: QueryList<FieldComponent>;
    childButtons: QueryList<ButtonComponent>;
    constructor(actionRegistry: ActionRegistry, validatorRegistry: ValidatorRegistry, formComponent: FormComponent, terminatorService: TerminatorService, templateSchemaService: TemplateSchemaService);
    setFormDocumentSchema(fields: FieldComponent[]): void;
    ngAfterContentInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<TemplateSchemaDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<TemplateSchemaDirective, "sf-form[templateSchema]", never, {}, {}, ["childFields", "childButtons"]>;
}

//# sourceMappingURL=template-schema.directive.d.ts.map