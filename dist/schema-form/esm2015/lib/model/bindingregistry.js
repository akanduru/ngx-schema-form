import { Injectable } from "@angular/core";
export class BindingRegistry {
    constructor() {
        this.bindings = [];
    }
    clear() {
        this.bindings = [];
    }
    register(path, binding) {
        this.bindings[path] = [].concat(binding);
    }
    get(path) {
        return this.bindings[path];
    }
}
BindingRegistry.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGluZ3JlZ2lzdHJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc2NoZW1hLWZvcm0vc3JjL2xpYi9tb2RlbC9iaW5kaW5ncmVnaXN0cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxNQUFNLE9BQU8sZUFBZTtJQUQ1QjtRQUVFLGFBQVEsR0FBYyxFQUFFLENBQUM7SUFhM0IsQ0FBQztJQVhDLEtBQUs7UUFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsUUFBUSxDQUFDLElBQVksRUFBRSxPQUE0QjtRQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7OztZQWRGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0JpbmRpbmd9IGZyb20gJy4vYmluZGluZyc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJpbmRpbmdSZWdpc3RyeSB7XG4gIGJpbmRpbmdzOiBCaW5kaW5nW10gPSBbXTtcblxuICBjbGVhcigpIHtcbiAgICB0aGlzLmJpbmRpbmdzID0gW107XG4gIH1cblxuICByZWdpc3RlcihwYXRoOiBzdHJpbmcsIGJpbmRpbmc6IEJpbmRpbmcgfCBCaW5kaW5nW10pIHtcbiAgICB0aGlzLmJpbmRpbmdzW3BhdGhdID0gW10uY29uY2F0KGJpbmRpbmcpO1xuICB9XG5cbiAgZ2V0KHBhdGg6IHN0cmluZyk6IEJpbmRpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuYmluZGluZ3NbcGF0aF07XG4gIH1cbn1cbiJdfQ==