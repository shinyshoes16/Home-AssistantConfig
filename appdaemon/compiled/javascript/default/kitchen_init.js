$(function(){ //DOM Ready

    function navigate(url)
    {
        window.location.href = url;
    }

    $(document).attr("title", "Kitchen");
    content_width = (135 + 8) * 7 + 8
    $('.gridster').width(content_width)
    $(".gridster ul").gridster({
        widget_margins: [8, 8],
        widget_base_dimensions: [135, 135],
        avoid_overlapped_widgets: true,
        max_rows: 15,
        max_size_x: 7,
        shift_widgets_up: false
    }).data('gridster').disable();
    
    // Add Widgets

    var gridster = $(".gridster ul").gridster().data('gridster');
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-baseclock-default-clock" id="default-clock"><h1 class="date"data-bind="text: date, attr: {style: date_style}"></h1><h2 class="time" data-bind="text: time, attr: {style: time_style}"></h2></div></li>', 2, 1, 1, 1)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-basedisplay-default-last-page" id="default-last-page"><h1 class="title" data-bind="text: title, attr:{ style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{ style: title2_style}"></h1><div class="valueunit" data-bind="attr:{ style: container_style}"><h2 class="value" data-bind="html: value, attr:{ style: value_style}"></h2><p class="unit" data-bind="html: unit, attr:{ style: unit_style}"></p></div><h1 class="state_text" data-bind="text: state_text, attr: {style: state_text_style}"></h1></div></li>', 3, 1, 3, 1)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-basedisplay-default-last-page-time" id="default-last-page-time"><h1 class="title" data-bind="text: title, attr:{ style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{ style: title2_style}"></h1><div class="valueunit" data-bind="attr:{ style: container_style}"><h2 class="value" data-bind="html: value, attr:{ style: value_style}"></h2><p class="unit" data-bind="html: unit, attr:{ style: unit_style}"></p></div><h1 class="state_text" data-bind="text: state_text, attr: {style: state_text_style}"></h1></div></li>', 1, 1, 6, 1)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-basejavascript-default-load-tasks" id="default-load-tasks"><span class="toggle-area" id="switch"></span><h1 class="title" data-bind="text: title, attr:{style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{style: title2_style}"></h1><h2 class="icon" data-bind="attr:{style: icon_style}"><i data-bind="attr: {class: icon}"></i></h2></div></li>', 1, 1, 7, 1)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-baseweather-default-weather" id="default-weather"><h1 class="title" data-bind="text: title, attr:{ style: title_style}"></h1><div data-bind="attr: {style: main_style}"><p class="primary-climacon" data-bind="css: icon"></p><p class="primary-info" data-bind="text: temperature"></p><p class="primary-unit" data-bind="html: unit, attr: {style: unit_style}"></p><br></div><div data-bind="attr: {style: sub_style}"><p class="secondary-detail" data-bind="visible: apparent_temperature"><span class="secondary-icon mdi mdi-thermometer-lines" title="Apparent Temp" data-bind="visible: prefer_icons"></span><span class="secondary-info" data-bind="visible: !prefer_icons()">Apparent Temp:&nbsp;</span><span class="secondary-info" data-bind="html: apparent_temperature"></span><span class="secondary-info" data-bind="html: unit, attr: {style: sub_unit_style}"></span></p><p class="secondary-detail" data-bind="visible: humidity"><span class="secondary-icon mdi mdi-water-percent" title="Humidity" data-bind="visible: prefer_icons"></span><span class="secondary-info" data-bind="visible: !prefer_icons()">Humidity:&nbsp;</span><span class="secondary-info" data-bind="text: humidity"></span><span class="secondary-unit" data-bind="attr: {style: sub_unit_style}">%</span><br></p><p class="secondary-detail"  data-bind="visible: precip_probability() || precip_intensity()"><span data-bind="visible: precip_probability"><span class="secondary-icon mdi" title="Rain" data-bind="visible: prefer_icons, css: precip_type_icon"></span><span class="secondary-info" data-bind="visible: !prefer_icons()">Rain:&nbsp;</span><span class="secondary-info" data-bind="text: precip_probability"></span><span class="secondary-unit" data-bind="attr: {style: sub_unit_style}">%</span></span><span data-bind="visible: precip_intensity"><span class="secondary-info" data-bind="visible: precip_intensity() && precip_probability()">&nbsp;/&nbsp;</span><span class="secondary-info" data-bind="text: precip_intensity"></span><span class="secondary-unit" data-bind="text: rain_unit, attr: {style: sub_unit_style}"></span></span></p><p class="secondary-detail" data-bind="visible: wind_speed"><span class="secondary-icon mdi mdi-weather-windy" data-bind="visible: prefer_icons, css: bearing_icon, attr: {title: wind_bearing() + \'&deg;\'}"></span><span class="secondary-info" data-bind="visible: !prefer_icons()">Wind:&nbsp;</span><span class="secondary-info" data-bind="text: wind_speed"></span><span class="secondary-unit" data-bind="text: wind_unit, attr: {style: sub_unit_style}"></span></p><p class="secondary-detail" data-bind="visible: wind_bearing() && !prefer_icons()"><span class="secondary-info" data-bind="html: wind_bearing"></span><span class="secondary-unit" data-bind="attr: {style: sub_unit_style}">&deg;</span></p><p class="secondary-detail" data-bind="visible: pressure() != \'\'"><span class="secondary-icon mdi mdi-gauge" data-bind="visible: prefer_icons"></span><span class="secondary-info" data-bind="visible: !prefer_icons()">Pressure:&nbsp;</span><span class="secondary-info" data-bind="text: pressure"></span><span class="secondary-info" data-bind="text: pressure_unit, attr: {style: sub_unit_style}"></span></p><div data-bind="visible: show_forecast"> <hr><h1 class="title" data-bind="text: forecast_title, attr:{ style: title_style}, visible: show_forecast"></h1><p class="secondary-detail" data-bind="visible: forecast_temperature_min"><span class="secondary-climacon" data-bind="css: forecast_icon"></span></p><p class="secondary-detail" data-bind="visible: forecast_temperature_min"><span class="secondary-info" data-bind="text: forecast_temperature_min"></span><span class="secondary-info" data-bind="visible: forecast_temperature_max"><span>/</span><span class="secondary-info" data-bind="text: forecast_temperature_max"></span></span></p><p class="secondary-detail" data-bind="visible: forecast_precip_probability"><span class="secondary-icon mdi" title="Rain" data-bind="visible: prefer_icons, css: forecast_precip_type_icon"></span><span class="secondary-info" data-bind="visible: !prefer_icons()">Rain:&nbsp;</span><span class="secondary-info" data-bind="text: forecast_precip_probability"></span><span class="secondary-icon" data-bind="attr: {style: sub_unit_style}">%</span></p></div></div></div></li>', 2, 2, 1, 2)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-baseswitch-default-lights" id="default-lights"><span class="toggle-area" id="switch"></span><h1 class="title" data-bind="text: title, attr:{style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{style: title2_style}"></h1><h2 class="icon" data-bind="attr:{style: icon_style}"><i data-bind="attr: {class: icon}"></i></h2><h1 class="state_text" data-bind="text: state_text, attr: {style: state_text_style}"></h1></div></li>', 1, 1, 3, 2)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-baseentitypicture-default-moon" id="default-moon"><h1 class="title" data-bind="text: title, attr: {style: title_style}"></h1><div class="outer-image" data-bind="attr: {style: image_style}"><img class="img-frame" data-bind="attr: {src: img_inernal_src, style: img_internal_style}"></img></div></div></li>', 1, 1, 4, 2)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-baseswitch-default-russound-power" id="default-russound-power"><span class="toggle-area" id="switch"></span><h1 class="title" data-bind="text: title, attr:{style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{style: title2_style}"></h1><h2 class="icon" data-bind="attr:{style: icon_style}"><i data-bind="attr: {class: icon}"></i></h2><h1 class="state_text" data-bind="text: state_text, attr: {style: state_text_style}"></h1></div></li>', 1, 1, 6, 2)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-basejavascript-default-reload" id="default-reload"><span class="toggle-area" id="switch"></span><h1 class="title" data-bind="text: title, attr:{style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{style: title2_style}"></h1><h2 class="icon" data-bind="attr:{style: icon_style}"><i data-bind="attr: {class: icon}"></i></h2></div></li>', 1, 1, 7, 2)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-basejavascript-default-load-camera" id="default-load-camera"><span class="toggle-area" id="switch"></span><h1 class="title" data-bind="text: title, attr:{style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{style: title2_style}"></h1><h2 class="icon" data-bind="attr:{style: icon_style}"><i data-bind="attr: {class: icon}"></i></h2></div></li>', 1, 1, 3, 3)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-basejavascript-default-load-media" id="default-load-media"><span class="toggle-area" id="switch"></span><h1 class="title" data-bind="text: title, attr:{style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{style: title2_style}"></h1><h2 class="icon" data-bind="attr:{style: icon_style}"><i data-bind="attr: {class: icon}"></i></h2></div></li>', 1, 1, 4, 3)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-baseswitch-default-big105" id="default-big105"><span class="toggle-area" id="switch"></span><h1 class="title" data-bind="text: title, attr:{style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{style: title2_style}"></h1><h2 class="icon" data-bind="attr:{style: icon_style}"><i data-bind="attr: {class: icon}"></i></h2><h1 class="state_text" data-bind="text: state_text, attr: {style: state_text_style}"></h1></div></li>', 1, 1, 5, 3)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-basemedia-default-russound" id="default-russound"><h1 class="title" data-bind="text: title, attr:{style: title_style}"></h1><h1 class="artist" data-bind="text: artist, attr:{style: artist_style}"></h1><h1 class="media_title" data-bind="text: media_title, attr:{style: media_title_style}"></h1><h1 class="album" data-bind="text: album, attr:{style: album_style}"></h1><h2 id="previous" class="previous" data-bind="attr:{style: previous_icon_style}"><i data-bind="attr: {class: previous_icon}"></i></h2><h2 id="play" class="play" data-bind="attr:{style: play_icon_style}"><i data-bind="attr: {class: play_icon}"></i></h2><h2 id="next" class="next" data-bind="attr:{style: next_icon_style}"><i data-bind="attr: {class: next_icon}"></i></h2><p class="state_text" data-bind="text: state_text, attr:{style: state_text_style}"></p><div class="levelunit"><p class="level" data-bind="text: level, attr:{style: level_style}"></p><p class="unit" data-bind="attr:{style: units_style}">%</p></div><p class="secondary-icon minus"><i data-bind="attr: {class: icon_down, style: level_down_style}" id="level-down"></i></p><p class="secondary-icon plus"><i data-bind="attr: {class: icon_up, style: level_up_style}" id="level-up"></i></p></div></li>', 2, 2, 6, 3)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-basedisplay-default-sensor-thermostat-setpoint" id="default-sensor-thermostat-setpoint"><h1 class="title" data-bind="text: title, attr:{ style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{ style: title2_style}"></h1><div class="valueunit" data-bind="attr:{ style: container_style}"><h2 class="value" data-bind="html: value, attr:{ style: value_style}"></h2><p class="unit" data-bind="html: unit, attr:{ style: unit_style}"></p></div><h1 class="state_text" data-bind="text: state_text, attr: {style: state_text_style}"></h1></div></li>', 1, 1, 1, 4)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-baseclimate-default-thermostat" id="default-thermostat"><h1 class="title" data-bind="text: title, attr:{style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{style: title2_style}"></h1><div class="levelunits"><h2 class="level" data-bind="text: level, attr:{ style: level_style}"></h2><p class="units" data-bind="html: units, attr:{ style: unit_style}"></p></div><div class="levelunits2"><p class="level2" data-bind="text: level2, attr:{style: level2_style}"></p><p class="units2" data-bind="html: units, attr:{style: unit2_style}"></p></div><p class="secondary-icon minus"><i data-bind="attr: {class: icon_down, style: level_down_style}" id="level-down"></i></p><p class="secondary-icon plus"><i data-bind="attr: {class: icon_up, style: level_up_style}" id="level-up"></i></p></div></li>', 2, 1, 2, 4)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-baseswitch-default-restartha" id="default-restartha"><span class="toggle-area" id="switch"></span><h1 class="title" data-bind="text: title, attr:{style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{style: title2_style}"></h1><h2 class="icon" data-bind="attr:{style: icon_style}"><i data-bind="attr: {class: icon}"></i></h2><h1 class="state_text" data-bind="text: state_text, attr: {style: state_text_style}"></h1></div></li>', 1, 1, 4, 4)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-baseswitch-default-realcountry" id="default-realcountry"><span class="toggle-area" id="switch"></span><h1 class="title" data-bind="text: title, attr:{style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{style: title2_style}"></h1><h2 class="icon" data-bind="attr:{style: icon_style}"><i data-bind="attr: {class: icon}"></i></h2><h1 class="state_text" data-bind="text: state_text, attr: {style: state_text_style}"></h1></div></li>', 1, 1, 5, 4)
    
    
    
    var widgets = {}
    // Initialize Widgets
    
        widgets["default-clock"] = new baseclock("default-clock", "", "default", {'widget_type': 'baseclock', 'fields': {'date': '', 'time': ''}, 'static_css': {'date_style': 'color: #fff;', 'time_style': 'color: #aa00ff;', 'widget_style': 'background-color: #444;'}, 'static_icons': [], 'icons': [], 'css': {}, 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    
        widgets["default-last-page"] = new basedisplay("default-last-page", "", "default", {'widget_type': 'basedisplay', 'fields': {'title': 'Last Page Content', 'title2': '', 'value': '', 'unit': '', 'state_text': ''}, 'static_css': {'title_style': 'color: #fff;', 'title2_style': 'color: #fff;', 'unit_style': '', 'value_style': 'color: #fff;', 'state_text_style': 'color: #fff;', 'widget_style': 'background-color: #444;font-size: 50%;', 'container_style': ''}, 'css': {}, 'icons': [], 'static_icons': [], 'entity': 'input_text.last_page', 'widget_style': 'font-size: 50%;', 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    
        widgets["default-last-page-time"] = new basedisplay("default-last-page-time", "", "default", {'widget_type': 'basedisplay', 'fields': {'title': 'Last Page Content', 'title2': '', 'value': '', 'unit': '', 'state_text': ''}, 'static_css': {'title_style': 'color: #fff;', 'title2_style': 'color: #fff;', 'unit_style': '', 'value_style': 'color: #fff;', 'state_text_style': 'color: #fff;', 'widget_style': 'background-color: #444;font-size: 50%;', 'container_style': ''}, 'css': {}, 'icons': [], 'static_icons': [], 'entity': 'input_datetime.last_page_time', 'widget_style': 'font-size: 50%;', 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    
        widgets["default-load-tasks"] = new basejavascript("default-load-tasks", "", "default", {'widget_type': 'basejavascript', 'fields': {'title': 'Other Tasks', 'title2': '', 'icon': '', 'icon_style': ''}, 'icons': {'icon_active': 'test', 'icon_inactive': 'test'}, 'static_css': {'title_style': 'color: #fff;', 'title2_style': 'color: #fff;', 'widget_style': 'background-color: #444;'}, 'css': {'icon_active_style': 'color: #fff;', 'icon_inactive_style': 'color: #fff;'}, 'static_icons': [], 'icon_active': 'test', 'icon_inactive': 'test', 'url': '/tasks', 'args': {'timeout': 30, 'return': 'kitchen'}, 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    
        widgets["default-weather"] = new baseweather("default-weather", "", "default", {'widget_type': 'baseweather', 'fields': {'title': 'Today', 'show_forecast': 1, 'prefer_icons': 1, 'unit': '', 'wind_unit': '', 'pressure_unit': '', 'rain_unit': '', 'temperature': '', 'humidity': '', 'precip_probability': '', 'precip_intensity': '', 'precip_type': '', 'wind_speed': '', 'pressure': '', 'wind_bearing': '', 'apparent_temperature': '', 'icon': '', 'bearing_icon': 'mdi-rotate-0', 'precip_type_icon': 'mdi-umbrella', 'forecast_title': '', 'forecast_temperature_min': '', 'forecast_temperature_max': '', 'forecast_icon': '', 'forecast_precip_probability': '', 'forecast_precip_type': '', 'forecast_precip_type_icon': 'mdi-umbrella'}, 'entities': {'icon': 'sensor.dark_sky_icon', 'temperature': 'sensor.dark_sky_temperature', 'apparent_temperature': 'sensor.dark_sky_apparent_temperature', 'humidity': 'sensor.dark_sky_humidity', 'precip_probability': 'sensor.dark_sky_precip_probability', 'precip_intensity': 'sensor.dark_sky_precip_intensity', 'precip_type': 'sensor.dark_sky_precip', 'pressure': 'sensor.dark_sky_pressure', 'wind_speed': 'sensor.dark_sky_wind_speed', 'wind_bearing': 'sensor.dark_sky_wind_bearing', 'forecast_icon': 'sensor.dark_sky_icon_1d', 'forecast_temperature_min': 'sensor.dark_sky_daily_low_temperature_1d', 'forecast_temperature_max': 'sensor.dark_sky_daily_high_temperature_1d', 'forecast_precip_probability': 'sensor.dark_sky_precip_probability_1d', 'forecast_precip_type': 'sensor.dark_sky_precip_1d'}, 'css': {}, 'static_css': {'title_style': 'color: #00aaff;', 'unit_style': 'color: #ffaa00;', 'main_style': 'color: #ffaa00;', 'sub_style': 'color: #00aaff;', 'sub_unit_style': 'color: #00aaff;', 'widget_style': 'background-color: #444;'}, 'icons': {'snow': 'mdi-snowflake', 'rain': 'mdi-umbrella', 'sleet': 'mdi-weather-snowy-rainy', 'unknown': 'mdi-umbrella'}, 'static_icons': [], 'units': '&deg;C', 'title': 'Today', 'show_forecast': 1, 'prefer_icons': 1, 'sensors': {'icon': 'sensor.dark_sky_icon'}, 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    
        widgets["default-lights"] = new baseswitch("default-lights", "", "default", {'widget_type': 'baseswitch', 'entity': 'group.interior_lights', 'state_active': 'on', 'state_inactive': 'off', 'enable': 1, 'post_service_active': {'service': 'homeassistant/turn_on', 'entity_id': 'group.interior_lights'}, 'post_service_inactive': {'service': 'homeassistant/turn_off', 'entity_id': 'group.interior_lights'}, 'fields': {'title': 'Interior Lights Toggle', 'title2': '', 'icon': '', 'icon_style': '', 'state_text': ''}, 'icons': {'icon_on': 'mdi-lightbulb-on', 'icon_off': 'mdi-lightbulb-on-outline'}, 'static_icons': [], 'css': {'icon_style_active': 'color: #aaff00;', 'icon_style_inactive': 'color: #888;'}, 'static_css': {'title_style': 'color: #fff;', 'title2_style': 'color: #fff;', 'state_text_style': 'color: #fff;', 'widget_style': 'background-color: #444;'}, 'icon_on': 'mdi-lightbulb-on', 'icon_off': 'mdi-lightbulb-on-outline', 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    
        widgets["default-moon"] = new baseentitypicture("default-moon", "", "default", {'widget_type': 'baseentitypicture', 'entity': 'sensor.moon_phase', 'fields': {'title': 'Moon Phase', 'base_url': 'http://192.168.1.4:8123', 'image_style': '', 'img_inernal_src': '', 'img_internal_style': ''}, 'icons': [], 'static_css': {'title_style': 'color: #fff;', 'widget_style': 'background-color: #444;'}, 'css': {}, 'static_icons': [], 'title': 'Moon Phase', 'base_url': 'http://192.168.1.4:8123', 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    
        widgets["default-russound-power"] = new baseswitch("default-russound-power", "", "default", {'widget_type': 'baseswitch', 'entity': 'media_player.kitchen', 'state_active': 'on', 'state_inactive': 'off', 'enable': 1, 'post_service_active': {'service': 'homeassistant/turn_on', 'entity_id': 'media_player.kitchen'}, 'post_service_inactive': {'service': 'homeassistant/turn_off', 'entity_id': 'media_player.kitchen'}, 'fields': {'title': 'Russound Power', 'title2': '', 'icon': '', 'icon_style': '', 'state_text': ''}, 'icons': {'icon_on': 'fas-circle', 'icon_off': 'far-circle'}, 'static_icons': [], 'css': {'icon_style_active': 'color: #aaff00;', 'icon_style_inactive': 'color: #888;'}, 'static_css': {'title_style': 'color: #fff;', 'title2_style': 'color: #fff;', 'state_text_style': 'color: #fff;', 'widget_style': 'background-color: #444;'}, 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    
        widgets["default-reload"] = new basejavascript("default-reload", "", "default", {'widget_type': 'basejavascript', 'command': 'location.reload(true)', 'fields': {'title': 'Reload', 'title2': '', 'icon': '', 'icon_style': ''}, 'icons': {'icon_active': 'mdi-refresh', 'icon_inactive': 'mdi-refresh'}, 'static_css': {'title_style': 'color: #fff;', 'title2_style': 'color: #fff;', 'widget_style': 'background-color: #444;'}, 'css': {'icon_active_style': 'color: #fff;', 'icon_inactive_style': 'color: #fff;'}, 'static_icons': [], 'icon_active': 'mdi-refresh', 'icon_inactive': 'mdi-refresh', 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    
        widgets["default-load-camera"] = new basejavascript("default-load-camera", "", "default", {'widget_type': 'basejavascript', 'fields': {'title': 'Driveway Camera', 'title2': '', 'icon': '', 'icon_style': ''}, 'icons': {'icon_active': 'mdi-cctv', 'icon_inactive': 'mdi-cctv'}, 'static_css': {'title_style': 'color: #fff;', 'title2_style': 'color: #fff;', 'widget_style': 'background-color: #444;'}, 'css': {'icon_active_style': 'color: #fff;', 'icon_inactive_style': 'color: #fff;'}, 'static_icons': [], 'icon_active': 'mdi-cctv', 'icon_inactive': 'mdi-cctv', 'url': '/camera', 'args': {'timeout': 10, 'return': 'kitchen'}, 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    
        widgets["default-load-media"] = new basejavascript("default-load-media", "", "default", {'widget_type': 'basejavascript', 'fields': {'title': 'Media Control', 'title2': '', 'icon': '', 'icon_style': ''}, 'icons': {'icon_active': 'mdi-television-classic', 'icon_inactive': 'mdi-television-classic'}, 'static_css': {'title_style': 'color: #fff;', 'title2_style': 'color: #fff;', 'widget_style': 'background-color: #444;'}, 'css': {'icon_active_style': 'color: #fff;', 'icon_inactive_style': 'color: #fff;'}, 'static_icons': [], 'icon_active': 'mdi-television-classic', 'icon_inactive': 'mdi-television-classic', 'url': '/media', 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    
        widgets["default-big105"] = new baseswitch("default-big105", "", "default", {'widget_type': 'baseswitch', 'entity': 'script.set_kitchen_to_big105', 'state_inactive': 'off', 'state_active': 'on', 'enable': 1, 'momentary': 1000, 'ignore_state': 1, 'post_service_active': {'service': 'homeassistant/turn_on', 'entity_id': 'script.set_kitchen_to_big105'}, 'post_service_inactive': {'service': 'homeassistant/turn_off', 'entity_id': 'script.set_kitchen_to_big105'}, 'fields': {'title': 'Big 105', 'title2': '', 'icon': '', 'icon_style': '', 'state_text': ''}, 'icons': {'icon_on': 'mdi-music-note-eighth', 'icon_off': 'mdi-music-note-eighth'}, 'static_icons': [], 'css': {'icon_style_active': 'color: #aaff00;', 'icon_style_inactive': 'color: #888;'}, 'static_css': {'title_style': 'color: #fff;', 'title2_style': 'color: #fff;', 'state_text_style': 'color: #fff;', 'widget_style': 'background-color: #444;'}, 'icon_on': 'mdi-music-note-eighth', 'icon_off': 'mdi-music-note-eighth', 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    
        widgets["default-russound"] = new basemedia("default-russound", "", "default", {'widget_type': 'basemedia', 'entity': 'media_player.kitchen', 'post_service_next': {'service': 'media_player/media_next_track', 'entity_id': 'media_player.kitchen'}, 'post_service_previous': {'service': 'media_player/media_previous_track', 'entity_id': 'media_player.kitchen'}, 'post_service_play_pause': {'service': 'media_player/media_play_pause', 'entity_id': 'media_player.kitchen'}, 'post_service_pause': {'service': 'media_player/media_pause', 'entity_id': 'media_player.kitchen'}, 'post_service_stop': {'service': 'media_player/media_stop', 'entity_id': 'media_player.kitchen'}, 'post_service_level': {'service': 'media_player/volume_set', 'entity_id': 'media_player.kitchen'}, 'fields': {'title': 'Kitchen Russound', 'artist': '', 'media_title': '', 'album': '', 'play_icon_style': '', 'pause_icon_style': '', 'previous_icon_style': '', 'next_icon_style': '', 'state_text': '', 'level': ''}, 'icons': {'play_icon': 'fas-play', 'pause_icon': 'fas-pause'}, 'static_icons': {'previous_icon': 'fas-step-backward', 'next_icon': 'fas-step-forward', 'icon_up': 'fas-plus', 'icon_down': 'fas-minus'}, 'static_css': {'previous_icon_style': 'color: #888;', 'next_icon_style': 'color: #888;', 'title_style': 'color: #fff;', 'artist_style': 'color: #fff;', 'album_style': 'color: #fff;', 'media_title_style': 'color: #fff;', 'state_text_style': 'color: #fff;', 'level_style': 'color: #fff;', 'level_up_style': 'color: #888;', 'level_down_style': 'color: #888;', 'widget_style': 'background-color: #444;', 'units_style': 'color: #fff;'}, 'css': {'icon_style_active': 'color: #aaff00;', 'icon_style_inactive': 'color: #888;'}, 'step': 1, 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    
        widgets["default-sensor-thermostat-setpoint"] = new basedisplay("default-sensor-thermostat-setpoint", "", "default", {'widget_type': 'basedisplay', 'entity': 'sensor.thermostat_setpoint', 'entity_to_sub_entity_attribute': '', 'sub_entity': '', 'sub_entity_to_entity_attribute': '', 'fields': {'title': '', 'title2': '', 'value': '', 'unit': '', 'state_text': ''}, 'static_css': {'title_style': 'color: #fff;', 'title2_style': 'color: #fff;', 'state_text_style': 'color: #fff;font-size: 100%;', 'widget_style': 'background-color: #444;', 'container_style': ''}, 'css': {'value_style': 'color: #00aaff;font-size: 250%;', 'text_style': 'color: #fff;font-size: 100%;', 'unit_style': 'color: #00aaff;font-size: 100%;'}, 'icons': [], 'static_icons': [], 'title_is_friendly_name': 1, 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    
        widgets["default-thermostat"] = new baseclimate("default-thermostat", "", "default", {'widget_type': 'baseclimate', 'entity': 'climate.hallway_thermostat', 'post_service': {'service': 'climate/set_temperature', 'entity_id': 'climate.hallway_thermostat'}, 'fields': {'title': 'Thermostat Control', 'title2': '', 'units': '&deg;C', 'level': '', 'level2': ''}, 'icons': [], 'css': {}, 'static_icons': {'icon_up': 'fas-plus', 'icon_down': 'fas-minus'}, 'static_css': {'title_style': 'color: #fff;', 'title2_style': 'color: #fff;', 'level_style': 'color: #00aaff;', 'level2_style': 'color: #00aaff;', 'level_up_style': 'color: #888;', 'level_down_style': 'color: #888;', 'widget_style': 'background-color: #444;', 'unit_style': 'color: #00aaff;', 'unit2_style': 'color: #00aaff;'}, 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    
        widgets["default-restartha"] = new baseswitch("default-restartha", "", "default", {'widget_type': 'baseswitch', 'entity': 'script.restartha', 'state_inactive': 'off', 'state_active': 'on', 'enable': 1, 'momentary': 1000, 'ignore_state': 1, 'post_service_active': {'service': 'homeassistant/turn_on', 'entity_id': 'script.restartha'}, 'post_service_inactive': {'service': 'homeassistant/turn_off', 'entity_id': 'script.restartha'}, 'fields': {'title': 'Restart Home Assistant', 'title2': '', 'icon': '', 'icon_style': '', 'state_text': ''}, 'icons': {'icon_on': 'fas-th-large', 'icon_off': 'fas-th-large'}, 'static_icons': [], 'css': {'icon_style_active': 'color: #aaff00;', 'icon_style_inactive': 'color: #888;'}, 'static_css': {'title_style': 'color: #fff;', 'title2_style': 'color: #fff;', 'state_text_style': 'color: #fff;', 'widget_style': 'background-color: #444;'}, 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    
        widgets["default-realcountry"] = new baseswitch("default-realcountry", "", "default", {'widget_type': 'baseswitch', 'entity': 'script.set_kitchen_to_real_country', 'state_inactive': 'off', 'state_active': 'on', 'enable': 1, 'momentary': 1000, 'ignore_state': 1, 'post_service_active': {'service': 'homeassistant/turn_on', 'entity_id': 'script.set_kitchen_to_real_country'}, 'post_service_inactive': {'service': 'homeassistant/turn_off', 'entity_id': 'script.set_kitchen_to_real_country'}, 'fields': {'title': 'Real Country', 'title2': '', 'icon': '', 'icon_style': '', 'state_text': ''}, 'icons': {'icon_on': 'mdi-cow', 'icon_off': 'mdi-cow'}, 'static_icons': [], 'css': {'icon_style_active': 'color: #aaff00;', 'icon_style_inactive': 'color: #888;'}, 'static_css': {'title_style': 'color: #fff;', 'title2_style': 'color: #fff;', 'state_text_style': 'color: #fff;', 'widget_style': 'background-color: #444;'}, 'icon_on': 'mdi-cow', 'icon_off': 'mdi-cow', 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    

    // Setup click handler to cancel timeout navigations

    $( ".gridster" ).click(function(){
        clearTimeout(myTimeout);
        if (myTimeoutSticky) {
            myTimeout = setTimeout(function() { navigate(myTimeoutUrl); }, myTimeoutDelay);
        }
    });

    // Set up timeout

    var myTimeout;
    var myTimeoutUrl;
    var myTimeoutDelay;
    var myTimeoutSticky = 0;

    if (location.search != "")
    {
        var query = location.search.substr(1);
        var result = {};
        query.split("&").forEach(function(part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
        });

        if ("timeout" in result && "return" in result)
        {
            url = result.return
            argcount = 0
            for (arg in result)
            {
                if (arg != "timeout" && arg != "return" && arg != "sticky")
                {
                    if (argcount == 0)
                    {
                        url += "?";
                    }
                    else
                    {
                        url += "?";
                    }
                    argcount ++;
                    url += arg + "=" + result[arg]
                }
            }
            if ("sticky" in result)
            {
                myTimeoutSticky = (result.sticky == "1");
            }
            myTimeoutUrl = url;
            myTimeoutDelay = result.timeout * 1000;
            myTimeout = setTimeout(function() { navigate(url); }, result.timeout * 1000);
        }
    }

    // Start listening for HA Events

    
    if (location.protocol == 'https:')
    {
        wsprot = "wss:"
    }
    else
    {
        wsprot = "ws:"
    }
    var stream_url = wsprot + '//' + location.host + '/stream'
    

    ha_status(stream_url, "Kitchen", widgets, "ws");

});