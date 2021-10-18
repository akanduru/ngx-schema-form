import { FieldType } from '../template-schema/field/field';
export declare type TPropertyTypeMapping = {
    [type in FieldType]?: any;
};
export declare const PROPERTY_TYPE_MAPPING: TPropertyTypeMapping;
