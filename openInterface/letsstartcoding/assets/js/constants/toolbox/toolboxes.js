const TOOLBOXES = [
    {
        "id": "vittascience",
        "categories": false,
        "content": [],
        "variable": function(name = "variable") {
            return [{
                    "kind": "block",
                    "blockxml" : '<block type="variables_get">' + ToolboxManager.DB_.Set.field("VAR", name) + '</block>'
                }, {
                    "kind": "block",
                    "blockxml" : '<block type="variables_set">' + ToolboxManager.DB_.Set.field("VAR", name) + '</block>'
                }, {
                    "kind": "block",
                    "blockxml" : '<block type="variables_increment">' + ToolboxManager.DB_.Set.field("VAR", name) + '</block>'
                }
            ];
        },
        "content-simple": null,
        "theme": THEME_VITTASCIENCE
    }
];