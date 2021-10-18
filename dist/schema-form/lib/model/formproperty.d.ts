import { BehaviorSubject } from 'rxjs';
import { SchemaValidatorFactory } from '../schemavalidatorfactory';
import { ValidatorRegistry } from './validatorregistry';
import { PropertyBindingRegistry } from '../property-binding-registry';
import { ExpressionCompilerFactory, ExpressionCompilerVisibilityIf } from '../expression-compiler-factory';
import { ISchema, TSchemaPropertyType } from './ISchema';
import { LogService } from '../log.service';
export declare abstract class FormProperty {
    private validatorRegistry;
    schema: ISchema;
    protected logger: LogService;
    schemaValidator: Function;
    expressionCompilerVisibiltyIf: ExpressionCompilerVisibilityIf;
    _value: any;
    _errors: any;
    private _valueChanges;
    private _errorsChanges;
    private _visible;
    private _visibilityChanges;
    private _root;
    private _parent;
    private _path;
    _propertyBindingRegistry: PropertyBindingRegistry;
    __canonicalPath: string;
    __canonicalPathNotation: string;
    /**
     * Provides the unique path of this form element.<br/>
     * E.g.:
     * <code>/garage/cars</code>,<br/>
     * <code>/shop/book/0/page/1/</code>
     */
    get _canonicalPath(): string;
    set _canonicalPath(canonicalPath: string);
    /**
     * Uses the unique path provided by the property <code>_canonicalPath</code><br/>
     * but converts it to a HTML Element Attribute ID compliant format.<br/>
     * E.g.:
     * <code>garage.cars</code>,<br/>
     * <code>shop.book.0.page.1.</code>
     */
    get canonicalPathNotation(): string;
    private _rootName;
    /**
     * Provides the HTML Element Attribute ID/NAME compliant representation
     * of the root element.<br/>
     * Represents the HTML FORM NAME.<br/>
     * Only the root <code>FormProperty</code> will provide a value here.
     */
    get rootName(): any;
    constructor(schemaValidatorFactory: SchemaValidatorFactory, validatorRegistry: ValidatorRegistry, expressionCompilerFactory: ExpressionCompilerFactory, schema: ISchema, parent: PropertyGroup, path: string, logger: LogService);
    /**
     * Creates the HTML ID and NAME attribute compliant string.
     */
    private createRootName;
    get valueChanges(): BehaviorSubject<any>;
    get errorsChanges(): BehaviorSubject<any>;
    get type(): TSchemaPropertyType;
    get parent(): PropertyGroup;
    get root(): PropertyGroup;
    get path(): string;
    get value(): any;
    get visible(): boolean;
    get valid(): boolean;
    abstract setValue(value: any, onlySelf: boolean): any;
    abstract reset(value: any, onlySelf: boolean): any;
    updateValueAndValidity(onlySelf?: boolean, emitEvent?: boolean): void;
    /**
     * @internal
     */
    abstract _hasValue(): boolean;
    /**
     *  @internal
     */
    abstract _updateValue(): any;
    /**
     * @internal
     */
    _runValidation(): any;
    private mergeErrors;
    private setErrors;
    extendErrors(errors: any): void;
    searchProperty(path: string): FormProperty;
    findRoot(): PropertyGroup;
    private setVisible;
    /**
     * Making use of the expression compiler for the <code>visibleIf</code> condition
     * @param sourceProperty The source property where the `visibleIf` condition is set.
     * @param targetProperty  The target property what provided the `value` on which the `visibleIf` condition will be checked against. May be `null` or `undefined`
     * @param dependencyPath The dependency path of the `targetProperty`
     * @param value The value of the `targetProperty` to check the `visiblityIf` condintion against. May be `null` or `undefined`
     * @param expression The value or expression to check against the `value` for the `targetProperty`. May be `null` or `undefined`
     */
    private __evaluateVisibilityIf;
    /**
     * binds visibility conditions of type `oneOf` and `allOf`.
     * @returns `true` if any visibility binding of type `oneOf` or `allOf` has been processed. Otherwise `false`.
     */
    private __bindVisibility_oneOf_or_allOf;
    _bindVisibility(): void;
    private registerMissingVisibilityBinding;
    /**
     * Finds all <code>formProperties</code> from a path with wildcards.<br/>
     * e.g: <code>/garage/cars/&#42;/tires/&#42;/name</code><br/>
     * @param target
     * @param propertyPath
     */
    findProperties(target: FormProperty, propertyPath: string): FormProperty[];
    /**
     * Creates canonical paths from a path with wildcards.
     * e.g:<br/>
     * From:<br/>
     * <code>/garage/cars/&#42;/tires/&#42;/name</code><br/>
     * it creates:<br/>
     * <code>/garage/cars/0/tires/0/name</code><br/>
     * <code>/garage/cars/0/tires/1/name</code><br/>
     * <code>/garage/cars/0/tires/2/name</code><br/>
     * <code>/garage/cars/0/tires/3/name</code><br/>
     * <code>/garage/cars/1/tires/0/name</code><br/>
     * <code>/garage/cars/2/tires/1/name</code><br/>
     * <code>/garage/cars/3/tires/2/name</code><br/>
     * <code>/garage/cars/3/tires/3/name</code><br/>
     * <code>/garage/cars/&#42;/tires/&#42;/name</code><br/>
     * <code>/garage/cars/&#42;/tires/2/name</code><br/>
     * <code>/garage/cars/&#42;/tires/3/name</code><br/>
     * <br/>etc...
     * @param target
     * @param path
     * @param parentPath
     */
    findPropertyPaths(target: FormProperty, path: string, parentPath?: string): string[];
}
export declare abstract class PropertyGroup extends FormProperty {
    _properties: FormProperty[] | {
        [key: string]: FormProperty;
    };
    get properties(): FormProperty[] | {
        [key: string]: FormProperty;
    };
    set properties(properties: FormProperty[] | {
        [key: string]: FormProperty;
    });
    private _propertyProxyHandler;
    getProperty(path: string): any;
    forEachChild(fn: (formProperty: FormProperty, str: String) => void): void;
    forEachChildRecursive(fn: (formProperty: FormProperty) => void): void;
    _bindVisibility(): void;
    private _bindVisibilityRecursive;
    isRoot(): boolean;
}
export declare class ExtendedProxyHandler implements ProxyHandler<FormProperty[] | {
    [key: string]: FormProperty;
}> {
    private logger;
    constructor(logger: LogService);
    /**
     * When a new item is added it will be checked for visibility updates to proceed <br/>
     * if any other field has a binding reference to it.<br/>
     */
    set(target: FormProperty[] | {
        [p: string]: FormProperty;
    }, p: PropertyKey, value: any, receiver: any): boolean;
    get(target: FormProperty[] | {
        [p: string]: FormProperty;
    }, p: PropertyKey, receiver: any): any;
    deleteProperty(target: FormProperty[] | {
        [p: string]: FormProperty;
    }, p: PropertyKey): boolean;
}
