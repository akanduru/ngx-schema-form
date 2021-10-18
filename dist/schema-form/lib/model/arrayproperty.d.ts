import { FormProperty, PropertyGroup } from './formproperty';
import { FormPropertyFactory } from './formpropertyfactory';
import { SchemaValidatorFactory } from '../schemavalidatorfactory';
import { ValidatorRegistry } from './validatorregistry';
import { ExpressionCompilerFactory } from '../expression-compiler-factory';
import { ISchema } from './ISchema';
import { LogService } from '../log.service';
export declare class ArrayProperty extends PropertyGroup {
    private formPropertyFactory;
    constructor(formPropertyFactory: FormPropertyFactory, schemaValidatorFactory: SchemaValidatorFactory, validatorRegistry: ValidatorRegistry, expressionCompilerFactory: ExpressionCompilerFactory, schema: ISchema, parent: PropertyGroup, path: string, logger: LogService);
    addItem(value?: any): FormProperty;
    private addProperty;
    removeItem(item: FormProperty): void;
    setValue(value: any, onlySelf: boolean): void;
    _hasValue(): boolean;
    _updateValue(): void;
    private reduceValue;
    reset(value: any, onlySelf?: boolean): void;
    private createProperties;
    private resetProperties;
}
