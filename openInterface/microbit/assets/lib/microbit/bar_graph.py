# from @microbit-matt-hillsdon : https://github.com/microbit-foundation/micropython-microbit-v2/issues/10
# microbit-module: bargraph@0.1.0
"""
Port of the MakeCode bar graph.
"""
from microbit import display, running_time

# what's the current high value
__bar_graph_high = 0
# when was the current high value recorded
__bar_graph_high_last = 0 

def __unplot(x, y):
    display.set_pixel(x, y, 0)

def __plot(x, y):
    display.set_pixel(x, y, 9)

def plot_bar_graph(value, high = 0):
    """Displays a vertical bar graph based on the `value` and `high` value.

    If `high` is 0, the chart gets adjusted automatically.
    Parameters:
    :param value: current value to plot
    :param high: maximum value. If 0, maximum value adjusted automatically.
    """
    global __bar_graph_high
    global __bar_graph_high_last

    now = running_time()
    value = abs(value)

    if high > 0:
        __bar_graph_high = high
    elif value > __bar_graph_high or now - __bar_graph_high_last > 10000:
        __bar_graph_high = value
        __bar_graph_high_last = now

    # normalize lack of data to 0..1
    epsilon = abs(7./3 - 4./3 - 1)
    if __bar_graph_high < 16 * epsilon:
        __bar_graph_high = 1

    # normalize value to 0..1
    v = value / __bar_graph_high
    dv = 1. / 16
    k = 0
    for y in range(4, -1, -1):
        for x in range(0, 3):
            if k > v:
                __unplot(2 - x, y)
                __unplot(2 + x, y)
            else:
                __plot(2 - x, y)
                __plot(2 + x, y)
            k += dv