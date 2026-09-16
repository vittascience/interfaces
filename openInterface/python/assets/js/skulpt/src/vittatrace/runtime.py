"""Runtime helpers used by the turtle source rewrite instrumentation."""

import math as __vitta_turtle_math__
import vittatrace as __vitta_turtle_bridge__

__vitta_turtle_states__ = {}
__vitta_turtle_meta__ = {}
__vitta_turtle_fill_paths__ = {}
__vitta_turtle_screen__ = {
    "width": 400.0,
    "height": 400.0,
    "llx": -200.0,
    "lly": -200.0,
    "urx": 200.0,
    "ury": 200.0,
}


def __vitta_turtle_default_meta__():
    return {
        "filling": False,
        "isRadians": False,
        "fullCircle": 360.0,
    }


def __vitta_turtle_target_info__(target):
    if target is None:
        return ("module", None)

    try:
        target.heading()
        return ("turtle", id(target))
    except Exception:
        try:
            target.window_width()
            return ("screen", id(target))
        except Exception:
            return ("module", None)


def __vitta_turtle_target_key__(target_kind, target_id):
    return str(target_kind) + ":" + str(target_id if target_id is not None else "__default__")


def __vitta_turtle_get_meta__(target_key):
    if target_key not in __vitta_turtle_meta__:
        __vitta_turtle_meta__[target_key] = __vitta_turtle_default_meta__()
    return __vitta_turtle_meta__[target_key]


def __vitta_turtle_viewport__():
    width = float(__vitta_turtle_screen__["width"] or 400.0)
    height = float(__vitta_turtle_screen__["height"] or 400.0)
    x_scale = (float(__vitta_turtle_screen__["urx"]) - float(__vitta_turtle_screen__["llx"])) / width
    y_scale = -((float(__vitta_turtle_screen__["ury"]) - float(__vitta_turtle_screen__["lly"])) / height)
    return {
        "llx": float(__vitta_turtle_screen__["llx"]),
        "lly": float(__vitta_turtle_screen__["lly"]),
        "urx": float(__vitta_turtle_screen__["urx"]),
        "ury": float(__vitta_turtle_screen__["ury"]),
        "xScale": x_scale,
        "yScale": y_scale,
        "lineScale": min(abs(x_scale), abs(y_scale)),
    }


def __vitta_turtle_default_state__():
    return {
        "x": 0.0,
        "y": 0.0,
        "angle": 0.0,
        "radians": 0.0,
        "color": "black",
        "fill": "black",
        "filling": False,
        "down": True,
        "shown": True,
        "size": 1.0,
        "shape": "classic",
        "fullCircle": 360.0,
        "isRadians": False,
    }


def __vitta_turtle_get_argument__(args, kwargs, index, *names):
    if len(args) > index:
        return args[index]

    for name in names:
        if name in kwargs:
            return kwargs[name]

    return None


def __vitta_turtle_numeric__(value, fallback):
    try:
        return float(value)
    except Exception:
        return fallback


def __vitta_turtle_try_float__(value):
    try:
        return (float(value), True)
    except Exception:
        return (0.0, False)


def __vitta_turtle_point__(x, y):
    return {
        "x": float(x),
        "y": float(y),
    }


def __vitta_turtle_point_from_state__(state):
    return __vitta_turtle_point__(state["x"], state["y"])


def __vitta_turtle_scaled_size__(size, viewport=None):
    if viewport is None:
        viewport = __vitta_turtle_viewport__()
    return float(size or 0.0) * float(viewport["lineScale"] or 1.0)


def __vitta_turtle_emit__(payload):
    payload["viewport"] = __vitta_turtle_viewport__()
    __vitta_turtle_bridge__.emit(payload)


