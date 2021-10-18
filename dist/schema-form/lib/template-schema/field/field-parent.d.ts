import { QueryList } from '@angular/core';
import { Validator } from '../../model/validator';
import { ActionRegistry } from '../../model/actionregistry';
import { ButtonComponent } from '../button/button.component';
import { TemplateSchemaElement } from '../template-schema-element';
import { Field, FieldType } from './field';
import { ISchema } from '../../model/ISchema';
export declare abstract class FieldParent extends TemplateSchemaElement {
    name: string;
    type: FieldType;
    get path(): string;
    protected abstract actionRegistry: ActionRegistry;
    protected abstract childButtons: QueryList<ButtonComponent>;
    getButtons(): {
        id: string;
        label: string;
        widget?: string | object;
    }[];
    protected getFieldsValidators(fields: Field[]): {
        path: string;
        validator: Validator;
    }[];
    protected getFieldsSchema(fields: Field[]): ISchema;
}
