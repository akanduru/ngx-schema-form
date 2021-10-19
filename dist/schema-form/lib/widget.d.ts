import { AfterViewInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ArrayProperty } from "./model/arrayproperty";
import { FormProperty } from "./model/formproperty";
import { ObjectProperty } from "./model/objectproperty";
import { ISchema } from "./model/ISchema";
import * as ɵngcc0 from '@angular/core';
export declare abstract class Widget<T extends FormProperty> {
    formProperty: T;
    control: FormControl;
    errorMessages: string[];
    id: string;
    name: string;
    schema: ISchema;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Widget<any>, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<Widget<any>, never, never, {}, {}, never>;
}
export declare class ControlWidget extends Widget<FormProperty> implements AfterViewInit {
    ngAfterViewInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ControlWidget, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<ControlWidget, never, never, {}, {}, never>;
}
export declare class ArrayLayoutWidget extends Widget<ArrayProperty> implements AfterViewInit {
    ngAfterViewInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ArrayLayoutWidget, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<ArrayLayoutWidget, never, never, {}, {}, never>;
}
export declare class ObjectLayoutWidget extends Widget<ObjectProperty> implements AfterViewInit {
    ngAfterViewInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ObjectLayoutWidget, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<ObjectLayoutWidget, never, never, {}, {}, never>;
}

//# sourceMappingURL=widget.d.ts.map