// Blockly.Constants is used in all other files block
Blockly.Constants = Object.create(null);

Blockly.Constants.Types = {
    Arduino: {
        ARRAY: {
            compatibleTypes_: ['Array']
        },
        BOOLEAN: {
            compatibleTypes_: ['Boolean']
        },
        CHARACTER: {
            compatibleTypes_: ['Character']
        },
        CHILD_BLOCK_MISSING: {
            compatibleTypes_: ['ChildBlockMissing']
        },
        DECIMAL: {
            compatibleTypes_: ['Decimal', 'Short Number', 'Number', 'Large Number']
        },
        LARGE_NUMBER: {
            compatibleTypes_: ['Large Number', 'Short Number', 'Number', 'Decimal']
        },
        NULL: {
            compatibleTypes_: ['Null']
        },
        NUMBER: {
            compatibleTypes_: ['Number', 'Short Number', 'Large Number']
        },
        SHORT_NUMBER: {
            compatibleTypes_: ['Short Number', 'Number', 'Large Number', 'Decimal']
        },
        TEXT: {
            compatibleTypes_: ['Character', 'String']
        },
        UNDEF: {
            compatibleTypes_: ['Undefined']
        }
    }
};

/**
 * Update the type compatibility list recursively
 */
function updateCompatibleTypes() {
    const types = Blockly.Constants.Types.Arduino;
    // Function to convert a type name to its key form
    function toTypeKey(typeName) {
        return typeName.replace(/\s+/g, '_').toUpperCase();
    };

    // Function to get all compatible types recursively
    function getAllCompatibleTypes(typeKey, compatibleTypesList = new Set()) {
        if (!types[typeKey] || compatibleTypesList.has(typeKey)) {
            return [];
        }

        const compatibleTypes = new Set(types[typeKey].compatibleTypes_);
        compatibleTypes.forEach(type => {
            if (!compatibleTypesList.has(type)) {
                compatibleTypesList.add(type);
                getAllCompatibleTypes(toTypeKey(type), compatibleTypesList);
            }
        });
        return Array.from(compatibleTypesList);
    };

    // Update each type's compatible types
    for (let typeKey in types) {
        types[typeKey].compatibleTypes_ = getAllCompatibleTypes(typeKey);
    }
};

updateCompatibleTypes();

/**
 * Get the toolbox style from url.
 * @return {String}
 */
Blockly.Constants.getToolboxStyle = function () {
    const getToolboxLS = () => localStorage.toolbox ? JSON.parse(localStorage.toolbox)[INTERFACE_NAME] : null;
    let toolboxStyle = getParamValue('toolbox');
    if (toolboxStyle === undefined || toolboxStyle === null) {
        toolboxStyle = getToolboxLS();
    }
    if (!ToolboxManager.toolboxDefined(toolboxStyle)) {
        toolboxStyle = getToolboxLS();
        if (!ToolboxManager.toolboxDefined(toolboxStyle)) {
            toolboxStyle = TOOLBOX_STYLE_DEFAULT;
        }
    }
    if (INTERFACE_NAME === "TI-83" && toolboxStyle == TOOLBOX_STYLE_TI && typeof Main !== 'undefined' && Main.getCodeMode() == MODE_CODE) {
        toolboxStyle = TOOLBOX_STYLE_TI_CODE;
    }
    return toolboxStyle;
};

/**
 * Get the board selected from url.
 * @return {String}
 */
Blockly.Constants.getSelectedBoard = function () {
    if (INTERFACE_NAME == "esp32" || INTERFACE_NAME == "pico" || INTERFACE_NAME == "arduino" || INTERFACE_NAME == "raspberrypi") {
        const value = getParamValue('board');
        if (value !== null && Object.keys(SIMULATOR_BOARDS).includes(value)) {
            return value;
        } else {
            return BOARD_DEFAULT
        }
    } else {
        if (typeof BOARD_DEFAULT !== 'undefined') {
            return BOARD_DEFAULT;
        } else {
            return "";
        }
    }
};

// Define an hidden workspace for the searching tool. It is used in Wiki and interfaces.
Blockly._searchWorkspace = null;

// Constants object for mutators
Blockly.Constants.Utils = Object.create(null);

/**
 * Return true if input block is a text typed block.
 * @param {Blockly.Block} block
 * @param {string} name
 * @return {boolean}
 */
Blockly.Constants.Utils.isInputTextBlock = function (block, name) {
    const inputBlock = block.getInput(name).connection.targetBlock();
    if (inputBlock && (inputBlock.type == "text" || inputBlock.type == "text_join")) {
        return true;
    } else {
        return false;
    }
};

/**
 * Return true if input block is a 'math_number' typed block.
 * @param {Blockly.Block} block
 * @param {string} name
 * @return {boolean}
 */
Blockly.Constants.Utils.isInputMathBlock = function (block, name) {
    const inputBlock = block.getInput(name).connection.targetBlock();
    if (inputBlock && inputBlock.type == "math_number") {
        return true;
    } else {
        return false;
    }
};

/**
 * Update the block mutation.
 * @param {Blockly.Block} block
 * @param {Function} update
 */
Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN = function (block, update) {
    Blockly.Events.setGroup(true);
    const oldMutationDom = block.mutationToDom();
    const oldMutation = oldMutationDom && Blockly.Xml.domToText(oldMutationDom);
    // Switch off rendering while the source block is rebuilt.
    const savedRendered = block.rendered;
    block.rendered = false;
    // Update the mutation
    if (update) update.call(block);
    // Allow the source block to rebuild itself.
    const updateShape = block.updateShape_;
    if (updateShape) block.updateShape_();
    // Restore rendering and show the changes.
    block.rendered = savedRendered;
    // Mutation may have compatibleTypesList some elements that need initializing.
    block.initSvg();
    // Ensure that any bump is part of this mutation's event group.
    const group = Blockly.Events.getGroup();
    const newMutationDom = block.mutationToDom();
    const newMutation = newMutationDom && Blockly.Xml.domToText(newMutationDom);
    if (oldMutation != newMutation) {
        Blockly.Events.fire(new Blockly.Events.BlockChange(
            block, 'mutation', null, oldMutation, newMutation));
        setTimeout(function () {
            Blockly.Events.setGroup(group);
            block.bumpNeighbours();
            Blockly.Events.setGroup(false);
        }, Blockly.BUMP_DELAY);
    }
    if (block.rendered) {
        block.render();
    }
    Blockly.Events.setGroup(false);
};

