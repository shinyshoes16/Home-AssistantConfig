$(function(){ //DOM Ready

    function navigate(url)
    {
        window.location.href = url;
    }

    $(document).attr("title", "Tasks");
    content_width = (120 + 8) * 6 + 8
    $('.gridster').width(content_width)
    $(".gridster ul").gridster({
        widget_margins: [8, 8],
        widget_base_dimensions: [120, 120],
        avoid_overlapped_widgets: true,
        max_rows: 15,
        max_size_x: 6,
        shift_widgets_up: false
    }).data('gridster').disable();
    
    // Add Widgets

    var gridster = $(".gridster ul").gridster().data('gridster');
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-baseclock-default-clock" id="default-clock"><h1 class="date"data-bind="text: date, attr: {style: date_style}"></h1><h2 class="time" data-bind="text: time, attr: {style: time_style}"></h2></div></li>', 2, 1, 1, 1)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-basedisplay-default-last-page" id="default-last-page"><h1 class="title" data-bind="text: title, attr:{ style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{ style: title2_style}"></h1><div class="valueunit" data-bind="attr:{ style: container_style}"><h2 class="value" data-bind="html: value, attr:{ style: value_style}"></h2><p class="unit" data-bind="html: unit, attr:{ style: unit_style}"></p></div><h1 class="state_text" data-bind="text: state_text, attr: {style: state_text_style}"></h1></div></li>', 3, 1, 3, 1)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-basedisplay-default-last-page-time" id="default-last-page-time"><h1 class="title" data-bind="text: title, attr:{ style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{ style: title2_style}"></h1><div class="valueunit" data-bind="attr:{ style: container_style}"><h2 class="value" data-bind="html: value, attr:{ style: value_style}"></h2><p class="unit" data-bind="html: unit, attr:{ style: unit_style}"></p></div><h1 class="state_text" data-bind="text: state_text, attr: {style: state_text_style}"></h1></div></li>', 1, 1, 6, 1)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-baseselect-default-driveway-horn-suppress-time" id="default-driveway-horn-suppress-time"><h1 class="title" data-bind="text: title, attr:{style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{style: title2_style}"></h1><div class="styled-select" data-bind="attr:{style: selectcontainer_style}">  <select data-bind="options: inputoptions, value: selectedoption, attr:{style: select_style}">  </select></div></div></li>', 1, 1, 1, 2)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-baseswitch-default-driveway-horn-suppress" id="default-driveway-horn-suppress"><span class="toggle-area" id="switch"></span><h1 class="title" data-bind="text: title, attr:{style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{style: title2_style}"></h1><h2 class="icon" data-bind="attr:{style: icon_style}"><i data-bind="attr: {class: icon}"></i></h2><h1 class="state_text" data-bind="text: state_text, attr: {style: state_text_style}"></h1></div></li>', 1, 1, 2, 2)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-baseswitch-default-enable-driveway-horn" id="default-enable-driveway-horn"><span class="toggle-area" id="switch"></span><h1 class="title" data-bind="text: title, attr:{style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{style: title2_style}"></h1><h2 class="icon" data-bind="attr:{style: icon_style}"><i data-bind="attr: {class: icon}"></i></h2><h1 class="state_text" data-bind="text: state_text, attr: {style: state_text_style}"></h1></div></li>', 1, 1, 3, 2)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-basejavascript-default-reload" id="default-reload"><span class="toggle-area" id="switch"></span><h1 class="title" data-bind="text: title, attr:{style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{style: title2_style}"></h1><h2 class="icon" data-bind="attr:{style: icon_style}"><i data-bind="attr: {class: icon}"></i></h2></div></li>', 1, 1, 4, 2)
    
    
    
    var widgets = {}
    // Initialize Widgets
    
        widgets["default-clock"] = new baseclock("default-clock", "", "default", {'widget_type': 'baseclock', 'fields': {'date': '', 'time': ''}, 'static_css': {'date_style': 'color: #fff;', 'time_style': 'color: #aa00ff;', 'widget_style': 'background-color: #444;'}, 'static_icons': [], 'icons': [], 'css': {}, 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    
        widgets["default-last-page"] = new basedisplay("default-last-page", "", "default", {'widget_type': 'basedisplay', 'fields': {'title': 'Last Page Content', 'title2': '', 'value': '', 'unit': '', 'state_text': ''}, 'static_css': {'title_style': 'color: #fff;', 'title2_style': 'color: #fff;', 'unit_style': '', 'value_style': 'color: #fff;', 'state_text_style': 'color: #fff;', 'widget_style': 'background-color: #444;font-size: 50%;', 'container_style': ''}, 'css': {}, 'icons': [], 'static_icons': [], 'entity': 'input_text.last_page', 'widget_style': 'font-size: 50%;', 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    
        widgets["default-last-page-time"] = new basedisplay("default-last-page-time", "", "default", {'widget_type': 'basedisplay', 'fields': {'title': 'Last Page Content', 'title2': '', 'value': '', 'unit': '', 'state_text': ''}, 'static_css': {'title_style': 'color: #fff;', 'title2_style': 'color: #fff;', 'unit_style': '', 'value_style': 'color: #fff;', 'state_text_style': 'color: #fff;', 'widget_style': 'background-color: #444;font-size: 50%;', 'container_style': ''}, 'css': {}, 'icons': [], 'static_icons': [], 'entity': 'input_datetime.last_page_time', 'widget_style': 'font-size: 50%;', 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    
        widgets["default-driveway-horn-suppress-time"] = new baseselect("default-driveway-horn-suppress-time", "", "default", {'widget_type': 'baseselect', 'entity': 'input_select.driveway_horn_suppression_time', 'post_service': {'service': 'input_select/select_option', 'entity_id': 'input_select.driveway_horn_suppression_time'}, 'fields': {'title': 'Suppress Driveway horn for:', 'title2': '', 'inputoptions': [], 'selectedoption': ''}, 'icons': [], 'css': {}, 'static_icons': {}, 'static_css': {'title_style': 'color: #fff;', 'title2_style': 'color: #fff;', 'select_style': 'background-color: #999;color:black;', 'selectcontainer_style': '', 'widget_style': 'background-color: #444;'}, 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    
        widgets["default-driveway-horn-suppress"] = new baseswitch("default-driveway-horn-suppress", "", "default", {'widget_type': 'baseswitch', 'entity': 'input_select.driveway_horn_suppression_time', 'state_active': '', 'enable': 1, 'post_service_active': {'service': 'script/turn_on', 'entity_id': 'script.disable_driveway_horn'}, 'fields': {'title': 'Submit Horn Suppression', 'title2': '', 'icon': '', 'icon_style': '', 'state_text': ''}, 'icons': {'icon_on': 'fas-arrows-alt', 'icon_off': 'fas-arrows-alt'}, 'static_icons': [], 'css': {'icon_style_active': 'color: #aaff00;', 'icon_style_inactive': 'color: #888;'}, 'static_css': {'title_style': 'color: #fff;', 'title2_style': 'color: #fff;', 'state_text_style': 'color: #fff;', 'widget_style': 'background-color: #444;'}, 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    
        widgets["default-enable-driveway-horn"] = new baseswitch("default-enable-driveway-horn", "", "default", {'widget_type': 'baseswitch', 'entity': 'script.enable_driveway_horn', 'state_inactive': 'off', 'state_active': 'on', 'enable': 1, 'momentary': 1000, 'ignore_state': 1, 'post_service_active': {'service': 'homeassistant/turn_on', 'entity_id': 'script.enable_driveway_horn'}, 'post_service_inactive': {'service': 'homeassistant/turn_off', 'entity_id': 'script.enable_driveway_horn'}, 'fields': {'title': 'End Driveway Horn Suppression', 'title2': '', 'icon': '', 'icon_style': '', 'state_text': ''}, 'icons': {'icon_on': 'mdi-air-horn', 'icon_off': 'mdi-air-horn'}, 'static_icons': [], 'css': {'icon_style_active': 'color: #aaff00;', 'icon_style_inactive': 'color: #888;'}, 'static_css': {'title_style': 'color: #fff;', 'title2_style': 'color: #fff;', 'state_text_style': 'color: #fff;', 'widget_style': 'background-color: #444;'}, 'icon_on': 'mdi-air-horn', 'icon_off': 'mdi-air-horn', 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    
        widgets["default-reload"] = new basejavascript("default-reload", "", "default", {'widget_type': 'basejavascript', 'command': 'location.reload(true)', 'fields': {'title': 'Reload', 'title2': '', 'icon': '', 'icon_style': ''}, 'icons': {'icon_active': 'mdi-refresh', 'icon_inactive': 'mdi-refresh'}, 'static_css': {'title_style': 'color: #fff;', 'title2_style': 'color: #fff;', 'widget_style': 'background-color: #444;'}, 'css': {'icon_active_style': 'color: #fff;', 'icon_inactive_style': 'color: #fff;'}, 'static_icons': [], 'icon_active': 'mdi-refresh', 'icon_inactive': 'mdi-refresh', 'use_comma': 0, 'precision': 1, 'use_hass_icon': 1, 'namespace': 'default'})
    

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
    

    ha_status(stream_url, "Tasks", widgets, "ws");

});