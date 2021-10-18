import ZSchema from 'z-schema';
import { Injectable } from '@angular/core';
import { FieldType } from './template-schema/field/field';
export class SchemaValidatorFactory {
    /**
     * Override this method to reset the schema validator instance.<br/>
     * This may be required since some schema validators keep a deep copy<br/>
     * of your schemas and changes at runtime are not recognized by the schema validator.<br/>
     * In this method you should either re-instantiate the schema validator or
     * clear its cache.<br/>
     * Example of re-instantiating schema validator
     * <code>
     *     reset(){
     *         this.zschema = new ZSchema({})
     *     }
     * </code>
     * <br/>
     * Since this method it self does nothing there is <br/>
     * no need to call the <code>super.reset()</code>
     */
    reset() {
    }
}
export class ZSchemaValidatorFactory extends SchemaValidatorFactory {
    constructor() {
        super();
        this.createSchemaValidator();
    }
    createSchemaValidator() {
        this.zschema = new ZSchema({
            breakOnFirstError: false
        });
    }
    reset() {
        this.createSchemaValidator();
    }
    createValidatorFn(schema) {
        return (value) => {
            if (schema.type === FieldType.Number || schema.type === FieldType.Integer) {
                value = +value;
            }
            this.zschema.validate(value, schema);
            // tslint:disable-next-line:prefer-const
            let err = this.zschema.getLastErrors();
            this.denormalizeRequiredPropertyPaths(err);
            return err || null;
        };
    }
    getSchema(schema, ref) {
        // check definitions are valid
        const isValid = this.zschema.compileSchema(schema);
        if (isValid) {
            return this.getDefinition(schema, ref);
        }
        else {
            throw this.zschema.getLastError();
        }
    }
    denormalizeRequiredPropertyPaths(err) {
        if (err && err.length) {
            err = err.map(error => {
                if (error.path === '#/' && error.code === 'OBJECT_MISSING_REQUIRED_PROPERTY') {
                    error.path = `${error.path}${error.params[0]}`;
                }
                return error;
            });
        }
    }
    getDefinition(schema, ref) {
        let foundSchema = schema;
        ref.split('/').slice(1).forEach(ptr => {
            if (ptr) {
                foundSchema = foundSchema[ptr];
            }
        });
        return foundSchema;
    }
}
ZSchemaValidatorFactory.decorators = [
    { type: Injectable }
];
ZSchemaValidatorFactory.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hdmFsaWRhdG9yZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3NjaGVtYS1mb3JtL3NyYy9saWIvc2NoZW1hdmFsaWRhdG9yZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDL0IsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFFeEQsTUFBTSxPQUFnQixzQkFBc0I7SUFLMUM7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsS0FBSztJQUVMLENBQUM7Q0FDRjtBQUdELE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxzQkFBc0I7SUFJakU7UUFDRSxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFTyxxQkFBcUI7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBSSxJQUFJLE9BQU8sQ0FBQztZQUMxQixpQkFBaUIsRUFBRSxLQUFLO1NBQ3pCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELGlCQUFpQixDQUFDLE1BQWU7UUFDL0IsT0FBTyxDQUFDLEtBQUssRUFBOEIsRUFBRTtZQUUzQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3pFLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQzthQUNoQjtZQUVELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNyQyx3Q0FBd0M7WUFDeEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUV2QyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFM0MsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDO1FBQ3JCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxTQUFTLENBQUMsTUFBVyxFQUFFLEdBQVc7UUFDaEMsOEJBQThCO1FBQzlCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELElBQUksT0FBTyxFQUFFO1lBQ1gsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN4QzthQUFNO1lBQ0wsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ25DO0lBQ0gsQ0FBQztJQUVPLGdDQUFnQyxDQUFDLEdBQVU7UUFDakQsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUNyQixHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDcEIsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGtDQUFrQyxFQUFFO29CQUM1RSxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7aUJBQ2hEO2dCQUNELE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFTyxhQUFhLENBQUMsTUFBVyxFQUFFLEdBQVc7UUFDNUMsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNwQyxJQUFJLEdBQUcsRUFBRTtnQkFDUCxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2hDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDOzs7WUFsRUYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBaU2NoZW1hIGZyb20gJ3otc2NoZW1hJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0lTY2hlbWF9IGZyb20gJy4vbW9kZWwvSVNjaGVtYSc7XG5pbXBvcnQge0ZpZWxkVHlwZX0gZnJvbSAnLi90ZW1wbGF0ZS1zY2hlbWEvZmllbGQvZmllbGQnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU2NoZW1hVmFsaWRhdG9yRmFjdG9yeSB7XG4gIGFic3RyYWN0IGNyZWF0ZVZhbGlkYXRvckZuKHNjaGVtYSk6ICh2YWx1ZTogYW55KSA9PiBhbnk7XG5cbiAgYWJzdHJhY3QgZ2V0U2NoZW1hKHNjaGVtYSwgcmVmKTogYW55O1xuXG4gIC8qKlxuICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCB0byByZXNldCB0aGUgc2NoZW1hIHZhbGlkYXRvciBpbnN0YW5jZS48YnIvPlxuICAgKiBUaGlzIG1heSBiZSByZXF1aXJlZCBzaW5jZSBzb21lIHNjaGVtYSB2YWxpZGF0b3JzIGtlZXAgYSBkZWVwIGNvcHk8YnIvPlxuICAgKiBvZiB5b3VyIHNjaGVtYXMgYW5kIGNoYW5nZXMgYXQgcnVudGltZSBhcmUgbm90IHJlY29nbml6ZWQgYnkgdGhlIHNjaGVtYSB2YWxpZGF0b3IuPGJyLz5cbiAgICogSW4gdGhpcyBtZXRob2QgeW91IHNob3VsZCBlaXRoZXIgcmUtaW5zdGFudGlhdGUgdGhlIHNjaGVtYSB2YWxpZGF0b3Igb3JcbiAgICogY2xlYXIgaXRzIGNhY2hlLjxici8+XG4gICAqIEV4YW1wbGUgb2YgcmUtaW5zdGFudGlhdGluZyBzY2hlbWEgdmFsaWRhdG9yXG4gICAqIDxjb2RlPlxuICAgKiAgICAgcmVzZXQoKXtcbiAgICogICAgICAgICB0aGlzLnpzY2hlbWEgPSBuZXcgWlNjaGVtYSh7fSlcbiAgICogICAgIH1cbiAgICogPC9jb2RlPlxuICAgKiA8YnIvPlxuICAgKiBTaW5jZSB0aGlzIG1ldGhvZCBpdCBzZWxmIGRvZXMgbm90aGluZyB0aGVyZSBpcyA8YnIvPlxuICAgKiBubyBuZWVkIHRvIGNhbGwgdGhlIDxjb2RlPnN1cGVyLnJlc2V0KCk8L2NvZGU+XG4gICAqL1xuICByZXNldCgpIHtcblxuICB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBaU2NoZW1hVmFsaWRhdG9yRmFjdG9yeSBleHRlbmRzIFNjaGVtYVZhbGlkYXRvckZhY3Rvcnkge1xuXG4gIHByb3RlY3RlZCB6c2NoZW1hO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jcmVhdGVTY2hlbWFWYWxpZGF0b3IoKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlU2NoZW1hVmFsaWRhdG9yKCkge1xuICAgIHRoaXMuenNjaGVtYSA9ICBuZXcgWlNjaGVtYSh7XG4gICAgICBicmVha09uRmlyc3RFcnJvcjogZmFsc2VcbiAgICB9KTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuY3JlYXRlU2NoZW1hVmFsaWRhdG9yKCk7XG4gIH1cblxuICBjcmVhdGVWYWxpZGF0b3JGbihzY2hlbWE6IElTY2hlbWEpIHtcbiAgICByZXR1cm4gKHZhbHVlKTogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gPT4ge1xuXG4gICAgICBpZiAoc2NoZW1hLnR5cGUgPT09IEZpZWxkVHlwZS5OdW1iZXIgfHwgc2NoZW1hLnR5cGUgPT09IEZpZWxkVHlwZS5JbnRlZ2VyKSB7XG4gICAgICAgIHZhbHVlID0gK3ZhbHVlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnpzY2hlbWEudmFsaWRhdGUodmFsdWUsIHNjaGVtYSk7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWNvbnN0XG4gICAgICBsZXQgZXJyID0gdGhpcy56c2NoZW1hLmdldExhc3RFcnJvcnMoKTtcblxuICAgICAgdGhpcy5kZW5vcm1hbGl6ZVJlcXVpcmVkUHJvcGVydHlQYXRocyhlcnIpO1xuXG4gICAgICByZXR1cm4gZXJyIHx8IG51bGw7XG4gICAgfTtcbiAgfVxuXG4gIGdldFNjaGVtYShzY2hlbWE6IGFueSwgcmVmOiBzdHJpbmcpIHtcbiAgICAvLyBjaGVjayBkZWZpbml0aW9ucyBhcmUgdmFsaWRcbiAgICBjb25zdCBpc1ZhbGlkID0gdGhpcy56c2NoZW1hLmNvbXBpbGVTY2hlbWEoc2NoZW1hKTtcbiAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0RGVmaW5pdGlvbihzY2hlbWEsIHJlZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IHRoaXMuenNjaGVtYS5nZXRMYXN0RXJyb3IoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlbm9ybWFsaXplUmVxdWlyZWRQcm9wZXJ0eVBhdGhzKGVycjogYW55W10pIHtcbiAgICBpZiAoZXJyICYmIGVyci5sZW5ndGgpIHtcbiAgICAgIGVyciA9IGVyci5tYXAoZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IucGF0aCA9PT0gJyMvJyAmJiBlcnJvci5jb2RlID09PSAnT0JKRUNUX01JU1NJTkdfUkVRVUlSRURfUFJPUEVSVFknKSB7XG4gICAgICAgICAgZXJyb3IucGF0aCA9IGAke2Vycm9yLnBhdGh9JHtlcnJvci5wYXJhbXNbMF19YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldERlZmluaXRpb24oc2NoZW1hOiBhbnksIHJlZjogc3RyaW5nKSB7XG4gICAgbGV0IGZvdW5kU2NoZW1hID0gc2NoZW1hO1xuICAgIHJlZi5zcGxpdCgnLycpLnNsaWNlKDEpLmZvckVhY2gocHRyID0+IHtcbiAgICAgIGlmIChwdHIpIHtcbiAgICAgICAgZm91bmRTY2hlbWEgPSBmb3VuZFNjaGVtYVtwdHJdO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmb3VuZFNjaGVtYTtcbiAgfVxufVxuXG4iXX0=