import { Binding } from './binding';
import * as ɵngcc0 from '@angular/core';
export declare class BindingRegistry {
    bindings: Binding[];
    clear(): void;
    register(path: string, binding: Binding | Binding[]): void;
    get(path: string): Binding[];
    static ɵfac: ɵngcc0.ɵɵFactoryDef<BindingRegistry, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<BindingRegistry>;
}

//# sourceMappingURL=bindingregistry.d.ts.map