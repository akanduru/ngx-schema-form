import { NgControl } from '@angular/forms';
export declare class DisableControlDirective {
    private ngControl;
    set disableControl(condition: boolean);
    constructor(ngControl: NgControl);
}
