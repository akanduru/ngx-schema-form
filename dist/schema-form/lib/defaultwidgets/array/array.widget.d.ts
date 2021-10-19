import { ArrayLayoutWidget } from '../../widget';
import { FormProperty } from '../../model';
import * as ɵngcc0 from '@angular/core';
export declare class ArrayWidget extends ArrayLayoutWidget {
    buttonDisabledAdd: boolean;
    buttonDisabledRemove: boolean;
    addItem(): void;
    removeItem(item: FormProperty): void;
    trackByIndex(index: number, item: any): number;
    updateButtonDisabledState(): void;
    isAddButtonDisabled(): boolean;
    isRemoveButtonDisabled(): boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ArrayWidget, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<ArrayWidget, "sf-array-widget", never, {}, {}, never, never>;
}

//# sourceMappingURL=array.widget.d.ts.map