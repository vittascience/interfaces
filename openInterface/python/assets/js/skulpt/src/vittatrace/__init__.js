var $builtinmodule = function (name) {
    const module = {
        __name__: new Sk.builtin.str("vittatrace")
    };

    function getGlobalScope() {
        if (typeof globalThis !== "undefined") {
            return globalThis;
        }

        if (typeof window !== "undefined") {
            return window;
        }

        return {};
    }

    function getOrCreatePatchStatus() {
        const globalScope = getGlobalScope();

        if (!globalScope.__VittaTurtleInstructionPatchStatus) {
            globalScope.__VittaTurtleInstructionPatchStatus = {
                overrideLoaded: true,
                originalSourceFound: true,
                helperInjected: true,
                geometryPayloadsEnabled: true,
                patchedMethods: ["primitive-commands"],
                tracedInstructionCount: 0,
                lastInstruction: null,
                instrumentationMode: "primitive-commands"
            };
        }

        return globalScope.__VittaTurtleInstructionPatchStatus;
    }

    module.emit = new Sk.builtin.func(function (payload) {
        const globalScope = getGlobalScope();
        if (!globalScope.__VittaTurtleTraceExecution) {
            return Sk.builtin.none.none$;
        }

        const tracer = globalScope.__VittaTurtleInstructionTracer;
        const patchStatus = getOrCreatePatchStatus();
        const normalizedPayload = Sk.ffi.remapToJs(payload);
        patchStatus.tracedInstructionCount = (patchStatus.tracedInstructionCount || 0) + 1;
        patchStatus.lastInstruction = normalizedPayload?.instruction || normalizedPayload?.type || null;

        if (tracer && typeof tracer.handleInstruction === "function") {
            tracer.handleInstruction(normalizedPayload);
        }

        return Sk.builtin.none.none$;
    });

    return module;
};
