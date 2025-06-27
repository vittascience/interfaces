/**
 * Get the toolbox style from url.
 * @return {String}
 */
Blockly.Constants.getToolboxStyle = function () {
    let toolboxMode = getParamValue('toolbox');
    if (!ToolboxManager.toolboxDefined(toolboxMode)) {
        toolboxMode = TOOLBOX_STYLE_DEFAULT;
    }
    return toolboxMode;
};

// Constants object for mutators
Blockly.Constants.Utils = Object.create(null);

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
    // Mutation may have added some elements that need initializing.
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
    if (this.workspace.renderer_.name == 'geras') {
        this.buttonSize = 19;
    } else {
        this.buttonSize = 24;
    }
};

Blockly.Extensions.register('block_buttons_plus_minus',
    Blockly.Constants.Utils.INIT_BUTTONS_ADD_AND_REMOVE);

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
 * Mixin for mutator functions in some blocks.
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
            } catch (e) { console.error(e); }
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