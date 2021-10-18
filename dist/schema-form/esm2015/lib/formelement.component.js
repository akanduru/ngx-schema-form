import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActionRegistry } from './model/actionregistry';
import { FormProperty } from './model/formproperty';
import { BindingRegistry } from './model/bindingregistry';
import { LogService } from './log.service';
export class FormElementComponent {
    constructor(actionRegistry, bindingRegistry, renderer, elementRef, logger) {
        this.actionRegistry = actionRegistry;
        this.bindingRegistry = bindingRegistry;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.logger = logger;
        this.control = new FormControl('', () => null);
        this.widget = null;
        this.buttons = [];
        this.unlisten = [];
    }
    ngOnInit() {
        this.parseButtons();
        this.setupBindings();
    }
    setupBindings() {
        const bindings = this.bindingRegistry.get(this.formProperty.path);
        if ((bindings || []).length) {
            bindings.forEach((binding) => {
                for (const eventId in binding) {
                    this.createBinding(eventId, binding[eventId]);
                }
            });
        }
    }
    createBinding(eventId, listeners) {
        this.unlisten.push(this.renderer.listen(this.elementRef.nativeElement, eventId, (event) => {
            const _listeners = Array.isArray(listeners) ? listeners : [listeners];
            for (const _listener of _listeners) {
                if (_listener instanceof Function) {
                    try {
                        _listener(event, this.formProperty);
                    }
                    catch (e) {
                        this.logger.error(`Error calling bindings event listener for '${eventId}'`, e);
                    }
                }
                else {
                    this.logger.warn('Calling non function handler for eventId ' + eventId + ' for path ' + this.formProperty.path);
                }
            }
        }));
    }
    parseButtons() {
        if (this.formProperty.schema.buttons !== undefined) {
            this.buttons = this.formProperty.schema.buttons;
            for (let button of this.buttons) {
                this.createButtonCallback(button);
            }
        }
    }
    createButtonCallback(button) {
        button.action = (e) => {
            let action;
            if (button.id && (action = this.actionRegistry.get(button.id))) {
                if (action) {
                    action(this.formProperty, button.parameters);
                }
            }
            e.preventDefault();
        };
    }
    onWidgetInstanciated(widget) {
        this.widget = widget;
        let id = this.formProperty.canonicalPathNotation || 'field' + (FormElementComponent.counter++);
        if (this.formProperty.root.rootName) {
            id = `${this.formProperty.root.rootName}:${id}`;
        }
        this.widget.formProperty = this.formProperty;
        this.widget.schema = this.formProperty.schema;
        this.widget.name = id;
        this.widget.id = id;
        this.widget.control = this.control;
    }
    ngOnDestroy() {
        if (this.unlisten) {
            this.unlisten.forEach((item) => {
                item();
            });
        }
    }
}
FormElementComponent.counter = 0;
FormElementComponent.decorators = [
    { type: Component, args: [{
                selector: 'sf-form-element',
                template: `
    <div *ngIf="formProperty.visible"
         [class.has-error]="!control.valid"
         [class.has-success]="control.valid">
      <sf-widget-chooser
        (widgetInstanciated)="onWidgetInstanciated($event)"
        [widgetInfo]="formProperty.schema.widget">
      </sf-widget-chooser>
      <sf-form-element-action *ngFor="let button of buttons" [button]="button" [formProperty]="formProperty"></sf-form-element-action>
    </div>`
            },] }
];
FormElementComponent.ctorParameters = () => [
    { type: ActionRegistry },
    { type: BindingRegistry },
    { type: Renderer2 },
    { type: ElementRef },
    { type: LogService }
];
FormElementComponent.propDecorators = {
    formProperty: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWVsZW1lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvc2NoZW1hLWZvcm0vc3JjL2xpYi9mb3JtZWxlbWVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxVQUFVLEVBQ3JCLEtBQUssRUFDRyxTQUFTLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFDTCxXQUFXLEVBQ1osTUFBTSxnQkFBZ0IsQ0FBQztBQUl4QixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUV4RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBZTNDLE1BQU0sT0FBTyxvQkFBb0I7SUFhL0IsWUFBb0IsY0FBOEIsRUFDOUIsZUFBZ0MsRUFDaEMsUUFBbUIsRUFDbkIsVUFBc0IsRUFDdEIsTUFBa0I7UUFKbEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQVp0QyxZQUFPLEdBQWdCLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2RCxXQUFNLEdBQWdCLElBQUksQ0FBQztRQUUzQixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWIsYUFBUSxHQUFHLEVBQUUsQ0FBQztJQU9kLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQUUs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SUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNuQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxFQUFFLENBQUM7U0FDakQ7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO1FBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNyQyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUM3QixJQUFJLEVBQUUsQ0FBQztZQUNULENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOztBQTNGYyw0QkFBTyxHQUFHLENBQUMsQ0FBQzs7WUFmNUIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7O1dBU0Q7YUFDVjs7O1lBbEJPLGNBQWM7WUFFZCxlQUFlO1lBWGIsU0FBUztZQUZOLFVBQVU7WUFlZCxVQUFVOzs7MkJBbUJoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBFbGVtZW50UmVmLFxuICBJbnB1dCwgT25EZXN0cm95LFxuICBPbkluaXQsIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgRm9ybUNvbnRyb2xcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge1dpZGdldH0gZnJvbSAnLi93aWRnZXQnO1xuXG5pbXBvcnQge0FjdGlvblJlZ2lzdHJ5fSBmcm9tICcuL21vZGVsL2FjdGlvbnJlZ2lzdHJ5JztcbmltcG9ydCB7Rm9ybVByb3BlcnR5fSBmcm9tICcuL21vZGVsL2Zvcm1wcm9wZXJ0eSc7XG5pbXBvcnQge0JpbmRpbmdSZWdpc3RyeX0gZnJvbSAnLi9tb2RlbC9iaW5kaW5ncmVnaXN0cnknO1xuaW1wb3J0IHtCaW5kaW5nfSBmcm9tICcuL21vZGVsL2JpbmRpbmcnO1xuaW1wb3J0IHsgTG9nU2VydmljZSB9IGZyb20gJy4vbG9nLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZi1mb3JtLWVsZW1lbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgKm5nSWY9XCJmb3JtUHJvcGVydHkudmlzaWJsZVwiXG4gICAgICAgICBbY2xhc3MuaGFzLWVycm9yXT1cIiFjb250cm9sLnZhbGlkXCJcbiAgICAgICAgIFtjbGFzcy5oYXMtc3VjY2Vzc109XCJjb250cm9sLnZhbGlkXCI+XG4gICAgICA8c2Ytd2lkZ2V0LWNob29zZXJcbiAgICAgICAgKHdpZGdldEluc3RhbmNpYXRlZCk9XCJvbldpZGdldEluc3RhbmNpYXRlZCgkZXZlbnQpXCJcbiAgICAgICAgW3dpZGdldEluZm9dPVwiZm9ybVByb3BlcnR5LnNjaGVtYS53aWRnZXRcIj5cbiAgICAgIDwvc2Ytd2lkZ2V0LWNob29zZXI+XG4gICAgICA8c2YtZm9ybS1lbGVtZW50LWFjdGlvbiAqbmdGb3I9XCJsZXQgYnV0dG9uIG9mIGJ1dHRvbnNcIiBbYnV0dG9uXT1cImJ1dHRvblwiIFtmb3JtUHJvcGVydHldPVwiZm9ybVByb3BlcnR5XCI+PC9zZi1mb3JtLWVsZW1lbnQtYWN0aW9uPlxuICAgIDwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgRm9ybUVsZW1lbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgY291bnRlciA9IDA7XG5cbiAgQElucHV0KCkgZm9ybVByb3BlcnR5OiBGb3JtUHJvcGVydHk7XG4gIGNvbnRyb2w6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnLCAoKSA9PiBudWxsKTtcblxuICB3aWRnZXQ6IFdpZGdldDxhbnk+ID0gbnVsbDtcblxuICBidXR0b25zID0gW107XG5cbiAgdW5saXN0ZW4gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjdGlvblJlZ2lzdHJ5OiBBY3Rpb25SZWdpc3RyeSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBiaW5kaW5nUmVnaXN0cnk6IEJpbmRpbmdSZWdpc3RyeSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgbG9nZ2VyOiBMb2dTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBhcnNlQnV0dG9ucygpO1xuICAgIHRoaXMuc2V0dXBCaW5kaW5ncygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cEJpbmRpbmdzKCkge1xuICAgIGNvbnN0IGJpbmRpbmdzOiBCaW5kaW5nW10gPSB0aGlzLmJpbmRpbmdSZWdpc3RyeS5nZXQodGhpcy5mb3JtUHJvcGVydHkucGF0aCk7XG4gICAgaWYgKChiaW5kaW5ncyB8fCBbXSkubGVuZ3RoKSB7XG4gICAgICBiaW5kaW5ncy5mb3JFYWNoKChiaW5kaW5nKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgZXZlbnRJZCBpbiBiaW5kaW5nKSB7XG4gICAgICAgICAgdGhpcy5jcmVhdGVCaW5kaW5nKGV2ZW50SWQsIGJpbmRpbmdbZXZlbnRJZF0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUJpbmRpbmcoZXZlbnRJZCwgbGlzdGVuZXJzKSB7XG4gICAgdGhpcy51bmxpc3Rlbi5wdXNoKHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgZXZlbnRJZCxcbiAgICAgIChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBfbGlzdGVuZXJzID0gQXJyYXkuaXNBcnJheShsaXN0ZW5lcnMpID8gbGlzdGVuZXJzIDogW2xpc3RlbmVyc11cbiAgICAgICAgZm9yIChjb25zdCBfbGlzdGVuZXIgb2YgX2xpc3RlbmVycykge1xuICAgICAgICAgIGlmIChfbGlzdGVuZXIgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgdHJ5IHsgX2xpc3RlbmVyKGV2ZW50LCB0aGlzLmZvcm1Qcm9wZXJ0eSk7IH0gY2F0Y2ggKGUpIHsgdGhpcy5sb2dnZXIuZXJyb3IoYEVycm9yIGNhbGxpbmcgYmluZGluZ3MgZXZlbnQgbGlzdGVuZXIgZm9yICcke2V2ZW50SWR9J2AsIGUpIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybignQ2FsbGluZyBub24gZnVuY3Rpb24gaGFuZGxlciBmb3IgZXZlbnRJZCAnICsgZXZlbnRJZCArICcgZm9yIHBhdGggJyArIHRoaXMuZm9ybVByb3BlcnR5LnBhdGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUJ1dHRvbnMoKSB7XG4gICAgaWYgKHRoaXMuZm9ybVByb3BlcnR5LnNjaGVtYS5idXR0b25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYnV0dG9ucyA9IHRoaXMuZm9ybVByb3BlcnR5LnNjaGVtYS5idXR0b25zO1xuXG4gICAgICBmb3IgKGxldCBidXR0b24gb2YgdGhpcy5idXR0b25zKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uQ2FsbGJhY2soYnV0dG9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUJ1dHRvbkNhbGxiYWNrKGJ1dHRvbikge1xuICAgIGJ1dHRvbi5hY3Rpb24gPSAoZSkgPT4ge1xuICAgICAgbGV0IGFjdGlvbjtcbiAgICAgIGlmIChidXR0b24uaWQgJiYgKGFjdGlvbiA9IHRoaXMuYWN0aW9uUmVnaXN0cnkuZ2V0KGJ1dHRvbi5pZCkpKSB7XG4gICAgICAgIGlmIChhY3Rpb24pIHtcbiAgICAgICAgICBhY3Rpb24odGhpcy5mb3JtUHJvcGVydHksIGJ1dHRvbi5wYXJhbWV0ZXJzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH07XG4gIH1cblxuICBvbldpZGdldEluc3RhbmNpYXRlZCh3aWRnZXQ6IFdpZGdldDxhbnk+KSB7XG4gICAgdGhpcy53aWRnZXQgPSB3aWRnZXQ7XG4gICAgbGV0IGlkID0gdGhpcy5mb3JtUHJvcGVydHkuY2Fub25pY2FsUGF0aE5vdGF0aW9uIHx8wqAnZmllbGQnICsgKEZvcm1FbGVtZW50Q29tcG9uZW50LmNvdW50ZXIrKyk7XG4gICAgaWYgKHRoaXMuZm9ybVByb3BlcnR5LnJvb3Qucm9vdE5hbWUpIHtcbiAgICAgIGlkID0gYCR7dGhpcy5mb3JtUHJvcGVydHkucm9vdC5yb290TmFtZX06JHtpZH1gO1xuICAgIH1cblxuICAgIHRoaXMud2lkZ2V0LmZvcm1Qcm9wZXJ0eSA9IHRoaXMuZm9ybVByb3BlcnR5O1xuICAgIHRoaXMud2lkZ2V0LnNjaGVtYSA9IHRoaXMuZm9ybVByb3BlcnR5LnNjaGVtYTtcbiAgICB0aGlzLndpZGdldC5uYW1lID0gaWQ7XG4gICAgdGhpcy53aWRnZXQuaWQgPSBpZDtcbiAgICB0aGlzLndpZGdldC5jb250cm9sID0gdGhpcy5jb250cm9sO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudW5saXN0ZW4pIHtcbiAgICAgIHRoaXMudW5saXN0ZW4uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxufVxuIl19