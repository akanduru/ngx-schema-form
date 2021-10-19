import { Action } from './action';
import * as ɵngcc0 from '@angular/core';
export declare class ActionRegistry {
    actions: {
        [key: string]: Action;
    };
    clear(): void;
    register(actionId: string, action: Action): void;
    get(actionId: string): Action;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ActionRegistry, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<ActionRegistry>;
}

//# sourceMappingURL=actionregistry.d.ts.map