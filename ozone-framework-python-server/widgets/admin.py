from django.contrib import admin
from .models import WidgetDefinition, WidgetType, WidgetDefIntentDataTypes, WidgetDefIntent, WidgetDefinitionWidgetTypes


class WidgetDefinitionAdmin(admin.ModelAdmin):
    list_display = ('id', 'display_name', 'universal_name', 'widget_guid', 'description')
    search_fields = ('display_name', 'universal_name', 'widget_guid')


class WidgetTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'display_name', 'name', 'version')
    search_fields = ('display_name', 'name', 'version')


class WidgetDefinitionWidgetTypesAdmin(admin.ModelAdmin):
    list_display = ('id', 'widget_definition', 'widget_type')


admin.site.register(WidgetDefinitionWidgetTypes, WidgetDefinitionWidgetTypesAdmin)
admin.site.register(WidgetDefinition, WidgetDefinitionAdmin)
admin.site.register(WidgetType, WidgetTypeAdmin)
