import { OnChanges, ViewContainerRef, OnInit, OnDestroy } from "@angular/core";
import { WidgetFactory } from "./widgetfactory";
import { TerminatorService } from "./terminator.service";
import * as ɵngcc0 from '@angular/core';
export declare class FormElementComponentAction implements OnInit, OnChanges, OnDestroy {
    private widgetFactory;
    private terminator;
    button: any;
    formProperty: any;
    container: ViewContainerRef;
    private ref;
    private subs;
    constructor(widgetFactory: WidgetFactory, terminator: TerminatorService);
    ngOnInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FormElementComponentAction, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<FormElementComponentAction, "sf-form-element-action", never, { "button": "button"; "formProperty": "formProperty"; }, {}, never, never>;
}

//# sourceMappingURL=formelement.action.component.d.ts.map