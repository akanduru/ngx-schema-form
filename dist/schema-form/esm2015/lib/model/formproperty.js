import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
export class FormProperty {
    constructor(schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path, logger) {
        this.validatorRegistry = validatorRegistry;
        this.schema = schema;
        this.logger = logger;
        this._value = null;
        this._errors = null;
        this._valueChanges = new BehaviorSubject(null);
        this._errorsChanges = new BehaviorSubject(null);
        this._visible = true;
        this._visibilityChanges = new BehaviorSubject(true);
        this.schemaValidator = schemaValidatorFactory.createValidatorFn(this.schema);
        this.expressionCompilerVisibiltyIf = expressionCompilerFactory.createExpressionCompilerVisibilityIf();
        this._parent = parent;
        if (parent) {
            this._root = parent.root;
        }
        else if (this instanceof PropertyGroup) {
            this._root = this;
            this._rootName = this.createRootName();
        }
        this._path = path;
    }
    /**
     * Provides the unique path of this form element.<br/>
     * E.g.:
     * <code>/garage/cars</code>,<br/>
     * <code>/shop/book/0/page/1/</code>
     */
    get _canonicalPath() { return this.__canonicalPath; }
    set _canonicalPath(canonicalPath) {
        this.__canonicalPath = canonicalPath;
        this.__canonicalPathNotation = (this.__canonicalPath || '')
            .replace(new RegExp('^/', 'ig'), '')
            .replace(new RegExp('/$', 'ig'), '')
            .replace(new RegExp('/', 'ig'), '.');
    }
    /**
     * Uses the unique path provided by the property <code>_canonicalPath</code><br/>
     * but converts it to a HTML Element Attribute ID compliant format.<br/>
     * E.g.:
     * <code>garage.cars</code>,<br/>
     * <code>shop.book.0.page.1.</code>
     */
    get canonicalPathNotation() { return this.__canonicalPathNotation; }
    /**
     * Provides the HTML Element Attribute ID/NAME compliant representation
     * of the root element.<br/>
     * Represents the HTML FORM NAME.<br/>
     * Only the root <code>FormProperty</code> will provide a value here.
     */
    get rootName() { return this._rootName; }
    /**
     * Creates the HTML ID and NAME attribute compliant string.
     */
    createRootName() {
        if (this.schema && this.schema['name']) {
            return this._rootName = this.schema['name'].replace(new RegExp('[\\s]+', 'ig'), '_');
        }
        return '';
    }
    get valueChanges() {
        return this._valueChanges;
    }
    get errorsChanges() {
        return this._errorsChanges;
    }
    get type() {
        return this.schema.type;
    }
    get parent() {
        return this._parent;
    }
    get root() {
        return this._root || this;
    }
    get path() {
        return this._path;
    }
    get value() {
        return this._value;
    }
    get visible() {
        return this._visible;
    }
    get valid() {
        return this._errors === null;
    }
    updateValueAndValidity(onlySelf = false, emitEvent = true) {
        this._updateValue();
        if (emitEvent) {
            this.valueChanges.next(this.value);
        }
        this._runValidation();
        if (this.parent && !onlySelf) {
            this.parent.updateValueAndValidity(onlySelf, emitEvent);
        }
    }
    /**
     * @internal
     */
    _runValidation() {
        let errors = this.schemaValidator(this._value) || [];
        let customValidator = this.validatorRegistry.get(this.path);
        if (customValidator) {
            let customErrors = customValidator(this.value, this, this.findRoot());
            errors = this.mergeErrors(errors, customErrors);
        }
        if (errors.length === 0) {
            errors = null;
        }
        this._errors = errors;
        this.setErrors(this._errors);
    }
    mergeErrors(errors, newErrors) {
        if (newErrors) {
            if (Array.isArray(newErrors)) {
                errors = errors.concat(...newErrors);
            }
            else {
                errors.push(newErrors);
            }
        }
        return errors;
    }
    setErrors(errors) {
        this._errors = errors;
        this._errorsChanges.next(errors);
    }
    extendErrors(errors) {
        errors = this.mergeErrors(this._errors || [], errors);
        this.setErrors(errors);
    }
    searchProperty(path) {
        let prop = this;
        let base = null;
        let result = null;
        if (path[0] === '/') {
            base = this.findRoot();
            result = base.getProperty(path.substr(1));
        }
        else {
            while (result === null && prop.parent !== null) {
                prop = base = prop.parent;
                result = base.getProperty(path);
            }
        }
        return result;
    }
    findRoot() {
        let property = this;
        while (property.parent !== null) {
            property = property.parent;
        }
        return property;
    }
    setVisible(visible) {
        this._visible = visible;
        this._visibilityChanges.next(visible);
        this.updateValueAndValidity();
    }
    /**
     * Making use of the expression compiler for the <code>visibleIf</code> condition
     * @param sourceProperty The source property where the `visibleIf` condition is set.
     * @param targetProperty  The target property what provided the `value` on which the `visibleIf` condition will be checked against. May be `null` or `undefined`
     * @param dependencyPath The dependency path of the `targetProperty`
     * @param value The value of the `targetProperty` to check the `visiblityIf` condintion against. May be `null` or `undefined`
     * @param expression The value or expression to check against the `value` for the `targetProperty`. May be `null` or `undefined`
     */
    __evaluateVisibilityIf(sourceProperty, targetProperty, dependencyPath, value = '', expression) {
        try {
            let valid = false;
            const expArray = Array.isArray(expression) ? expression : [expression];
            for (const expString of expArray) {
                if (typeof expString === 'boolean') {
                    valid = !expString ? !value : value;
                }
                else if (typeof expString === 'number') {
                    valid = !!value ? `${expString}` === `${value}` : false;
                }
                else if (-1 !== `${expString}`.indexOf('$ANY$')) {
                    valid = value && value.length > 0;
                }
                else if (0 === `${expString}`.indexOf('$EXP$')) {
                    const _expresssion = expString.substring('$EXP$'.length);
                    valid = true === this.expressionCompilerVisibiltyIf.evaluate(_expresssion, {
                        source: sourceProperty,
                        target: targetProperty
                    });
                }
                else {
                    valid = !!value ? `${expString}` === `${value}` : false;
                }
                if (valid) {
                    break;
                }
            }
            return valid;
        }
        catch (error) {
            this.logger.error('Error processing "VisibileIf" expression for path: ', dependencyPath, `source - ${(sourceProperty ? sourceProperty._canonicalPath : '<no-sourceProperty>')}: `, sourceProperty, `target - ${(targetProperty ? targetProperty._canonicalPath : '<no-targetProperty>')}: `, targetProperty, 'value:', value, 'expression: ', expression, 'error: ', error);
        }
    }
    /**
     * binds visibility conditions of type `oneOf` and `allOf`.
     * @returns `true` if any visibility binding of type `oneOf` or `allOf` has been processed. Otherwise `false`.
     */
    __bindVisibility_oneOf_or_allOf() {
        /**
         * <pre>
         *     "oneOf":[{
         *         "path":["value","value"]
         *     },{
         *         "path":["value","value"]
         *     }]
         *     </pre>
         * <pre>
         *     "allOf":[{
         *         "path":["value","value"]
         *     },{
         *         "path":["value","value"]
         *     }]
         *     </pre>
         */
        const visibleIfProperty = this.schema.visibleIf;
        const visibleIfOf = (visibleIfProperty || {}).oneOf || (visibleIfProperty || {}).allOf;
        if (visibleIfOf) {
            for (const visibleIf of visibleIfOf) {
                if (typeof visibleIf === 'object' && Object.keys(visibleIf).length === 0) {
                    this.setVisible(false);
                }
                else if (visibleIf !== undefined) {
                    const propertiesBinding = [];
                    for (const dependencyPath in visibleIf) {
                        if (visibleIf.hasOwnProperty(dependencyPath)) {
                            const properties = this.findProperties(this, dependencyPath);
                            if ((properties || []).length) {
                                for (const property of properties) {
                                    if (property) {
                                        let valueCheck;
                                        if (this.schema.visibleIf.oneOf) {
                                            const _chk = (value) => {
                                                for (const item of this.schema.visibleIf.oneOf) {
                                                    for (const depPath of Object.keys(item)) {
                                                        const props = this.findProperties(this, depPath);
                                                        for (const prop of props) {
                                                            const propVal = prop ? prop.value : null;
                                                            if (this.__evaluateVisibilityIf(this, prop, dependencyPath, propVal, item[depPath])) {
                                                                return true;
                                                            }
                                                        }
                                                    }
                                                }
                                                return false;
                                            };
                                            valueCheck = property.valueChanges.pipe(map(_chk));
                                        }
                                        else if (this.schema.visibleIf.allOf) {
                                            const _chk = (value) => {
                                                for (const item of this.schema.visibleIf.allOf) {
                                                    for (const depPath of Object.keys(item)) {
                                                        const props = this.findProperties(this, depPath);
                                                        for (const prop of props) {
                                                            const propVal = prop ? prop.value : null;
                                                            if (!this.__evaluateVisibilityIf(this, prop, dependencyPath, propVal, item[depPath])) {
                                                                return false;
                                                            }
                                                        }
                                                    }
                                                }
                                                return true;
                                            };
                                            valueCheck = property.valueChanges.pipe(map(_chk));
                                        }
                                        const visibilityCheck = property._visibilityChanges;
                                        const and = combineLatest([valueCheck, visibilityCheck], (v1, v2) => v1 && v2);
                                        propertiesBinding.push(and);
                                    }
                                }
                            }
                            else {
                                this.logger.warn('Can\'t find property ' + dependencyPath + ' for visibility check of ' + this.path);
                                this.registerMissingVisibilityBinding(dependencyPath, this);
                                // not visible if not existent
                                this.setVisible(false);
                            }
                        }
                    }
                    combineLatest(propertiesBinding, (...values) => {
                        if (this.schema.visibleIf.allOf) {
                            return values.indexOf(false) === -1;
                        }
                        return values.indexOf(true) !== -1;
                    }).subscribe((visible) => {
                        this.setVisible(visible);
                    });
                }
            }
            return true;
        }
    }
    // A field is visible if AT LEAST ONE of the properties it depends on is visible AND has a value in the list
    _bindVisibility() {
        if (this.__bindVisibility_oneOf_or_allOf())
            return;
        let visibleIf = this.schema.visibleIf;
        if (typeof visibleIf === 'object' && Object.keys(visibleIf).length === 0) {
            this.setVisible(false);
        }
        else if (visibleIf !== undefined) {
            let propertiesBinding = [];
            for (let dependencyPath in visibleIf) {
                if (visibleIf.hasOwnProperty(dependencyPath)) {
                    const properties = this.findProperties(this, dependencyPath);
                    if ((properties || []).length) {
                        for (const property of properties) {
                            if (property) {
                                const valueCheck = property.valueChanges.pipe(map(value => this.__evaluateVisibilityIf(this, property, dependencyPath, value, visibleIf[dependencyPath])));
                                const visibilityCheck = property._visibilityChanges;
                                const and = combineLatest([valueCheck, visibilityCheck], (v1, v2) => v1 && v2);
                                propertiesBinding.push(and);
                            }
                        }
                    }
                    else {
                        this.logger.warn('Can\'t find property ' + dependencyPath + ' for visibility check of ' + this.path);
                        this.registerMissingVisibilityBinding(dependencyPath, this);
                        // not visible if not existent
                        this.setVisible(false);
                    }
                }
            }
            combineLatest(propertiesBinding, (...values) => {
                return values.indexOf(true) !== -1;
            }).pipe(distinctUntilChanged()).subscribe((visible) => {
                this.setVisible(visible);
            });
        }
    }
    registerMissingVisibilityBinding(dependencyPath, formProperty) {
        formProperty._propertyBindingRegistry.getPropertyBindingsVisibility().add(dependencyPath, formProperty.path);
    }
    /**
     * Finds all <code>formProperties</code> from a path with wildcards.<br/>
     * e.g: <code>/garage/cars/&#42;/tires/&#42;/name</code><br/>
     * @param target
     * @param propertyPath
     */
    findProperties(target, propertyPath) {
        const props = [];
        const paths = this.findPropertyPaths(target, propertyPath);
        for (const path of paths) {
            const p = target.searchProperty(path);
            if (p) {
                props.push(p);
            }
        }
        return props;
    }
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
    findPropertyPaths(target, path, parentPath) {
        const ix = path.indexOf('*');
        if (-1 !== ix) {
            const prePath = ix > -1 ? path.substring(0, ix - 1) : path;
            const subPath = ix > -1 ? path.substring(ix + 1) : path;
            const prop = target.searchProperty(prePath);
            let pathFound = [];
            if (prop instanceof PropertyGroup) {
                const arrProp = prop.properties;
                for (let i = 0; i < arrProp.length; i++) {
                    const curreItemPath = (parentPath || '') + prePath + (prePath.endsWith('/') ? '' : '/') + i + subPath;
                    const curreItemPrePath = (parentPath || '') + prePath + i;
                    if (-1 === curreItemPath.indexOf('*')) {
                        pathFound.push(curreItemPath);
                    }
                    const childrenPathFound = this.findPropertyPaths(arrProp[i], subPath, curreItemPrePath);
                    pathFound = pathFound.concat(childrenPathFound);
                }
            }
            return pathFound;
        }
        return [path];
    }
}
export class PropertyGroup extends FormProperty {
    constructor() {
        super(...arguments);
        this._properties = null;
        this._propertyProxyHandler = new ExtendedProxyHandler(this.logger);
    }
    get properties() {
        return this._properties;
    }
    set properties(properties) {
        /**
         * Override the setter to add an observer that notices when an item is added or removed.<br/>
         */
        this._properties = new Proxy(properties, this._propertyProxyHandler);
    }
    getProperty(path) {
        let subPathIdx = path.indexOf('/');
        let propertyId = subPathIdx !== -1 ? path.substr(0, subPathIdx) : path;
        let property = this.properties[propertyId];
        if (property !== null && subPathIdx !== -1 && property instanceof PropertyGroup) {
            let subPath = path.substr(subPathIdx + 1);
            property = property.getProperty(subPath);
        }
        return property;
    }
    forEachChild(fn) {
        for (let propertyId in this.properties) {
            if (this.properties.hasOwnProperty(propertyId)) {
                let property = this.properties[propertyId];
                fn(property, propertyId);
            }
        }
    }
    forEachChildRecursive(fn) {
        this.forEachChild((child) => {
            fn(child);
            if (child instanceof PropertyGroup) {
                child.forEachChildRecursive(fn);
            }
        });
    }
    _bindVisibility() {
        super._bindVisibility();
        this._bindVisibilityRecursive();
    }
    _bindVisibilityRecursive() {
        this.forEachChildRecursive((property) => {
            property._bindVisibility();
        });
    }
    isRoot() {
        return this === this.root;
    }
}
export class ExtendedProxyHandler {
    constructor(logger) {
        this.logger = logger;
    }
    /**
     * When a new item is added it will be checked for visibility updates to proceed <br/>
     * if any other field has a binding reference to it.<br/>
     */
    set(target, p, value, receiver) {
        /**
         * 1) Make sure a canonical path is set
         */
        const assertCanonicalPath = (propertyValue) => {
            const formProperty = propertyValue;
            if (Array.isArray(target) && propertyValue instanceof FormProperty) {
                /**
                 * Create a canonical path replacing the last '*' with the elements position in array
                 * @param propertyPath
                 * @param indexOfChild
                 */
                const getCanonicalPath = (propertyPath, indexOfChild) => {
                    let pos;
                    if (propertyPath && -1 !== (pos = propertyPath.lastIndexOf('*'))) {
                        return propertyPath.substring(0, pos) + indexOfChild.toString() + propertyPath.substring(pos + 1);
                    }
                };
                if (formProperty) {
                    formProperty._canonicalPath = getCanonicalPath(formProperty._canonicalPath, p);
                }
            }
            const recalculateCanonicalPath = (formProperty) => {
                if (!(formProperty instanceof PropertyGroup))
                    return;
                const propertyGroup = formProperty;
                const propertyGroupChildren = (Array.isArray(propertyGroup.properties) ?
                    propertyGroup.properties :
                    Object.values(propertyGroup.properties || {}));
                if (propertyGroupChildren.length || (formProperty.path || '').endsWith('/*')) {
                    /**
                     * If it is an array, then all children canonical paths must be computed now.
                     * The children don't have the parent's path segment set yet,
                     * because they are created before the parent gets attached to its parent.
                     */
                    for (const child of propertyGroupChildren) {
                        if (child.__canonicalPath.indexOf('*')) {
                            const p_path = formProperty._canonicalPath.split('/');
                            child._canonicalPath = p_path.concat(child._canonicalPath.split('/').splice(p_path.length)).join('/');
                        }
                        recalculateCanonicalPath(child);
                    }
                }
            };
            recalculateCanonicalPath(formProperty);
            const propertyGroup = formProperty;
            const propertyGroupChildren = (Array.isArray(propertyGroup.properties) ?
                propertyGroup.properties :
                Object.values(propertyGroup.properties || {}));
            return { property: formProperty, children: propertyGroupChildren };
        };
        const { property, children } = assertCanonicalPath(value);
        /**
         * 2) Add the new property before rebinding, so it can be found by <code>_bindVisibility</code>
         */
        const result = target[p] = value;
        /**
         * 3) Re-bind the visibility bindings referencing to this canonical paths
         */
        const rebindVisibility = () => {
            const rebindAll = [property].concat(children);
            const findPropertiesToRebind = (formProperty) => {
                const propertyBindings = formProperty._propertyBindingRegistry.getPropertyBindingsVisibility();
                let rebind = [];
                if (formProperty._canonicalPath) {
                    rebind = rebind.concat(rebind.concat(propertyBindings.findByDependencyPath(formProperty._canonicalPath) || []));
                    if (formProperty._canonicalPath.startsWith('/')) {
                        rebind = rebind.concat(rebind.concat(propertyBindings.findByDependencyPath(formProperty._canonicalPath.substring(1)) || []));
                    }
                }
                rebind = rebind.concat(propertyBindings.findByDependencyPath(formProperty.path) || []);
                if (formProperty.path.startsWith('/')) {
                    rebind = rebind.concat(rebind.concat(propertyBindings.findByDependencyPath(formProperty.path.substring(1)) || []));
                }
                const uniqueValues = {};
                for (const item of rebind) {
                    uniqueValues[item] = item;
                }
                return Object.keys(uniqueValues);
            };
            for (const _property of rebindAll) {
                if (_property instanceof FormProperty) {
                    try {
                        const rebindPaths = findPropertiesToRebind(_property);
                        for (const rebindPropPath of rebindPaths) {
                            const rebindProp = _property.searchProperty(rebindPropPath);
                            if (!rebindProp) {
                                this.logger.warn('Can\'t find property to rebind visibility at path:', _property.path, 'property:', _property);
                            }
                            else {
                                rebindProp._bindVisibility();
                            }
                        }
                    }
                    catch (e) {
                        this.logger.error('Rebinding visibility error at path:', _property.path, 'property:', _property, e);
                    }
                }
            }
        };
        rebindVisibility();
        return result;
    }
    get(target, p, receiver) {
        return target[p];
    }
    deleteProperty(target, p) {
        return delete target[p];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXByb3BlcnR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2NoZW1hLWZvcm0vc3JjL2xpYi9tb2RlbC9mb3JtcHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDcEQsT0FBTyxFQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBU3pELE1BQU0sT0FBZ0IsWUFBWTtJQWlEaEMsWUFBWSxzQkFBOEMsRUFDdEMsaUJBQW9DLEVBQzVDLHlCQUFvRCxFQUM3QyxNQUFlLEVBQ3RCLE1BQXFCLEVBQ3JCLElBQVksRUFDRixNQUFrQjtRQUxwQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBRXJDLFdBQU0sR0FBTixNQUFNLENBQVM7UUFHWixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBbkR4QyxXQUFNLEdBQVEsSUFBSSxDQUFDO1FBQ25CLFlBQU8sR0FBUSxJQUFJLENBQUM7UUFDWixrQkFBYSxHQUFHLElBQUksZUFBZSxDQUFNLElBQUksQ0FBQyxDQUFDO1FBQy9DLG1CQUFjLEdBQUcsSUFBSSxlQUFlLENBQU0sSUFBSSxDQUFDLENBQUM7UUFDaEQsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQix1QkFBa0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxJQUFJLENBQUMsQ0FBQztRQStDOUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLDZCQUE2QixHQUFHLHlCQUF5QixDQUFDLG9DQUFvQyxFQUFFLENBQUM7UUFFdEcsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FB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TSxVQUFVLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFDNUQsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQ0FDZixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvREFBb0QsRUFBRSxTQUFTLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQzs2QkFDaEg7aUNBQU07Z0NBQ0wsVUFBVSxDQUFDLGVBQWUsRUFBRSxDQUFDOzZCQUM5Qjt5QkFDRjtxQkFDRjtvQkFBQyxPQUFPLENBQUMsRUFBRTt3QkFDVixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsRUFBRSxTQUFTLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQ3JHO2lCQUNGO2FBQ0Y7UUFDSCxDQUFDLENBQUM7UUFDRixnQkFBZ0IsRUFBRSxDQUFDO1FBRW5CLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxHQUFHLENBQUMsTUFBc0QsRUFBRSxDQUFjLEVBQUUsUUFBYTtRQUN2RixPQUFPLE1BQU0sQ0FBQyxDQUFXLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsY0FBYyxDQUFDLE1BQXNELEVBQUUsQ0FBYztRQUNuRixPQUFPLE9BQU8sTUFBTSxDQUFDLENBQVcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1NjaGVtYVZhbGlkYXRvckZhY3Rvcnl9IGZyb20gJy4uL3NjaGVtYXZhbGlkYXRvcmZhY3RvcnknO1xuaW1wb3J0IHtWYWxpZGF0b3JSZWdpc3RyeX0gZnJvbSAnLi92YWxpZGF0b3JyZWdpc3RyeSc7XG5pbXBvcnQge1Byb3BlcnR5QmluZGluZ1JlZ2lzdHJ5fSBmcm9tICcuLi9wcm9wZXJ0eS1iaW5kaW5nLXJlZ2lzdHJ5JztcbmltcG9ydCB7IEV4cHJlc3Npb25Db21waWxlckZhY3RvcnksIEV4cHJlc3Npb25Db21waWxlclZpc2liaWxpdHlJZiB9IGZyb20gJy4uL2V4cHJlc3Npb24tY29tcGlsZXItZmFjdG9yeSc7XG5pbXBvcnQgeyBJU2NoZW1hLCBUU2NoZW1hUHJvcGVydHlUeXBlIH0gZnJvbSAnLi9JU2NoZW1hJztcbmltcG9ydCB7IExvZ1NlcnZpY2UgfSBmcm9tICcuLi9sb2cuc2VydmljZSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGb3JtUHJvcGVydHkge1xuICBwdWJsaWMgc2NoZW1hVmFsaWRhdG9yOiBGdW5jdGlvbjtcbiAgcHVibGljIGV4cHJlc3Npb25Db21waWxlclZpc2liaWx0eUlmOiBFeHByZXNzaW9uQ29tcGlsZXJWaXNpYmlsaXR5SWY7XG5cbiAgX3ZhbHVlOiBhbnkgPSBudWxsO1xuICBfZXJyb3JzOiBhbnkgPSBudWxsO1xuICBwcml2YXRlIF92YWx1ZUNoYW5nZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XG4gIHByaXZhdGUgX2Vycm9yc0NoYW5nZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XG4gIHByaXZhdGUgX3Zpc2libGUgPSB0cnVlO1xuICBwcml2YXRlIF92aXNpYmlsaXR5Q2hhbmdlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHByaXZhdGUgX3Jvb3Q6IFByb3BlcnR5R3JvdXA7XG4gIHByaXZhdGUgX3BhcmVudDogUHJvcGVydHlHcm91cDtcbiAgcHJpdmF0ZSBfcGF0aDogc3RyaW5nO1xuICBfcHJvcGVydHlCaW5kaW5nUmVnaXN0cnk6IFByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5O1xuICBfX2Nhbm9uaWNhbFBhdGg6IHN0cmluZztcbiAgX19jYW5vbmljYWxQYXRoTm90YXRpb246IHN0cmluZztcblxuICAvKipcbiAgICogUHJvdmlkZXMgdGhlIHVuaXF1ZSBwYXRoIG9mIHRoaXMgZm9ybSBlbGVtZW50Ljxici8+XG4gICAqIEUuZy46XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2FyczwvY29kZT4sPGJyLz5cbiAgICogPGNvZGU+L3Nob3AvYm9vay8wL3BhZ2UvMS88L2NvZGU+XG4gICAqL1xuICBnZXQgX2Nhbm9uaWNhbFBhdGgoKSB7IHJldHVybiB0aGlzLl9fY2Fub25pY2FsUGF0aDsgfVxuICBzZXQgX2Nhbm9uaWNhbFBhdGgoY2Fub25pY2FsUGF0aDogc3RyaW5nKSB7XG4gICAgdGhpcy5fX2Nhbm9uaWNhbFBhdGggPSBjYW5vbmljYWxQYXRoO1xuICAgIHRoaXMuX19jYW5vbmljYWxQYXRoTm90YXRpb24gPSAodGhpcy5fX2Nhbm9uaWNhbFBhdGh8fCcnKVxuICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCgnXi8nLCAnaWcnKSwgJycpXG4gICAgICAucmVwbGFjZShuZXcgUmVnRXhwKCcvJCcsICdpZycpLCAnJylcbiAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoJy8nLCAnaWcnKSwgJy4nKTtcbiAgfVxuICAvKipcbiAgICogVXNlcyB0aGUgdW5pcXVlIHBhdGggcHJvdmlkZWQgYnkgdGhlIHByb3BlcnR5IDxjb2RlPl9jYW5vbmljYWxQYXRoPC9jb2RlPjxici8+XG4gICAqIGJ1dCBjb252ZXJ0cyBpdCB0byBhIEhUTUwgRWxlbWVudCBBdHRyaWJ1dGUgSUQgY29tcGxpYW50IGZvcm1hdC48YnIvPlxuICAgKiBFLmcuOlxuICAgKiA8Y29kZT5nYXJhZ2UuY2FyczwvY29kZT4sPGJyLz5cbiAgICogPGNvZGU+c2hvcC5ib29rLjAucGFnZS4xLjwvY29kZT5cbiAgICovXG4gIGdldCBjYW5vbmljYWxQYXRoTm90YXRpb24oKSB7IHJldHVybiB0aGlzLl9fY2Fub25pY2FsUGF0aE5vdGF0aW9uOyB9XG5cbiAgcHJpdmF0ZSBfcm9vdE5hbWU7XG4gIC8qKlxuICAgKiBQcm92aWRlcyB0aGUgSFRNTCBFbGVtZW50IEF0dHJpYnV0ZSBJRC9OQU1FIGNvbXBsaWFudCByZXByZXNlbnRhdGlvblxuICAgKiBvZiB0aGUgcm9vdCBlbGVtZW50Ljxici8+XG4gICAqIFJlcHJlc2VudHMgdGhlIEhUTUwgRk9STSBOQU1FLjxici8+XG4gICAqIE9ubHkgdGhlIHJvb3QgPGNvZGU+Rm9ybVByb3BlcnR5PC9jb2RlPiB3aWxsIHByb3ZpZGUgYSB2YWx1ZSBoZXJlLlxuICAgKi9cbiAgZ2V0IHJvb3ROYW1lKCkgeyByZXR1cm4gdGhpcy5fcm9vdE5hbWU7IH1cblxuICBjb25zdHJ1Y3RvcihzY2hlbWFWYWxpZGF0b3JGYWN0b3J5OiBTY2hlbWFWYWxpZGF0b3JGYWN0b3J5LFxuICAgICAgICAgICAgICBwcml2YXRlIHZhbGlkYXRvclJlZ2lzdHJ5OiBWYWxpZGF0b3JSZWdpc3RyeSxcbiAgICAgICAgICAgICAgZXhwcmVzc2lvbkNvbXBpbGVyRmFjdG9yeTogRXhwcmVzc2lvbkNvbXBpbGVyRmFjdG9yeSxcbiAgICAgICAgICAgICAgcHVibGljIHNjaGVtYTogSVNjaGVtYSxcbiAgICAgICAgICAgICAgcGFyZW50OiBQcm9wZXJ0eUdyb3VwLFxuICAgICAgICAgICAgICBwYXRoOiBzdHJpbmcsXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBsb2dnZXI6IExvZ1NlcnZpY2UpIHtcbiAgICB0aGlzLnNjaGVtYVZhbGlkYXRvciA9IHNjaGVtYVZhbGlkYXRvckZhY3RvcnkuY3JlYXRlVmFsaWRhdG9yRm4odGhpcy5zY2hlbWEpO1xuICAgIHRoaXMuZXhwcmVzc2lvbkNvbXBpbGVyVmlzaWJpbHR5SWYgPSBleHByZXNzaW9uQ29tcGlsZXJGYWN0b3J5LmNyZWF0ZUV4cHJlc3Npb25Db21waWxlclZpc2liaWxpdHlJZigpO1xuXG4gICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHRoaXMuX3Jvb3QgPSBwYXJlbnQucm9vdDtcbiAgICB9IGVsc2UgaWYgKHRoaXMgaW5zdGFuY2VvZiBQcm9wZXJ0eUdyb3VwKSB7XG4gICAgICB0aGlzLl9yb290ID0gPFByb3BlcnR5R3JvdXA+PGFueT50aGlzO1xuICAgICAgdGhpcy5fcm9vdE5hbWUgPSB0aGlzLmNyZWF0ZVJvb3ROYW1lKCk7XG4gICAgfVxuICAgIHRoaXMuX3BhdGggPSBwYXRoO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIEhUTUwgSUQgYW5kIE5BTUUgYXR0cmlidXRlIGNvbXBsaWFudCBzdHJpbmcuXG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZVJvb3ROYW1lKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuc2NoZW1hICYmIHRoaXMuc2NoZW1hWyduYW1lJ10pIHtcbiAgICAgIHJldHVybiB0aGlzLl9yb290TmFtZSA9IHRoaXMuc2NoZW1hWyduYW1lJ10ucmVwbGFjZShuZXcgUmVnRXhwKCdbXFxcXHNdKycsICdpZycpLCAnXycpXG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmFsdWVDaGFuZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZUNoYW5nZXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGVycm9yc0NoYW5nZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Vycm9yc0NoYW5nZXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHR5cGUoKTogVFNjaGVtYVByb3BlcnR5VHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuc2NoZW1hLnR5cGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBhcmVudCgpOiBQcm9wZXJ0eUdyb3VwIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xuICB9XG5cbiAgcHVibGljIGdldCByb290KCk6IFByb3BlcnR5R3JvdXAge1xuICAgIHJldHVybiB0aGlzLl9yb290IHx8IDxQcm9wZXJ0eUdyb3VwPjxhbnk+dGhpcztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGF0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9wYXRoO1xuICB9XG5cbiAgcHVibGljIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZpc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZhbGlkKCkge1xuICAgIHJldHVybiB0aGlzLl9lcnJvcnMgPT09IG51bGw7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3Qgc2V0VmFsdWUodmFsdWU6IGFueSwgb25seVNlbGY6IGJvb2xlYW4pO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCByZXNldCh2YWx1ZTogYW55LCBvbmx5U2VsZjogYm9vbGVhbik7XG5cbiAgcHVibGljIHVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkob25seVNlbGYgPSBmYWxzZSwgZW1pdEV2ZW50ID0gdHJ1ZSkge1xuICAgIHRoaXMuX3VwZGF0ZVZhbHVlKCk7XG5cbiAgICBpZiAoZW1pdEV2ZW50KSB7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlcy5uZXh0KHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIHRoaXMuX3J1blZhbGlkYXRpb24oKTtcblxuICAgIGlmICh0aGlzLnBhcmVudCAmJiAhb25seVNlbGYpIHtcbiAgICAgIHRoaXMucGFyZW50LnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkob25seVNlbGYsIGVtaXRFdmVudCk7XG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgX2hhc1ZhbHVlKCk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqICBAaW50ZXJuYWxcbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBfdXBkYXRlVmFsdWUoKTtcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBwdWJsaWMgX3J1blZhbGlkYXRpb24oKTogYW55IHtcbiAgICBsZXQgZXJyb3JzID0gdGhpcy5zY2hlbWFWYWxpZGF0b3IodGhpcy5fdmFsdWUpIHx8IFtdO1xuICAgIGxldCBjdXN0b21WYWxpZGF0b3IgPSB0aGlzLnZhbGlkYXRvclJlZ2lzdHJ5LmdldCh0aGlzLnBhdGgpO1xuICAgIGlmIChjdXN0b21WYWxpZGF0b3IpIHtcbiAgICAgIGxldCBjdXN0b21FcnJvcnMgPSBjdXN0b21WYWxpZGF0b3IodGhpcy52YWx1ZSwgdGhpcywgdGhpcy5maW5kUm9vdCgpKTtcbiAgICAgIGVycm9ycyA9IHRoaXMubWVyZ2VFcnJvcnMoZXJyb3JzLCBjdXN0b21FcnJvcnMpO1xuICAgIH1cbiAgICBpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZXJyb3JzID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLl9lcnJvcnMgPSBlcnJvcnM7XG4gICAgdGhpcy5zZXRFcnJvcnModGhpcy5fZXJyb3JzKTtcbiAgfVxuXG4gIHByaXZhdGUgbWVyZ2VFcnJvcnMoZXJyb3JzLCBuZXdFcnJvcnMpIHtcbiAgICBpZiAobmV3RXJyb3JzKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShuZXdFcnJvcnMpKSB7XG4gICAgICAgIGVycm9ycyA9IGVycm9ycy5jb25jYXQoLi4ubmV3RXJyb3JzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9ycy5wdXNoKG5ld0Vycm9ycyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlcnJvcnM7XG4gIH1cblxuICBwcml2YXRlIHNldEVycm9ycyhlcnJvcnMpIHtcbiAgICB0aGlzLl9lcnJvcnMgPSBlcnJvcnM7XG4gICAgdGhpcy5fZXJyb3JzQ2hhbmdlcy5uZXh0KGVycm9ycyk7XG4gIH1cblxuICBwdWJsaWMgZXh0ZW5kRXJyb3JzKGVycm9ycykge1xuICAgIGVycm9ycyA9IHRoaXMubWVyZ2VFcnJvcnModGhpcy5fZXJyb3JzIHx8IFtdLCBlcnJvcnMpO1xuICAgIHRoaXMuc2V0RXJyb3JzKGVycm9ycyk7XG4gIH1cblxuICBzZWFyY2hQcm9wZXJ0eShwYXRoOiBzdHJpbmcpOiBGb3JtUHJvcGVydHkge1xuICAgIGxldCBwcm9wOiBGb3JtUHJvcGVydHkgPSB0aGlzO1xuICAgIGxldCBiYXNlOiBQcm9wZXJ0eUdyb3VwID0gbnVsbDtcblxuICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgIGlmIChwYXRoWzBdID09PSAnLycpIHtcbiAgICAgIGJhc2UgPSB0aGlzLmZpbmRSb290KCk7XG4gICAgICByZXN1bHQgPSBiYXNlLmdldFByb3BlcnR5KHBhdGguc3Vic3RyKDEpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2hpbGUgKHJlc3VsdCA9PT0gbnVsbCAmJiBwcm9wLnBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICBwcm9wID0gYmFzZSA9IHByb3AucGFyZW50O1xuICAgICAgICByZXN1bHQgPSBiYXNlLmdldFByb3BlcnR5KHBhdGgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIGZpbmRSb290KCk6IFByb3BlcnR5R3JvdXAge1xuICAgIGxldCBwcm9wZXJ0eTogRm9ybVByb3BlcnR5ID0gdGhpcztcbiAgICB3aGlsZSAocHJvcGVydHkucGFyZW50ICE9PSBudWxsKSB7XG4gICAgICBwcm9wZXJ0eSA9IHByb3BlcnR5LnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIDxQcm9wZXJ0eUdyb3VwPnByb3BlcnR5O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl92aXNpYmxlID0gdmlzaWJsZTtcbiAgICB0aGlzLl92aXNpYmlsaXR5Q2hhbmdlcy5uZXh0KHZpc2libGUpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2luZyB1c2Ugb2YgdGhlIGV4cHJlc3Npb24gY29tcGlsZXIgZm9yIHRoZSA8Y29kZT52aXNpYmxlSWY8L2NvZGU+IGNvbmRpdGlvblxuICAgKiBAcGFyYW0gc291cmNlUHJvcGVydHkgVGhlIHNvdXJjZSBwcm9wZXJ0eSB3aGVyZSB0aGUgYHZpc2libGVJZmAgY29uZGl0aW9uIGlzIHNldC5cbiAgICogQHBhcmFtIHRhcmdldFByb3BlcnR5ICBUaGUgdGFyZ2V0IHByb3BlcnR5IHdoYXQgcHJvdmlkZWQgdGhlIGB2YWx1ZWAgb24gd2hpY2ggdGhlIGB2aXNpYmxlSWZgIGNvbmRpdGlvbiB3aWxsIGJlIGNoZWNrZWQgYWdhaW5zdC4gTWF5IGJlIGBudWxsYCBvciBgdW5kZWZpbmVkYFxuICAgKiBAcGFyYW0gZGVwZW5kZW5jeVBhdGggVGhlIGRlcGVuZGVuY3kgcGF0aCBvZiB0aGUgYHRhcmdldFByb3BlcnR5YFxuICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIG9mIHRoZSBgdGFyZ2V0UHJvcGVydHlgIHRvIGNoZWNrIHRoZSBgdmlzaWJsaXR5SWZgIGNvbmRpbnRpb24gYWdhaW5zdC4gTWF5IGJlIGBudWxsYCBvciBgdW5kZWZpbmVkYFxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbiBUaGUgdmFsdWUgb3IgZXhwcmVzc2lvbiB0byBjaGVjayBhZ2FpbnN0IHRoZSBgdmFsdWVgIGZvciB0aGUgYHRhcmdldFByb3BlcnR5YC4gTWF5IGJlIGBudWxsYCBvciBgdW5kZWZpbmVkYFxuICAgKi9cbiAgcHJpdmF0ZSBfX2V2YWx1YXRlVmlzaWJpbGl0eUlmKFxuICAgIHNvdXJjZVByb3BlcnR5OiBGb3JtUHJvcGVydHksXG4gICAgdGFyZ2V0UHJvcGVydHk6IEZvcm1Qcm9wZXJ0eSxcbiAgICBkZXBlbmRlbmN5UGF0aDogc3RyaW5nLFxuICAgIHZhbHVlOiBhbnkgPSAnJyxcbiAgICBleHByZXNzaW9uOiBzdHJpbmcgfCBzdHJpbmdbXSB8IG51bWJlciB8IG51bWJlcltdIHwgYm9vbGVhbiB8IGJvb2xlYW5bXSk6IGJvb2xlYW4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgdmFsaWQgPSBmYWxzZVxuICAgICAgY29uc3QgZXhwQXJyYXkgPSBBcnJheS5pc0FycmF5KGV4cHJlc3Npb24pID8gZXhwcmVzc2lvbiA6IFtleHByZXNzaW9uXVxuICAgICAgZm9yIChjb25zdCBleHBTdHJpbmcgb2YgZXhwQXJyYXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBleHBTdHJpbmcgPT09ICdib29sZWFuJykge1xuICAgICAgICAgIHZhbGlkID0gIWV4cFN0cmluZyA/ICF2YWx1ZSA6IHZhbHVlXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cFN0cmluZyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICB2YWxpZCA9ICEhdmFsdWUgPyBgJHtleHBTdHJpbmd9YCA9PT0gYCR7dmFsdWV9YCA6IGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKC0xICE9PSBgJHtleHBTdHJpbmd9YC5pbmRleE9mKCckQU5ZJCcpKSB7XG4gICAgICAgICAgdmFsaWQgPSB2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPiAwO1xuICAgICAgICB9IGVsc2UgaWYgKDAgPT09IGAke2V4cFN0cmluZ31gLmluZGV4T2YoJyRFWFAkJykpIHtcbiAgICAgICAgICBjb25zdCBfZXhwcmVzc3Npb24gPSAoZXhwU3RyaW5nIGFzIHN0cmluZykuc3Vic3RyaW5nKCckRVhQJCcubGVuZ3RoKTtcbiAgICAgICAgICB2YWxpZCA9IHRydWUgPT09IHRoaXMuZXhwcmVzc2lvbkNvbXBpbGVyVmlzaWJpbHR5SWYuZXZhbHVhdGUoX2V4cHJlc3NzaW9uLCB7XG4gICAgICAgICAgICBzb3VyY2U6IHNvdXJjZVByb3BlcnR5LFxuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRQcm9wZXJ0eVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsaWQgPSAhIXZhbHVlID8gYCR7ZXhwU3RyaW5nfWAgPT09IGAke3ZhbHVlfWAgOiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsaWQpIHtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsaWRcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoJ0Vycm9yIHByb2Nlc3NpbmcgXCJWaXNpYmlsZUlmXCIgZXhwcmVzc2lvbiBmb3IgcGF0aDogJywgZGVwZW5kZW5jeVBhdGgsXG4gICAgICAgIGBzb3VyY2UgLSAkeyhzb3VyY2VQcm9wZXJ0eSA/IHNvdXJjZVByb3BlcnR5Ll9jYW5vbmljYWxQYXRoIDogJzxuby1zb3VyY2VQcm9wZXJ0eT4nKX06IGAsIHNvdXJjZVByb3BlcnR5LFxuICAgICAgICBgdGFyZ2V0IC0gJHsodGFyZ2V0UHJvcGVydHkgPyB0YXJnZXRQcm9wZXJ0eS5fY2Fub25pY2FsUGF0aCA6ICc8bm8tdGFyZ2V0UHJvcGVydHk+Jyl9OiBgLCB0YXJnZXRQcm9wZXJ0eSxcbiAgICAgICAgJ3ZhbHVlOicsIHZhbHVlLFxuICAgICAgICAnZXhwcmVzc2lvbjogJywgZXhwcmVzc2lvbixcbiAgICAgICAgJ2Vycm9yOiAnLCBlcnJvcilcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYmluZHMgdmlzaWJpbGl0eSBjb25kaXRpb25zIG9mIHR5cGUgYG9uZU9mYCBhbmQgYGFsbE9mYC5cbiAgICogQHJldHVybnMgYHRydWVgIGlmIGFueSB2aXNpYmlsaXR5IGJpbmRpbmcgb2YgdHlwZSBgb25lT2ZgIG9yIGBhbGxPZmAgaGFzIGJlZW4gcHJvY2Vzc2VkLiBPdGhlcndpc2UgYGZhbHNlYC5cbiAgICovXG4gIHByaXZhdGUgX19iaW5kVmlzaWJpbGl0eV9vbmVPZl9vcl9hbGxPZigpOiBib29sZWFuIHtcbiAgICAvKipcbiAgICAgKiA8cHJlPlxuICAgICAqICAgICBcIm9uZU9mXCI6W3tcbiAgICAgKiAgICAgICAgIFwicGF0aFwiOltcInZhbHVlXCIsXCJ2YWx1ZVwiXVxuICAgICAqICAgICB9LHtcbiAgICAgKiAgICAgICAgIFwicGF0aFwiOltcInZhbHVlXCIsXCJ2YWx1ZVwiXVxuICAgICAqICAgICB9XVxuICAgICAqICAgICA8L3ByZT5cbiAgICAgKiA8cHJlPlxuICAgICAqICAgICBcImFsbE9mXCI6W3tcbiAgICAgKiAgICAgICAgIFwicGF0aFwiOltcInZhbHVlXCIsXCJ2YWx1ZVwiXVxuICAgICAqICAgICB9LHtcbiAgICAgKiAgICAgICAgIFwicGF0aFwiOltcInZhbHVlXCIsXCJ2YWx1ZVwiXVxuICAgICAqICAgICB9XVxuICAgICAqICAgICA8L3ByZT5cbiAgICAgKi9cbiAgICBjb25zdCB2aXNpYmxlSWZQcm9wZXJ0eSA9IHRoaXMuc2NoZW1hLnZpc2libGVJZjtcbiAgICBjb25zdCB2aXNpYmxlSWZPZiA9ICh2aXNpYmxlSWZQcm9wZXJ0eSB8fCB7fSkub25lT2YgfHwgKHZpc2libGVJZlByb3BlcnR5IHx8IHt9KS5hbGxPZjtcbiAgICBpZiAodmlzaWJsZUlmT2YpIHtcbiAgICAgIGZvciAoY29uc3QgdmlzaWJsZUlmIG9mIHZpc2libGVJZk9mKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmlzaWJsZUlmID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyh2aXNpYmxlSWYpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodmlzaWJsZUlmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0aWVzQmluZGluZyA9IFtdO1xuICAgICAgICAgIGZvciAoY29uc3QgZGVwZW5kZW5jeVBhdGggaW4gdmlzaWJsZUlmKSB7XG4gICAgICAgICAgICBpZiAodmlzaWJsZUlmLmhhc093blByb3BlcnR5KGRlcGVuZGVuY3lQYXRoKSkge1xuICAgICAgICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5maW5kUHJvcGVydGllcyh0aGlzLCBkZXBlbmRlbmN5UGF0aCk7XG4gICAgICAgICAgICAgIGlmICgocHJvcGVydGllcyB8fCBbXSkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBvZiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlQ2hlY2s7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjaGVtYS52aXNpYmxlSWYub25lT2YpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBfY2hrID0gKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5zY2hlbWEudmlzaWJsZUlmLm9uZU9mKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZGVwUGF0aCBvZiBPYmplY3Qua2V5cyhpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5maW5kUHJvcGVydGllcyh0aGlzLCBkZXBQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IoY29uc3QgcHJvcCBvZiBwcm9wcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvcFZhbCA9IHByb3AgPyBwcm9wLnZhbHVlIDogbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9fZXZhbHVhdGVWaXNpYmlsaXR5SWYodGhpcywgcHJvcCwgZGVwZW5kZW5jeVBhdGgsIHByb3BWYWwsIGl0ZW1bZGVwUGF0aF0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlQ2hlY2sgPSBwcm9wZXJ0eS52YWx1ZUNoYW5nZXMucGlwZShtYXAoX2NoaykpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2NoZW1hLnZpc2libGVJZi5hbGxPZikge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF9jaGsgPSAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLnNjaGVtYS52aXNpYmxlSWYuYWxsT2YpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBkZXBQYXRoIG9mIE9iamVjdC5rZXlzKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLmZpbmRQcm9wZXJ0aWVzKHRoaXMsIGRlcFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihjb25zdCBwcm9wIG9mIHByb3BzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9wVmFsID0gcHJvcCA/IHByb3AudmFsdWUgOiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9fZXZhbHVhdGVWaXNpYmlsaXR5SWYodGhpcywgcHJvcCwgZGVwZW5kZW5jeVBhdGgsIHByb3BWYWwsIGl0ZW1bZGVwUGF0aF0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWVDaGVjayA9IHByb3BlcnR5LnZhbHVlQ2hhbmdlcy5waXBlKG1hcChfY2hrKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlzaWJpbGl0eUNoZWNrID0gcHJvcGVydHkuX3Zpc2liaWxpdHlDaGFuZ2VzO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmQgPSBjb21iaW5lTGF0ZXN0KFt2YWx1ZUNoZWNrLCB2aXNpYmlsaXR5Q2hlY2tdLCAodjEsIHYyKSA9PiB2MSAmJiB2Mik7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNCaW5kaW5nLnB1c2goYW5kKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybignQ2FuXFwndCBmaW5kIHByb3BlcnR5ICcgKyBkZXBlbmRlbmN5UGF0aCArICcgZm9yIHZpc2liaWxpdHkgY2hlY2sgb2YgJyArIHRoaXMucGF0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpc3Rlck1pc3NpbmdWaXNpYmlsaXR5QmluZGluZyhkZXBlbmRlbmN5UGF0aCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgLy8gbm90IHZpc2libGUgaWYgbm90IGV4aXN0ZW50XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbWJpbmVMYXRlc3QocHJvcGVydGllc0JpbmRpbmcsICguLi52YWx1ZXM6IGJvb2xlYW5bXSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NoZW1hLnZpc2libGVJZi5hbGxPZikge1xuICAgICAgICAgICAgICByZXR1cm4gdmFsdWVzLmluZGV4T2YoZmFsc2UpID09PSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXMuaW5kZXhPZih0cnVlKSAhPT0gLTE7XG4gICAgICAgICAgfSkuc3Vic2NyaWJlKCh2aXNpYmxlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFZpc2libGUodmlzaWJsZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIEEgZmllbGQgaXMgdmlzaWJsZSBpZiBBVCBMRUFTVCBPTkUgb2YgdGhlIHByb3BlcnRpZXMgaXQgZGVwZW5kcyBvbiBpcyB2aXNpYmxlIEFORCBoYXMgYSB2YWx1ZSBpbiB0aGUgbGlzdFxuICBwdWJsaWMgX2JpbmRWaXNpYmlsaXR5KCkge1xuICAgIGlmICh0aGlzLl9fYmluZFZpc2liaWxpdHlfb25lT2Zfb3JfYWxsT2YoKSlcbiAgICAgIHJldHVybjtcbiAgICBsZXQgdmlzaWJsZUlmID0gdGhpcy5zY2hlbWEudmlzaWJsZUlmO1xuICAgIGlmICh0eXBlb2YgdmlzaWJsZUlmID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyh2aXNpYmxlSWYpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICB9IGVsc2UgaWYgKHZpc2libGVJZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgcHJvcGVydGllc0JpbmRpbmcgPSBbXTtcbiAgICAgIGZvciAobGV0IGRlcGVuZGVuY3lQYXRoIGluIHZpc2libGVJZikge1xuICAgICAgICBpZiAodmlzaWJsZUlmLmhhc093blByb3BlcnR5KGRlcGVuZGVuY3lQYXRoKSkge1xuICAgICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLmZpbmRQcm9wZXJ0aWVzKHRoaXMsIGRlcGVuZGVuY3lQYXRoKTtcbiAgICAgICAgICBpZiAoKHByb3BlcnRpZXMgfHwgW10pLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBvZiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlQ2hlY2sgPSBwcm9wZXJ0eS52YWx1ZUNoYW5nZXMucGlwZShtYXAoXG4gICAgICAgICAgICAgICAgICB2YWx1ZSA9PiB0aGlzLl9fZXZhbHVhdGVWaXNpYmlsaXR5SWYodGhpcywgcHJvcGVydHksIGRlcGVuZGVuY3lQYXRoLCB2YWx1ZSwgdmlzaWJsZUlmW2RlcGVuZGVuY3lQYXRoXSlcbiAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2aXNpYmlsaXR5Q2hlY2sgPSBwcm9wZXJ0eS5fdmlzaWJpbGl0eUNoYW5nZXM7XG4gICAgICAgICAgICAgICAgY29uc3QgYW5kID0gY29tYmluZUxhdGVzdChbdmFsdWVDaGVjaywgdmlzaWJpbGl0eUNoZWNrXSwgKHYxLCB2MikgPT4gdjEgJiYgdjIpO1xuICAgICAgICAgICAgICAgIHByb3BlcnRpZXNCaW5kaW5nLnB1c2goYW5kKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdDYW5cXCd0IGZpbmQgcHJvcGVydHkgJyArIGRlcGVuZGVuY3lQYXRoICsgJyBmb3IgdmlzaWJpbGl0eSBjaGVjayBvZiAnICsgdGhpcy5wYXRoKTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJNaXNzaW5nVmlzaWJpbGl0eUJpbmRpbmcoZGVwZW5kZW5jeVBhdGgsIHRoaXMpO1xuICAgICAgICAgICAgLy8gbm90IHZpc2libGUgaWYgbm90IGV4aXN0ZW50XG4gICAgICAgICAgICB0aGlzLnNldFZpc2libGUoZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb21iaW5lTGF0ZXN0KHByb3BlcnRpZXNCaW5kaW5nLCAoLi4udmFsdWVzOiBib29sZWFuW10pID0+IHtcbiAgICAgICAgcmV0dXJuIHZhbHVlcy5pbmRleE9mKHRydWUpICE9PSAtMTtcbiAgICAgIH0pLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSkuc3Vic2NyaWJlKCh2aXNpYmxlKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0VmlzaWJsZSh2aXNpYmxlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVnaXN0ZXJNaXNzaW5nVmlzaWJpbGl0eUJpbmRpbmcoZGVwZW5kZW5jeVBhdGg6IHN0cmluZywgZm9ybVByb3BlcnR5OiBGb3JtUHJvcGVydHkpIHtcbiAgICBmb3JtUHJvcGVydHkuX3Byb3BlcnR5QmluZGluZ1JlZ2lzdHJ5LmdldFByb3BlcnR5QmluZGluZ3NWaXNpYmlsaXR5KCkuYWRkKGRlcGVuZGVuY3lQYXRoLCBmb3JtUHJvcGVydHkucGF0aCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBGaW5kcyBhbGwgPGNvZGU+Zm9ybVByb3BlcnRpZXM8L2NvZGU+IGZyb20gYSBwYXRoIHdpdGggd2lsZGNhcmRzLjxici8+XG4gICAqIGUuZzogPGNvZGU+L2dhcmFnZS9jYXJzLyYjNDI7L3RpcmVzLyYjNDI7L25hbWU8L2NvZGU+PGJyLz5cbiAgICogQHBhcmFtIHRhcmdldFxuICAgKiBAcGFyYW0gcHJvcGVydHlQYXRoXG4gICAqL1xuICBmaW5kUHJvcGVydGllcyh0YXJnZXQ6IEZvcm1Qcm9wZXJ0eSwgcHJvcGVydHlQYXRoOiBzdHJpbmcpOiBGb3JtUHJvcGVydHlbXSB7XG4gICAgY29uc3QgcHJvcHM6IEZvcm1Qcm9wZXJ0eVtdID0gW107XG4gICAgY29uc3QgcGF0aHMgPSB0aGlzLmZpbmRQcm9wZXJ0eVBhdGhzKHRhcmdldCwgcHJvcGVydHlQYXRoKTtcbiAgICBmb3IgKGNvbnN0IHBhdGggb2YgcGF0aHMpIHtcbiAgICAgIGNvbnN0IHA6IEZvcm1Qcm9wZXJ0eSA9IHRhcmdldC5zZWFyY2hQcm9wZXJ0eShwYXRoKTtcbiAgICAgIGlmIChwKSB7XG4gICAgICAgIHByb3BzLnB1c2gocCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGNhbm9uaWNhbCBwYXRocyBmcm9tIGEgcGF0aCB3aXRoIHdpbGRjYXJkcy5cbiAgICogZS5nOjxici8+XG4gICAqIEZyb206PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLyYjNDI7L3RpcmVzLyYjNDI7L25hbWU8L2NvZGU+PGJyLz5cbiAgICogaXQgY3JlYXRlczo8YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvMC90aXJlcy8wL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLzAvdGlyZXMvMS9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8wL3RpcmVzLzIvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvMC90aXJlcy8zL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLzEvdGlyZXMvMC9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8yL3RpcmVzLzEvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8Y29kZT4vZ2FyYWdlL2NhcnMvMy90aXJlcy8yL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLzMvdGlyZXMvMy9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8mIzQyOy90aXJlcy8mIzQyOy9uYW1lPC9jb2RlPjxici8+XG4gICAqIDxjb2RlPi9nYXJhZ2UvY2Fycy8mIzQyOy90aXJlcy8yL25hbWU8L2NvZGU+PGJyLz5cbiAgICogPGNvZGU+L2dhcmFnZS9jYXJzLyYjNDI7L3RpcmVzLzMvbmFtZTwvY29kZT48YnIvPlxuICAgKiA8YnIvPmV0Yy4uLlxuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqIEBwYXJhbSBwYXRoXG4gICAqIEBwYXJhbSBwYXJlbnRQYXRoXG4gICAqL1xuICBmaW5kUHJvcGVydHlQYXRocyh0YXJnZXQ6IEZvcm1Qcm9wZXJ0eSwgcGF0aDogc3RyaW5nLCBwYXJlbnRQYXRoPzogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IGl4ID0gcGF0aC5pbmRleE9mKCcqJyk7XG4gICAgaWYgKC0xICE9PSBpeCkge1xuICAgICAgY29uc3QgcHJlUGF0aCA9IGl4ID4gLTEgPyBwYXRoLnN1YnN0cmluZygwLCBpeCAtIDEpIDogcGF0aDtcbiAgICAgIGNvbnN0IHN1YlBhdGggPSBpeCA+IC0xID8gcGF0aC5zdWJzdHJpbmcoaXggKyAxKSA6IHBhdGg7XG4gICAgICBjb25zdCBwcm9wOiBGb3JtUHJvcGVydHkgPSB0YXJnZXQuc2VhcmNoUHJvcGVydHkocHJlUGF0aCk7XG4gICAgICBsZXQgcGF0aEZvdW5kID0gW107XG4gICAgICBpZiAocHJvcCBpbnN0YW5jZW9mIFByb3BlcnR5R3JvdXApIHtcbiAgICAgICAgY29uc3QgYXJyUHJvcCA9IHByb3AucHJvcGVydGllcyBhcyBGb3JtUHJvcGVydHlbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJQcm9wLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgY3VycmVJdGVtUGF0aCA9IChwYXJlbnRQYXRoIHx8ICcnKSArIHByZVBhdGggKyAocHJlUGF0aC5lbmRzV2l0aCgnLycpID8gJycgOiAnLycpICsgaSArIHN1YlBhdGg7XG4gICAgICAgICAgY29uc3QgY3VycmVJdGVtUHJlUGF0aCA9IChwYXJlbnRQYXRoIHx8ICcnKSArIHByZVBhdGggKyBpO1xuICAgICAgICAgIGlmICgtMSA9PT0gY3VycmVJdGVtUGF0aC5pbmRleE9mKCcqJykpIHtcbiAgICAgICAgICAgIHBhdGhGb3VuZC5wdXNoKGN1cnJlSXRlbVBhdGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBjaGlsZHJlblBhdGhGb3VuZCA9IHRoaXMuZmluZFByb3BlcnR5UGF0aHMoYXJyUHJvcFtpXSwgc3ViUGF0aCwgY3VycmVJdGVtUHJlUGF0aCk7XG4gICAgICAgICAgcGF0aEZvdW5kID0gcGF0aEZvdW5kLmNvbmNhdChjaGlsZHJlblBhdGhGb3VuZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXRoRm91bmQ7XG4gICAgfVxuICAgIHJldHVybiBbcGF0aF07XG4gIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByb3BlcnR5R3JvdXAgZXh0ZW5kcyBGb3JtUHJvcGVydHkge1xuXG4gIF9wcm9wZXJ0aWVzOiBGb3JtUHJvcGVydHlbXSB8IHsgW2tleTogc3RyaW5nXTogRm9ybVByb3BlcnR5IH0gPSBudWxsO1xuXG4gIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzO1xuICB9XG5cbiAgc2V0IHByb3BlcnRpZXMocHJvcGVydGllczogRm9ybVByb3BlcnR5W10gfCB7IFtrZXk6IHN0cmluZ106IEZvcm1Qcm9wZXJ0eSB9KSB7XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhlIHNldHRlciB0byBhZGQgYW4gb2JzZXJ2ZXIgdGhhdCBub3RpY2VzIHdoZW4gYW4gaXRlbSBpcyBhZGRlZCBvciByZW1vdmVkLjxici8+XG4gICAgICovXG4gICAgdGhpcy5fcHJvcGVydGllcyA9IG5ldyBQcm94eShwcm9wZXJ0aWVzLCB0aGlzLl9wcm9wZXJ0eVByb3h5SGFuZGxlcik7XG4gIH1cbiAgXG4gIHByaXZhdGUgX3Byb3BlcnR5UHJveHlIYW5kbGVyID0gbmV3IEV4dGVuZGVkUHJveHlIYW5kbGVyKHRoaXMubG9nZ2VyKVxuXG4gIGdldFByb3BlcnR5KHBhdGg6IHN0cmluZykge1xuICAgIGxldCBzdWJQYXRoSWR4ID0gcGF0aC5pbmRleE9mKCcvJyk7XG4gICAgbGV0IHByb3BlcnR5SWQgPSBzdWJQYXRoSWR4ICE9PSAtMSA/IHBhdGguc3Vic3RyKDAsIHN1YlBhdGhJZHgpIDogcGF0aDtcblxuICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMucHJvcGVydGllc1twcm9wZXJ0eUlkXTtcbiAgICBpZiAocHJvcGVydHkgIT09IG51bGwgJiYgc3ViUGF0aElkeCAhPT0gLTEgJiYgcHJvcGVydHkgaW5zdGFuY2VvZiBQcm9wZXJ0eUdyb3VwKSB7XG4gICAgICBsZXQgc3ViUGF0aCA9IHBhdGguc3Vic3RyKHN1YlBhdGhJZHggKyAxKTtcbiAgICAgIHByb3BlcnR5ID0gKDxQcm9wZXJ0eUdyb3VwPnByb3BlcnR5KS5nZXRQcm9wZXJ0eShzdWJQYXRoKTtcbiAgICB9XG4gICAgcmV0dXJuIHByb3BlcnR5O1xuICB9XG5cbiAgcHVibGljIGZvckVhY2hDaGlsZChmbjogKGZvcm1Qcm9wZXJ0eTogRm9ybVByb3BlcnR5LCBzdHI6IFN0cmluZykgPT4gdm9pZCkge1xuICAgIGZvciAobGV0IHByb3BlcnR5SWQgaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG4gICAgICBpZiAodGhpcy5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHByb3BlcnR5SWQpKSB7XG4gICAgICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMucHJvcGVydGllc1twcm9wZXJ0eUlkXTtcbiAgICAgICAgZm4ocHJvcGVydHksIHByb3BlcnR5SWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBmb3JFYWNoQ2hpbGRSZWN1cnNpdmUoZm46IChmb3JtUHJvcGVydHk6IEZvcm1Qcm9wZXJ0eSkgPT4gdm9pZCkge1xuICAgIHRoaXMuZm9yRWFjaENoaWxkKChjaGlsZCkgPT4ge1xuICAgICAgZm4oY2hpbGQpO1xuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgUHJvcGVydHlHcm91cCkge1xuICAgICAgICAoPFByb3BlcnR5R3JvdXA+Y2hpbGQpLmZvckVhY2hDaGlsZFJlY3Vyc2l2ZShmbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgX2JpbmRWaXNpYmlsaXR5KCkge1xuICAgIHN1cGVyLl9iaW5kVmlzaWJpbGl0eSgpO1xuICAgIHRoaXMuX2JpbmRWaXNpYmlsaXR5UmVjdXJzaXZlKCk7XG4gIH1cblxuICBwcml2YXRlIF9iaW5kVmlzaWJpbGl0eVJlY3Vyc2l2ZSgpIHtcbiAgICB0aGlzLmZvckVhY2hDaGlsZFJlY3Vyc2l2ZSgocHJvcGVydHkpID0+IHtcbiAgICAgIHByb3BlcnR5Ll9iaW5kVmlzaWJpbGl0eSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGlzUm9vdCgpIHtcbiAgICByZXR1cm4gdGhpcyA9PT0gdGhpcy5yb290O1xuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIEV4dGVuZGVkUHJveHlIYW5kbGVyIGltcGxlbWVudHMgUHJveHlIYW5kbGVyPEZvcm1Qcm9wZXJ0eVtdIHwgeyBba2V5OiBzdHJpbmddOiBGb3JtUHJvcGVydHkgfT4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvZ2dlcjogTG9nU2VydmljZSkgeyB9XG4gIC8qKlxuICAgKiBXaGVuIGEgbmV3IGl0ZW0gaXMgYWRkZWQgaXQgd2lsbCBiZSBjaGVja2VkIGZvciB2aXNpYmlsaXR5IHVwZGF0ZXMgdG8gcHJvY2VlZCA8YnIvPlxuICAgKiBpZiBhbnkgb3RoZXIgZmllbGQgaGFzIGEgYmluZGluZyByZWZlcmVuY2UgdG8gaXQuPGJyLz5cbiAgICovXG4gIHNldCh0YXJnZXQ6IEZvcm1Qcm9wZXJ0eVtdIHwgeyBbcDogc3RyaW5nXTogRm9ybVByb3BlcnR5IH0sIHA6IFByb3BlcnR5S2V5LCB2YWx1ZTogYW55LCByZWNlaXZlcjogYW55KTogYm9vbGVhbiB7XG5cbiAgICAvKipcbiAgICAgKiAxKSBNYWtlIHN1cmUgYSBjYW5vbmljYWwgcGF0aCBpcyBzZXRcbiAgICAgKi9cbiAgICBjb25zdCBhc3NlcnRDYW5vbmljYWxQYXRoID0gKHByb3BlcnR5VmFsdWU6IGFueSkgPT4ge1xuICAgICAgY29uc3QgZm9ybVByb3BlcnR5ID0gcHJvcGVydHlWYWx1ZSBhcyBGb3JtUHJvcGVydHk7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmIHByb3BlcnR5VmFsdWUgaW5zdGFuY2VvZiBGb3JtUHJvcGVydHkpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBhIGNhbm9uaWNhbCBwYXRoIHJlcGxhY2luZyB0aGUgbGFzdCAnKicgd2l0aCB0aGUgZWxlbWVudHMgcG9zaXRpb24gaW4gYXJyYXlcbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5UGF0aFxuICAgICAgICAgKiBAcGFyYW0gaW5kZXhPZkNoaWxkXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBnZXRDYW5vbmljYWxQYXRoID0gKHByb3BlcnR5UGF0aDogc3RyaW5nLCBpbmRleE9mQ2hpbGQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGxldCBwb3M7XG4gICAgICAgICAgaWYgKHByb3BlcnR5UGF0aCAmJiAtMSAhPT0gKHBvcyA9IHByb3BlcnR5UGF0aC5sYXN0SW5kZXhPZignKicpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5UGF0aC5zdWJzdHJpbmcoMCwgcG9zKSArIGluZGV4T2ZDaGlsZC50b1N0cmluZygpICsgcHJvcGVydHlQYXRoLnN1YnN0cmluZyhwb3MgKyAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChmb3JtUHJvcGVydHkpIHtcbiAgICAgICAgICBmb3JtUHJvcGVydHkuX2Nhbm9uaWNhbFBhdGggPSBnZXRDYW5vbmljYWxQYXRoKGZvcm1Qcm9wZXJ0eS5fY2Fub25pY2FsUGF0aCwgcCBhcyBudW1iZXIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlY2FsY3VsYXRlQ2Fub25pY2FsUGF0aCA9IChmb3JtUHJvcGVydHk6IEZvcm1Qcm9wZXJ0eSkgPT4ge1xuICAgICAgICBpZiAoIShmb3JtUHJvcGVydHkgaW5zdGFuY2VvZiBQcm9wZXJ0eUdyb3VwKSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgY29uc3QgcHJvcGVydHlHcm91cCA9IGZvcm1Qcm9wZXJ0eSBhcyBQcm9wZXJ0eUdyb3VwO1xuICAgICAgICBjb25zdCBwcm9wZXJ0eUdyb3VwQ2hpbGRyZW4gPSAoQXJyYXkuaXNBcnJheShwcm9wZXJ0eUdyb3VwLnByb3BlcnRpZXMpID9cbiAgICAgICAgICBwcm9wZXJ0eUdyb3VwLnByb3BlcnRpZXMgOlxuICAgICAgICAgIE9iamVjdC52YWx1ZXMocHJvcGVydHlHcm91cC5wcm9wZXJ0aWVzIHx8IHt9KSkgYXMgRm9ybVByb3BlcnR5W107XG4gICAgICAgIGlmIChwcm9wZXJ0eUdyb3VwQ2hpbGRyZW4ubGVuZ3RoIHx8IChmb3JtUHJvcGVydHkucGF0aCB8fCAnJykuZW5kc1dpdGgoJy8qJykpIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBJZiBpdCBpcyBhbiBhcnJheSwgdGhlbiBhbGwgY2hpbGRyZW4gY2Fub25pY2FsIHBhdGhzIG11c3QgYmUgY29tcHV0ZWQgbm93LlxuICAgICAgICAgICAqIFRoZSBjaGlsZHJlbiBkb24ndCBoYXZlIHRoZSBwYXJlbnQncyBwYXRoIHNlZ21lbnQgc2V0IHlldCxcbiAgICAgICAgICAgKiBiZWNhdXNlIHRoZXkgYXJlIGNyZWF0ZWQgYmVmb3JlIHRoZSBwYXJlbnQgZ2V0cyBhdHRhY2hlZCB0byBpdHMgcGFyZW50LlxuICAgICAgICAgICAqL1xuICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgcHJvcGVydHlHcm91cENoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoY2hpbGQuX19jYW5vbmljYWxQYXRoLmluZGV4T2YoJyonKSkge1xuICAgICAgICAgICAgICBjb25zdCBwX3BhdGggPSBmb3JtUHJvcGVydHkuX2Nhbm9uaWNhbFBhdGguc3BsaXQoJy8nKVxuICAgICAgICAgICAgICBjaGlsZC5fY2Fub25pY2FsUGF0aCA9IHBfcGF0aC5jb25jYXQoY2hpbGQuX2Nhbm9uaWNhbFBhdGguc3BsaXQoJy8nKS5zcGxpY2UocF9wYXRoLmxlbmd0aCkpLmpvaW4oJy8nKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVjYWxjdWxhdGVDYW5vbmljYWxQYXRoKGNoaWxkKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVjYWxjdWxhdGVDYW5vbmljYWxQYXRoKGZvcm1Qcm9wZXJ0eSlcbiAgICAgIGNvbnN0IHByb3BlcnR5R3JvdXAgPSBmb3JtUHJvcGVydHkgYXMgUHJvcGVydHlHcm91cDtcbiAgICAgIGNvbnN0IHByb3BlcnR5R3JvdXBDaGlsZHJlbiA9IChBcnJheS5pc0FycmF5KHByb3BlcnR5R3JvdXAucHJvcGVydGllcykgP1xuICAgICAgcHJvcGVydHlHcm91cC5wcm9wZXJ0aWVzIDpcbiAgICAgIE9iamVjdC52YWx1ZXMocHJvcGVydHlHcm91cC5wcm9wZXJ0aWVzIHx8IHt9KSkgYXMgRm9ybVByb3BlcnR5W107XG4gICAgICByZXR1cm4geyBwcm9wZXJ0eTogZm9ybVByb3BlcnR5LCBjaGlsZHJlbjogcHJvcGVydHlHcm91cENoaWxkcmVuIH07XG4gICAgfTtcbiAgICBjb25zdCB7IHByb3BlcnR5LCBjaGlsZHJlbiB9ID0gYXNzZXJ0Q2Fub25pY2FsUGF0aCh2YWx1ZSk7XG5cbiAgICAvKipcbiAgICAgKiAyKSBBZGQgdGhlIG5ldyBwcm9wZXJ0eSBiZWZvcmUgcmViaW5kaW5nLCBzbyBpdCBjYW4gYmUgZm91bmQgYnkgPGNvZGU+X2JpbmRWaXNpYmlsaXR5PC9jb2RlPlxuICAgICAqL1xuICAgIGNvbnN0IHJlc3VsdCA9IHRhcmdldFtwIGFzIHN0cmluZ10gPSB2YWx1ZTtcblxuICAgIC8qKlxuICAgICAqIDMpIFJlLWJpbmQgdGhlIHZpc2liaWxpdHkgYmluZGluZ3MgcmVmZXJlbmNpbmcgdG8gdGhpcyBjYW5vbmljYWwgcGF0aHNcbiAgICAgKi9cbiAgICBjb25zdCByZWJpbmRWaXNpYmlsaXR5ID0gKCkgPT4ge1xuICAgICAgY29uc3QgcmViaW5kQWxsID0gW3Byb3BlcnR5XS5jb25jYXQoY2hpbGRyZW4pO1xuICAgICAgY29uc3QgZmluZFByb3BlcnRpZXNUb1JlYmluZCA9IChmb3JtUHJvcGVydHk6IEZvcm1Qcm9wZXJ0eSkgPT4ge1xuICAgICAgICBjb25zdCBwcm9wZXJ0eUJpbmRpbmdzID0gZm9ybVByb3BlcnR5Ll9wcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeS5nZXRQcm9wZXJ0eUJpbmRpbmdzVmlzaWJpbGl0eSgpO1xuICAgICAgICBsZXQgcmViaW5kOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBpZiAoZm9ybVByb3BlcnR5Ll9jYW5vbmljYWxQYXRoKSB7XG4gICAgICAgICAgcmViaW5kID0gcmViaW5kLmNvbmNhdChyZWJpbmQuY29uY2F0KHByb3BlcnR5QmluZGluZ3MuZmluZEJ5RGVwZW5kZW5jeVBhdGgoZm9ybVByb3BlcnR5Ll9jYW5vbmljYWxQYXRoKSB8fCBbXSkpO1xuICAgICAgICAgIGlmIChmb3JtUHJvcGVydHkuX2Nhbm9uaWNhbFBhdGguc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICByZWJpbmQgPSByZWJpbmQuY29uY2F0KHJlYmluZC5jb25jYXQocHJvcGVydHlCaW5kaW5ncy5maW5kQnlEZXBlbmRlbmN5UGF0aChmb3JtUHJvcGVydHkuX2Nhbm9uaWNhbFBhdGguc3Vic3RyaW5nKDEpKSB8fCBbXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZWJpbmQgPSByZWJpbmQuY29uY2F0KHByb3BlcnR5QmluZGluZ3MuZmluZEJ5RGVwZW5kZW5jeVBhdGgoZm9ybVByb3BlcnR5LnBhdGgpIHx8IFtdKTtcbiAgICAgICAgaWYgKGZvcm1Qcm9wZXJ0eS5wYXRoLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgICAgIHJlYmluZCA9IHJlYmluZC5jb25jYXQocmViaW5kLmNvbmNhdChwcm9wZXJ0eUJpbmRpbmdzLmZpbmRCeURlcGVuZGVuY3lQYXRoKGZvcm1Qcm9wZXJ0eS5wYXRoLnN1YnN0cmluZygxKSkgfHwgW10pKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1bmlxdWVWYWx1ZXMgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHJlYmluZCkge1xuICAgICAgICAgIHVuaXF1ZVZhbHVlc1tpdGVtXSA9IGl0ZW07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHVuaXF1ZVZhbHVlcyk7XG4gICAgICB9O1xuICAgICAgZm9yIChjb25zdCBfcHJvcGVydHkgb2YgcmViaW5kQWxsKSB7XG4gICAgICAgIGlmIChfcHJvcGVydHkgaW5zdGFuY2VvZiBGb3JtUHJvcGVydHkpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmViaW5kUGF0aHMgPSBmaW5kUHJvcGVydGllc1RvUmViaW5kKF9wcm9wZXJ0eSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJlYmluZFByb3BQYXRoIG9mIHJlYmluZFBhdGhzKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlYmluZFByb3AgPSBfcHJvcGVydHkuc2VhcmNoUHJvcGVydHkocmViaW5kUHJvcFBhdGgpO1xuICAgICAgICAgICAgICBpZiAoIXJlYmluZFByb3ApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdDYW5cXCd0IGZpbmQgcHJvcGVydHkgdG8gcmViaW5kIHZpc2liaWxpdHkgYXQgcGF0aDonLCBfcHJvcGVydHkucGF0aCwgJ3Byb3BlcnR5OicsIF9wcm9wZXJ0eSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmViaW5kUHJvcC5fYmluZFZpc2liaWxpdHkoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKCdSZWJpbmRpbmcgdmlzaWJpbGl0eSBlcnJvciBhdCBwYXRoOicsIF9wcm9wZXJ0eS5wYXRoLCAncHJvcGVydHk6JywgX3Byb3BlcnR5LCBlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHJlYmluZFZpc2liaWxpdHkoKTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZ2V0KHRhcmdldDogRm9ybVByb3BlcnR5W10gfCB7IFtwOiBzdHJpbmddOiBGb3JtUHJvcGVydHkgfSwgcDogUHJvcGVydHlLZXksIHJlY2VpdmVyOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0YXJnZXRbcCBhcyBzdHJpbmddO1xuICB9XG4gIGRlbGV0ZVByb3BlcnR5KHRhcmdldDogRm9ybVByb3BlcnR5W10gfCB7IFtwOiBzdHJpbmddOiBGb3JtUHJvcGVydHkgfSwgcDogUHJvcGVydHlLZXkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZGVsZXRlIHRhcmdldFtwIGFzIHN0cmluZ107XG4gIH1cbn1cbiJdfQ==