Blockly.Constants.Utils.INIT_BUTTONS_ADD_AND_REMOVE = function () {
    /**
     * Image data URI of an LTR opening plus button
     * @readonly
     */
    this.ADD_IMAGE_DATAURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4KCjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0icmVwZWF0IgogICB4PSIwcHgiCiAgIHk9IjBweCIKICAgdmlld0JveD0iMCAwIDI0IDI0IgogICBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNCAyNDsiCiAgIHhtbDpzcGFjZT0icHJlc2VydmUiCiAgIGlua3NjYXBlOnZlcnNpb249IjAuOTEgcjEzNzI1IgogICBzb2RpcG9kaTpkb2NuYW1lPSJhZGQuc3ZnIj48bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGExNSI+PHJkZjpSREY+PGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPjxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PjxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz48ZGM6dGl0bGU+cmVwZWF0PC9kYzp0aXRsZT48L2NjOldvcms+PC9yZGY6UkRGPjwvbWV0YWRhdGE+PGRlZnMKICAgICBpZD0iZGVmczEzIiAvPjxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBwYWdlY29sb3I9IiNmZjQ4MjEiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwIgogICAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTY4MCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI5NjkiCiAgICAgaWQ9Im5hbWVkdmlldzExIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIxOS42NjY2NjciCiAgICAgaW5rc2NhcGU6Y3g9IjEyLjkxNTI1NCIKICAgICBpbmtzY2FwZTpjeT0iMTYuMDY3Nzk2IgogICAgIGlua3NjYXBlOndpbmRvdy14PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjAiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0icmVwZWF0IiAvPjxzdHlsZQogICAgIHR5cGU9InRleHQvY3NzIgogICAgIGlkPSJzdHlsZTMiPgoJLnN0MHtmaWxsOiNDRjhCMTc7fQoJLnN0MXtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPjx0aXRsZQogICAgIGlkPSJ0aXRsZTUiPnJlcGVhdDwvdGl0bGU+PHJlY3QKICAgICBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MTtzdHJva2UtbGluZWNhcDpzcXVhcmU7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MC4wNzg0MzEzNyIKICAgICBpZD0icmVjdDQxNDMiCiAgICAgd2lkdGg9IjQuMDUwMDAwMiIKICAgICBoZWlnaHQ9IjEyLjM5NzA1IgogICAgIHg9IjkuOTc1MDAwNCIKICAgICB5PSItMTguMTk4NTI2IgogICAgIHJ4PSIwLjgxIgogICAgIHJ5PSIwLjgxIgogICAgIHRyYW5zZm9ybT0ic2NhbGUoMSwtMSkiIC8+PHJlY3QKICAgICBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MTtzdHJva2UtbGluZWNhcDpzcXVhcmU7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MC4wNzg0MzEzNyIKICAgICBpZD0icmVjdDQxNDMtMSIKICAgICB3aWR0aD0iNC4wNTAwMDAyIgogICAgIGhlaWdodD0iMTIuMzk3MTE5IgogICAgIHg9IjkuOTc1MDAwNCIKICAgICB5PSI1LjgwMTQ0MDciCiAgICAgcng9IjAuODEiCiAgICAgcnk9IjAuODEiCiAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMCwxLDEsMCwwLDApIiAvPjxjaXJjbGUKICAgICBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6bm9uZTtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6I2ZmZmZmZjtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpzcXVhcmU7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICBpZD0icGF0aDQxMzYiCiAgICAgY3g9IjEyIgogICAgIGN5PSIxMiIKICAgICByPSIxMC41MDMxOTEiIC8+PC9zdmc+';
    /**
     * Image data URI of an LTR opening minus button
     * @readonly
     */
    this.REMOVE_IMAGE_DATAURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4KCjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0icmVwZWF0IgogICB4PSIwcHgiCiAgIHk9IjBweCIKICAgdmlld0JveD0iMCAwIDI0IDI0IgogICBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNCAyNDsiCiAgIHhtbDpzcGFjZT0icHJlc2VydmUiCiAgIGlua3NjYXBlOnZlcnNpb249IjAuOTEgcjEzNzI1IgogICBzb2RpcG9kaTpkb2NuYW1lPSJyZW1vdmUuc3ZnIj48bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGExNSI+PHJkZjpSREY+PGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPjxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PjxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz48ZGM6dGl0bGU+cmVwZWF0PC9kYzp0aXRsZT48L2NjOldvcms+PC9yZGY6UkRGPjwvbWV0YWRhdGE+PGRlZnMKICAgICBpZD0iZGVmczEzIiAvPjxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBwYWdlY29sb3I9IiNmZjFhZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwIgogICAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTY4MCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI5NTAiCiAgICAgaWQ9Im5hbWVkdmlldzExIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIxOS42NjY2NjciCiAgICAgaW5rc2NhcGU6Y3g9IjAuMDUwODQ3NTIxIgogICAgIGlua3NjYXBlOmN5PSI5Ljk2NjEwMTciCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjAiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjAiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJyZXBlYXQiIC8+PHN0eWxlCiAgICAgdHlwZT0idGV4dC9jc3MiCiAgICAgaWQ9InN0eWxlMyI+Cgkuc3Qwe2ZpbGw6I0NGOEIxNzt9Cgkuc3Qxe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+PHRpdGxlCiAgICAgaWQ9InRpdGxlNSI+cmVwZWF0PC90aXRsZT48cmVjdAogICAgIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoxO3N0cm9rZS1saW5lY2FwOnNxdWFyZTtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eTowLjA3ODQzMTM3IgogICAgIGlkPSJyZWN0NDE0My0xIgogICAgIHdpZHRoPSI0LjA1MDAwMDIiCiAgICAgaGVpZ2h0PSIxMi4zOTcxMTkiCiAgICAgeD0iOS45NzUwMDA0IgogICAgIHk9IjUuODAxNDQwNyIKICAgICByeD0iMC44MSIKICAgICByeT0iMC44MSIKICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLDEsMSwwLDAsMCkiIC8+PGNpcmNsZQogICAgIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDpub25lO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOnNxdWFyZTtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxIgogICAgIGlkPSJwYXRoNDEzNiIKICAgICBjeD0iMTIiCiAgICAgY3k9IjEyIgogICAgIHI9IjEwLjUwMzE5MSIgLz48L3N2Zz4=';
    this.buttonSize = 24;
    if (this.workspace.renderer_.name === 'geras') {
        this.buttonSize = 19;
    }
};

Blockly.Extensions.register('block_buttons_plus_minus',
    Blockly.Constants.Utils.INIT_BUTTONS_ADD_AND_REMOVE);

Blockly.Constants.Utils.BlockStyling = {
    blocks: {},
    LIGHTER_BLOCKS: [
        "communication_graphSerialWrite_datasFormat",
        "communication_ble_STSensorApp_service",
        "actuators_music_note",
        "devices_builtin_speaker_note",
        "network_thingspeak_sendData_field",
        "io_log_data"
    ],
    /**
     * Light an hex color by factor.
     * @param {String} color 
     * @param {Number} factor 
     * @returns {String} lightenColor
     */
    getLigthenColor: function (color, factor = 0.4) {
        if (color) {
            const rgb = (i) => parseInt(color.replace('#', '').substring(i * 2, 2 + i * 2), 16);
            const lighterFactor = (i) => Math.min(255, Math.floor(rgb(i) + (255 - rgb(i)) * factor)).toString(16).padStart(2, '0');
            return `#${lighterFactor(0)}${lighterFactor(1)}${lighterFactor(2)}`;
        }
    }
};

