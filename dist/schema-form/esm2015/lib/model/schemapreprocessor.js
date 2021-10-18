import { isBlank } from './utils';
import { Injectable } from '@angular/core';
import { FieldType } from '../template-schema/field/field';
function formatMessage(message, path) {
    return `Parsing error on ${path}: ${message}`;
}
function schemaError(message, path) {
    let mesg = formatMessage(message, path);
    throw new Error(mesg);
}
function schemaWarning(message, path) {
    let mesg = formatMessage(message, path);
    throw new Error(mesg);
}
export class SchemaPreprocessor {
    static preprocess(jsonSchema, path = '/') {
        jsonSchema = jsonSchema || {};
        SchemaPreprocessor.normalizeExtensions(jsonSchema);
        if (jsonSchema.type === 'object') {
            SchemaPreprocessor.checkProperties(jsonSchema, path);
            SchemaPreprocessor.checkAndCreateFieldsets(jsonSchema, path);
        }
        else if (jsonSchema.type === 'array') {
            SchemaPreprocessor.checkItems(jsonSchema, path);
        }
        SchemaPreprocessor.normalizeWidget(jsonSchema);
        SchemaPreprocessor.recursiveCheck(jsonSchema, path);
    }
    static checkProperties(jsonSchema, path) {
        if (isBlank(jsonSchema.properties)) {
            jsonSchema.properties = {};
            schemaWarning('Provided json schema does not contain a \'properties\' entry. Output schema will be empty', path);
        }
    }
    static checkAndCreateFieldsets(jsonSchema, path) {
        if (jsonSchema.fieldsets === undefined) {
            if (jsonSchema.order !== undefined) {
                SchemaPreprocessor.replaceOrderByFieldsets(jsonSchema);
            }
            else {
                SchemaPreprocessor.createFieldsets(jsonSchema);
            }
        }
        SchemaPreprocessor.checkFieldsUsage(jsonSchema, path);
    }
    static checkFieldsUsage(jsonSchema, path) {
        let fieldsId = Object.keys(jsonSchema.properties);
        let usedFields = {};
        for (let fieldset of jsonSchema.fieldsets) {
            for (let fieldId of fieldset.fields) {
                if (usedFields[fieldId] === undefined) {
                    usedFields[fieldId] = [];
                }
                usedFields[fieldId].push(fieldset.id);
            }
        }
        for (const fieldId of fieldsId) {
            const isRequired = jsonSchema.required && jsonSchema.required.indexOf(fieldId) > -1;
            if (isRequired && jsonSchema.properties[fieldId]) {
                jsonSchema.properties[fieldId].isRequired = true;
            }
            if (usedFields.hasOwnProperty(fieldId)) {
                if (usedFields[fieldId].length > 1) {
                    schemaError(`${fieldId} is referenced by more than one fieldset: ${usedFields[fieldId]}`, path);
                }
                delete usedFields[fieldId];
            }
            else if (isRequired) {
                schemaError(`${fieldId} is a required field but it is not referenced as part of a 'order' or a 'fieldset' property`, path);
            }
            else {
                delete jsonSchema[fieldId];
                schemaWarning(`Removing unreferenced field ${fieldId}`, path);
            }
        }
        for (let remainingfieldsId in usedFields) {
            if (usedFields.hasOwnProperty(remainingfieldsId)) {
                schemaWarning(`Referencing non-existent field ${remainingfieldsId} in one or more fieldsets`, path);
            }
        }
    }
    static createFieldsets(jsonSchema) {
        jsonSchema.order = Object.keys(jsonSchema.properties);
        SchemaPreprocessor.replaceOrderByFieldsets(jsonSchema);
    }
    static replaceOrderByFieldsets(jsonSchema) {
        jsonSchema.fieldsets = [{
                id: 'fieldset-default',
                title: jsonSchema.title || '',
                description: jsonSchema.description || '',
                name: jsonSchema.name || '',
                fields: jsonSchema.order
            }];
        delete jsonSchema.order;
    }
    static normalizeWidget(fieldSchema) {
        let widget = fieldSchema.widget;
        if (widget === undefined) {
            widget = { 'id': fieldSchema.type };
        }
        else if (typeof widget === 'string') {
            widget = { 'id': widget };
        }
        fieldSchema.widget = widget;
    }
    static checkItems(jsonSchema, path) {
        if (jsonSchema.items === undefined) {
            schemaError('No \'items\' property in array', path);
        }
    }
    static recursiveCheck(jsonSchema, path) {
        if (jsonSchema.type === FieldType.Object) {
            for (let fieldId in jsonSchema.properties) {
                if (jsonSchema.properties.hasOwnProperty(fieldId)) {
                    let fieldSchema = jsonSchema.properties[fieldId];
                    SchemaPreprocessor.preprocess(fieldSchema, path + fieldId + '/');
                }
            }
            if (jsonSchema.hasOwnProperty('definitions')) {
                for (let fieldId in jsonSchema.definitions) {
                    if (jsonSchema.definitions.hasOwnProperty(fieldId)) {
                        let fieldSchema = jsonSchema.definitions[fieldId];
                        SchemaPreprocessor.removeRecursiveRefProperties(fieldSchema, `#/definitions/${fieldId}`);
                        SchemaPreprocessor.preprocess(fieldSchema, path + fieldId + '/');
                    }
                }
            }
        }
        else if (jsonSchema.type === 'array') {
            if (Array.isArray(jsonSchema.items || {})) {
                for (let i = 0; i < jsonSchema.items.length; i++) {
                    SchemaPreprocessor.preprocess(jsonSchema.items[i], path + '*/');
                }
            }
            else {
                SchemaPreprocessor.preprocess(jsonSchema.items, path + '*/');
            }
            if (jsonSchema.additionalItems) {
                SchemaPreprocessor.preprocess(jsonSchema.additionalItems, path + '*/');
            }
        }
    }
    static removeRecursiveRefProperties(jsonSchema, definitionPath) {
        // to avoid infinite loop
        if (jsonSchema.type === FieldType.Object) {
            for (let fieldId in jsonSchema.properties) {
                if (jsonSchema.properties.hasOwnProperty(fieldId)) {
                    if (jsonSchema.properties[fieldId].$ref
                        && jsonSchema.properties[fieldId].$ref === definitionPath) {
                        delete jsonSchema.properties[fieldId];
                    }
                    else if (jsonSchema.properties[fieldId].type === 'object') {
                        SchemaPreprocessor.removeRecursiveRefProperties(jsonSchema.properties[fieldId], definitionPath);
                    }
                }
            }
        }
    }
    /**
     * Enables alias names for JSON schema extensions.
     *
     * Copies the value of each alias JSON schema property
     * to the JSON schema property of ngx-schema-form.
     *
     * @param schema JSON schema to enable alias names.
     */
    static normalizeExtensions(schema) {
        const extensions = [
            { name: "fieldsets", regex: /^x-?field-?sets$/i },
            { name: "widget", regex: /^x-?widget$/i },
            { name: "visibleIf", regex: /^x-?visible-?if$/i }
        ];
        const keys = Object.keys(schema);
        for (let i = 0; i < keys.length; ++i) {
            let k = keys[i];
            let e = extensions.find(e => !!k.match(e.regex));
            if (e) {
                let v = schema[k];
                let copy = JSON.parse(JSON.stringify(v));
                schema[e.name] = copy;
            }
        }
    }
}
SchemaPreprocessor.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hcHJlcHJvY2Vzc29yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2NoZW1hLWZvcm0vc3JjL2xpYi9tb2RlbC9zY2hlbWFwcmVwcm9jZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUV6RCxTQUFTLGFBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSTtJQUNsQyxPQUFPLG9CQUFvQixJQUFJLEtBQUssT0FBTyxFQUFFLENBQUM7QUFDaEQsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJO0lBQ2hDLElBQUksSUFBSSxHQUFHLGFBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBRUQsU0FBUyxhQUFhLENBQUMsT0FBTyxFQUFFLElBQUk7SUFDbEMsSUFBSSxJQUFJLEdBQUcsYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4QyxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFHRCxNQUFNLE9BQU8sa0JBQWtCO0lBRTdCLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBbUIsRUFBRSxJQUFJLEdBQUcsR0FBRztRQUMvQyxVQUFVLEdBQUcsVUFBVSxJQUFJLEVBQUUsQ0FBQztRQUM5QixrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuRCxJQUFJLFVBQVUsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQ2hDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxVQUFVLEVB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QUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQzthQUN2QjtTQUNGO0lBQ0gsQ0FBQzs7O1lBOUtGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzQmxhbmt9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SVNjaGVtYX0gZnJvbSAnLi9JU2NoZW1hJztcbmltcG9ydCB7RmllbGRUeXBlfSBmcm9tICcuLi90ZW1wbGF0ZS1zY2hlbWEvZmllbGQvZmllbGQnO1xuXG5mdW5jdGlvbiBmb3JtYXRNZXNzYWdlKG1lc3NhZ2UsIHBhdGgpIHtcbiAgcmV0dXJuIGBQYXJzaW5nIGVycm9yIG9uICR7cGF0aH06ICR7bWVzc2FnZX1gO1xufVxuXG5mdW5jdGlvbiBzY2hlbWFFcnJvcihtZXNzYWdlLCBwYXRoKTogdm9pZCB7XG4gIGxldCBtZXNnID0gZm9ybWF0TWVzc2FnZShtZXNzYWdlLCBwYXRoKTtcbiAgdGhyb3cgbmV3IEVycm9yKG1lc2cpO1xufVxuXG5mdW5jdGlvbiBzY2hlbWFXYXJuaW5nKG1lc3NhZ2UsIHBhdGgpOiB2b2lkIHtcbiAgbGV0IG1lc2cgPSBmb3JtYXRNZXNzYWdlKG1lc3NhZ2UsIHBhdGgpO1xuICB0aHJvdyBuZXcgRXJyb3IobWVzZyk7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTY2hlbWFQcmVwcm9jZXNzb3Ige1xuXG4gIHN0YXRpYyBwcmVwcm9jZXNzKGpzb25TY2hlbWE6IElTY2hlbWEsIHBhdGggPSAnLycpOiBhbnkge1xuICAgIGpzb25TY2hlbWEgPSBqc29uU2NoZW1hIHx8IHt9O1xuICAgIFNjaGVtYVByZXByb2Nlc3Nvci5ub3JtYWxpemVFeHRlbnNpb25zKGpzb25TY2hlbWEpO1xuICAgIGlmIChqc29uU2NoZW1hLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBTY2hlbWFQcmVwcm9jZXNzb3IuY2hlY2tQcm9wZXJ0aWVzKGpzb25TY2hlbWEsIHBhdGgpO1xuICAgICAgU2NoZW1hUHJlcHJvY2Vzc29yLmNoZWNrQW5kQ3JlYXRlRmllbGRzZXRzKGpzb25TY2hlbWEsIHBhdGgpO1xuICAgIH0gZWxzZSBpZiAoanNvblNjaGVtYS50eXBlID09PSAnYXJyYXknKSB7XG4gICAgICBTY2hlbWFQcmVwcm9jZXNzb3IuY2hlY2tJdGVtcyhqc29uU2NoZW1hLCBwYXRoKTtcbiAgICB9XG4gICAgU2NoZW1hUHJlcHJvY2Vzc29yLm5vcm1hbGl6ZVdpZGdldChqc29uU2NoZW1hKTtcbiAgICBTY2hlbWFQcmVwcm9jZXNzb3IucmVjdXJzaXZlQ2hlY2soanNvblNjaGVtYSwgcGF0aCk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjaGVja1Byb3BlcnRpZXMoanNvblNjaGVtYSwgcGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKGlzQmxhbmsoanNvblNjaGVtYS5wcm9wZXJ0aWVzKSkge1xuICAgICAganNvblNjaGVtYS5wcm9wZXJ0aWVzID0ge307XG4gICAgICBzY2hlbWFXYXJuaW5nKCdQcm92aWRlZCBqc29uIHNjaGVtYSBkb2VzIG5vdCBjb250YWluIGEgXFwncHJvcGVydGllc1xcJyBlbnRyeS4gT3V0cHV0IHNjaGVtYSB3aWxsIGJlIGVtcHR5JywgcGF0aCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgY2hlY2tBbmRDcmVhdGVGaWVsZHNldHMoanNvblNjaGVtYTogYW55LCBwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAoanNvblNjaGVtYS5maWVsZHNldHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGpzb25TY2hlbWEub3JkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucmVwbGFjZU9yZGVyQnlGaWVsZHNldHMoanNvblNjaGVtYSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBTY2hlbWFQcmVwcm9jZXNzb3IuY3JlYXRlRmllbGRzZXRzKGpzb25TY2hlbWEpO1xuICAgICAgfVxuICAgIH1cbiAgICBTY2hlbWFQcmVwcm9jZXNzb3IuY2hlY2tGaWVsZHNVc2FnZShqc29uU2NoZW1hLCBwYXRoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNoZWNrRmllbGRzVXNhZ2UoanNvblNjaGVtYTogSVNjaGVtYSwgcGF0aDogc3RyaW5nKSB7XG4gICAgbGV0IGZpZWxkc0lkOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGpzb25TY2hlbWEucHJvcGVydGllcyk7XG4gICAgbGV0IHVzZWRGaWVsZHMgPSB7fTtcbiAgICBmb3IgKGxldCBmaWVsZHNldCBvZiBqc29uU2NoZW1hLmZpZWxkc2V0cykge1xuICAgICAgZm9yIChsZXQgZmllbGRJZCBvZiBmaWVsZHNldC5maWVsZHMpIHtcbiAgICAgICAgaWYgKHVzZWRGaWVsZHNbZmllbGRJZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHVzZWRGaWVsZHNbZmllbGRJZF0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB1c2VkRmllbGRzW2ZpZWxkSWRdLnB1c2goZmllbGRzZXQuaWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgZmllbGRJZCBvZiBmaWVsZHNJZCkge1xuICAgICAgY29uc3QgaXNSZXF1aXJlZCA9IGpzb25TY2hlbWEucmVxdWlyZWQgJiYganNvblNjaGVtYS5yZXF1aXJlZC5pbmRleE9mKGZpZWxkSWQpID4gLTE7XG4gICAgICBpZiAoaXNSZXF1aXJlZCAmJiBqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF0pIHtcbiAgICAgICAganNvblNjaGVtYS5wcm9wZXJ0aWVzW2ZpZWxkSWRdLmlzUmVxdWlyZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHVzZWRGaWVsZHMuaGFzT3duUHJvcGVydHkoZmllbGRJZCkpIHtcbiAgICAgICAgaWYgKHVzZWRGaWVsZHNbZmllbGRJZF0ubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHNjaGVtYUVycm9yKGAke2ZpZWxkSWR9IGlzIHJlZmVyZW5jZWQgYnkgbW9yZSB0aGFuIG9uZSBmaWVsZHNldDogJHt1c2VkRmllbGRzW2ZpZWxkSWRdfWAsIHBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSB1c2VkRmllbGRzW2ZpZWxkSWRdO1xuICAgICAgfSBlbHNlIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgIHNjaGVtYUVycm9yKGAke2ZpZWxkSWR9IGlzIGEgcmVxdWlyZWQgZmllbGQgYnV0IGl0IGlzIG5vdCByZWZlcmVuY2VkIGFzIHBhcnQgb2YgYSAnb3JkZXInIG9yIGEgJ2ZpZWxkc2V0JyBwcm9wZXJ0eWAsIHBhdGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIGpzb25TY2hlbWFbZmllbGRJZF07XG4gICAgICAgIHNjaGVtYVdhcm5pbmcoYFJlbW92aW5nIHVucmVmZXJlbmNlZCBmaWVsZCAke2ZpZWxkSWR9YCwgcGF0aCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgcmVtYWluaW5nZmllbGRzSWQgaW4gdXNlZEZpZWxkcykge1xuICAgICAgaWYgKHVzZWRGaWVsZHMuaGFzT3duUHJvcGVydHkocmVtYWluaW5nZmllbGRzSWQpKSB7XG4gICAgICAgIHNjaGVtYVdhcm5pbmcoYFJlZmVyZW5jaW5nIG5vbi1leGlzdGVudCBmaWVsZCAke3JlbWFpbmluZ2ZpZWxkc0lkfSBpbiBvbmUgb3IgbW9yZSBmaWVsZHNldHNgLCBwYXRoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjcmVhdGVGaWVsZHNldHMoanNvblNjaGVtYTogSVNjaGVtYSkge1xuICAgIGpzb25TY2hlbWEub3JkZXIgPSBPYmplY3Qua2V5cyhqc29uU2NoZW1hLnByb3BlcnRpZXMpO1xuICAgIFNjaGVtYVByZXByb2Nlc3Nvci5yZXBsYWNlT3JkZXJCeUZpZWxkc2V0cyhqc29uU2NoZW1hKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHJlcGxhY2VPcmRlckJ5RmllbGRzZXRzKGpzb25TY2hlbWE6IElTY2hlbWEpIHtcbiAgICBqc29uU2NoZW1hLmZpZWxkc2V0cyA9IFt7XG4gICAgICBpZDogJ2ZpZWxkc2V0LWRlZmF1bHQnLFxuICAgICAgdGl0bGU6IGpzb25TY2hlbWEudGl0bGUgfHwgJycsXG4gICAgICBkZXNjcmlwdGlvbjoganNvblNjaGVtYS5kZXNjcmlwdGlvbiB8fCAnJyxcbiAgICAgIG5hbWU6IGpzb25TY2hlbWEubmFtZSB8fCAnJyxcbiAgICAgIGZpZWxkczoganNvblNjaGVtYS5vcmRlclxuICAgIH1dO1xuICAgIGRlbGV0ZSBqc29uU2NoZW1hLm9yZGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgbm9ybWFsaXplV2lkZ2V0KGZpZWxkU2NoZW1hOiBJU2NoZW1hKSB7XG4gICAgbGV0IHdpZGdldCA9IGZpZWxkU2NoZW1hLndpZGdldDtcbiAgICBpZiAod2lkZ2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHdpZGdldCA9IHsnaWQnOiBmaWVsZFNjaGVtYS50eXBlfTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB3aWRnZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB3aWRnZXQgPSB7J2lkJzogd2lkZ2V0fTtcbiAgICB9XG4gICAgZmllbGRTY2hlbWEud2lkZ2V0ID0gd2lkZ2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgY2hlY2tJdGVtcyhqc29uU2NoZW1hOiBJU2NoZW1hLCBwYXRoKSB7XG4gICAgaWYgKGpzb25TY2hlbWEuaXRlbXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hRXJyb3IoJ05vIFxcJ2l0ZW1zXFwnIHByb3BlcnR5IGluIGFycmF5JywgcGF0aCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcmVjdXJzaXZlQ2hlY2soanNvblNjaGVtYTogSVNjaGVtYSwgcGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKGpzb25TY2hlbWEudHlwZSA9PT0gRmllbGRUeXBlLk9iamVjdCkge1xuICAgICAgZm9yIChsZXQgZmllbGRJZCBpbiBqc29uU2NoZW1hLnByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKGpzb25TY2hlbWEucHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShmaWVsZElkKSkge1xuICAgICAgICAgIGxldCBmaWVsZFNjaGVtYSA9IGpzb25TY2hlbWEucHJvcGVydGllc1tmaWVsZElkXTtcbiAgICAgICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucHJlcHJvY2VzcyhmaWVsZFNjaGVtYSwgcGF0aCArIGZpZWxkSWQgKyAnLycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoanNvblNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnZGVmaW5pdGlvbnMnKSkge1xuICAgICAgICBmb3IgKGxldCBmaWVsZElkIGluIGpzb25TY2hlbWEuZGVmaW5pdGlvbnMpIHtcbiAgICAgICAgICBpZiAoanNvblNjaGVtYS5kZWZpbml0aW9ucy5oYXNPd25Qcm9wZXJ0eShmaWVsZElkKSkge1xuICAgICAgICAgICAgbGV0IGZpZWxkU2NoZW1hID0ganNvblNjaGVtYS5kZWZpbml0aW9uc1tmaWVsZElkXTtcbiAgICAgICAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5yZW1vdmVSZWN1cnNpdmVSZWZQcm9wZXJ0aWVzKGZpZWxkU2NoZW1hLCBgIy9kZWZpbml0aW9ucy8ke2ZpZWxkSWR9YCk7XG4gICAgICAgICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucHJlcHJvY2VzcyhmaWVsZFNjaGVtYSwgcGF0aCArIGZpZWxkSWQgKyAnLycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoanNvblNjaGVtYS50eXBlID09PSAnYXJyYXknKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShqc29uU2NoZW1hLml0ZW1zIHx8IHt9KSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGpzb25TY2hlbWEuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucHJlcHJvY2Vzcyhqc29uU2NoZW1hLml0ZW1zW2ldLCBwYXRoICsgJyovJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFNjaGVtYVByZXByb2Nlc3Nvci5wcmVwcm9jZXNzKGpzb25TY2hlbWEuaXRlbXMsIHBhdGggKyAnKi8nKTtcbiAgICAgIH1cbiAgICAgIGlmIChqc29uU2NoZW1hLmFkZGl0aW9uYWxJdGVtcykge1xuICAgICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucHJlcHJvY2Vzcyhqc29uU2NoZW1hLmFkZGl0aW9uYWxJdGVtcywgcGF0aCArICcqLycpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHJlbW92ZVJlY3Vyc2l2ZVJlZlByb3BlcnRpZXMoanNvblNjaGVtYTogSVNjaGVtYSwgZGVmaW5pdGlvblBhdGgpIHtcbiAgICAvLyB0byBhdm9pZCBpbmZpbml0ZSBsb29wXG4gICAgaWYgKGpzb25TY2hlbWEudHlwZSA9PT0gRmllbGRUeXBlLk9iamVjdCkge1xuICAgICAgZm9yIChsZXQgZmllbGRJZCBpbiBqc29uU2NoZW1hLnByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKGpzb25TY2hlbWEucHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShmaWVsZElkKSkge1xuICAgICAgICAgIGlmIChqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF0uJHJlZlxuICAgICAgICAgICAgJiYganNvblNjaGVtYS5wcm9wZXJ0aWVzW2ZpZWxkSWRdLiRyZWYgPT09IGRlZmluaXRpb25QYXRoKSB7XG4gICAgICAgICAgICBkZWxldGUganNvblNjaGVtYS5wcm9wZXJ0aWVzW2ZpZWxkSWRdO1xuICAgICAgICAgIH0gZWxzZSBpZiAoanNvblNjaGVtYS5wcm9wZXJ0aWVzW2ZpZWxkSWRdLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBTY2hlbWFQcmVwcm9jZXNzb3IucmVtb3ZlUmVjdXJzaXZlUmVmUHJvcGVydGllcyhqc29uU2NoZW1hLnByb3BlcnRpZXNbZmllbGRJZF0sIGRlZmluaXRpb25QYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBFbmFibGVzIGFsaWFzIG5hbWVzIGZvciBKU09OIHNjaGVtYSBleHRlbnNpb25zLlxuICAgKlxuICAgKiBDb3BpZXMgdGhlIHZhbHVlIG9mIGVhY2ggYWxpYXMgSlNPTiBzY2hlbWEgcHJvcGVydHlcbiAgICogdG8gdGhlIEpTT04gc2NoZW1hIHByb3BlcnR5IG9mIG5neC1zY2hlbWEtZm9ybS5cbiAgICpcbiAgICogQHBhcmFtIHNjaGVtYSBKU09OIHNjaGVtYSB0byBlbmFibGUgYWxpYXMgbmFtZXMuXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyBub3JtYWxpemVFeHRlbnNpb25zKHNjaGVtYTogSVNjaGVtYSk6IHZvaWQge1xuICAgIGNvbnN0IGV4dGVuc2lvbnMgPSBbXG4gICAgICAgIHsgbmFtZTogXCJmaWVsZHNldHNcIiwgcmVnZXg6IC9eeC0/ZmllbGQtP3NldHMkL2kgfSxcbiAgICAgICAgeyBuYW1lOiBcIndpZGdldFwiLCAgICByZWdleDogL154LT93aWRnZXQkL2kgfSxcbiAgICAgICAgeyBuYW1lOiBcInZpc2libGVJZlwiLCByZWdleDogL154LT92aXNpYmxlLT9pZiQvaSB9XG4gICAgXTtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoc2NoZW1hKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGxldCBrID0ga2V5c1tpXTtcbiAgICAgIGxldCBlID0gZXh0ZW5zaW9ucy5maW5kKGUgPT4gISFrLm1hdGNoKGUucmVnZXgpKTtcbiAgICAgIGlmIChlKSB7XG4gICAgICAgIGxldCB2ID0gc2NoZW1hW2tdO1xuICAgICAgICBsZXQgY29weSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodikpO1xuICAgICAgICBzY2hlbWFbZS5uYW1lXSA9IGNvcHk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbiJdfQ==