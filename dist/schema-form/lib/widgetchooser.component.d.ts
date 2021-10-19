import { ChangeDetectorRef, EventEmitter, OnChanges, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { TerminatorService } from './terminator.service';
import { WidgetFactory } from './widgetfactory';
import * as ɵngcc0 from '@angular/core';
export declare class WidgetChooserComponent implements OnInit, OnChanges, OnDestroy {
    private widgetFactory;
    private cdr;
    private terminator;
    widgetInfo: any;
    widgetInstanciated: EventEmitter<any>;
    container: ViewContainerRef;
    private widgetInstance;
    private ref;
    private subs;
    constructor(widgetFactory: WidgetFactory, cdr: ChangeDetectorRef, terminator: TerminatorService);
    ngOnInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<WidgetChooserComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<WidgetChooserComponent, "sf-widget-chooser", never, { "widgetInfo": "widgetInfo"; }, { "widgetInstanciated": "widgetInstanciated"; }, never, never>;
}

//# sourceMappingURL=widgetchooser.component.d.ts.map