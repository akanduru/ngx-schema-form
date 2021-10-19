import { AfterViewInit } from '@angular/core';
import { ControlWidget } from '../../widget';
import * as ɵngcc0 from '@angular/core';
export declare class FileWidget extends ControlWidget implements AfterViewInit {
    protected reader: FileReader;
    protected filedata: any;
    constructor();
    ngAfterViewInit(): void;
    onFileChange($event: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FileWidget, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<FileWidget, "sf-file-widget", never, {}, {}, never, never>;
}

//# sourceMappingURL=file.widget.d.ts.map