import { Injectable } from "@angular/core";
export class ValidatorRegistry {
    constructor() {
        this.validators = [];
    }
    register(path, validator) {
        this.validators[path] = validator;
    }
    get(path) {
        return this.validators[path];
    }
    clear() {
        this.validators = [];
    }
}
ValidatorRegistry.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9ycmVnaXN0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zY2hlbWEtZm9ybS9zcmMvbGliL21vZGVsL3ZhbGlkYXRvcnJlZ2lzdHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsTUFBTSxPQUFPLGlCQUFpQjtJQUQ5QjtRQUVVLGVBQVUsR0FBZ0IsRUFBRSxDQUFDO0lBYXZDLENBQUM7SUFYQyxRQUFRLENBQUMsSUFBWSxFQUFFLFNBQW9CO1FBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7OztZQWRGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICcuL3ZhbGlkYXRvcic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFZhbGlkYXRvclJlZ2lzdHJ5IHtcbiAgcHJpdmF0ZSB2YWxpZGF0b3JzOiBWYWxpZGF0b3JbXSA9IFtdO1xuXG4gIHJlZ2lzdGVyKHBhdGg6IHN0cmluZywgdmFsaWRhdG9yOiBWYWxpZGF0b3IpIHtcbiAgICB0aGlzLnZhbGlkYXRvcnNbcGF0aF0gPSB2YWxpZGF0b3I7XG4gIH1cblxuICBnZXQocGF0aDogc3RyaW5nKTogVmFsaWRhdG9yIHtcbiAgICByZXR1cm4gdGhpcy52YWxpZGF0b3JzW3BhdGhdO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy52YWxpZGF0b3JzID0gW107XG4gIH1cbn1cbiJdfQ==