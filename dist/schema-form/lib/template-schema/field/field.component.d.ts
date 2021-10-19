import { AfterContentInit, QueryList, ElementRef, SimpleChanges, OnChanges } from '@angular/core';
import { ActionRegistry } from '../../model/actionregistry';
import { Validator } from '../../model/validator';
import { TemplateSchemaService } from '../template-schema.service';
import { ButtonComponent } from '../button/button.component';
import { FieldParent } from './field-parent';
import { FieldType, Field } from './field';
import { ItemComponent } from './item/item.component';
import { ISchema } from '../../model/ISchema';
import * as ɵngcc0 from '@angular/core';
export declare class FieldComponent extends FieldParent implements Field, OnChanges, AfterContentInit {
    private elementRef;
    private templateSchemaService;
    protected actionRegistry: ActionRegistry;
    childFields: QueryList<FieldComponent>;
    childItems: QueryList<ItemComponent>;
    childButtons: QueryList<ButtonComponent>;
    name: string;
    type: FieldType;
    format: string;
    required: boolean;
    readOnly: boolean;
    title: string;
    description: string;
    placeholder: string;
    widget: string | object;
    validator: Validator;
    schema: ISchema;
    constructor(elementRef: ElementRef, templateSchemaService: TemplateSchemaService, actionRegistry: ActionRegistry);
    getSchema(): ISchema;
    getValidators(): {
        path: string;
        validator: Validator;
    }[];
    ngOnChanges(changes: SimpleChanges): void;
    private getOneOf;
    private setTitleFromContent;
    ngAfterContentInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FieldComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<FieldComponent, "sf-field", never, { "type": "type"; "schema": "schema"; "title": "title"; "name": "name"; "format": "format"; "required": "required"; "readOnly": "readOnly"; "description": "description"; "placeholder": "placeholder"; "widget": "widget"; "validator": "validator"; }, {}, ["childFields", "childItems", "childButtons"], ["*"]>;
}

//# sourceMappingURL=field.component.d.ts.map