import { FormProperty, PropertyGroup } from './formproperty';
import { SchemaValidatorFactory } from '../schemavalidatorfactory';
import { ValidatorRegistry } from './validatorregistry';
import { PropertyBindingRegistry } from '../property-binding-registry';
import { ExpressionCompilerFactory } from '../expression-compiler-factory';
import { ISchema } from './ISchema';
import { LogService } from '../log.service';
export declare class FormPropertyFactory {
    private schemaValidatorFactory;
    private validatorRegistry;
    private propertyBindingRegistry;
    private expressionCompilerFactory;
    private logger;
    constructor(schemaValidatorFactory: SchemaValidatorFactory, validatorRegistry: ValidatorRegistry, propertyBindingRegistry: PropertyBindingRegistry, expressionCompilerFactory: ExpressionCompilerFactory, logger: LogService);
    createProperty(schema: ISchema, parent?: PropertyGroup, propertyId?: string): FormProperty;
    private initializeRoot;
    private isUnionType;
    private isValidNullableUnionType;
    private extractTypeFromNullableUnionType;
    private isAllowedToUsingNullableUnionTypeBySchemaContext;
}