/**
* Get parent block when child block is an input block of ToolboxManager.DB_.
* @param {String} childType 
* @returns {String} parentType
*/
Blockly.Constants.Utils.getParentBlockType = function (childType) {
    const blocks = ToolboxManager.DB_.get();
    let parentBlockType = null;
    if (Array.isArray(blocks)) {
        parentBlockType = blocks.find(block => block.blockxml.includes(childType)).type;
    } else {
        parentBlockType = Object.keys(blocks).find(type => blocks[type].includes(childType));
    }
    return parentBlockType ? parentBlockType : childType;
};

/**
* Set color or Help url of block checking Blockly.Constants.Utils.BlockStyling.blocks
* @param {Object} setter 
* @param {String} parameter
*/
Blockly.Constants.Utils.setBlockParameter = function (setter, parameter) {
    const toolboxMode = Blockly.Constants.getToolboxStyle();
    if (!Blockly.Constants.Utils.BlockStyling.blocks[setter.block.type]) {
        Blockly.Constants.Utils.BlockStyling.blocks[setter.block.type] = {
            toolboxMode: TOOLBOX_STYLE_DEFAULT
        };
    }
    if (Blockly.Constants.Utils.BlockStyling.blocks[setter.block.type].toolboxMode !== toolboxMode) {
        Blockly.Constants.Utils.BlockStyling.blocks[setter.block.type].toolboxMode = toolboxMode;
        setter.callback(setter.block);
    } else {
        const value = Blockly.Constants.Utils.BlockStyling.blocks[setter.block.type][parameter];
        if (value) {
            setter.set(setter.block, value);
        } else {
            setter.callback(setter.block);
        }
    }
};

/**
 * Initializes the color of a block in the case where the "style" parameter of the json is not defined.
 * This allows the color to dynamically change when the interface changes toolbox mode. 
 */
