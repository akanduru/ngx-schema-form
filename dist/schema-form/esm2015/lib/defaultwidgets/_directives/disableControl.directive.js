import { Input, Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
export class DisableControlDirective {
    constructor(ngControl) {
        this.ngControl = ngControl;
    }
    set disableControl(condition) {
        const action = condition ? 'disable' : 'enable';
        this.ngControl.control[action]();
    }
}
DisableControlDirective.decorators = [
    { type: Directive, args: [{
                selector: '[disableControl]'
            },] }
];
DisableControlDirective.ctorParameters = () => [
    { type: NgControl }
];
DisableControlDirective.propDecorators = {
    disableControl: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYWJsZUNvbnRyb2wuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2NoZW1hLWZvcm0vc3JjL2xpYi9kZWZhdWx0d2lkZ2V0cy9fZGlyZWN0aXZlcy9kaXNhYmxlQ29udHJvbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDaEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSzNDLE1BQU0sT0FBTyx1QkFBdUI7SUFPaEMsWUFBb0IsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUN4QyxDQUFDO0lBTkQsSUFBYSxjQUFjLENBQUMsU0FBa0I7UUFDMUMsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ3JDLENBQUM7OztZQVJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2FBQy9COzs7WUFKUSxTQUFTOzs7NkJBT2IsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElucHV0LCBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tkaXNhYmxlQ29udHJvbF0nXG59KVxuZXhwb3J0IGNsYXNzIERpc2FibGVDb250cm9sRGlyZWN0aXZlIHtcblxuICAgIEBJbnB1dCgpIHNldCBkaXNhYmxlQ29udHJvbChjb25kaXRpb246IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gY29uZGl0aW9uID8gJ2Rpc2FibGUnIDogJ2VuYWJsZSc7XG4gICAgICAgIHRoaXMubmdDb250cm9sLmNvbnRyb2xbYWN0aW9uXSgpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdDb250cm9sOiBOZ0NvbnRyb2wpIHtcbiAgICB9XG5cbn0iXX0=