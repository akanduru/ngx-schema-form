import { ChangeDetectorRef, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Action } from './model';
import { ActionRegistry } from './model';
import { FormProperty } from './model';
import { FormPropertyFactory } from './model';
import { ValidatorRegistry } from './model';
import { Validator } from './model';
import { Binding } from './model';
import { BindingRegistry } from './model';
import { TerminatorService } from './terminator.service';
import { ISchema } from './model';
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
}
