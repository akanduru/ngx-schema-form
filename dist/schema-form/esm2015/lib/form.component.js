import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActionRegistry } from './model';
import { FormPropertyFactory } from './model';
import { SchemaPreprocessor } from './model';
import { ValidatorRegistry } from './model';
import { BindingRegistry } from './model';
import { SchemaValidatorFactory } from './schemavalidatorfactory';
import { WidgetFactory } from './widgetfactory';
import { TerminatorService } from './terminator.service';
import { PropertyBindingRegistry } from './property-binding-registry';
import { ExpressionCompilerFactory } from './expression-compiler-factory';
import { LogService } from './log.service';
export function useFactory(schemaValidatorFactory, validatorRegistry, propertyBindingRegistry, expressionCompilerFactory, logService) {
    return new FormPropertyFactory(schemaValidatorFactory, validatorRegistry, propertyBindingRegistry, expressionCompilerFactory, logService);
}
export class FormComponent {
    constructor(formPropertyFactory, actionRegistry, validatorRegistry, bindingRegistry, cdr, terminator) {
        this.formPropertyFactory = formPropertyFactory;
        this.actionRegistry = actionRegistry;
        this.validatorRegistry = validatorRegistry;
        this.bindingRegistry = bindingRegistry;
        this.cdr = cdr;
        this.terminator = terminator;
        this.schema = null;
        this.actions = {};
        this.validators = {};
        this.bindings = {};
        // tslint:disable-next-line:no-output-on-prefix
        this.onChange = new EventEmitter();
        this.modelChange = new EventEmitter();
        this.isValid = new EventEmitter();
        // tslint:disable-next-line:no-output-on-prefix
        this.onErrorChange = new EventEmitter();
        // tslint:disable-next-line:no-output-on-prefix
        this.onErrorsChange = new EventEmitter();
        this.rootProperty = null;
    }
    writeValue(obj) {
        if (this.rootProperty) {
            this.rootProperty.reset(obj, false);
        }
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
        if (this.rootProperty) {
            this.rootProperty.valueChanges.subscribe(this.onValueChanges.bind(this));
        }
    }
    // TODO implement
    registerOnTouched(fn) {
    }
    // TODO implement
    // setDisabledState(isDisabled: boolean)?: void
    ngOnChanges(changes) {
        if (changes.validators) {
            this.setValidators();
        }
        if (changes.actions) {
            this.setActions();
        }
        if (changes.bindings) {
            this.setBindings();
        }
        if (this.schema && !this.schema.type) {
            this.schema.type = 'object';
        }
        if (this.schema && changes.schema) {
            if (!changes.schema.firstChange) {
                this.terminator.destroy();
            }
            SchemaPreprocessor.preprocess(this.schema);
            this.rootProperty = this.formPropertyFactory.createProperty(this.schema);
            if (this.model) {
                this.rootProperty.reset(this.model, false);
            }
            this.rootProperty.valueChanges.subscribe(this.onValueChanges.bind(this));
            this.rootProperty.errorsChanges.subscribe(value => {
                this.onErrorChange.emit({ value: value });
                this.isValid.emit(!(value && value.length));
            });
        }
        else if (this.schema && changes.model) {
            this.rootProperty.reset(this.model, false);
        }
        this.cdr.detectChanges();
    }
    setValidators() {
        this.validatorRegistry.clear();
        if (this.validators) {
            for (const validatorId in this.validators) {
                if (this.validators.hasOwnProperty(validatorId)) {
                    this.validatorRegistry.register(validatorId, this.validators[validatorId]);
                }
            }
        }
    }
    setActions() {
        this.actionRegistry.clear();
        if (this.actions) {
            for (const actionId in this.actions) {
                if (this.actions.hasOwnProperty(actionId)) {
                    this.actionRegistry.register(actionId, this.actions[actionId]);
                }
            }
        }
    }
    setBindings() {
        this.bindingRegistry.clear();
        if (this.bindings) {
            for (const bindingPath in this.bindings) {
                if (this.bindings.hasOwnProperty(bindingPath)) {
                    this.bindingRegistry.register(bindingPath, this.bindings[bindingPath]);
                }
            }
        }
    }
    reset() {
        this.rootProperty.reset(null, true);
    }
    setModel(value) {
        if (this.model) {
            // Object.assign(this.model, value);
            const combined = {};
            Object.assign(combined, value, this.model);
            Object.assign(this.model, combined);
        }
        else {
            this.model = value;
        }
    }
    onValueChanges(value) {
        if (this.onChangeCallback) {
            this.setModel(value);
            this.onChangeCallback(value);
        }
        // two way binding is used
        if (this.modelChange.observers.length > 0) {
            if (!this.onChangeCallback) {
                this.setModel(value);
            }
            this.modelChange.emit(value);
        }
        this.onChange.emit({ value: value });
    }
}
FormComponent.decorators = [
    { type: Component, args: [{
                selector: 'sf-form',
                template: `
    <form *ngIf="rootProperty" [attr.name]="rootProperty.rootName" [attr.id]="rootProperty.rootName">
      <sf-form-element [formProperty]="rootProperty"></sf-form-element>
    </form>`,
                providers: [
                    ActionRegistry,
                    ValidatorRegistry,
                    PropertyBindingRegistry,
                    BindingRegistry,
                    SchemaPreprocessor,
                    WidgetFactory,
                    {
                        provide: FormPropertyFactory,
                        useFactory: useFactory,
                        deps: [SchemaValidatorFactory, ValidatorRegistry, PropertyBindingRegistry, ExpressionCompilerFactory, LogService]
                    },
                    TerminatorService,
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: FormComponent,
                        multi: true
                    }
                ]
            },] }
];
FormComponent.ctorParameters = () => [
    { type: FormPropertyFactory },
    { type: ActionRegistry },
    { type: ValidatorRegistry },
    { type: BindingRegistry },
    { type: ChangeDetectorRef },
    { type: TerminatorService }
];
FormComponent.propDecorators = {
    schema: [{ type: Input }],
    model: [{ type: Input }],
    actions: [{ type: Input }],
    validators: [{ type: Input }],
    bindings: [{ type: Input }],
    onChange: [{ type: Output }],
    modelChange: [{ type: Output }],
    isValid: [{ type: Output }],
    onErrorChange: [{ type: Output }],
    onErrorsChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9zY2hlbWEtZm9ybS9zcmMvbGliL2Zvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd6RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBRXZDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUM1QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDM0MsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sU0FBUyxDQUFDO0FBRzFDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFFeEMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRTFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsTUFBTSxVQUFVLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxpQkFBaUIsRUFBRSx1QkFBdUIsRUFBRSx5QkFBeUIsRUFBRSxVQUFVO0lBQ2xJLE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxzQkFBc0IsRUFBRSxpQkFBaUIsRUFBRSx1QkFBdUIsRUFBRSx5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QWlCO1lBc0JYLGlCQUFpQjs7O3FCQXNDdEIsS0FBSztvQkFFTCxLQUFLO3NCQUVMLEtBQUs7eUJBRUwsS0FBSzt1QkFFTCxLQUFLO3VCQUdMLE1BQU07MEJBRU4sTUFBTTtzQkFFTixNQUFNOzRCQUdOLE1BQU07NkJBR04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIE9uQ2hhbmdlcyxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge0FjdGlvbn0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge0FjdGlvblJlZ2lzdHJ5fSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7Rm9ybVByb3BlcnR5fSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7Rm9ybVByb3BlcnR5RmFjdG9yeX0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge1NjaGVtYVByZXByb2Nlc3Nvcn0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge1ZhbGlkYXRvclJlZ2lzdHJ5fSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7VmFsaWRhdG9yfSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7QmluZGluZ30gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge0JpbmRpbmdSZWdpc3RyeX0gZnJvbSAnLi9tb2RlbCc7XG5cbmltcG9ydCB7U2NoZW1hVmFsaWRhdG9yRmFjdG9yeX0gZnJvbSAnLi9zY2hlbWF2YWxpZGF0b3JmYWN0b3J5JztcbmltcG9ydCB7V2lkZ2V0RmFjdG9yeX0gZnJvbSAnLi93aWRnZXRmYWN0b3J5JztcbmltcG9ydCB7VGVybWluYXRvclNlcnZpY2V9IGZyb20gJy4vdGVybWluYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7UHJvcGVydHlCaW5kaW5nUmVnaXN0cnl9IGZyb20gJy4vcHJvcGVydHktYmluZGluZy1yZWdpc3RyeSc7XG5pbXBvcnQgeyBFeHByZXNzaW9uQ29tcGlsZXJGYWN0b3J5IH0gZnJvbSAnLi9leHByZXNzaW9uLWNvbXBpbGVyLWZhY3RvcnknO1xuaW1wb3J0IHtJU2NoZW1hfSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7IExvZ1NlcnZpY2UgfSBmcm9tICcuL2xvZy5zZXJ2aWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZhY3Rvcnkoc2NoZW1hVmFsaWRhdG9yRmFjdG9yeSwgdmFsaWRhdG9yUmVnaXN0cnksIHByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5LCBleHByZXNzaW9uQ29tcGlsZXJGYWN0b3J5LCBsb2dTZXJ2aWNlKSB7XG4gIHJldHVybiBuZXcgRm9ybVByb3BlcnR5RmFjdG9yeShzY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCB2YWxpZGF0b3JSZWdpc3RyeSwgcHJvcGVydHlCaW5kaW5nUmVnaXN0cnksIGV4cHJlc3Npb25Db21waWxlckZhY3RvcnksIGxvZ1NlcnZpY2UpO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1mb3JtJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8Zm9ybSAqbmdJZj1cInJvb3RQcm9wZXJ0eVwiIFthdHRyLm5hbWVdPVwicm9vdFByb3BlcnR5LnJvb3ROYW1lXCIgW2F0dHIuaWRdPVwicm9vdFByb3BlcnR5LnJvb3ROYW1lXCI+XG4gICAgICA8c2YtZm9ybS1lbGVtZW50IFtmb3JtUHJvcGVydHldPVwicm9vdFByb3BlcnR5XCI+PC9zZi1mb3JtLWVsZW1lbnQ+XG4gICAgPC9mb3JtPmAsXG4gIHByb3ZpZGVyczogW1xuICAgIEFjdGlvblJlZ2lzdHJ5LFxuICAgIFZhbGlkYXRvclJlZ2lzdHJ5LFxuICAgIFByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5LFxuICAgIEJpbmRpbmdSZWdpc3RyeSxcbiAgICBTY2hlbWFQcmVwcm9jZXNzb3IsXG4gICAgV2lkZ2V0RmFjdG9yeSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBGb3JtUHJvcGVydHlGYWN0b3J5LFxuICAgICAgdXNlRmFjdG9yeTogdXNlRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtTY2hlbWFWYWxpZGF0b3JGYWN0b3J5LCBWYWxpZGF0b3JSZWdpc3RyeSwgUHJvcGVydHlCaW5kaW5nUmVnaXN0cnksIEV4cHJlc3Npb25Db21waWxlckZhY3RvcnksIExvZ1NlcnZpY2VdXG4gICAgfSxcbiAgICBUZXJtaW5hdG9yU2VydmljZSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBGb3JtQ29tcG9uZW50LFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIEBJbnB1dCgpIHNjaGVtYTogSVNjaGVtYSB8IG51bGwgPSBudWxsO1xuXG4gIEBJbnB1dCgpIG1vZGVsOiBhbnk7XG5cbiAgQElucHV0KCkgYWN0aW9uczogeyBbYWN0aW9uSWQ6IHN0cmluZ106IEFjdGlvbiB9ID0ge307XG5cbiAgQElucHV0KCkgdmFsaWRhdG9yczogeyBbcGF0aDogc3RyaW5nXTogVmFsaWRhdG9yIH0gPSB7fTtcblxuICBASW5wdXQoKSBiaW5kaW5nczogeyBbcGF0aDogc3RyaW5nXTogQmluZGluZyB9ID0ge307XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIG9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7IHZhbHVlOiBhbnkgfT4oKTtcblxuICBAT3V0cHV0KCkgbW9kZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgaXNWYWxpZCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tb3V0cHV0LW9uLXByZWZpeFxuICBAT3V0cHV0KCkgb25FcnJvckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8eyB2YWx1ZTogYW55W10gfT4oKTtcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tb3V0cHV0LW9uLXByZWZpeFxuICBAT3V0cHV0KCkgb25FcnJvcnNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHt2YWx1ZTogYW55fT4oKTtcblxuICByb290UHJvcGVydHk6IEZvcm1Qcm9wZXJ0eSA9IG51bGw7XG5cbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBmb3JtUHJvcGVydHlGYWN0b3J5OiBGb3JtUHJvcGVydHlGYWN0b3J5LFxuICAgIHByaXZhdGUgYWN0aW9uUmVnaXN0cnk6IEFjdGlvblJlZ2lzdHJ5LFxuICAgIHByaXZhdGUgdmFsaWRhdG9yUmVnaXN0cnk6IFZhbGlkYXRvclJlZ2lzdHJ5LFxuICAgIHByaXZhdGUgYmluZGluZ1JlZ2lzdHJ5OiBCaW5kaW5nUmVnaXN0cnksXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgdGVybWluYXRvcjogVGVybWluYXRvclNlcnZpY2VcbiAgKSB7IH1cblxuICB3cml0ZVZhbHVlKG9iajogYW55KSB7XG4gICAgaWYgKHRoaXMucm9vdFByb3BlcnR5KSB7XG4gICAgICB0aGlzLnJvb3RQcm9wZXJ0eS5yZXNldChvYmosIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgICBpZiAodGhpcy5yb290UHJvcGVydHkpIHtcbiAgICAgIHRoaXMucm9vdFByb3BlcnR5LnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoXG4gICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZXMuYmluZCh0aGlzKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvLyBUT0RPIGltcGxlbWVudFxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gIH1cblxuICAvLyBUT0RPIGltcGxlbWVudFxuICAvLyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pPzogdm9pZFxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnNldFZhbGlkYXRvcnMoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5hY3Rpb25zKSB7XG4gICAgICB0aGlzLnNldEFjdGlvbnMoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5iaW5kaW5ncykge1xuICAgICAgdGhpcy5zZXRCaW5kaW5ncygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNjaGVtYSAmJiAhdGhpcy5zY2hlbWEudHlwZSkge1xuICAgICAgdGhpcy5zY2hlbWEudHlwZSA9ICdvYmplY3QnO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNjaGVtYSAmJiBjaGFuZ2VzLnNjaGVtYSkge1xuICAgICAgaWYgKCFjaGFuZ2VzLnNjaGVtYS5maXJzdENoYW5nZSkge1xuICAgICAgICB0aGlzLnRlcm1pbmF0b3IuZGVzdHJveSgpO1xuICAgICAgfVxuXG4gICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucHJlcHJvY2Vzcyh0aGlzLnNjaGVtYSk7XG4gICAgICB0aGlzLnJvb3RQcm9wZXJ0eSA9IHRoaXMuZm9ybVByb3BlcnR5RmFjdG9yeS5jcmVhdGVQcm9wZXJ0eSh0aGlzLnNjaGVtYSk7XG4gICAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgICB0aGlzLnJvb3RQcm9wZXJ0eS5yZXNldCh0aGlzLm1vZGVsLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucm9vdFByb3BlcnR5LnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoXG4gICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZXMuYmluZCh0aGlzKVxuICAgICAgKTtcblxuICAgICAgdGhpcy5yb290UHJvcGVydHkuZXJyb3JzQ2hhbmdlcy5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICB0aGlzLm9uRXJyb3JDaGFuZ2UuZW1pdCh7dmFsdWU6IHZhbHVlfSk7XG4gICAgICAgIHRoaXMuaXNWYWxpZC5lbWl0KCEodmFsdWUgJiYgdmFsdWUubGVuZ3RoKSk7XG4gICAgICB9KTtcblxuICAgIH0gZWxzZSBpZiAodGhpcy5zY2hlbWEgJiYgY2hhbmdlcy5tb2RlbCkge1xuICAgICAgdGhpcy5yb290UHJvcGVydHkucmVzZXQodGhpcy5tb2RlbCwgZmFsc2UpO1xuICAgIH1cbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgc2V0VmFsaWRhdG9ycygpIHtcbiAgICB0aGlzLnZhbGlkYXRvclJlZ2lzdHJ5LmNsZWFyKCk7XG4gICAgaWYgKHRoaXMudmFsaWRhdG9ycykge1xuICAgICAgZm9yIChjb25zdCB2YWxpZGF0b3JJZCBpbiB0aGlzLnZhbGlkYXRvcnMpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdG9ycy5oYXNPd25Qcm9wZXJ0eSh2YWxpZGF0b3JJZCkpIHtcbiAgICAgICAgICB0aGlzLnZhbGlkYXRvclJlZ2lzdHJ5LnJlZ2lzdGVyKHZhbGlkYXRvcklkLCB0aGlzLnZhbGlkYXRvcnNbdmFsaWRhdG9ySWRdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0QWN0aW9ucygpIHtcbiAgICB0aGlzLmFjdGlvblJlZ2lzdHJ5LmNsZWFyKCk7XG4gICAgaWYgKHRoaXMuYWN0aW9ucykge1xuICAgICAgZm9yIChjb25zdCBhY3Rpb25JZCBpbiB0aGlzLmFjdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aW9ucy5oYXNPd25Qcm9wZXJ0eShhY3Rpb25JZCkpIHtcbiAgICAgICAgICB0aGlzLmFjdGlvblJlZ2lzdHJ5LnJlZ2lzdGVyKGFjdGlvbklkLCB0aGlzLmFjdGlvbnNbYWN0aW9uSWRdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0QmluZGluZ3MoKSB7XG4gICAgdGhpcy5iaW5kaW5nUmVnaXN0cnkuY2xlYXIoKTtcbiAgICBpZiAodGhpcy5iaW5kaW5ncykge1xuICAgICAgZm9yIChjb25zdCBiaW5kaW5nUGF0aCBpbiB0aGlzLmJpbmRpbmdzKSB7XG4gICAgICAgIGlmICh0aGlzLmJpbmRpbmdzLmhhc093blByb3BlcnR5KGJpbmRpbmdQYXRoKSkge1xuICAgICAgICAgIHRoaXMuYmluZGluZ1JlZ2lzdHJ5LnJlZ2lzdGVyKGJpbmRpbmdQYXRoLCB0aGlzLmJpbmRpbmdzW2JpbmRpbmdQYXRoXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgdGhpcy5yb290UHJvcGVydHkucmVzZXQobnVsbCwgdHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIHNldE1vZGVsKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgLy8gT2JqZWN0LmFzc2lnbih0aGlzLm1vZGVsLCB2YWx1ZSk7XG4gICAgICBjb25zdCBjb21iaW5lZCA9IHt9O1xuICAgICAgT2JqZWN0LmFzc2lnbihjb21iaW5lZCwgdmFsdWUsIHRoaXMubW9kZWwpO1xuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm1vZGVsLCBjb21iaW5lZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kZWwgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uVmFsdWVDaGFuZ2VzKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMub25DaGFuZ2VDYWxsYmFjaykge1xuICAgICAgdGhpcy5zZXRNb2RlbCh2YWx1ZSk7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xuICAgIH1cblxuICAgIC8vIHR3byB3YXkgYmluZGluZyBpcyB1c2VkXG4gICAgaWYgKHRoaXMubW9kZWxDaGFuZ2Uub2JzZXJ2ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICghdGhpcy5vbkNoYW5nZUNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuc2V0TW9kZWwodmFsdWUpO1xuICAgICAgfVxuICAgICAgdGhpcy5tb2RlbENoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KHt2YWx1ZTogdmFsdWV9KTtcbiAgfVxufVxuIl19