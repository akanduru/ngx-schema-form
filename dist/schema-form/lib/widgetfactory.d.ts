import { ViewContainerRef, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { WidgetRegistry } from './widgetregistry';
import * as ɵngcc0 from '@angular/core';
export declare class WidgetFactory {
    private resolver;
    private registry;
    constructor(registry: WidgetRegistry, resolver: ComponentFactoryResolver);
    createWidget(container: ViewContainerRef, type: string): ComponentRef<any>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<WidgetFactory, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<WidgetFactory>;
}

//# sourceMappingURL=widgetfactory.d.ts.map