Blockly.Constants.Utils.INIT_BLOCK_COLOR = function () {
    if (!ToolboxManager.DISABLE_BLOCK_COLOR_EXTENSION) {
        try {
            /**
             * Set block colour.
             * @param {Blockly.BlockSvg} block 
             */
            const setColour = function (block) {
                /**
                 * Get block colour searching in toolbox definition.
                 * @param {String} blockType
                 * @param {String} toolboxMode
                 * @returns {String} colour
                 */
                const getColour = function (blockType, toolboxMode) {
                    const toolbox = ToolboxManager.toolboxDefined(toolboxMode);
                    if (toolbox) {
                        for (const cat of Object.keys(toolbox.content)) {
                            const catContent = toolbox.content[cat];
                            if (Array.isArray(catContent)) {
                                const found = (blocks) => blocks && blocks.find(type => type.split('-')[0] == blockType);
                                const color = () => {
                                    Blockly.Constants.Utils.BlockStyling.blocks[block.type].category = cat;
                                    return toolbox.theme[cat + "_blocks"].colourPrimary;
                                };
                                for (const subcat of Object.keys(catContent)) {
                                    if (catContent[subcat].contents) {
                                        for (const item of catContent[subcat].contents) {
                                            if (found(item.blocks)) {
                                                return color();
                                            }
                                        }
                                    } else {
                                        if (found(catContent[subcat].blocks)) {
                                            return color();
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                const lightStyling = Blockly.Constants.Utils.BlockStyling.LIGHTER_BLOCKS.includes(block.type);
                let colour = getColour(block.type, Blockly.Constants.Utils.BlockStyling.blocks[block.type].toolboxMode);
                if (lightStyling) {
                    const parentBlockType = Blockly.Constants.Utils.getParentBlockType(block.type);
                    colour = getColour(parentBlockType, Blockly.Constants.Utils.BlockStyling.blocks[block.type].toolboxMode);
                    colour = Blockly.Constants.Utils.BlockStyling.getLigthenColor(colour);
                }
                if (colour) {
                    Blockly.Constants.Utils.BlockStyling.blocks[block.type].colour = colour;
                    block.setColour(colour);
                }
            }
            const setter = {
                block: this,
                callback: setColour,
                set: (block, colour) => block.setColour(colour)
            };
            Blockly.Constants.Utils.setBlockParameter(setter, 'colour');
        } catch (e) {
            console.error(e)
        }
    }
};

Blockly.Extensions.register("block_init_color",
    Blockly.Constants.Utils.INIT_BLOCK_COLOR);

/**
 * Initializes the url of a block in the case where the "helpurl" parameter of the json is not defined.
 * This allows the url to dynamically change when the interface changes toolbox mode. 
 */
Blockly.Constants.Utils.INIT_BLOCK_HELPURL = function () {
    if (!ToolboxManager.DISABLE_BLOCK_HELPURL_EXTENSION) {
        try {
            const wikiUrl = (blockType, category) => `${VITTASCIENCE_SITE}/wiki?interface=${INTERFACE_NAME}&category=${category}#${blockType}Div-container`;
            /**
             * Set block url.
             * @param {Blockly.BlockSvg} block 
             */
            const setUrl = function (block) {
                /**
                 * Get block colour searching in toolbox definition.
                 * @param {String} blockType
                 * @param {String} toolboxMode
                 * @returns {String} colour
                 */
                const getCategory = function (blockType, toolboxMode) {
                    const toolbox = ToolboxManager.toolboxDefined(toolboxMode);
                    if (toolbox) {
                        for (const cat of Object.keys(toolbox.content)) {
                            const catContent = toolbox.content[cat];
                            if (Array.isArray(catContent)) {
                                for (const subcat of Object.keys(catContent)) {
                                    if (catContent[subcat].blocks && catContent[subcat].blocks.find(type => type.split('-')[0] == blockType)) {
                                        return cat;
                                    }
                                }
                            }
                        }
                    }
                };
                let category = getCategory(block.type, Blockly.Constants.Utils.BlockStyling.blocks[block.type].toolboxMode);
                if (!category) {
                    const parentBlockType = Blockly.Constants.Utils.getParentBlockType(block.type);
                    category = getCategory(parentBlockType, Blockly.Constants.Utils.BlockStyling.blocks[block.type].toolboxMode);
                }
                if (category) {
                    Blockly.Constants.Utils.BlockStyling.blocks[block.type].category = category;
                    block.setHelpUrl(wikiUrl(block.type, category));
                } else {
                    block.setHelpUrl(`${VITTASCIENCE_SITE}/support/glossary`);
                }
            };
            const setter = {
                block: this,
                callback: setUrl,
                set: (block, category) => block.setHelpUrl(wikiUrl(block.type, category))
            };
            Blockly.Constants.Utils.setBlockParameter(setter, 'category');
        } catch (e) {
            console.error(e)
        }
    }
};

Blockly.Extensions.register("block_init_helpurl",
    Blockly.Constants.Utils.INIT_BLOCK_HELPURL);

Blockly.Constants.Utils.INIT_BUTTON_UPLOAD = function () {
    /**
     * Image data URI of an LTR opening upload button
     * @readonly
     */
    this.UPLOAD_IMAGE_DATAURI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSJyZ2IoMCwxMzAsMjUyKSI+PHBhdGggZD0iTTI5NiAzODRoLTgwYy0xMy4zIDAtMjQtMTAuNy0yNC0yNFYxOTJoLTg3LjdjLTE3LjggMC0yNi43LTIxLjUtMTQuMS0zNC4xTDI0Mi4zIDUuN2M3LjUtNy41IDE5LjgtNy41IDI3LjMgMGwxNTIuMiAxNTIuMmMxMi42IDEyLjYgMy43IDM0LjEtMTQuMSAzNC4xSDMyMHYxNjhjMCAxMy4zLTEwLjcgMjQtMjQgMjR6bTIxNi04djExMmMwIDEzLjMtMTAuNyAyNC0yNCAyNEgyNGMtMTMuMyAwLTI0LTEwLjctMjQtMjRWMzc2YzAtMTMuMyAxMC43LTI0IDI0LTI0aDEzNnY4YzAgMzAuOSAyNS4xIDU2IDU2IDU2aDgwYzMwLjkgMCA1Ni0yNS4xIDU2LTU2di04aDEzNmMxMy4zIDAgMjQgMTAuNyAyNCAyNHptLTEyNCA4OGMwLTExLTktMjAtMjAtMjBzLTIwIDktMjAgMjAgOSAyMCAyMCAyMCAyMC05IDIwLTIwem02NCAwYzAtMTEtOS0yMC0yMC0yMHMtMjAgOS0yMCAyMCA5IDIwIDIwIDIwIDIwLTkgMjAtMjB6Ii8+PC9zdmc+';
    this.buttonSize = 20;
    if (this.workspace.renderer_.name === 'geras') {
        this.buttonSize = 16;
    }
};

Blockly.Extensions.register('block_init_button_upload',
    Blockly.Constants.Utils.INIT_BUTTON_UPLOAD);

/**
 * Connect a default block in block input.
 * @param {Blockly.Block} block
 * @param {Function} input_block_settings
 */
Blockly.Constants.Utils.CONNECT_DEFAULT_BLOCK = function (block, input_block_settings) {
    const dataBlockName = input_block_settings.type;
    if (Blockly.Blocks[dataBlockName]) {
        const newBlock = Blockly.utils.xml.createElement('shadow');
        newBlock.setAttribute('type', dataBlockName);
        if (newBlock) {
            const id = Blockly.utils.genUid()
            newBlock.setAttribute('id', id);
            const field = Blockly.utils.xml.createElement('field');
            field.setAttribute('name', input_block_settings.name);
            field.appendChild(Blockly.utils.xml.createTextNode(input_block_settings.value));
            newBlock.appendChild(field);
            Blockly.Xml.domToBlock(newBlock, block.workspace);
            const created_block = block.workspace.getBlockById(id);
            block.getInput(input_block_settings.input).connection.connect(created_block.outputConnection);
        }
    }
};

/**
 * Mixin for mutator functions in some blocks
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Utils.addOptionMutatorMixin = function (attribute, message, type, value, after = "") {
    return {
        /**
         * Create XML to represent list inputs.
         * @return {!Element} XML storage element.
         * @this {Blockly.Block}
         */
        mutationToDom: function () {
            const container = Blockly.utils.xml.createElement('mutation');
            container.setAttribute(attribute, this.option_);
            return container;
        },
        /**
         * Parse XML to restore the list inputs.
         * @param {!Element} xmlElement XML storage element.
         * @this {Blockly.Block}
         */
        domToMutation: function (xmlElement) {
            this.option_ = (xmlElement.getAttribute(attribute) != 'false');
            this.update_(this.updateField_);
        },
        addOptions_: function () {
            this.option_ = true;
            this.update_(this.updateField_);
        },
        removeOptions_: function () {
            this.option_ = false;
            this.update_(this.updateField_);
        },
        /**
         * Modify this block to have the correct number of inputs.
         * @private
         * @this {Blockly.Block}
         */
        updateField_: function () {
            try {
                var that = this;
                var remove = function () {
                    that.removeOptions_();
                };
                var add = function () {
                    that.addOptions_();
                };
                // Remove buttons
                if (this.getInput('TOP')) this.removeInput('TOP');
                // Update inputs
                const top = this.appendDummyInput('TOP');
                if (!(this.getInput(attribute.toUpperCase() + "FIELD") && this.getInput(attribute.toUpperCase())) && this.option_) {
                    const input = this.appendDummyInput(attribute.toUpperCase() + "FIELD");
                    input.appendField(Blockly.Msg[message]);
                    if (type == 'input') {
                        this.appendValueInput(attribute.toUpperCase());
                        this.addDefaultBlock({
                            "name": attribute.toUpperCase(),
                            "type": "math_number",
                            "field_name": "NUM",
                            "value": value
                        });
                    } else if (type == 'dropdown') {
                        input.appendField(new Blockly.FieldDropdown(value), attribute.toUpperCase());
                    } else if (type == 'text') {
                        this.appendValueInput(attribute.toUpperCase());
                        this.addDefaultBlock({
                            "name": attribute.toUpperCase(),
                            "type": "text",
                            "field_name": "TEXT",
                            "value": value
                        });
                    }
                    if (after != "") {
                        if (Blockly.Msg[after] !== undefined) {
                            this.appendDummyInput(after.toUpperCase() + "FIELD").appendField(Blockly.Msg[after]);
                        } else {
                            this.appendDummyInput(after.toUpperCase() + "FIELD").appendField(after);
                        }
                    }
                    top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI,
                        this.buttonSize, this.buttonSize, "*", remove, false));
                    if (attribute != 'devaddr')
                        this.setInputsInline(true);
                } else {
                    if (this.getInput(attribute.toUpperCase() + "FIELD") && (this.getInput(attribute.toUpperCase()) || this.getField(attribute.toUpperCase()))) {
                        this.removeInput(attribute.toUpperCase() + "FIELD");
                        if (this.getInput(after.toUpperCase() + "FIELD"))
                            this.removeInput(after.toUpperCase() + "FIELD");
                        if (type == 'input' || type == 'text') {
                            this.removeInput(attribute.toUpperCase());
                        }
                    }
                    top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI,
                        this.buttonSize, this.buttonSize, "*", add, false));
                }
            } catch (e) {
                console.error(e);
            }
        },
        update_: function (update) {
            return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
        },
        addDefaultBlock: function (input) {
            return Blockly.Constants.Utils.CONNECT_DEFAULT_BLOCK(this, {
                "input": input.name,
                "type": input.type,
                "name": input.field_name,
                "value": input.value
            });
        }
    }
};

/**
 * Performs final setup of temperature blocks.
 * @this {Blockly.Block}
 */
Blockly.Constants.Utils.SENSORS_TEMPERATURE_INIT_EXTENSION = function () {
    this.TEMPERATURE_UNIT = [
        ["(°C)", 'CELSIUS'],
        ["(°F)", 'FAHRENHEIT'],
        ["(K)", 'KELVIN']
    ];
    const dropdown = this.getField("DATA");
    dropdown.setValidator(function (value) {
        const newTemp = (value == "TEMP");
        if (newTemp != this.isTemp_) {
            this.getSourceBlock().updateField_(newTemp);
        }
    });
    this.updateField_(this.getFieldValue("DATA") == "TEMP");
};

/**
 * Mixin for mutator functions in the 'sensors_temperature_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Utils.SENSORS_TEMPERATURE_MUTATOR_MIXIN = {
    /**
     * Create XML to represent whether there is an 'temp' dropdown field.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        const container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('temp', !!this.isTemp_);
        return container;
    },
    /**
     * Parse XML to restore the 'temp' dropdown field.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        const isTemp = (xmlElement.getAttribute('temp') != 'false');
        this.updateField_(isTemp);
    },
    /**
     * Create or delete temperature unit field_dropdown.
     * @param {boolean} isTemp True if the dropdown should exist.
     * @private
     * @this {Blockly.Block}
     */
    updateField_: function (isTemp) {
        // Destroy old 'UNIT' field.
        if (this.getInput("TEMP_UNIT")) {
            this.removeInput("TEMP_UNIT");
        }
        // Create either a value 'TEMP' dropdown field.
        if (isTemp) {
            this.appendDummyInput("TEMP_UNIT")
                .appendField(Blockly.Msg["SENSORS_TEMPERATURE_IN"])
                .appendField(new Blockly.FieldDropdown(this.TEMPERATURE_UNIT), "UNIT");
        }
        this.isTemp_ = isTemp;
    }
};

