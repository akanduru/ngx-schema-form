import { ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Widget } from './widget';
import { ActionRegistry } from './model/actionregistry';
import { FormProperty } from './model/formproperty';
import { BindingRegistry } from './model/bindingregistry';
import { LogService } from './log.service';
import * as ɵngcc0 from '@angular/core';
export declare class FormElementComponent implements OnInit, OnDestroy {
    private actionRegistry;
    private bindingRegistry;
    private renderer;
    private elementRef;
    private logger;
    private static counter;
    formProperty: FormProperty;
    control: FormControl;
    widget: Widget<any>;
    buttons: any[];
    unlisten: any[];
    constructor(actionRegistry: ActionRegistry, bindingRegistry: BindingRegistry, renderer: Renderer2, elementRef: ElementRef, logger: LogService);
    ngOnInit(): void;
    private setupBindings;
    private createBinding;
    private parseButtons;
    private createButtonCallback;
    onWidgetInstanciated(widget: Widget<any>): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FormElementComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<FormElementComponent, "sf-form-element", never, { "formProperty": "formProperty"; }, {}, never, never>;
}

//# sourceMappingURL=formelement.component.d.ts.map