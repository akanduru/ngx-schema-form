import { AfterContentInit, ElementRef, EventEmitter } from '@angular/core';
import { TemplateSchemaElement } from '../template-schema-element';
import * as ɵngcc0 from '@angular/core';
export declare class ButtonComponent extends TemplateSchemaElement implements AfterContentInit {
    private elementRef;
    id: string;
    label: string;
    widget: string | object;
    click: EventEmitter<any>;
    constructor(elementRef: ElementRef);
    private setLabelFromContent;
    ngAfterContentInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ButtonComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<ButtonComponent, "sf-button", never, { "label": "label"; "id": "id"; "widget": "widget"; }, { "click": "click"; }, never, ["*"]>;
}

//# sourceMappingURL=button.component.d.ts.map