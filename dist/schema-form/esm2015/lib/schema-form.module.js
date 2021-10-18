import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormElementComponent } from './formelement.component';
import { FormComponent } from './form.component';
import { WidgetChooserComponent } from './widgetchooser.component';
import { ArrayWidget } from './defaultwidgets/array/array.widget';
import { ButtonWidget } from './defaultwidgets/button/button.widget';
import { ObjectWidget } from './defaultwidgets/object/object.widget';
import { CheckboxWidget } from './defaultwidgets/checkbox/checkbox.widget';
import { FileWidget } from './defaultwidgets/file/file.widget';
import { IntegerWidget } from './defaultwidgets/integer/integer.widget';
import { TextAreaWidget } from './defaultwidgets/textarea/textarea.widget';
import { RadioWidget } from './defaultwidgets/radio/radio.widget';
import { RangeWidget } from './defaultwidgets/range/range.widget';
import { SelectWidget } from './defaultwidgets/select/select.widget';
import { StringWidget } from './defaultwidgets/string/string.widget';
import { DefaultWidgetRegistry } from './defaultwidgets/defaultwidgetregistry';
import { DisableControlDirective } from './defaultwidgets/_directives/disableControl.directive';
import { DefaultWidget } from './default.widget';
import { WidgetRegistry } from './widgetregistry';
import { SchemaValidatorFactory, ZSchemaValidatorFactory } from './schemavalidatorfactory';
import { FormElementComponentAction } from './formelement.action.component';
import { ExpressionCompilerFactory, JEXLExpressionCompilerFactory } from './expression-compiler-factory';
import { LOG_LEVEL, LogService, DefaultLogService } from './log.service';
const ɵ0 = 3 /* off */;
const moduleProviders = [
    {
        provide: WidgetRegistry,
        useClass: DefaultWidgetRegistry
    },
    {
        provide: SchemaValidatorFactory,
        useClass: ZSchemaValidatorFactory
    },
    {
        provide: ExpressionCompilerFactory,
        useClass: JEXLExpressionCompilerFactory
    },
    {
        provide: LOG_LEVEL,
        useValue: ɵ0
    },
    {
        provide: LogService,
        useClass: DefaultLogService
    }
];
export class SchemaFormModule {
    static forRoot() {
        return {
            ngModule: SchemaFormModule,
            providers: [...moduleProviders]
        };
    }
}
SchemaFormModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, ReactiveFormsModule],
                declarations: [
                    FormElementComponent,
                    FormElementComponentAction,
                    FormComponent,
                    WidgetChooserComponent,
                    DefaultWidget,
                    ArrayWidget,
                    ButtonWidget,
                    ObjectWidget,
                    CheckboxWidget,
                    FileWidget,
                    IntegerWidget,
                    TextAreaWidget,
                    RadioWidget,
                    RangeWidget,
                    SelectWidget,
                    StringWidget,
                    DisableControlDirective
                ],
                entryComponents: [
                    FormElementComponent,
                    FormElementComponentAction,
                    FormComponent,
                    WidgetChooserComponent,
                    ArrayWidget,
                    ButtonWidget,
                    ObjectWidget,
                    CheckboxWidget,
                    FileWidget,
                    IntegerWidget,
                    TextAreaWidget,
                    RadioWidget,
                    RangeWidget,
                    SelectWidget,
                    StringWidget
                ],
                exports: [
                    FormComponent,
                    FormElementComponent,
                    FormElementComponentAction,
                    WidgetChooserComponent,
                    ArrayWidget,
                    ButtonWidget,
                    ObjectWidget,
                    CheckboxWidget,
                    FileWidget,
                    IntegerWidget,
                    TextAreaWidget,
                    RadioWidget,
                    RangeWidget,
                    SelectWidget,
                    StringWidget,
                    DisableControlDirective
                ]
            },] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLWZvcm0ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvc2NoZW1hLWZvcm0vc3JjL2xpYi9zY2hlbWEtZm9ybS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBc0IsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFDTCxXQUFXLEVBQ1gsbUJBQW1CLEVBQ3BCLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDN0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUNoRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDbkUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ25FLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDN0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDaEUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUNuRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDbkUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDN0UsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sdURBQXVELENBQUM7QUFFOUYsT0FBTyxFQUNMLGFBQWEsRUFDZCxNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUUsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RixPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMxRSxPQUFPLEVBQUMseUJBQXlCLEVBQUUsNkJBQTZCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUV2RyxPQUFPLEVBQUUsU0FBUyxFQUFZLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFbkYsTUFBTSxlQUFlLEdBQUc7SUFDdEI7UUFDRSxPQUFPLEVBQUUsY0FBYztRQUN2QixRQUFRLEVBQUUscUJBQXFCO0tBQ2hDO0lBQ0Q7UUFDRSxPQUFPLEVBQUUsc0JBQXNCO1FBQy9CLFFBQVEsRUFBRSx1QkFBdUI7S0FDbEM7SUFDRDtRQUNFLE9BQU8sRUFBRSx5QkFBeUI7UUFDbEMsUUFBUSxFQUFFLDZCQUE2QjtLQUN4QztJQUNEO1FBQ0UsT0FBTyxFQUFFLFNBQVM7UUFDbEIsUUFBUSxJQUFjO0tBQ3ZCO0lBQ0Q7UUFDRSxPQUFPLEVBQUUsVUFBVTtRQUNuQixRQUFRLEVBQUUsaUJBQWlCO0tBQzVCO0NBQ0YsQ0FBQztBQTJERixNQUFNLE9BQU8sZ0JBQWdCO0lBRTNCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsU0FBUyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUM7U0FDaEMsQ0FBQztJQUNKLENBQUM7OztZQWhFRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsQ0FBQztnQkFDekQsWUFBWSxFQUFFO29CQUNaLG9CQUFvQjtvQkFDcEIsMEJBQTBCO29CQUMxQixhQUFhO29CQUNiLHNCQUFzQjtvQkFDdEIsYUFBYTtvQkFDYixXQUFXO29CQUNYLFlBQVk7b0JBQ1osWUFBWTtvQkFDWixjQUFjO29CQUNkLFVBQVU7b0JBQ1YsYUFBYTtvQkFDYixjQUFjO29CQUNkLFdBQVc7b0JBQ1gsV0FBVztvQkFDWCxZQUFZO29CQUNaLFlBQVk7b0JBQ1osdUJBQXVCO2lCQUN4QjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2Ysb0JBQW9CO29CQUNwQiwwQkFBMEI7b0JBQzFCLGFBQWE7b0JBQ2Isc0JBQXNCO29CQUN0QixXQUFXO29CQUNYLFlBQVk7b0JBQ1osWUFBWTtvQkFDWixjQUFjO29CQUNkLFVBQVU7b0JBQ1YsYUFBYTtvQkFDYixjQUFjO29CQUNkLFdBQVc7b0JBQ1gsV0FBVztvQkFDWCxZQUFZO29CQUNaLFlBQVk7aUJBQ2I7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGFBQWE7b0JBQ2Isb0JBQW9CO29CQUNwQiwwQkFBMEI7b0JBQzFCLHNCQUFzQjtvQkFDdEIsV0FBVztvQkFDWCxZQUFZO29CQUNaLFlBQVk7b0JBQ1osY0FBYztvQkFDZCxVQUFVO29CQUNWLGFBQWE7b0JBQ2IsY0FBYztvQkFDZCxXQUFXO29CQUNYLFdBQVc7b0JBQ1gsWUFBWTtvQkFDWixZQUFZO29CQUNaLHVCQUF1QjtpQkFDeEI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBGb3Jtc01vZHVsZSxcbiAgUmVhY3RpdmVGb3Jtc01vZHVsZVxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7Rm9ybUVsZW1lbnRDb21wb25lbnR9IGZyb20gJy4vZm9ybWVsZW1lbnQuY29tcG9uZW50JztcbmltcG9ydCB7Rm9ybUNvbXBvbmVudH0gZnJvbSAnLi9mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQge1dpZGdldENob29zZXJDb21wb25lbnR9IGZyb20gJy4vd2lkZ2V0Y2hvb3Nlci5jb21wb25lbnQnO1xuaW1wb3J0IHtBcnJheVdpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9hcnJheS9hcnJheS53aWRnZXQnO1xuaW1wb3J0IHtCdXR0b25XaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvYnV0dG9uL2J1dHRvbi53aWRnZXQnO1xuaW1wb3J0IHtPYmplY3RXaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvb2JqZWN0L29iamVjdC53aWRnZXQnO1xuaW1wb3J0IHtDaGVja2JveFdpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9jaGVja2JveC9jaGVja2JveC53aWRnZXQnO1xuaW1wb3J0IHtGaWxlV2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL2ZpbGUvZmlsZS53aWRnZXQnO1xuaW1wb3J0IHtJbnRlZ2VyV2lkZ2V0fSBmcm9tICcuL2RlZmF1bHR3aWRnZXRzL2ludGVnZXIvaW50ZWdlci53aWRnZXQnO1xuaW1wb3J0IHtUZXh0QXJlYVdpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy90ZXh0YXJlYS90ZXh0YXJlYS53aWRnZXQnO1xuaW1wb3J0IHtSYWRpb1dpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9yYWRpby9yYWRpby53aWRnZXQnO1xuaW1wb3J0IHtSYW5nZVdpZGdldH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0cy9yYW5nZS9yYW5nZS53aWRnZXQnO1xuaW1wb3J0IHtTZWxlY3RXaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvc2VsZWN0L3NlbGVjdC53aWRnZXQnO1xuaW1wb3J0IHtTdHJpbmdXaWRnZXR9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvc3RyaW5nL3N0cmluZy53aWRnZXQnO1xuaW1wb3J0IHtEZWZhdWx0V2lkZ2V0UmVnaXN0cnl9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvZGVmYXVsdHdpZGdldHJlZ2lzdHJ5JztcbmltcG9ydCB7RGlzYWJsZUNvbnRyb2xEaXJlY3RpdmV9IGZyb20gJy4vZGVmYXVsdHdpZGdldHMvX2RpcmVjdGl2ZXMvZGlzYWJsZUNvbnRyb2wuZGlyZWN0aXZlJztcblxuaW1wb3J0IHtcbiAgRGVmYXVsdFdpZGdldFxufSBmcm9tICcuL2RlZmF1bHQud2lkZ2V0JztcblxuaW1wb3J0IHtXaWRnZXRSZWdpc3RyeX0gZnJvbSAnLi93aWRnZXRyZWdpc3RyeSc7XG5pbXBvcnQge1NjaGVtYVZhbGlkYXRvckZhY3RvcnksIFpTY2hlbWFWYWxpZGF0b3JGYWN0b3J5fSBmcm9tICcuL3NjaGVtYXZhbGlkYXRvcmZhY3RvcnknO1xuaW1wb3J0IHtGb3JtRWxlbWVudENvbXBvbmVudEFjdGlvbn0gZnJvbSAnLi9mb3JtZWxlbWVudC5hY3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7RXhwcmVzc2lvbkNvbXBpbGVyRmFjdG9yeSwgSkVYTEV4cHJlc3Npb25Db21waWxlckZhY3Rvcnl9IGZyb20gJy4vZXhwcmVzc2lvbi1jb21waWxlci1mYWN0b3J5JztcblxuaW1wb3J0IHsgTE9HX0xFVkVMLCBMb2dMZXZlbCwgTG9nU2VydmljZSwgRGVmYXVsdExvZ1NlcnZpY2UgfSBmcm9tICcuL2xvZy5zZXJ2aWNlJztcblxuY29uc3QgbW9kdWxlUHJvdmlkZXJzID0gW1xuICB7XG4gICAgcHJvdmlkZTogV2lkZ2V0UmVnaXN0cnksXG4gICAgdXNlQ2xhc3M6IERlZmF1bHRXaWRnZXRSZWdpc3RyeVxuICB9LFxuICB7XG4gICAgcHJvdmlkZTogU2NoZW1hVmFsaWRhdG9yRmFjdG9yeSxcbiAgICB1c2VDbGFzczogWlNjaGVtYVZhbGlkYXRvckZhY3RvcnlcbiAgfSxcbiAge1xuICAgIHByb3ZpZGU6IEV4cHJlc3Npb25Db21waWxlckZhY3RvcnksXG4gICAgdXNlQ2xhc3M6IEpFWExFeHByZXNzaW9uQ29tcGlsZXJGYWN0b3J5XG4gIH0sXG4gIHtcbiAgICBwcm92aWRlOiBMT0dfTEVWRUwsXG4gICAgdXNlVmFsdWU6IExvZ0xldmVsLm9mZlxuICB9LFxuICB7XG4gICAgcHJvdmlkZTogTG9nU2VydmljZSxcbiAgICB1c2VDbGFzczogRGVmYXVsdExvZ1NlcnZpY2VcbiAgfVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBGb3JtRWxlbWVudENvbXBvbmVudCxcbiAgICBGb3JtRWxlbWVudENvbXBvbmVudEFjdGlvbixcbiAgICBGb3JtQ29tcG9uZW50LFxuICAgIFdpZGdldENob29zZXJDb21wb25lbnQsXG4gICAgRGVmYXVsdFdpZGdldCxcbiAgICBBcnJheVdpZGdldCxcbiAgICBCdXR0b25XaWRnZXQsXG4gICAgT2JqZWN0V2lkZ2V0LFxuICAgIENoZWNrYm94V2lkZ2V0LFxuICAgIEZpbGVXaWRnZXQsXG4gICAgSW50ZWdlcldpZGdldCxcbiAgICBUZXh0QXJlYVdpZGdldCxcbiAgICBSYWRpb1dpZGdldCxcbiAgICBSYW5nZVdpZGdldCxcbiAgICBTZWxlY3RXaWRnZXQsXG4gICAgU3RyaW5nV2lkZ2V0LFxuICAgIERpc2FibGVDb250cm9sRGlyZWN0aXZlXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIEZvcm1FbGVtZW50Q29tcG9uZW50LFxuICAgIEZvcm1FbGVtZW50Q29tcG9uZW50QWN0aW9uLFxuICAgIEZvcm1Db21wb25lbnQsXG4gICAgV2lkZ2V0Q2hvb3NlckNvbXBvbmVudCxcbiAgICBBcnJheVdpZGdldCxcbiAgICBCdXR0b25XaWRnZXQsXG4gICAgT2JqZWN0V2lkZ2V0LFxuICAgIENoZWNrYm94V2lkZ2V0LFxuICAgIEZpbGVXaWRnZXQsXG4gICAgSW50ZWdlcldpZGdldCxcbiAgICBUZXh0QXJlYVdpZGdldCxcbiAgICBSYWRpb1dpZGdldCxcbiAgICBSYW5nZVdpZGdldCxcbiAgICBTZWxlY3RXaWRnZXQsXG4gICAgU3RyaW5nV2lkZ2V0XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBGb3JtQ29tcG9uZW50LFxuICAgIEZvcm1FbGVtZW50Q29tcG9uZW50LFxuICAgIEZvcm1FbGVtZW50Q29tcG9uZW50QWN0aW9uLFxuICAgIFdpZGdldENob29zZXJDb21wb25lbnQsXG4gICAgQXJyYXlXaWRnZXQsXG4gICAgQnV0dG9uV2lkZ2V0LFxuICAgIE9iamVjdFdpZGdldCxcbiAgICBDaGVja2JveFdpZGdldCxcbiAgICBGaWxlV2lkZ2V0LFxuICAgIEludGVnZXJXaWRnZXQsXG4gICAgVGV4dEFyZWFXaWRnZXQsXG4gICAgUmFkaW9XaWRnZXQsXG4gICAgUmFuZ2VXaWRnZXQsXG4gICAgU2VsZWN0V2lkZ2V0LFxuICAgIFN0cmluZ1dpZGdldCxcbiAgICBEaXNhYmxlQ29udHJvbERpcmVjdGl2ZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFNjaGVtYUZvcm1Nb2R1bGUge1xuXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U2NoZW1hRm9ybU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU2NoZW1hRm9ybU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogWy4uLm1vZHVsZVByb3ZpZGVyc11cbiAgICB9O1xuICB9XG5cbn1cbiJdfQ==