def __vitta_turtle_update_screen_state__(instruction, args, kwargs):
    if instruction == "setup":
        width = __vitta_turtle_numeric__(
            __vitta_turtle_get_argument__(args, kwargs, 0, "width"),
            __vitta_turtle_screen__["width"],
        )
        height = __vitta_turtle_numeric__(
            __vitta_turtle_get_argument__(args, kwargs, 1, "height"),
            __vitta_turtle_screen__["height"],
        )
        __vitta_turtle_screen__["width"] = width
        __vitta_turtle_screen__["height"] = height
        __vitta_turtle_screen__["llx"] = -width / 2.0
        __vitta_turtle_screen__["lly"] = -height / 2.0
        __vitta_turtle_screen__["urx"] = width / 2.0
        __vitta_turtle_screen__["ury"] = height / 2.0
        return

    if instruction == "setworldcoordinates":
        __vitta_turtle_screen__["llx"] = __vitta_turtle_numeric__(
            __vitta_turtle_get_argument__(args, kwargs, 0, "llx"),
            __vitta_turtle_screen__["llx"],
        )
        __vitta_turtle_screen__["lly"] = __vitta_turtle_numeric__(
            __vitta_turtle_get_argument__(args, kwargs, 1, "lly"),
            __vitta_turtle_screen__["lly"],
        )
        __vitta_turtle_screen__["urx"] = __vitta_turtle_numeric__(
            __vitta_turtle_get_argument__(args, kwargs, 2, "urx"),
            __vitta_turtle_screen__["urx"],
        )
        __vitta_turtle_screen__["ury"] = __vitta_turtle_numeric__(
            __vitta_turtle_get_argument__(args, kwargs, 3, "ury"),
            __vitta_turtle_screen__["ury"],
        )
        return

    if instruction in ("clearscreen", "resetscreen"):
        __vitta_turtle_screen__["width"] = 400.0
        __vitta_turtle_screen__["height"] = 400.0
        __vitta_turtle_screen__["llx"] = -200.0
        __vitta_turtle_screen__["lly"] = -200.0
        __vitta_turtle_screen__["urx"] = 200.0
        __vitta_turtle_screen__["ury"] = 200.0
        __vitta_turtle_states__.clear()
        __vitta_turtle_meta__.clear()
        __vitta_turtle_fill_paths__.clear()


def __vitta_turtle_update_meta__(instruction, target_key, args, kwargs):
    if not target_key:
        return

    if instruction == "reset":
        __vitta_turtle_meta__[target_key] = __vitta_turtle_default_meta__()
        __vitta_turtle_fill_paths__.pop(target_key, None)
        return

    meta = __vitta_turtle_get_meta__(target_key)

    if instruction == "begin_fill":
        meta["filling"] = True
        return

    if instruction == "end_fill":
        meta["filling"] = False
        return

    if instruction == "degrees":
        full_circle = abs(
            __vitta_turtle_numeric__(
                __vitta_turtle_get_argument__(args, kwargs, 0, "fullcircle"),
                360.0,
            )
        ) or 360.0
        meta["isRadians"] = False
        meta["fullCircle"] = full_circle
        return

    if instruction == "radians":
        meta["isRadians"] = True
        meta["fullCircle"] = 2.0 * __vitta_turtle_math__.pi


def __vitta_turtle_snapshot__(target, target_kind=None, target_id=None):
    if target_kind is None:
        target_kind, target_id = __vitta_turtle_target_info__(target)

    if target_kind == "screen":
        return __vitta_turtle_viewport__()

    target_key = __vitta_turtle_target_key__(target_kind, target_id)
    meta = __vitta_turtle_get_meta__(target_key)
    full_circle = float(meta["fullCircle"] or 360.0)
    angle = float(target.heading())
    radians = angle if meta["isRadians"] else (angle / full_circle) * (2.0 * __vitta_turtle_math__.pi)
    return {
        "x": float(target.xcor()),
        "y": float(target.ycor()),
        "angle": angle,
        "radians": radians,
        "color": target.pencolor(),
        "fill": target.fillcolor(),
        "filling": bool(meta["filling"]),
        "down": bool(target.isdown()),
        "shown": bool(target.isvisible()),
        "size": float(target.pensize()),
        "shape": target.shape(),
        "fullCircle": full_circle,
        "isRadians": bool(meta["isRadians"]),
    }


