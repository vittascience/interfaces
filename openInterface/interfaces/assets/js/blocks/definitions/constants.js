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
            compatibleTypes_: ['Number', 'Short Number', 'Large Number', 'Uint32_t']
        },
        SHORT_NUMBER: {
            compatibleTypes_: ['Short Number', 'Number', 'Large Number', 'Decimal']
        },
        TEXT: {
            compatibleTypes_: ['Character', 'String']
        },
        UNDEF: {
            compatibleTypes_: ['Undefined']
        },
        UINT8_T: {
            compatibleTypes_: ['Uint8_t']
        },
        UINT16_T: {
            compatibleTypes_: ['Uint16_t']
        },
        UINT32_T: {
            compatibleTypes_: ['Uint32_t']
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
    if (['arduino', 'esp32', 'pico', 'raspberrypi'].includes(INTERFACE_NAME)) {
        const value = getParamValue('board');
        if (value !== null && Object.keys(INTERFACE_BOARDS).includes(value)) {
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
    const input = block.getInput(name);
    if (input) {
        const inputBlock = input.connection.targetBlock();
        if (inputBlock && (inputBlock.type == "text" || inputBlock.type == "text_join")) {
            return true;
        } else {
            return false;
        }
    } else {
        console.error("Block " + block.type + " has no input named '" + name + "'");
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
        "communication_log_data"
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
    },
    /**
     * Register block colour and block category information searching in toolbox definition.
     */
    registerInformationsFromToolbox: function () {
        const toolbox = ToolboxManager.toolboxDefined(this.toolboxMode);
        if (toolbox) {
            for (const cat of Object.keys(toolbox.content)) {
                const catContent = toolbox.content[cat];
                if (Array.isArray(catContent)) {
                    const register = (type) => {
                        type = type.split('-')[0];
                        const settings = () => Blockly.Constants.Utils.BlockStyling.blocks[type];
                        if (!settings()) {
                            Blockly.Constants.Utils.BlockStyling.blocks[type] = {}
                        }
                        // reg color
                        const theme = toolbox.theme[cat + "_blocks"];
                        if (theme) {
                            if (settings().colours) {
                                settings().colours[this.toolboxMode] = theme.colourPrimary;
                            } else {
                                settings().colours = { [this.toolboxMode]: theme.colourPrimary }
                            }
                        } else {
                            console.error("Color not found for " + type);
                        }
                        // reg category
                        if (settings().categories) {
                            settings().categories[this.toolboxMode] = cat;
                        } else {
                            settings().categories = { [this.toolboxMode]: cat }
                        }
                    };
                    for (const subcat of Object.keys(catContent)) {
                        if (catContent[subcat].contents) {
                            for (const item of catContent[subcat].contents) {
                                for (const type of item.blocks) {
                                    register(type);
                                }
                            }
                        } else {
                            if (catContent[subcat].blocks) {
                                for (const type of catContent[subcat].blocks) {
                                    register(type);
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    /**
    * Set color or Help url of block checking Blockly.Constants.Utils.BlockStyling.blocks
    * @param {String} blockType 
    * @param {String} parameter
    * @param {String} value
    */
    getBlockParameter: function (blockType, parameter) {
        if (!this.blocks[blockType]) {
            this.blocks[blockType] = {};
        }
        const options = this.blocks[blockType][parameter];
        if (options && options[this.toolboxMode]) {
            return options[this.toolboxMode];
        }
    },
    /**
    * Get parent block when child block is an input block of ToolboxManager.DB_.
    * @param {String} childType 
    * @returns {String} parentType
    */
    getParentBlockType: function (childType) {
        const blocks = ToolboxManager.DB_.get();
        let parentBlockType = null;
        if (Array.isArray(blocks)) {
            parentBlockType = blocks.find(block => block.blockxml.includes(childType)).type;
        } else {
            parentBlockType = Object.keys(blocks).find(type => blocks[type].includes(childType));
        }
        return parentBlockType ? parentBlockType : childType;
    },
    getBlockColor: function (block) {
        this.toolboxMode = Blockly.Constants.getToolboxStyle();
        let colour = this.getBlockParameter(block.type, 'colours');
        if (!colour) {
            this.registerInformationsFromToolbox();
            colour = this.getBlockParameter(block.type, 'colours');
        }
        const lightStyling = this.LIGHTER_BLOCKS.includes(block.type);
        if (lightStyling) {
            const parentBlockType = this.getParentBlockType(block.type);
            colour = this.getBlockParameter(parentBlockType, 'colours');
            colour = this.getLigthenColor(colour);
        }
        return colour;
    },
    getBlockCategory: function (block) {
        this.toolboxMode = Blockly.Constants.getToolboxStyle();
        let category = this.getBlockParameter(block.type, 'categories');
        if (!category) {
            this.registerInformationsFromToolbox();
            category = this.getBlockParameter(block.type, 'categories');
            if (!category) {
                const parentBlockType = this.getParentBlockType(block.type);
                category = this.getBlockParameter(parentBlockType, 'categories');
            }
        }
        return category;
    }

};

/**
 * Initializes the color of a block in the case where the "style" parameter of the json is not defined.
 * This allows the color to dynamically change when the interface changes toolbox mode. 
 */
Blockly.Constants.Utils.INIT_BLOCK_COLOR = function () {
    if (!ToolboxManager.DISABLE_BLOCK_COLOR_EXTENSION) {
        try {
            if (INTERFACE_NAME == "TI-83" && Blockly.Constants.getToolboxStyle() == TOOLBOX_STYLE_TI_CODE) {
                return;
            }
            const colour = Blockly.Constants.Utils.BlockStyling.getBlockColor(this);
            if (colour && this.getColour() !== colour) {
                this.setColour(colour);
            }
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
            if (INTERFACE_NAME == "TI-83" && Blockly.Constants.getToolboxStyle() == TOOLBOX_STYLE_TI_CODE) {
                return;
            }
            const category = Blockly.Constants.Utils.BlockStyling.getBlockCategory(this);
            if (category) {
                let wikiUrl = `${CDN_PATH}/wiki?interface=${INTERFACE_NAME}`;
                if (/(esp32|pico|arduino|raspberrypi)/.test(INTERFACE_NAME)) {
                    wikiUrl += '&board=' + Blockly.Constants.getSelectedBoard();
                }
                wikiUrl += `&category=${category}#${this.type}Div-container`;
                this.setHelpUrl(wikiUrl);
            } else {
                this.setHelpUrl(`${CDN_PATH}/support/glossary`);
            }
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
                        if (typeof value === 'boolean') {
                            this.appendValueInput(attribute.toUpperCase());
                            this.addDefaultBlock({
                                "name": attribute.toUpperCase(),
                                "type": "logic_boolean",
                                "field_name": "BOOL",
                                "value": value ? "TRUE" : "FALSE"
                            });
                        } else {
                            this.appendValueInput(attribute.toUpperCase());
                            this.addDefaultBlock({
                                "name": attribute.toUpperCase(),
                                "type": "math_number",
                                "field_name": "NUM",
                                "value": value
                            });
                        }
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
                if (/Src value of an image field is required/.test(String(e))) {
                    console.error("Please, add the 'block_buttons_plus_minus' extension to block")
                }
                
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

/**
* 'output_mutator' extension to the blocks that can update the block output 
* based on dropdown option changing
* @param {String} blockType
* @param {String} name
* @param {function} updateShape
*/
Blockly.Constants.Utils.DEFINE_OUTPUT_TYPE_BY_DROPDOWN = function (blockType, dropdownName, updateShape,) {
    const mutatorMixin = {
        /**
         * Create XML to represent list inputs.
         * @return {!Element} XML storage element.
         * @this {Blockly.Block}
         */
        mutationToDom: function () {
            return Blockly.utils.xml.createElement('mutation');
        },
        /**
         * Parse XML to restore the list inputs.
         * @param {!Element} xmlElement XML storage element.
         * @this {Blockly.Block}
         */
        domToMutation: function (xmlElement) {
            this.updateShape_();
        },
        /**
         * Modify this block to have the correct number of inputs.
         * @private
         * @this {Blockly.Block}
         */
        updateShape_: updateShape
    };
    if (typeof Blockly.Arduino !== 'undefined') {
        mutatorMixin.getBlockType = updateShape;
    }
    Blockly.Extensions.registerMutator(blockType + '_output_mutator',
        mutatorMixin,
        function () {
            this.getField(dropdownName).setValidator(function (option) {
                this.getSourceBlock().updateShape_(option);
            });
        }
    );
};

Blockly.Constants.Utils.ADD_ICON = function (icon) {
    const IMAGES_DATA = {
        "image": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJDYWxxdWVfMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTYuNjkgNTYuNjkiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO30uY2xzLTEsLmNscy0ye3N0cm9rZS13aWR0aDowcHg7fS5jbHMtMntmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjxnIGlkPSJDYWxxdWVfMS0yIj48ZyBpZD0iaWFfaW1hZ2VfYmxvY2tzIj48cmVjdCBjbGFzcz0iY2xzLTEiIHdpZHRoPSI1Ni42OSIgaGVpZ2h0PSI1Ni42OSIvPjxwYXRoIGlkPSJpY29uLXZpZGVvIiBjbGFzcz0iY2xzLTIiIGQ9Im0zMy44OSwzNi42N3YtMTYuNjVjMC0xLjUyLTEuMjQtMi43Ni0yLjc2LTIuNzZIMTQuNDhjLTEuNTIsMC0yLjc2LDEuMjQtMi43NiwyLjc2djE2LjY1YzAsMS41MiwxLjI0LDIuNzYsMi43NiwyLjc2aDE2LjY1YzEuNTIsMCwyLjc2LTEuMjQsMi43Ni0yLjc2Wm05LjIxLjkxYzEuMDIuMDEsMS44Ni0uOCwxLjg4LTEuODN2LTE0LjgzYzAtLjM3LS4xMi0uNzMtLjMzLTEuMDMtLjU4LS44NC0xLjc0LTEuMDQtMi41OC0uNDZsLTYuMzMsNC4zNnY5LjA5czYuMzMsNC4zNiw2LjMzLDQuMzZjLjMuMjEuNjYuMzMsMS4wMy4zM1oiLz48L2c+PC9nPjwvc3ZnPg==",
        "sound": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJDYWxxdWVfMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTYuNjkgNTYuNjkiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO30uY2xzLTEsLmNscy0ye3N0cm9rZS13aWR0aDowcHg7fS5jbHMtMntmaWxsOiNmZWZlZmU7fTwvc3R5bGU+PC9kZWZzPjxnIGlkPSJDYWxxdWVfMS0yIj48ZyBpZD0iaWFfc291bmRfYmxvY2tzIj48cGF0aCBpZD0iaWNvbi1taWMtMiIgY2xhc3M9ImNscy0yIiBkPSJtMjYuNzEsNDMuMjl2LTUuMzZjLTUuNjItLjc1LTEwLjA3LTUuMTMtMTAuOTEtMTAuNzQtLjEzLS44OS40OS0xLjcyLDEuMzktMS44NS44OS0uMTIsMS43Mi41LDEuODUsMS4zOS42OCw0LjYxLDQuNjQsOC4wNCw5LjMsOC4wNSw0LjY3LS4wMSw4LjYzLTMuNDQsOS4zLTguMDcuMTMtLjkuOTYtMS41MiwxLjg1LTEuMzksMCwwLDAsMCwwLDAsLjkuMTMsMS41Mi45NiwxLjM5LDEuODUtLjgyLDUuNjItNS4yOCwxMC4wMS0xMC45MSwxMC43NnY1LjM2YzAsLjktLjczLDEuNjQtMS42NCwxLjY0cy0xLjY0LS43My0xLjY0LTEuNjRoMFptLTMuMy0xNi4yNnYtMTAuMzJjMC0yLjczLDIuMjEtNC45NCw0Ljk0LTQuOTQsMi43MywwLDQuOTQsMi4yMSw0Ljk0LDQuOTRoMHYxMC4zMmMwLDIuNzMtMi4yMSw0Ljk0LTQuOTQsNC45NGgwYy0yLjczLDAtNC45NC0yLjIxLTQuOTQtNC45NFoiLz48cmVjdCBjbGFzcz0iY2xzLTEiIHdpZHRoPSI1Ni42OSIgaGVpZ2h0PSI1Ni42OSIvPjwvZz48L2c+PC9zdmc+",
        "text": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJDYWxxdWVfMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNDUuMzUgMzAuMjEiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO30uY2xzLTEsLmNscy0ye3N0cm9rZS13aWR0aDowcHg7fS5jbHMtMntmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjxnIGlkPSJDYWxxdWVfMS0yIj48ZyBpZD0iaWFfdGV4dF9ibG9jcyI+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNDUuMzUiIGhlaWdodD0iMzAuMjEiLz48cGF0aCBpZD0iaWNvbi1mdWxsc2NyZWVuIiBjbGFzcz0iY2xzLTIiIGQ9Im0zNi4zOCwzMC4yMWgtNi4xOGMtLjg5LDAtMS42MS0uNzItMS42MS0xLjYxaDBjMC0uODkuNzItMS42MSwxLjYxLTEuNjFoNC41N3YtNC41OGMwLS44OS43Mi0xLjYxLDEuNjEtMS42MWgwYy44OSwwLDEuNjEuNzIsMS42MSwxLjYxaDB2Ni4xOWMwLC44OS0uNzIsMS42MS0xLjYxLDEuNjEsMCwwLDAsMCwwLDBabS0yMS4yMy0uMTNoLTYuMThjLS44OSwwLTEuNjEtLjcyLTEuNjEtMS42MWgwdi02LjE5YzAtLjg5LjcyLTEuNjEsMS42MS0xLjYxaDBjLjg5LDAsMS42MS43MiwxLjYxLDEuNjFoMHY0LjU4aDQuNTdjLjg5LDAsMS42MS43MiwxLjYxLDEuNjFoMGMwLC44OS0uNzIsMS42MS0xLjYxLDEuNjFoMFptMjEuMjItMjAuNjZjLS44OSwwLTEuNjEtLjcyLTEuNjEtMS42MWgwVjMuMjNoLTQuNThjLS44OSwwLTEuNjEtLjcyLTEuNjEtMS42MWgwYzAtLjg5LjcyLTEuNjEsMS42MS0xLjYxaDYuMThjLjg5LDAsMS42MS43MiwxLjYxLDEuNjFoMHY2LjE5YzAsLjg5LS43MiwxLjYxLTEuNjEsMS42MmgwWm0tMjcuNDEsMGMtLjg5LDAtMS42MS0uNzItMS42MS0xLjYxaDBWMS42MkM3LjM2LjczLDguMDgsMCw4Ljk3LDBoNi4xOGMuODksMCwxLjYxLjcyLDEuNjEsMS42MWgwYzAsLjg5LS43MiwxLjYxLTEuNjEsMS42MWgtNC41N3Y0LjU4YzAsLjg5LS43MiwxLjYxLTEuNjEsMS42MWgwWiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0ibTE4LjkxLDE4LjRsLTIuMTQsNi40OGgtMi43NWw3LTIwLjZoMy4yMWw3LjAzLDIwLjZoLTIuODRsLTIuMi02LjQ4aC03LjNabTYuNzUtMi4wOGwtMi4wMi01LjkzYy0uNDYtMS4zNC0uNzYtMi41Ny0xLjA3LTMuNzZoLS4wNmMtLjMxLDEuMjItLjY0LDIuNDgtMS4wNCwzLjczbC0yLjAyLDUuOTZoNi4yWiIvPjwvZz48L2c+PC9zdmc+",
        "posture": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJDYWxxdWVfMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTYuNjkgNTYuNjkiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO30uY2xzLTEsLmNscy0ye3N0cm9rZS13aWR0aDowcHg7fS5jbHMtMntmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjxnIGlkPSJDYWxxdWVfMS0yIj48ZyBpZD0iSUFfcG9zdHVyZSI+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMzUuODIsMjUuNjhjLTQuMzItMS41NC01LjExLTYuMzMtNS4xNS02LjU0LS4wOC0uNTItLjQ5LS45LS45Ny0uOTgtLjAxLS4wMy0uMDMtLjA1LS4wNS0uMDguMy4wNi42MS4xLjkzLjEsMi40NywwLDQuNDgtMi4wMSw0LjQ4LTQuNDhzLTIuMDEtNC40OC00LjQ4LTQuNDgtNC40OCwyLjAxLTQuNDgsNC40OGMwLDEuNjQuODksMy4wNiwyLjIsMy44NC0uMTEuMDMtLjIxLjA4LS4zMS4xNGwtNS42OCwzLjY4Yy0uNDIuMjctLjYyLjc4LS41MSwxLjI2bDEuMjUsNS4zN2MuMTUuNjQuNzksMS4wMywxLjQyLjg5LjY0LS4xNSwxLjA0LS43OS44OS0xLjQybC0xLjA2LTQuNTYsMi43Mi0xLjc2LTEuNDgsOC43M3MwLC4wMiwwLC4wM2MwLC4wMy0uMDEuMDYtLjAyLjEsMCwuMDgtLjUyLDcuOTktNS4yNiwxNS42OC0uMzQuNTYtLjE3LDEuMjkuMzksMS42My4xOS4xMi40MS4xOC42Mi4xOC40LDAsLjc5LS4yLDEuMDEtLjU2LDMuMjEtNS4yLDQuNTktMTAuNDEsNS4xOS0xMy42MmwyLjA2LDMuMDUuNDcsOS4yMWMuMDMuNjMuNTYsMS4xMywxLjE4LDEuMTMuMDIsMCwuMDQsMCwuMDYsMCwuNjUtLjAzLDEuMTYtLjU5LDEuMTItMS4yNGwtLjQ5LTkuNTRjLS4wMS0uMjItLjA4LS40Mi0uMi0uNmwtMy43Mi01LjUsMS4yNy03LjQ2Yy44OCwxLjk3LDIuNTksNC40Myw1LjgsNS41OC4xMy4wNS4yNy4wNy40LjA3LjQ5LDAsLjk0LS4zLDEuMTItLjc5LjIyLS42Mi0uMS0xLjMtLjcyLTEuNTJaIi8+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNTYuNjkiIGhlaWdodD0iNTYuNjkiLz48L2c+PC9nPjwvc3ZnPg==",
        "sensor": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iQ2FscXVlXzIiIGRhdGEtbmFtZT0iQ2FscXVlIDIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDM0LjA3IDMyLjc2Ij4KICA8ZyBpZD0iQ2FscXVlXzEtMiIgZGF0YS1uYW1lPSJDYWxxdWUgMS0yIj4KICAgIDxwYXRoIGlkPSJJQV9taWNyb2NvbnRyb2xldXJfZ3JlZW5fcGljdG8iIGRhdGEtbmFtZT0iSUEgbWljcm9jb250cm9sZXVyIGdyZWVuIHBpY3RvIiBkPSJNMzMuOTcsMTMuMTJsLTIuMjMtNS40M2MtLjU5LTEuNDUtMi0yLjM1LTMuNTUtMi4zMi0xLjU2LC4wNC0yLjkxLDEuMDItMy40NCwyLjQ5bC00LjcsMTMuMjNjLS4yNSwuNy0uODksLjczLTEuMDYsLjc0LS4xOSwwLS44MS0uMDYtMS4wNS0uNzZsLTQuMjgtMTIuOTJjLS41LTEuNS0xLjg0LTIuNTEtMy40My0yLjU2LTEuNi0uMDUtMi45OSwuODYtMy41OSwyLjMzbC0yLjcxLDYuNjRWNC41NGgxLjMxTDIuNjIsMCwwLDQuNTRIMS4zMVYzMC4xM2MwLC43MywuNTksMS4zMSwxLjMxLDEuMzFIMjguMjF2MS4zMWw0LjU0LTIuNjItNC41NC0yLjYydjEuMzFIMy45NHYtNy4zMWw1LjE1LTEyLjZjLjI3LS42NywuODktLjY5LDEuMDctLjY5cy43OSwuMDgsMS4wMiwuNzZsNC4yOCwxMi45MmMuNTEsMS41NCwxLjg5LDIuNTUsMy41MSwyLjU3aC4wNGMxLjYxLDAsMi45OS0uOTcsMy41Mi0yLjQ5bDQuNy0xMy4yM2MuMjQtLjY3LC44NC0uNzQsMS4wMi0uNzRzLjc5LC4wMywxLjA2LC42OWwyLjIzLDUuNDNjLjI4LC42NywxLjA0LC45OSwxLjcxLC43MiwuNjctLjI4LC45OS0xLjA0LC43Mi0xLjcxdi0uMDJaIiBzdHlsZT0iZmlsbDogI2ZjZmNmYzsiLz4KICA8L2c+Cjwvc3ZnPg=="
    };
    return {
        "type": "field_image",
        "src": IMAGES_DATA[icon],
        "width": 30,
        "height": 30,
        "alt": "[ ]"
    };
};

/**
* Performs final setup of 'display_led_matrix_DrawBitmap' block.
* @this {Blockly.Block}
*/
Blockly.Constants.Utils.DISPLAY_MONO_LED_MATRIX_INIT_EXTENSION = function () {
    this.getField('HIDDEN_MONO_LEDS_MATRIX').setVisible(false);
    if (typeof Blockly.Wiki === 'undefined') {
        Main.getWorkSpace().addChangeListener(async function (e) {
            await new Promise(r => setTimeout(r, 1000));
            if (e.type === Blockly.Events.FINISHED_LOADING) {
                LedMatrixModalManager.updateImageMono();
            }
        });
    }
};

Blockly.Extensions.register("display_mono_led_matrix_init_extension",
    Blockly.Constants.Utils.DISPLAY_MONO_LED_MATRIX_INIT_EXTENSION);

Blockly.Constants.Utils.DISPLAY_SHOW_LEDS_MATRIX = function () {
    // init matrix 8*8 mono
    if (!LedMatrixModalManager.isSet() && typeof Blockly.Wiki === 'undefined')
        LedMatrixModalManager.init(8, 8, false, "#e63737");

    this.getField('LEDS_MATRIX').clickHandler_ = (() => {
        Blockly.Constants.LEDS_MATRIX_BLOCK = this.inputList[0].fieldRow[1];
        Blockly.Constants.HIDDEN_MONO_LEDS_MATRIX = this.getField("HIDDEN_MONO_LEDS_MATRIX");

        if (Blockly.Constants.HIDDEN_MONO_LEDS_MATRIX.getValue() == '')
            Blockly.Constants.HIDDEN_MONO_LEDS_MATRIX.setValue(this.getField("LEDS_MATRIX").getText());

        LedMatrixModalManager.load_matrix_from_block();
        LedMatrixModalManager.disp_modal();
        // saving the image in case of cancellation
        Blockly.Constants.LEDS_MATRIX = LedMatrixModalManager.get_matrix_dataset();
    });
};

Blockly.Extensions.register("show_leds_matrix", Blockly.Constants.Utils.DISPLAY_SHOW_LEDS_MATRIX);

// Disable all instances of the block present in the workspace, except the highest one
Blockly.Constants.Utils.DISABLE_DUPLICATES_EXTENSION = function () {
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
                const sameTypeBlocks = topBlocks.filter(block => block.type === this.type);
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
    Blockly.Constants.Utils.DISABLE_DUPLICATES_EXTENSION);

// Called when workspace event 
Blockly.Constants.Utils.DISABLE_BLOCKS_ON_EVENT = function (blockType, detectedBlocksArray) {
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

Blockly.Constants.REPLACE_PIN_DROPDOWN_MENU = function (block) {
    if (['arduino', 'esp32'].includes(INTERFACE_NAME)) {
        const dropdowns = [];
        this.inputList.forEach(input => {
            input.fieldRow.forEach(field => {
                if (field instanceof Blockly.FieldDropdown) {
                    dropdowns.push(field);
                }
            });
        });
        const forcePinValue = function (pinField, pins) {
            const pinFieldValue = pinField.value_;
            pinField.menuGenerator_ = pins;
            if (!pins.map(item => item[1]).includes(pinFieldValue)) {
                pinField.value_ = pins[0][1];
                pinField.selectedOption_ = pins[0];
                if (pinField.selectedMenuItem_) {
                    pinField.selectedMenuItem_.content_ = pins[0][0];
                }
            } else {
                const selectedOpt = pins.filter(item => item[1] == pinFieldValue)[0];
                pinField.selectedOption_ = selectedOpt;
                if (pinField.selectedMenuItem_) {
                    pinField.selectedMenuItem_.content_ = selectedOpt[0];
                }
            }
        };
        const menu = function (type, pinField) {
            if (typeof VittaInterface !== 'undefined' && VittaInterface && VittaInterface.shieldView) {
                if (typeof INTERFACE_BOARDS !== 'undefined' && INTERFACE_NAME !== 'arduino') {
                    const shieldId = INTERFACE_BOARDS[Blockly.Constants.getSelectedBoard()].shieldId;
                    const pins = Blockly.Constants.Pins[type][shieldId];
                    if (shieldId && pins) {
                        forcePinValue(pinField, pins);
                        return () => pins;
                    } else {
                        console.error("Unable to find pins for shieldId: " + shieldId);
                    }
                }
            }
            const pins = Blockly.Constants.Pins[type][Blockly.Constants.getSelectedBoard()];
            forcePinValue(pinField, pins);
            return () => pins;
        };
        for (const i in dropdowns) {
            const type = dropdowns[i].menuGenerator_.type;
            if (type && Blockly.Constants.Pins[type]) {
                for (const pin in Blockly.Constants.Pins[type]) {
                    const pins = Blockly.Constants.Pins[type][pin];
                    if (dropdowns[i].menuGenerator_.length == pins.length) {
                        if (arrayEquals(dropdowns[i].menuGenerator_, pins)) {
                            const pinField = this.getField(dropdowns[i].name);
                            pinField.menuGenerator_ = menu(type, pinField);
                            break;
                        }
                    }
                }
            }
        }
    }
};

Blockly.Extensions.register('pins_management_global', Blockly.Constants.REPLACE_PIN_DROPDOWN_MENU);

Blockly.Constants.Utils.DEFINE_OUTPUT_TYPE_BY_DROPDOWN(
    'communication_gps_getGGAInformations',
    'INFO',
    function (option) {
        switch (option) {
            default:
            case "type":
                this.setOutput(true, "String");
                return Blockly.Types.TEXT;
            case "clock":
                this.setOutput(true, "Array");
                return Blockly.Types.ARRAY;
            case "latitude":
            case "longitude":
            case "altitude":
            case "satellite":
                this.setOutput(true, "Number");
                return Blockly.Types.NUMBER;
        }
    }
);

Blockly.Constants.Utils.DEFINE_OUTPUT_TYPE_BY_DROPDOWN(
    'communication_rfid_convertData',
    'TYPE',
    function (option) {
        switch (option) {
            case "HEX":
                this.setOutput(true, "String");
                return Blockly.Types.TEXT;
            case "INT":
                this.setOutput(true, "Number");
                return Blockly.Types.NUMBER;
            default:
            case "LIST":
                this.setOutput(true, "Array");
                return Blockly.Types.ARRAY;
        }
    }
);

Blockly.Constants.Utils.BlockOptions = {
    getMicrobitIcons: function () {
        return ['heart', 'happy', 'sad', 'yes', 'no', 'stickfigure', 'pitchfork', 'umbrella', 'skull', 'chessboard', 'butterfly'].map((icon) => [
            {
                'src': _PATH + '/microbit/assets/media/blocks_icons/' + icon + '.png',
                'width': 32,
                'height': 32,
                'alt': icon + ' icon'
            },
            icon.toUpperCase()
        ])
    },
    getOledIcons: function () {
        return ['heart', 'happy', 'sad', 'yes', 'no', 'man', 'fork', 'umbrella', 'skull', 'grid', 'butterfly', 'sword', 'wine', 'lock', 'net', 'battery1', 'battery2', 'battery3'].map((icon) => [
            {
                'src': _PATH + '/interfaces/assets/media/oled_icons/' + icon + '.png',
                'width': 32,
                'height': 32,
                'alt': icon + " icon"
            },
            icon.toUpperCase()
        ])
    },
    getEliobotBackpackLedMatrixIcons: function () {
        return ['logoHeart', 'logoSmiley', 'logoSad', 'logoArrowUp', 'logoArrowDown', 'logoArrowLeft', 'logoArrowRight', 'logoCross', 'logoCheck'].map((icon) => [
            {
                'src': _PATH + '/eliobot/assets/media/blocks_icons/' + icon + '.svg',
                'width': 32,
                'height': 32,
                'alt': icon.split('logo')[1] + " icon"
            },
            icon
        ])
    }
};

Blockly.Constants.COLOURS = {
    '#ff0000': '0x00',
    '#ff0600': '0x01',
    '#ff0c00': '0x02',
    '#ff1200': '0x03',
    '#ff1800': '0x04',
    '#ff1e00': '0x05',
    '#ff2400': '0x06',
    '#ff2a00': '0x07',
    '#ff3000': '0x08',
    '#ff3600': '0x09',
    '#ff3c00': '0x0a',
    '#ff4200': '0x0b',
    '#ff4800': '0x0c',
    '#ff4e00': '0x0d',
    '#ff5400': '0x0e',
    '#ff5a00': '0x0f',
    '#ff6000': '0x10',
    '#ff6600': '0x11',
    '#ff6c00': '0x12',
    '#ff7200': '0x13',
    '#ff7800': '0x14',
    '#ff7e00': '0x15',
    '#ff8400': '0x16',
    '#ff8a00': '0x17',
    '#ff9000': '0x18',
    '#ff9600': '0x19',
    '#ff9c00': '0x1a',
    '#ffa200': '0x1b',
    '#ffa800': '0x1c',
    '#ffae00': '0x1d',
    '#ffb400': '0x1e',
    '#ffba00': '0x1f',
    '#ffc000': '0x20',
    '#ffc600': '0x21',
    '#ffcc00': '0x22',
    '#ffd200': '0x23',
    '#ffd800': '0x24',
    '#ffde00': '0x25',
    '#ffe400': '0x26',
    '#ffea00': '0x27',
    '#fff000': '0x28',
    '#fff600': '0x29',
    '#ffff00': '0x2a',
    '#f9ff00': '0x2b',
    '#f3ff00': '0x2c',
    '#edff00': '0x2d',
    '#e7ff00': '0x2e',
    '#e1ff00': '0x2f',
    '#dbff00': '0x30',
    '#d5ff00': '0x31',
    '#cfff00': '0x32',
    '#c9ff00': '0x33',
    '#c3ff00': '0x34',
    '#bdff00': '0x35',
    '#b7ff00': '0x36',
    '#b1ff00': '0x37',
    '#abff00': '0x38',
    '#a5ff00': '0x39',
    '#9fff00': '0x3a',
    '#99ff00': '0x3b',
    '#93ff00': '0x3c',
    '#8dff00': '0x3d',
    '#87ff00': '0x3e',
    '#81ff00': '0x3f',
    '#7bff00': '0x40',
    '#75ff00': '0x41',
    '#6fff00': '0x42',
    '#69ff00': '0x43',
    '#63ff00': '0x44',
    '#5dff00': '0x45',
    '#57ff00': '0x46',
    '#51ff00': '0x47',
    '#4bff00': '0x48',
    '#45ff00': '0x49',
    '#3fff00': '0x4a',
    '#39ff00': '0x4b',
    '#33ff00': '0x4c',
    '#2dff00': '0x4d',
    '#27ff00': '0x4e',
    '#21ff00': '0x4f',
    '#1bff00': '0x50',
    '#15ff00': '0x51',
    '#0fff00': '0x52',
    '#09ff00': '0x53',
    '#03ff00': '0x54',
    '#00ff00': '0x55',
    '#00ff06': '0x56',
    '#00ff0c': '0x57',
    '#00ff12': '0x58',
    '#00ff18': '0x59',
    '#00ff1e': '0x5a',
    '#00ff24': '0x5b',
    '#00ff2a': '0x5c',
    '#00ff30': '0x5d',
    '#00ff36': '0x5e',
    '#00ff3c': '0x5f',
    '#00ff42': '0x60',
    '#00ff48': '0x61',
    '#00ff4e': '0x62',
    '#00ff54': '0x63',
    '#00ff5a': '0x64',
    '#00ff60': '0x65',
    '#00ff66': '0x66',
    '#00ff6c': '0x67',
    '#00ff72': '0x68',
    '#00ff78': '0x69',
    '#00ff7e': '0x6a',
    '#00ff84': '0x6b',
    '#00ff8a': '0x6c',
    '#00ff90': '0x6d',
    '#00ff96': '0x6e',
    '#00ff9c': '0x6f',
    '#00ffa2': '0x70',
    '#00ffa8': '0x71',
    '#00ffae': '0x72',
    '#00ffb4': '0x73',
    '#00ffba': '0x74',
    '#00ffc0': '0x75',
    '#00ffc6': '0x76',
    '#00ffcc': '0x77',
    '#00ffd2': '0x78',
    '#00ffd8': '0x79',
    '#00ffde': '0x7a',
    '#00ffe4': '0x7b',
    '#00ffea': '0x7c',
    '#00fff0': '0x7d',
    '#00fff6': '0x7e',
    '#00fffc': '0x7f',
    '#00ffff': '0x80',
    '#00f9ff': '0x81',
    '#00f3ff': '0x82',
    '#00edff': '0x83',
    '#00e7ff': '0x84',
    '#00e1ff': '0x85',
    '#00dbff': '0x86',
    '#00d5ff': '0x87',
    '#00cfff': '0x88',
    '#00c9ff': '0x89',
    '#00c3ff': '0x8a',
    '#00bdff': '0x8b',
    '#00b7ff': '0x8c',
    '#00b1ff': '0x8d',
    '#00abff': '0x8e',
    '#00a5ff': '0x8f',
    '#009fff': '0x90',
    '#0099ff': '0x91',
    '#0093ff': '0x92',
    '#008dff': '0x93',
    '#0087ff': '0x94',
    '#0081ff': '0x95',
    '#007bff': '0x96',
    '#0075ff': '0x97',
    '#006fff': '0x98',
    '#0069ff': '0x99',
    '#0063ff': '0x9a',
    '#005dff': '0x9b',
    '#0057ff': '0x9c',
    '#0051ff': '0x9d',
    '#004bff': '0x9e',
    '#0045ff': '0x9f',
    '#003fff': '0xa0',
    '#0039ff': '0xa1',
    '#0033ff': '0xa2',
    '#002dff': '0xa3',
    '#0027ff': '0xa4',
    '#0021ff': '0xa5',
    '#001bff': '0xa6',
    '#0015ff': '0xa7',
    '#000fff': '0xa8',
    '#0009ff': '0xa9',
    '#0000ff': '0xaa',
    '#0600ff': '0xab',
    '#0c00ff': '0xac',
    '#1200ff': '0xad',
    '#1800ff': '0xae',
    '#1e00ff': '0xaf',
    '#2400ff': '0xb0',
    '#2a00ff': '0xb1',
    '#3000ff': '0xb2',
    '#3600ff': '0xb3',
    '#3c00ff': '0xb4',
    '#4200ff': '0xb5',
    '#4800ff': '0xb6',
    '#4e00ff': '0xb7',
    '#5400ff': '0xb8',
    '#5a00ff': '0xb9',
    '#6000ff': '0xba',
    '#6600ff': '0xbb',
    '#6c00ff': '0xbc',
    '#7200ff': '0xbd',
    '#7800ff': '0xbe',
    '#7e00ff': '0xbf',
    '#8400ff': '0xc0',
    '#8a00ff': '0xc1',
    '#9000ff': '0xc2',
    '#9600ff': '0xc3',
    '#9c00ff': '0xc4',
    '#a200ff': '0xc5',
    '#a800ff': '0xc6',
    '#ae00ff': '0xc7',
    '#b400ff': '0xc8',
    '#ba00ff': '0xc9',
    '#c000ff': '0xca',
    '#c600ff': '0xcb',
    '#cc00ff': '0xcc',
    '#d200ff': '0xcd',
    '#d800ff': '0xce',
    '#de00ff': '0xcf',
    '#e400ff': '0xd0',
    '#ea00ff': '0xd1',
    '#f000ff': '0xd2',
    '#f600ff': '0xd3',
    '#ff00ff': '0xd4',
    '#ff00f9': '0xd5',
    '#ff00f3': '0xd6',
    '#ff00ed': '0xd7',
    '#ff00e7': '0xd8',
    '#ff00e1': '0xd9',
    '#ff00db': '0xda',
    '#ff00d5': '0xdb',
    '#ff00cf': '0xdc',
    '#ff00c9': '0xdd',
    '#ff00c3': '0xde',
    '#ff00bd': '0xdf',
    '#ff00b7': '0xe0',
    '#ff00b1': '0xe1',
    '#ff00ab': '0xe2',
    '#ff00a5': '0xe3',
    '#ff009f': '0xe4',
    '#ff0099': '0xe5',
    '#ff0093': '0xe6',
    '#ff008d': '0xe7',
    '#ff0087': '0xe8',
    '#ff0081': '0xe9',
    '#ff007b': '0xea',
    '#ff0075': '0xeb',
    '#ff006f': '0xec',
    '#ff0069': '0xed',
    '#ff0063': '0xee',
    '#ff005d': '0xef',
    '#ff0057': '0xf0',
    '#ff0051': '0xf1',
    '#ff004b': '0xf2',
    '#ff0045': '0xf3',
    '#ff003f': '0xf4',
    '#ff0039': '0xf5',
    '#ff0033': '0xf6',
    '#ff002d': '0xf7',
    '#ff0027': '0xf8',
    '#ff0021': '0xf9',
    '#ff001b': '0xfa',
    '#ff0015': '0xfb',
    '#ff000f': '0xfc',
    '#ff0009': '0xfd',
    '#ffffff': '0xfe',
    '#000000': '0xff'
};

Blockly.Constants.ST_BLE_SENSOR_SERVICES = {
    "CO_SENSOR": {
        "title": "CO Sensor (ppm)",
        "uuid": "00008000-0001-11e1-ac36-0002a5d5c51b",
        "feature_mask_bit": "15",
        "fmt": "<Hi",
        adapt: (value) => {
            return "int(" + value + "*100)";
        }
    },
    "SECOND_TEMPERATURE": {
        "title": "Température 2 (°C)",
        "uuid": "00010000-0001-11e1-ac36-0002a5d5c51b",
        "feature_mask_bit": "16",
        "fmt": "<h",
        adapt: (value) => {
            return "int(" + value + "*10)";
        }
    },
    "FIRST_TEMPERATURE": {
        "title": "Température 1 (°C)",
        "uuid": "00040000-0001-11e1-ac36-0002a5d5c51b",
        "feature_mask_bit": "18",
        "fmt": "<Hh",
        adapt: (value) => {
            return "int(" + value + "*10)";
        }
    },
    "HUMIDITY": {
        "title": "Humidité (%)",
        "uuid": "00080000-0001-11e1-ac36-0002a5d5c51b",
        "feature_mask_bit": "19",
        "fmt": "<h",
        adapt: (value) => {
            return "int(" + value + "*10)";
        }
    },
    "PRESSURE": {
        "title": "Pression (hPa ou mBar)",
        "uuid": "00100000-0001-11e1-ac36-0002a5d5c51b",
        "feature_mask_bit": "20",
        "fmt": "<i",
        adapt: (value) => {
            return "int(" + value + "*100)";
        }
    },
    "ACCELEROMETER": {
        "title": "Acceléromètre (mg.s-²)",
        "uuid": "00800000-0001-11e1-ac36-0002a5d5c51b",
        "feature_mask_bit": "23",
        "fmt": "<hhh",
        adapt: (value) => {
            return "int(" + value + ")";
        }
    },
    "LUMINOSITY": {
        "title": "Luminosité (lux)",
        "uuid": "01000000-0001-11e1-ac36-0002a5d5c51b",
        "feature_mask_bit": "24",
        "fmt": "<h",
        adapt: (value) => {
            return "int(" + value + ")";
        }
    }
};