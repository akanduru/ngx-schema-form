import { ChangeDetectorRef, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Action } from './model/action';
import { ActionRegistry } from './model/actionregistry';
import { FormProperty } from './model/formproperty';
import { FormPropertyFactory } from './model/formpropertyfactory';
import { ValidatorRegistry } from './model/validatorregistry';
import { Validator } from './model/validator';
import { Binding } from './model/binding';
import { BindingRegistry } from './model/bindingregistry';
import { TerminatorService } from './terminator.service';
import { ISchema } from './model/ISchema';
import * as ɵngcc0 from '@angular/core';
export declare function useFactory(schemaValidatorFactory: any, validatorRegistry: any, propertyBindingRegistry: any, expressionCompilerFactory: any, logService: any): FormPropertyFactory;
export declare class FormComponent implements OnChanges, ControlValueAccessor {
    private formPropertyFactory;
    private actionRegistry;
    private validatorRegistry;
    private bindingRegistry;
    private cdr;
    private terminator;
    schema: ISchema | null;
    model: any;
    actions: {
        [actionId: string]: Action;
    };
    validators: {
        [path: string]: Validator;
    };
    bindings: {
        [path: string]: Binding;
    };
    onChange: EventEmitter<{
        value: any;
    }>;
    modelChange: EventEmitter<any>;
    isValid: EventEmitter<boolean>;
    onErrorChange: EventEmitter<{
        value: any[];
    }>;
    onErrorsChange: EventEmitter<{
        value: any;
    }>;
    rootProperty: FormProperty;
    private onChangeCallback;
    constructor(formPropertyFactory: FormPropertyFactory, actionRegistry: ActionRegistry, validatorRegistry: ValidatorRegistry, bindingRegistry: BindingRegistry, cdr: ChangeDetectorRef, terminator: TerminatorService);
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    ngOnChanges(changes: SimpleChanges): void;
    private setValidators;
    private setActions;
    private setBindings;
    reset(): void;
    private setModel;
    private onValueChanges;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FormComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<FormComponent, "sf-form", never, { "schema": "schema"; "actions": "actions"; "validators": "validators"; "bindings": "bindings"; "model": "model"; }, { "onChange": "onChange"; "modelChange": "modelChange"; "isValid": "isValid"; "onErrorChange": "onErrorChange"; "onErrorsChange": "onErrorsChange"; }, never, never>;
}

//# sourceMappingURL=form.component.d.ts.map