import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  EventEmitter,
  Input,
  Output,
  SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {Action} from './model';
import {ActionRegistry} from './model';
import {FormProperty} from './model';
import {FormPropertyFactory} from './model';
import {SchemaPreprocessor} from './model';
import {ValidatorRegistry} from './model';
import {Validator} from './model';
import {Binding} from './model';
import {BindingRegistry} from './model';

import {SchemaValidatorFactory} from './schemavalidatorfactory';
import {WidgetFactory} from './widgetfactory';
import {TerminatorService} from './terminator.service';
import {PropertyBindingRegistry} from './property-binding-registry';
import { ExpressionCompilerFactory } from './expression-compiler-factory';
import {ISchema} from './model';
import { LogService } from './log.service';

export function useFactory(schemaValidatorFactory, validatorRegistry, propertyBindingRegistry, expressionCompilerFactory, logService) {
  return new FormPropertyFactory(schemaValidatorFactory, validatorRegistry, propertyBindingRegistry, expressionCompilerFactory, logService);
}

@Component({
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
})
export class FormComponent implements OnChanges, ControlValueAccessor {

  @Input() schema: ISchema | null = null;

  @Input() model: any;

  @Input() actions: { [actionId: string]: Action } = {};

  @Input() validators: { [path: string]: Validator } = {};

  @Input() bindings: { [path: string]: Binding } = {};

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChange = new EventEmitter<{ value: any }>();

  @Output() modelChange = new EventEmitter<any>();

  @Output() isValid = new EventEmitter<boolean>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onErrorChange = new EventEmitter<{ value: any[] }>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onErrorsChange = new EventEmitter<{value: any}>();

  rootProperty: FormProperty = null;

  private onChangeCallback: any;

  constructor(
    private formPropertyFactory: FormPropertyFactory,
    private actionRegistry: ActionRegistry,
    private validatorRegistry: ValidatorRegistry,
    private bindingRegistry: BindingRegistry,
    private cdr: ChangeDetectorRef,
    private terminator: TerminatorService
  ) { }

  writeValue(obj: any) {
    if (this.rootProperty) {
      this.rootProperty.reset(obj, false);
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
    if (this.rootProperty) {
      this.rootProperty.valueChanges.subscribe(
        this.onValueChanges.bind(this)
      );
    }
  }

  // TODO implement
  registerOnTouched(fn: any) {
  }

  // TODO implement
  // setDisabledState(isDisabled: boolean)?: void

  ngOnChanges(changes: SimpleChanges) {
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
        // FIX: Root property is freshly created. Update it with the model.
        this.rootProperty.reset(this.model, false);
      }

      this.rootProperty.valueChanges.subscribe(
        this.onValueChanges.bind(this)
      );

      this.rootProperty.errorsChanges.subscribe(value => {
        this.onErrorChange.emit({value: value});
        this.isValid.emit(!(value && value.length));
      });

    } else if (this.schema && changes.model) {
      // FIX: Only model is updated. Keep the same subscribers of root property.
      this.rootProperty.reset(this.model, false);
    }
    this.cdr.detectChanges();

  }

  private setValidators() {
    this.validatorRegistry.clear();
    if (this.validators) {
      for (const validatorId in this.validators) {
        if (this.validators.hasOwnProperty(validatorId)) {
          this.validatorRegistry.register(validatorId, this.validators[validatorId]);
        }
      }
    }
  }

  private setActions() {
    this.actionRegistry.clear();
    if (this.actions) {
      for (const actionId in this.actions) {
        if (this.actions.hasOwnProperty(actionId)) {
          this.actionRegistry.register(actionId, this.actions[actionId]);
        }
      }
    }
  }

  private setBindings() {
    this.bindingRegistry.clear();
    if (this.bindings) {
      for (const bindingPath in this.bindings) {
        if (this.bindings.hasOwnProperty(bindingPath)) {
          this.bindingRegistry.register(bindingPath, this.bindings[bindingPath]);
        }
      }
    }
  }

  public reset() {
    this.rootProperty.reset(null, true);
  }

  private setModel(value: any) {
    if (this.model) {
      // FIX - Ajay: Avoid overwriting the model,
      // and keep model reference unchanged.

      // Object.assign(this.model, value);
      const combined = {};
      Object.assign(combined, value, this.model);
      Object.assign(this.model, combined);
    } else {
      this.model = value;
    }
  }

  private onValueChanges(value) {
    if (this.onChangeCallback) {
      this.setModel(value);
      this.onChangeCallback(value);
    }

    // two way binding is used
    if (this.modelChange.observers.length > 0) {
      if (!this.onChangeCallback) {
        this.setModel(value);
      }
      this.modelChange.emit(value); // FIX: Emit model change event
    }
    this.onChange.emit({value: value});
  }
}
