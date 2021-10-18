import { PropertyGroup } from './formproperty';
import { PROPERTY_TYPE_MAPPING } from './typemapping';
import { FieldType } from '../template-schema/field/field';
export class FormPropertyFactory {
    constructor(schemaValidatorFactory, validatorRegistry, propertyBindingRegistry, expressionCompilerFactory, logger) {
        this.schemaValidatorFactory = schemaValidatorFactory;
        this.validatorRegistry = validatorRegistry;
        this.propertyBindingRegistry = propertyBindingRegistry;
        this.expressionCompilerFactory = expressionCompilerFactory;
        this.logger = logger;
    }
    createProperty(schema, parent = null, propertyId) {
        let newProperty = null;
        let path = '';
        let _canonicalPath = '';
        if (parent) {
            path += parent.path;
            if (parent.parent !== null) {
                path += '/';
                _canonicalPath += '/';
            }
            if (parent.type === 'object') {
                path += propertyId;
                _canonicalPath += propertyId;
            }
            else if (parent.type === 'array') {
                path += '*';
                _canonicalPath += '*';
            }
            else {
                throw 'Instanciation of a FormProperty with an unknown parent type: ' + parent.type;
            }
            _canonicalPath = (parent._canonicalPath || parent.path) + _canonicalPath;
        }
        else {
            path = '/';
            _canonicalPath = '/';
        }
        if (schema.$ref) {
            const refSchema = this.schemaValidatorFactory.getSchema(parent.root.schema, schema.$ref);
            newProperty = this.createProperty(refSchema, parent, path);
        }
        else {
            const type = this.isUnionType(schema.type)
                && this.isValidNullableUnionType(schema.type)
                && this.isAllowedToUsingNullableUnionTypeBySchemaContext(schema)
                ? this.extractTypeFromNullableUnionType(schema.type)
                : schema.type;
            if (PROPERTY_TYPE_MAPPING[type]) {
                if (type === 'object' || type === 'array') {
                    newProperty = PROPERTY_TYPE_MAPPING[type](this.schemaValidatorFactory, this.validatorRegistry, this.expressionCompilerFactory, schema, parent, path, this, this.logger);
                }
                else {
                    newProperty = PROPERTY_TYPE_MAPPING[type](this.schemaValidatorFactory, this.validatorRegistry, this.expressionCompilerFactory, schema, parent, path, this.logger);
                }
            }
            else {
                throw new TypeError(`Undefined type ${type} (existing: ${Object.keys(PROPERTY_TYPE_MAPPING)})`);
            }
        }
        newProperty._propertyBindingRegistry = this.propertyBindingRegistry;
        newProperty._canonicalPath = _canonicalPath;
        if (newProperty instanceof PropertyGroup) {
            this.initializeRoot(newProperty);
        }
        return newProperty;
    }
    initializeRoot(rootProperty) {
        rootProperty.reset(null, true);
        rootProperty._bindVisibility();
    }
    isUnionType(unionType) {
        return Array.isArray(unionType) && unionType.length > 1;
    }
    isValidNullableUnionType(unionType) {
        if (!unionType.some(subType => subType === 'null')) {
            throw new TypeError(`Unsupported union type ${unionType}. Supports only nullable union types, for example ["string", "null"]`);
        }
        if (unionType.length !== 2) {
            throw new TypeError(`Unsupported count of types in nullable union type ${unionType}. Supports only two types one of the which should be "null"`);
        }
        const type = this.extractTypeFromNullableUnionType(unionType);
        if (!type || [FieldType.Object, FieldType.Array].includes(type)) {
            throw new TypeError(`Unsupported second type ${type} for nullable union. Allowed types are "${FieldType.Number}", "${FieldType.Integer}", "${FieldType.Boolean}", "${FieldType.String}"`);
        }
        return true;
    }
    extractTypeFromNullableUnionType(unionType) {
        var _a;
        return (_a = unionType.filter(type => type !== 'null')) === null || _a === void 0 ? void 0 : _a[0];
    }
    isAllowedToUsingNullableUnionTypeBySchemaContext(schema) {
        if (!schema.oneOf) {
            throw new TypeError(`Unsupported using of nullable union type without "oneOf" attribute`);
        }
        return true;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXByb3BlcnR5ZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NjaGVtYS1mb3JtL3NyYy9saWIvbW9kZWwvZm9ybXByb3BlcnR5ZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLGFBQWEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSzdELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd0RCxPQUFPLEVBQXNCLFNBQVMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRS9FLE1BQU0sT0FBTyxtQkFBbUI7SUFFOUIsWUFBb0Isc0JBQThDLEVBQVUsaUJBQW9DLEVBQzVGLHVCQUFnRCxFQUNoRCx5QkFBb0QsRUFDcEQsTUFBa0I7UUFIbEIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDNUYsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUNoRCw4QkFBeUIsR0FBekIseUJBQXlCLENBQTJCO1FBQ3BELFdBQU0sR0FBTixNQUFNLENBQVk7SUFDdEMsQ0FBQztJQUVELGNBQWMsQ0FBQyxNQUFlLEVBQUUsU0FBd0IsSUFBSSxFQUFFLFVBQW1CO1FBQy9FLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQztZQUNwQixJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO2dCQUMxQixJQUFJLElBQUksR0FBRyxDQUFDO2dCQUNaLGNBQWMsSUFBSSxHQUFHLENBQUM7YUFDdkI7WUFDRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUM1QixJ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cGVydHksIFByb3BlcnR5R3JvdXAgfSBmcm9tICcuL2Zvcm1wcm9wZXJ0eSc7XG5pbXBvcnQgeyBTY2hlbWFWYWxpZGF0b3JGYWN0b3J5IH0gZnJvbSAnLi4vc2NoZW1hdmFsaWRhdG9yZmFjdG9yeSc7XG5pbXBvcnQgeyBWYWxpZGF0b3JSZWdpc3RyeSB9IGZyb20gJy4vdmFsaWRhdG9ycmVnaXN0cnknO1xuaW1wb3J0IHsgUHJvcGVydHlCaW5kaW5nUmVnaXN0cnkgfSBmcm9tICcuLi9wcm9wZXJ0eS1iaW5kaW5nLXJlZ2lzdHJ5JztcbmltcG9ydCB7IEV4cHJlc3Npb25Db21waWxlckZhY3RvcnkgfSBmcm9tICcuLi9leHByZXNzaW9uLWNvbXBpbGVyLWZhY3RvcnknO1xuaW1wb3J0IHsgUFJPUEVSVFlfVFlQRV9NQVBQSU5HIH0gZnJvbSAnLi90eXBlbWFwcGluZyc7XG5pbXBvcnQgeyBJU2NoZW1hLCBUU2NoZW1hUHJvcGVydHlUeXBlIH0gZnJvbSAnLi9JU2NoZW1hJztcbmltcG9ydCB7IExvZ1NlcnZpY2UgfSBmcm9tICcuLi9sb2cuc2VydmljZSc7XG5pbXBvcnQgeyBUTnVsbGFibGVGaWVsZFR5cGUsIEZpZWxkVHlwZSB9IGZyb20gJy4uL3RlbXBsYXRlLXNjaGVtYS9maWVsZC9maWVsZCc7XG5cbmV4cG9ydCBjbGFzcyBGb3JtUHJvcGVydHlGYWN0b3J5IHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNjaGVtYVZhbGlkYXRvckZhY3Rvcnk6IFNjaGVtYVZhbGlkYXRvckZhY3RvcnksIHByaXZhdGUgdmFsaWRhdG9yUmVnaXN0cnk6IFZhbGlkYXRvclJlZ2lzdHJ5LFxuICAgICAgICAgICAgICBwcml2YXRlIHByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5OiBQcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBleHByZXNzaW9uQ29tcGlsZXJGYWN0b3J5OiBFeHByZXNzaW9uQ29tcGlsZXJGYWN0b3J5LFxuICAgICAgICAgICAgICBwcml2YXRlIGxvZ2dlcjogTG9nU2VydmljZSkge1xuICB9XG5cbiAgY3JlYXRlUHJvcGVydHkoc2NoZW1hOiBJU2NoZW1hLCBwYXJlbnQ6IFByb3BlcnR5R3JvdXAgPSBudWxsLCBwcm9wZXJ0eUlkPzogc3RyaW5nKTogRm9ybVByb3BlcnR5IHtcbiAgICBsZXQgbmV3UHJvcGVydHkgPSBudWxsO1xuICAgIGxldCBwYXRoID0gJyc7XG4gICAgbGV0IF9jYW5vbmljYWxQYXRoID0gJyc7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgcGF0aCArPSBwYXJlbnQucGF0aDtcbiAgICAgIGlmIChwYXJlbnQucGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHBhdGggKz0gJy8nO1xuICAgICAgICBfY2Fub25pY2FsUGF0aCArPSAnLyc7XG4gICAgICB9XG4gICAgICBpZiAocGFyZW50LnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHBhdGggKz0gcHJvcGVydHlJZDtcbiAgICAgICAgX2Nhbm9uaWNhbFBhdGggKz0gcHJvcGVydHlJZDtcbiAgICAgIH0gZWxzZSBpZiAocGFyZW50LnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgICAgcGF0aCArPSAnKic7XG4gICAgICAgIF9jYW5vbmljYWxQYXRoICs9ICcqJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93ICdJbnN0YW5jaWF0aW9uIG9mIGEgRm9ybVByb3BlcnR5IHdpdGggYW4gdW5rbm93biBwYXJlbnQgdHlwZTogJyArIHBhcmVudC50eXBlO1xuICAgICAgfVxuICAgICAgX2Nhbm9uaWNhbFBhdGggPSAocGFyZW50Ll9jYW5vbmljYWxQYXRoIHx8IHBhcmVudC5wYXRoKSArIF9jYW5vbmljYWxQYXRoO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXRoID0gJy8nO1xuICAgICAgX2Nhbm9uaWNhbFBhdGggPSAnLyc7XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYS4kcmVmKSB7XG4gICAgICBjb25zdCByZWZTY2hlbWEgPSB0aGlzLnNjaGVtYVZhbGlkYXRvckZhY3RvcnkuZ2V0U2NoZW1hKHBhcmVudC5yb290LnNjaGVtYSwgc2NoZW1hLiRyZWYpO1xuICAgICAgbmV3UHJvcGVydHkgPSB0aGlzLmNyZWF0ZVByb3BlcnR5KHJlZlNjaGVtYSwgcGFyZW50LCBwYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdHlwZTogRmllbGRUeXBlID0gdGhpcy5pc1VuaW9uVHlwZShzY2hlbWEudHlwZSlcbiAgICAgICAgJiYgdGhpcy5pc1ZhbGlkTnVsbGFibGVVbmlvblR5cGUoc2NoZW1hLnR5cGUgYXMgVE51bGxhYmxlRmllbGRUeXBlKVxuICAgICAgICAmJiB0aGlzLmlzQWxsb3dlZFRvVXNpbmdOdWxsYWJsZVVuaW9uVHlwZUJ5U2NoZW1hQ29udGV4dChzY2hlbWEpXG4gICAgICAgICAgPyB0aGlzLmV4dHJhY3RUeXBlRnJvbU51bGxhYmxlVW5pb25UeXBlKHNjaGVtYS50eXBlIGFzIFROdWxsYWJsZUZpZWxkVHlwZSlcbiAgICAgICAgICA6ICBzY2hlbWEudHlwZSBhcyBGaWVsZFR5cGU7XG5cbiAgICAgIGlmIChQUk9QRVJUWV9UWVBFX01BUFBJTkdbdHlwZV0pIHtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdvYmplY3QnIHx8IHR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgICAgICBuZXdQcm9wZXJ0eSA9IFBST1BFUlRZX1RZUEVfTUFQUElOR1t0eXBlXShcbiAgICAgICAgICB0aGlzLnNjaGVtYVZhbGlkYXRvckZhY3RvcnksIHRoaXMudmFsaWRhdG9yUmVnaXN0cnksIHRoaXMuZXhwcmVzc2lvbkNvbXBpbGVyRmFjdG9yeSwgc2NoZW1hLCBwYXJlbnQsIHBhdGgsIHRoaXMsIHRoaXMubG9nZ2VyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdQcm9wZXJ0eSA9IFBST1BFUlRZX1RZUEVfTUFQUElOR1t0eXBlXShcbiAgICAgICAgICB0aGlzLnNjaGVtYVZhbGlkYXRvckZhY3RvcnksIHRoaXMudmFsaWRhdG9yUmVnaXN0cnksIHRoaXMuZXhwcmVzc2lvbkNvbXBpbGVyRmFjdG9yeSwgc2NoZW1hLCBwYXJlbnQsIHBhdGgsIHRoaXMubG9nZ2VyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVW5kZWZpbmVkIHR5cGUgJHt0eXBlfSAoZXhpc3Rpbmc6ICR7T2JqZWN0LmtleXMoUFJPUEVSVFlfVFlQRV9NQVBQSU5HKX0pYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbmV3UHJvcGVydHkuX3Byb3BlcnR5QmluZGluZ1JlZ2lzdHJ5ID0gdGhpcy5wcm9wZXJ0eUJpbmRpbmdSZWdpc3RyeTtcbiAgICBuZXdQcm9wZXJ0eS5fY2Fub25pY2FsUGF0aCA9IF9jYW5vbmljYWxQYXRoO1xuXG4gICAgaWYgKG5ld1Byb3BlcnR5IGluc3RhbmNlb2YgUHJvcGVydHlHcm91cCkge1xuICAgICAgdGhpcy5pbml0aWFsaXplUm9vdChuZXdQcm9wZXJ0eSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1Byb3BlcnR5O1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplUm9vdChyb290UHJvcGVydHk6IFByb3BlcnR5R3JvdXApIHtcbiAgICByb290UHJvcGVydHkucmVzZXQobnVsbCwgdHJ1ZSk7XG4gICAgcm9vdFByb3BlcnR5Ll9iaW5kVmlzaWJpbGl0eSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1VuaW9uVHlwZSh1bmlvblR5cGU6IFRTY2hlbWFQcm9wZXJ0eVR5cGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh1bmlvblR5cGUpICYmIHVuaW9uVHlwZS5sZW5ndGggPiAxO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1ZhbGlkTnVsbGFibGVVbmlvblR5cGUodW5pb25UeXBlOiBUTnVsbGFibGVGaWVsZFR5cGUpOiBib29sZWFuIHtcbiAgICBpZiAoIXVuaW9uVHlwZS5zb21lKHN1YlR5cGUgPT4gc3ViVHlwZSA9PT0gJ251bGwnKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVW5zdXBwb3J0ZWQgdW5pb24gdHlwZSAke3VuaW9uVHlwZX0uIFN1cHBvcnRzIG9ubHkgbnVsbGFibGUgdW5pb24gdHlwZXMsIGZvciBleGFtcGxlIFtcInN0cmluZ1wiLCBcIm51bGxcIl1gKTtcbiAgICB9XG5cbiAgICBpZiAodW5pb25UeXBlLmxlbmd0aCAhPT0gMikge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVW5zdXBwb3J0ZWQgY291bnQgb2YgdHlwZXMgaW4gbnVsbGFibGUgdW5pb24gdHlwZSAke3VuaW9uVHlwZX0uIFN1cHBvcnRzIG9ubHkgdHdvIHR5cGVzIG9uZSBvZiB0aGUgd2hpY2ggc2hvdWxkIGJlIFwibnVsbFwiYCk7XG4gICAgfVxuXG4gICAgY29uc3QgdHlwZSA9IHRoaXMuZXh0cmFjdFR5cGVGcm9tTnVsbGFibGVVbmlvblR5cGUodW5pb25UeXBlKTtcblxuICAgIGlmICghdHlwZSB8fCBbRmllbGRUeXBlLk9iamVjdCwgRmllbGRUeXBlLkFycmF5XS5pbmNsdWRlcyh0eXBlKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVW5zdXBwb3J0ZWQgc2Vjb25kIHR5cGUgJHt0eXBlfSBmb3IgbnVsbGFibGUgdW5pb24uIEFsbG93ZWQgdHlwZXMgYXJlIFwiJHtGaWVsZFR5cGUuTnVtYmVyfVwiLCBcIiR7RmllbGRUeXBlLkludGVnZXJ9XCIsIFwiJHtGaWVsZFR5cGUuQm9vbGVhbn1cIiwgXCIke0ZpZWxkVHlwZS5TdHJpbmd9XCJgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdFR5cGVGcm9tTnVsbGFibGVVbmlvblR5cGUodW5pb25UeXBlOiBUTnVsbGFibGVGaWVsZFR5cGUpOiBGaWVsZFR5cGUgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB1bmlvblR5cGUuZmlsdGVyKHR5cGUgPT4gdHlwZSAhPT0gJ251bGwnKT8uWzBdIGFzIEZpZWxkVHlwZSB8IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgaXNBbGxvd2VkVG9Vc2luZ051bGxhYmxlVW5pb25UeXBlQnlTY2hlbWFDb250ZXh0KHNjaGVtYTogSVNjaGVtYSk6IGJvb2xlYW4ge1xuICAgIGlmICghc2NoZW1hLm9uZU9mKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBVbnN1cHBvcnRlZCB1c2luZyBvZiBudWxsYWJsZSB1bmlvbiB0eXBlIHdpdGhvdXQgXCJvbmVPZlwiIGF0dHJpYnV0ZWApO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iXX0=