Blockly.Extensions.registerMutator('sensors_temperature_mutator',
    Blockly.Constants.Utils.SENSORS_TEMPERATURE_MUTATOR_MIXIN,
    Blockly.Constants.Utils.SENSORS_TEMPERATURE_INIT_EXTENSION);

/**
 * Performs final setup of 'communication_serialWrite' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Utils.COMMUNICATION_SERIAL_WRITE_INIT_EXTENSION = function () {
    this.newlines_ = false;
    this.n_ = Blockly.Constants.PRINT_START_N;
    this.update_(this.updateField_);
};

/**
 * Mixin for mutator functions in the 'communication_serialWrite' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Utils.COMMUNICATION_SERIAL_WRITE_MUTATOR_MIXIN = {
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        const container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('newlines', this.newlines_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        this.newlines_ = ((xmlElement.getAttribute('newlines') === null ? 'false' : xmlElement.getAttribute('newlines')) != 'false');
        this.update_(this.updateField_);
    },
    addOptions_: function () {
        this.newlines_ = true;
        this.update_(this.updateField_);
    },
    removeOptions_: function () {
        this.newlines_ = false;
        this.update_(this.updateField_);
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this {Blockly.Block}
     */
    updateField_: function () {
        var that = this;
        var remove = function () {
            that.removeOptions_();
        };
        var add = function () {
            that.addOptions_();
        };
        // Remove buttons
        if (this.getInput('TOP')) this.removeInput('TOP');
        // Update inputs
        var top = this.appendDummyInput('TOP');
        if (!this.getInput("NEWLINES_FIELD") && this.newlines_) {
            this.appendDummyInput("NEWLINES_FIELD")
                .appendField(Blockly.Msg['COMMUNICATION_SERIAL_WRITE_WITH'])
                .appendField(new Blockly.FieldNumber(this.n_, 0, 10), "NEWLINES")
                .appendField(Blockly.Msg['COMMUNICATION_SERIAL_WRITE_NEWLINES']);
            top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI,
                this.buttonSize, this.buttonSize, "*", remove, false));
        } else {
            if (this.getInput("NEWLINES_FIELD")) {
                this.removeInput("NEWLINES_FIELD");
            }
            top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI,
                this.buttonSize, this.buttonSize, "*", add, false));
        }
    },
    update_: function (update) {
        return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
    }
};

Blockly.Extensions.register("communication_serialWrite_init_extension",
    Blockly.Constants.Utils.COMMUNICATION_SERIAL_WRITE_INIT_EXTENSION);

Blockly.Extensions.registerMutator('communication_serialWrite_mutator',
    Blockly.Constants.Utils.COMMUNICATION_SERIAL_WRITE_MUTATOR_MIXIN);

/**
 * Performs final setup of 'communication_graphSerialWrite' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Utils.COMMUNICATION_GRAPH_SERIAL_WRITE_INIT_EXTENSION = function () {
    this.itemCount_ = 1;
    this.updateShape_();
};

Blockly.Extensions.register("communication_graphSerialWrite_init_extension",
    Blockly.Constants.Utils.COMMUNICATION_GRAPH_SERIAL_WRITE_INIT_EXTENSION);

/**
 * Mixin for mutator functions in the 'communication_graphSerialWrite_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Utils.COMMUNICATION_GRAPH_SERIAL_WRITE_MUTATOR_MIXIN = {
    /**
     * Create XML to represent number of data inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the data inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this {Blockly.Block}
     */
    saveConnections: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
    },
    storeValueConnections_: function () {
        this.valueConnections_ = [];
        for (var i = 0; i < this.itemCount_; i++) {
            this.valueConnections_.push(this.getInput('ADD' + i).connection.targetConnection);
        }
    },
    restoreValueConnections_: function () {
        for (var i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(this.valueConnections_[i], this, 'ADD' + i);
        }
    },
    addItem_: function () {
        this.storeValueConnections_();
        var update = function () {
            this.itemCount_++;
        };
        this.update_(update);
        // Add a data block
        if (this.itemCount_ > 1) {
            this.addDataFormatBlock();
        }
        this.restoreValueConnections_();
    },
    removeItem_: function () {
        this.storeValueConnections_();
        var update = function () {
            this.itemCount_--;
        };
        this.update_(update);
        this.restoreValueConnections_();
    },
    update_: function (update) {
        return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this {Blockly.Block}
     */
    updateShape_: function () {
        var that = this;
        var remove = function () {
            that.removeItem_();
        };
        var add = function () {
            that.addItem_();
        };
        // Remove all inputs
        if (this.getInput('TOP')) this.removeInput('TOP');
        var i = 0;
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }
        // Update inputs
        var top = this.appendDummyInput('TOP');
        top.appendField(Blockly.Msg['COMMUNICATION_WRITEGRAPH_TITLE']);
        top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
        if (this.itemCount_ > 1) {
            top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", remove, false));
        }
        for (var i = 0; i < this.itemCount_; i++) {
            this.appendValueInput('ADD' + i);
        }
        this.setOutputShape(Blockly.OUTPUT_SHAPE_SQUARE);
    },
    addDataFormatBlock: function () {
        var dataBlockName = "communication_graphSerialWrite_datasFormat";
        if (Blockly.Blocks[dataBlockName]) {
            var newBlock = Blockly.utils.xml.createElement('block');
            newBlock.setAttribute('type', dataBlockName);
            if (newBlock) {
                var id = Blockly.utils.genUid()
                newBlock.setAttribute('id', id);
                var field = Blockly.utils.xml.createElement('field');
                field.setAttribute('name', 'NAME');
                field.appendChild(Blockly.utils.xml.createTextNode(Blockly.Msg['COMMUNICATION_DATA'] + this.itemCount_));
                newBlock.appendChild(field);
                Blockly.Xml.domToBlock(newBlock, this.workspace);
                var block = this.workspace.getBlockById(id);
                this.valueConnections_.push(block.outputConnection);
            }
        }
    }
};