def __vitta_turtle_register__(target, source=None):
    target_kind, target_id = __vitta_turtle_target_info__(target)
    target_key = __vitta_turtle_target_key__(target_kind, target_id)

    if source is not None:
        source_kind, source_id = __vitta_turtle_target_info__(source)
        source_key = __vitta_turtle_target_key__(source_kind, source_id)
        if source_key in __vitta_turtle_meta__:
            __vitta_turtle_meta__[target_key] = dict(__vitta_turtle_meta__[source_key])
        else:
            __vitta_turtle_meta__[target_key] = __vitta_turtle_default_meta__()
    else:
        __vitta_turtle_meta__[target_key] = __vitta_turtle_default_meta__()

    __vitta_turtle_states__[target_key] = __vitta_turtle_snapshot__(target, target_kind, target_id)
    __vitta_turtle_fill_paths__.pop(target_key, None)


def __vitta_turtle_emit_line__(before_state, after_state):
    if not before_state["down"]:
        return

    if before_state["x"] == after_state["x"] and before_state["y"] == after_state["y"]:
        return

    viewport = __vitta_turtle_viewport__()
    __vitta_turtle_emit__(
        {
            "type": "line",
            "from": __vitta_turtle_point_from_state__(before_state),
            "to": __vitta_turtle_point_from_state__(after_state),
            "color": before_state["color"],
            "size": __vitta_turtle_scaled_size__(before_state["size"], viewport),
        }
    )


def __vitta_turtle_emit_arc__(before_state, radius, extent):
    if not before_state["down"]:
        return

    if not radius:
        return

    sweep_angle = (extent / before_state["fullCircle"]) * (2.0 * __vitta_turtle_math__.pi) * (1 if radius >= 0 else -1)
    if not sweep_angle:
        return

    center_x = before_state["x"] - __vitta_turtle_math__.sin(before_state["radians"]) * radius
    center_y = before_state["y"] + __vitta_turtle_math__.cos(before_state["radians"]) * radius
    start_angle = __vitta_turtle_math__.atan2(before_state["y"] - center_y, before_state["x"] - center_x)
    viewport = __vitta_turtle_viewport__()
    __vitta_turtle_emit__(
        {
            "type": "arc",
            "center": __vitta_turtle_point__(center_x, center_y),
            "radius": abs(radius),
            "startAngle": start_angle,
            "sweepAngle": sweep_angle,
            "color": before_state["color"],
            "size": __vitta_turtle_scaled_size__(before_state["size"], viewport),
        }
    )


def __vitta_turtle_append_fill_point__(target_key, state):
    if target_key in __vitta_turtle_fill_paths__:
        __vitta_turtle_fill_paths__[target_key].append(__vitta_turtle_point_from_state__(state))


def __vitta_turtle_append_fill_arc__(target_key, before_state, radius, extent, steps):
    if target_key not in __vitta_turtle_fill_paths__ or not radius:
        return

    step_count = int(abs(extent) / 15) + 1
    if steps is not None:
        maybe_steps, has_steps = __vitta_turtle_try_float__(steps)
        if has_steps:
            step_count = max(1, int(maybe_steps))

    sweep_angle = (extent / before_state["fullCircle"]) * (2.0 * __vitta_turtle_math__.pi) * (1 if radius >= 0 else -1)
    center_x = before_state["x"] - __vitta_turtle_math__.sin(before_state["radians"]) * radius
    center_y = before_state["y"] + __vitta_turtle_math__.cos(before_state["radians"]) * radius
    start_angle = __vitta_turtle_math__.atan2(before_state["y"] - center_y, before_state["x"] - center_x)
    distance = abs(radius)

    for index in range(1, step_count + 1):
        angle = start_angle + (sweep_angle * index) / step_count
        __vitta_turtle_fill_paths__[target_key].append(
            __vitta_turtle_point__(
                center_x + __vitta_turtle_math__.cos(angle) * distance,
                center_y + __vitta_turtle_math__.sin(angle) * distance,
            )
        )


def __vitta_turtle_emit_fill__(target_key, state):
    fill_path = __vitta_turtle_fill_paths__.pop(target_key, None)
    if not fill_path:
        return

    fill_path.append(__vitta_turtle_point_from_state__(state))
    if len(fill_path) < 3:
        return

    __vitta_turtle_emit__(
        {
            "type": "fill",
            "points": fill_path,
            "color": state["fill"],
        }
    )


