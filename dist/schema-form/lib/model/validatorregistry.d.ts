import { Validator } from './validator';
import * as ɵngcc0 from '@angular/core';
export declare class ValidatorRegistry {
    private validators;
    register(path: string, validator: Validator): void;
    get(path: string): Validator;
    clear(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ValidatorRegistry, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<ValidatorRegistry>;
}

//# sourceMappingURL=validatorregistry.d.ts.map