Blockly.Extensions.registerMutator('communication_graphSerialWrite_mutator',
    Blockly.Constants.Utils.COMMUNICATION_GRAPH_SERIAL_WRITE_MUTATOR_MIXIN);

Blockly.Constants.Utils.COMMUNICATION_GPS_GET_GGA_INFORMATIONS_GET_TYPE = {
    /**
     * @return {Blockly.Type} type
     * @this {Blockly.Block} communication_gps_getGGAInformations
     */
    getBlockType: function () {
        const info = this.getFieldValue("INFO");
        switch (info) {
            case "type":
                return Blockly.Types.TEXT;
            case "clock":
                return Blockly.Types.ARRAY;
            case "latitude":
                return Blockly.Types.DECIMAL;
            case "longitude":
                return Blockly.Types.DECIMAL;
            case "satellite":
                return Blockly.Types.NUMBER;
            case "altitude":
                return Blockly.Types.DECIMAL;
            default:
                return Blockly.Types.TEXT;
        }
    }
};

Blockly.Constants.Utils.ICON_IA = function (icon) {
    const IA_IMAGE_BLOCK_ICON = {
        "image": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJDYWxxdWVfMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTYuNjkgNTYuNjkiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO30uY2xzLTEsLmNscy0ye3N0cm9rZS13aWR0aDowcHg7fS5jbHMtMntmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjxnIGlkPSJDYWxxdWVfMS0yIj48ZyBpZD0iaWFfaW1hZ2VfYmxvY2tzIj48cmVjdCBjbGFzcz0iY2xzLTEiIHdpZHRoPSI1Ni42OSIgaGVpZ2h0PSI1Ni42OSIvPjxwYXRoIGlkPSJpY29uLXZpZGVvIiBjbGFzcz0iY2xzLTIiIGQ9Im0zMy44OSwzNi42N3YtMTYuNjVjMC0xLjUyLTEuMjQtMi43Ni0yLjc2LTIuNzZIMTQuNDhjLTEuNTIsMC0yLjc2LDEuMjQtMi43NiwyLjc2djE2LjY1YzAsMS41MiwxLjI0LDIuNzYsMi43NiwyLjc2aDE2LjY1YzEuNTIsMCwyLjc2LTEuMjQsMi43Ni0yLjc2Wm05LjIxLjkxYzEuMDIuMDEsMS44Ni0uOCwxLjg4LTEuODN2LTE0LjgzYzAtLjM3LS4xMi0uNzMtLjMzLTEuMDMtLjU4LS44NC0xLjc0LTEuMDQtMi41OC0uNDZsLTYuMzMsNC4zNnY5LjA5czYuMzMsNC4zNiw2LjMzLDQuMzZjLjMuMjEuNjYuMzMsMS4wMy4zM1oiLz48L2c+PC9nPjwvc3ZnPg==",
        "sound": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJDYWxxdWVfMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTYuNjkgNTYuNjkiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO30uY2xzLTEsLmNscy0ye3N0cm9rZS13aWR0aDowcHg7fS5jbHMtMntmaWxsOiNmZWZlZmU7fTwvc3R5bGU+PC9kZWZzPjxnIGlkPSJDYWxxdWVfMS0yIj48ZyBpZD0iaWFfc291bmRfYmxvY2tzIj48cGF0aCBpZD0iaWNvbi1taWMtMiIgY2xhc3M9ImNscy0yIiBkPSJtMjYuNzEsNDMuMjl2LTUuMzZjLTUuNjItLjc1LTEwLjA3LTUuMTMtMTAuOTEtMTAuNzQtLjEzLS44OS40OS0xLjcyLDEuMzktMS44NS44OS0uMTIsMS43Mi41LDEuODUsMS4zOS42OCw0LjYxLDQuNjQsOC4wNCw5LjMsOC4wNSw0LjY3LS4wMSw4LjYzLTMuNDQsOS4zLTguMDcuMTMtLjkuOTYtMS41MiwxLjg1LTEuMzksMCwwLDAsMCwwLDAsLjkuMTMsMS41Mi45NiwxLjM5LDEuODUtLjgyLDUuNjItNS4yOCwxMC4wMS0xMC45MSwxMC43NnY1LjM2YzAsLjktLjczLDEuNjQtMS42NCwxLjY0cy0xLjY0LS43My0xLjY0LTEuNjRoMFptLTMuMy0xNi4yNnYtMTAuMzJjMC0yLjczLDIuMjEtNC45NCw0Ljk0LTQuOTQsMi43MywwLDQuOTQsMi4yMSw0Ljk0LDQuOTRoMHYxMC4zMmMwLDIuNzMtMi4yMSw0Ljk0LTQuOTQsNC45NGgwYy0yLjczLDAtNC45NC0yLjIxLTQuOTQtNC45NFoiLz48cmVjdCBjbGFzcz0iY2xzLTEiIHdpZHRoPSI1Ni42OSIgaGVpZ2h0PSI1Ni42OSIvPjwvZz48L2c+PC9zdmc+",
        "text": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJDYWxxdWVfMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNDUuMzUgMzAuMjEiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO30uY2xzLTEsLmNscy0ye3N0cm9rZS13aWR0aDowcHg7fS5jbHMtMntmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjxnIGlkPSJDYWxxdWVfMS0yIj48ZyBpZD0iaWFfdGV4dF9ibG9jcyI+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNDUuMzUiIGhlaWdodD0iMzAuMjEiLz48cGF0aCBpZD0iaWNvbi1mdWxsc2NyZWVuIiBjbGFzcz0iY2xzLTIiIGQ9Im0zNi4zOCwzMC4yMWgtNi4xOGMtLjg5LDAtMS42MS0uNzItMS42MS0xLjYxaDBjMC0uODkuNzItMS42MSwxLjYxLTEuNjFoNC41N3YtNC41OGMwLS44OS43Mi0xLjYxLDEuNjEtMS42MWgwYy44OSwwLDEuNjEuNzIsMS42MSwxLjYxaDB2Ni4xOWMwLC44OS0uNzIsMS42MS0xLjYxLDEuNjEsMCwwLDAsMCwwLDBabS0yMS4yMy0uMTNoLTYuMThjLS44OSwwLTEuNjEtLjcyLTEuNjEtMS42MWgwdi02LjE5YzAtLjg5LjcyLTEuNjEsMS42MS0xLjYxaDBjLjg5LDAsMS42MS43MiwxLjYxLDEuNjFoMHY0LjU4aDQuNTdjLjg5LDAsMS42MS43MiwxLjYxLDEuNjFoMGMwLC44OS0uNzIsMS42MS0xLjYxLDEuNjFoMFptMjEuMjItMjAuNjZjLS44OSwwLTEuNjEtLjcyLTEuNjEtMS42MWgwVjMuMjNoLTQuNThjLS44OSwwLTEuNjEtLjcyLTEuNjEtMS42MWgwYzAtLjg5LjcyLTEuNjEsMS42MS0xLjYxaDYuMThjLjg5LDAsMS42MS43MiwxLjYxLDEuNjFoMHY2LjE5YzAsLjg5LS43MiwxLjYxLTEuNjEsMS42MmgwWm0tMjcuNDEsMGMtLjg5LDAtMS42MS0uNzItMS42MS0xLjYxaDBWMS42MkM3LjM2LjczLDguMDgsMCw4Ljk3LDBoNi4xOGMuODksMCwxLjYxLjcyLDEuNjEsMS42MWgwYzAsLjg5LS43MiwxLjYxLTEuNjEsMS42MWgtNC41N3Y0LjU4YzAsLjg5LS43MiwxLjYxLTEuNjEsMS42MWgwWiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0ibTE4LjkxLDE4LjRsLTIuMTQsNi40OGgtMi43NWw3LTIwLjZoMy4yMWw3LjAzLDIwLjZoLTIuODRsLTIuMi02LjQ4aC03LjNabTYuNzUtMi4wOGwtMi4wMi01LjkzYy0uNDYtMS4zNC0uNzYtMi41Ny0xLjA3LTMuNzZoLS4wNmMtLjMxLDEuMjItLjY0LDIuNDgtMS4wNCwzLjczbC0yLjAyLDUuOTZoNi4yWiIvPjwvZz48L2c+PC9zdmc+",
        "posture": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJDYWxxdWVfMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTYuNjkgNTYuNjkiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO30uY2xzLTEsLmNscy0ye3N0cm9rZS13aWR0aDowcHg7fS5jbHMtMntmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjxnIGlkPSJDYWxxdWVfMS0yIj48ZyBpZD0iSUFfcG9zdHVyZSI+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMzUuODIsMjUuNjhjLTQuMzItMS41NC01LjExLTYuMzMtNS4xNS02LjU0LS4wOC0uNTItLjQ5LS45LS45Ny0uOTgtLjAxLS4wMy0uMDMtLjA1LS4wNS0uMDguMy4wNi42MS4xLjkzLjEsMi40NywwLDQuNDgtMi4wMSw0LjQ4LTQuNDhzLTIuMDEtNC40OC00LjQ4LTQuNDgtNC40OCwyLjAxLTQuNDgsNC40OGMwLDEuNjQuODksMy4wNiwyLjIsMy44NC0uMTEuMDMtLjIxLjA4LS4zMS4xNGwtNS42OCwzLjY4Yy0uNDIuMjctLjYyLjc4LS41MSwxLjI2bDEuMjUsNS4zN2MuMTUuNjQuNzksMS4wMywxLjQyLjg5LjY0LS4xNSwxLjA0LS43OS44OS0xLjQybC0xLjA2LTQuNTYsMi43Mi0xLjc2LTEuNDgsOC43M3MwLC4wMiwwLC4wM2MwLC4wMy0uMDEuMDYtLjAyLjEsMCwuMDgtLjUyLDcuOTktNS4yNiwxNS42OC0uMzQuNTYtLjE3LDEuMjkuMzksMS42My4xOS4xMi40MS4xOC42Mi4xOC40LDAsLjc5LS4yLDEuMDEtLjU2LDMuMjEtNS4yLDQuNTktMTAuNDEsNS4xOS0xMy42MmwyLjA2LDMuMDUuNDcsOS4yMWMuMDMuNjMuNTYsMS4xMywxLjE4LDEuMTMuMDIsMCwuMDQsMCwuMDYsMCwuNjUtLjAzLDEuMTYtLjU5LDEuMTItMS4yNGwtLjQ5LTkuNTRjLS4wMS0uMjItLjA4LS40Mi0uMi0uNmwtMy43Mi01LjUsMS4yNy03LjQ2Yy44OCwxLjk3LDIuNTksNC40Myw1LjgsNS41OC4xMy4wNS4yNy4wNy40LjA3LjQ5LDAsLjk0LS4zLDEuMTItLjc5LjIyLS42Mi0uMS0xLjMtLjcyLTEuNTJaIi8+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNTYuNjkiIGhlaWdodD0iNTYuNjkiLz48L2c+PC9nPjwvc3ZnPg==",
        "sensor": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iQ2FscXVlXzIiIGRhdGEtbmFtZT0iQ2FscXVlIDIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDM0LjA3IDMyLjc2Ij4KICA8ZyBpZD0iQ2FscXVlXzEtMiIgZGF0YS1uYW1lPSJDYWxxdWUgMS0yIj4KICAgIDxwYXRoIGlkPSJJQV9taWNyb2NvbnRyb2xldXJfZ3JlZW5fcGljdG8iIGRhdGEtbmFtZT0iSUEgbWljcm9jb250cm9sZXVyIGdyZWVuIHBpY3RvIiBkPSJNMzMuOTcsMTMuMTJsLTIuMjMtNS40M2MtLjU5LTEuNDUtMi0yLjM1LTMuNTUtMi4zMi0xLjU2LC4wNC0yLjkxLDEuMDItMy40NCwyLjQ5bC00LjcsMTMuMjNjLS4yNSwuNy0uODksLjczLTEuMDYsLjc0LS4xOSwwLS44MS0uMDYtMS4wNS0uNzZsLTQuMjgtMTIuOTJjLS41LTEuNS0xLjg0LTIuNTEtMy40My0yLjU2LTEuNi0uMDUtMi45OSwuODYtMy41OSwyLjMzbC0yLjcxLDYuNjRWNC41NGgxLjMxTDIuNjIsMCwwLDQuNTRIMS4zMVYzMC4xM2MwLC43MywuNTksMS4zMSwxLjMxLDEuMzFIMjguMjF2MS4zMWw0LjU0LTIuNjItNC41NC0yLjYydjEuMzFIMy45NHYtNy4zMWw1LjE1LTEyLjZjLjI3LS42NywuODktLjY5LDEuMDctLjY5cy43OSwuMDgsMS4wMiwuNzZsNC4yOCwxMi45MmMuNTEsMS41NCwxLjg5LDIuNTUsMy41MSwyLjU3aC4wNGMxLjYxLDAsMi45OS0uOTcsMy41Mi0yLjQ5bDQuNy0xMy4yM2MuMjQtLjY3LC44NC0uNzQsMS4wMi0uNzRzLjc5LC4wMywxLjA2LC42OWwyLjIzLDUuNDNjLjI4LC42NywxLjA0LC45OSwxLjcxLC43MiwuNjctLjI4LC45OS0xLjA0LC43Mi0xLjcxdi0uMDJaIiBzdHlsZT0iZmlsbDogI2ZjZmNmYzsiLz4KICA8L2c+Cjwvc3ZnPg=="
    };
    // let size = 30;
    // if (Blockly.getMainWorkspace().renderer_.name === 'geras') {
    //     size = 24;
    // }
    return {
        "type": "field_image",
        "src": IA_IMAGE_BLOCK_ICON[icon],
        "width": 30,
        "height": 30,
        "alt": "[ ]"
    };
};