def __vitta_turtle_resolve_dot_color__(args, kwargs, fallback):
    if "color" in kwargs:
        return kwargs["color"]

    if not args:
        return fallback

    _, first_is_number = __vitta_turtle_try_float__(args[0])
    if first_is_number:
        if len(args) >= 2:
            return args[1]
        return fallback

    return args[0]


def __vitta_turtle_trace__(instruction, target=None, *args, **kwargs):
    target_kind, target_id = __vitta_turtle_target_info__(target)
    if instruction in ("setup", "setworldcoordinates", "clearscreen", "resetscreen"):
        target_kind = "screen"
    target_key = __vitta_turtle_target_key__(target_kind, target_id)

    if target_kind == "screen":
        __vitta_turtle_update_screen_state__(instruction, args, kwargs)
        if instruction in ("setup", "setworldcoordinates"):
            __vitta_turtle_emit__({"type": "viewport"})
        else:
            __vitta_turtle_emit__({"type": "clear"})
        return

    if target_key not in __vitta_turtle_states__:
        __vitta_turtle_states__[target_key] = __vitta_turtle_default_state__()

    before_state = dict(__vitta_turtle_states__[target_key])
    __vitta_turtle_update_meta__(instruction, target_key, args, kwargs)
    after_state = __vitta_turtle_snapshot__(target, target_kind, target_id)
    __vitta_turtle_states__[target_key] = dict(after_state)

    if instruction in ("forward", "backward", "goto", "setx", "sety", "home"):
        __vitta_turtle_emit_line__(before_state, after_state)
        __vitta_turtle_append_fill_point__(target_key, after_state)
        return

    if instruction == "circle":
        radius = __vitta_turtle_numeric__(__vitta_turtle_get_argument__(args, kwargs, 0, "radius"), 0.0)
        extent = __vitta_turtle_numeric__(
            __vitta_turtle_get_argument__(args, kwargs, 1, "extent"),
            before_state["fullCircle"],
        )
        steps = __vitta_turtle_get_argument__(args, kwargs, 2, "steps")
        __vitta_turtle_emit_arc__(before_state, radius, extent)
        __vitta_turtle_append_fill_arc__(target_key, before_state, radius, extent, steps)
        return

    if instruction == "begin_fill":
        __vitta_turtle_fill_paths__[target_key] = [__vitta_turtle_point_from_state__(after_state)]
        return

    if instruction == "end_fill":
        __vitta_turtle_emit_fill__(target_key, after_state)
        return

    if instruction == "dot":
        dot_size, has_explicit_size = __vitta_turtle_try_float__(__vitta_turtle_get_argument__(args, kwargs, 0, "size"))
        if not has_explicit_size:
            dot_size = max(before_state["size"] + 4.0, 2.0 * before_state["size"])
        __vitta_turtle_emit__(
            {
                "type": "dot",
                "center": __vitta_turtle_point_from_state__(before_state),
                "size": __vitta_turtle_scaled_size__(dot_size),
                "color": __vitta_turtle_resolve_dot_color__(args, kwargs, before_state["color"]),
            }
        )
        return

    if instruction == "write":
        __vitta_turtle_emit__(
            {
                "type": "text",
                "position": __vitta_turtle_point_from_state__(before_state),
                "message": str(__vitta_turtle_get_argument__(args, kwargs, 0, "arg") or ""),
                "align": __vitta_turtle_get_argument__(args, kwargs, 2, "align") or "left",
                "font": __vitta_turtle_get_argument__(args, kwargs, 3, "font"),
                "color": before_state["fill"],
            }
        )
        return

    if instruction == "stamp":
        __vitta_turtle_emit__(
            {
                "type": "stamp",
                "position": __vitta_turtle_point_from_state__(before_state),
                "angle": before_state["angle"],
                "radians": before_state["radians"],
                "shape": before_state["shape"],
                "color": before_state["color"],
                "fill": before_state["fill"],
            }
        )
        return

    if instruction in ("clear", "reset"):
        __vitta_turtle_fill_paths__.pop(target_key, None)
        __vitta_turtle_emit__({"type": "clear"})
        return

    if instruction == "undo":
        __vitta_turtle_emit__(
            {
                "type": "unsupported",
                "instruction": "undo",
            }
        )


__all__ = ["__vitta_turtle_register__", "__vitta_turtle_trace__"]