Blockly.Extensions.registerMixin("communication_gps_getGGAInformations_get_type",
    Blockly.Constants.Utils.COMMUNICATION_GPS_GET_GGA_INFORMATIONS_GET_TYPE);

// Disable all instances of the block present in the workspace, except the highest one
Blockly.Constants.DISABLE_DUPLICATES_EXTENSION = function () {
    if (!ToolboxManager.DISABLE_DISABLING_DUPLICATES_EXTENSION) {
        this.setOnChange(onUpdate_);
        /** Met à jour l'état d'activation des blocs supérieurs */
        function onUpdate_(event) {
            if (
                ((event.type == Blockly.Events.BLOCK_MOVE || event.type == Blockly.Events.BLOCK_CREATE || (event.type == Blockly.Events.BLOCK_CHANGE && event.extensionNoUpdate !== true)) && event.blockId === this.id) ||
                (event.type == Blockly.Events.BLOCK_DELETE && event.oldXml.outerHTML.includes(this.type))
            ) {
                // Lister les blocs supérieurs
                const topBlocks = this.workspace.getTopBlocks();
                const sameTypeBlocks = topBlocks.filter(block => block.type === this.type && block.disabled === false);

                let blocksOrderedByParam = {};

                /** Parmis sameTypeBlocks, regrouper les blocs possédant un paramètre identique
                 * dans un tableau associatif blocksOrderedByParam
                 * Les blocs ne possédant pas d'option seront simplement triés par ordre d'apparition
                 */
                for (var i = 0, block; (block = sameTypeBlocks[i]); i++) {
                    const blockDropDownValue = getDropDownValue_(block);
                    if (blockDropDownValue) {
                        if (!blocksOrderedByParam[blockDropDownValue]) {
                            blocksOrderedByParam[blockDropDownValue] = [];
                        }
                        blocksOrderedByParam[blockDropDownValue].push(block);
                    } else {
                        if (!blocksOrderedByParam["default"]) {
                            blocksOrderedByParam["default"] = [];
                        }
                        blocksOrderedByParam["default"].push(block);
                    }
                }

                let highestBlocks = [];

                // Pour chaque groupe / clé, savegarder le bloc le plus haut
                for (const key in blocksOrderedByParam) {
                    let highestBlock = undefined;
                    for (const block of blocksOrderedByParam[key]) {
                        if (highestBlock === undefined || block.getRelativeToSurfaceXY().y < highestBlock.getRelativeToSurfaceXY().y ||
                            (block.getRelativeToSurfaceXY().y == highestBlock.getRelativeToSurfaceXY().y && block.getRelativeToSurfaceXY().x < highestBlock.getRelativeToSurfaceXY().x)
                        ) {
                            highestBlock = block;
                        }
                    }
                    highestBlocks.push(highestBlock);
                }

                // met à jour le statut d'activation de chaque bloc et refait le rendu du block et de ses enfants
                for (const block of sameTypeBlocks) {
                    const previousState = block.disabled;
                    if (!highestBlocks.includes(block)) {
                        block.disabled = true;
                    } else {
                        block.disabled = false;
                    }
                    if (block.disabled != previousState) {
                        // childBlock include the block itself
                        for (var i = 0, childBlock; (childBlock = block.getDescendants(true)[i]); i++) {
                            childBlock.disabled = block.disabled;
                            childBlock.initSvg();
                        }
                    }
                }

                /**
                 * "Fire" d'événenement nécessaire !
                 * Notions : 
                 * - Le code peut être généré automatiquement suite à certains événements.
                 * - La génération de code est alors faite AVANT l'exécution de cette extension.
                 * Suite à l'activation d'un bloc dû à cette extension :
                 * Pour que le code généré automatiquement le prenne en compte, il est nécessaire de lancer
                 * un événement en fin de processus pour déclencher une génération de code qui prend en compte le bloc nouvellement actif.
                 * @param {boolean} extensionNoUpdate Paramètre utilisé pour ne pas boucler indéfiniment dans cette fonction d'Update.
                 */
                var newEvent = new Blockly.Events.BlockChange(block, "field", "BUTTON", "fromExtensionUpdate", "");
                newEvent.extensionNoUpdate = true;
                Blockly.Events.fire(newEvent);

            }
        }

        function getDropDownValue_(block) {
            let i = 0;
            let found = null;
            while (i < block.inputList.length && !found) {
                let j = 0;
                while (j < block.inputList[i].fieldRow.length && !found) {
                    if (block.inputList[i].fieldRow[j] instanceof Blockly.FieldDropdown) {
                        found = block.inputList[i].fieldRow[j].value_;
                    }
                    j++;
                }
                i++;
            }
            return found;
        }
    }
};

Blockly.Extensions.register("disable_duplicates",
    Blockly.Constants.DISABLE_DUPLICATES_EXTENSION);

// Called when workspace event 
Blockly.Constants.DISABLE_BLOCKS_ON_EVENT = function (blockType, detectedBlocksArray) {
    const disabled = function (block, state) {
        block.disabled = state;
        // childBlock include the block itself
        for (var i = 0, childBlock; (childBlock = block.getDescendants(true)[i]); i++) {
            childBlock.disabled = state;
            childBlock.initSvg();
        }
    };
    const topBlocks = Blockly.getMainWorkspace().getTopBlocks();
    let hasEventBlocks = false;
    for (var i = 0, block; (block = topBlocks[i]); i++) {
        if (block.rendered == true) {
            for (var j = 0; j < detectedBlocksArray.length; j++) {
                if (block.type === detectedBlocksArray[j]) {
                    hasEventBlocks = true;
                    break;
                }
            }
            if (hasEventBlocks) {
                break;
            }
        } else {
            hasEventBlocks = false;
        }
    }
    for (var i = 0, block; (block = topBlocks[i]); i++) {
        if (block.type === blockType && block.rendered == true) {
            disabled(block, hasEventBlocks);
        }
    }
};
