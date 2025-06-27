

var $builtinmodule = function () {
    var rospy = {};
    
    rospy.__name__ = new Sk.builtin.str('rospy');

    let rospy_node = ""

    rospy.init_node = new Sk.builtin.func(function (name) {
        rospy_node = name.v;
    });

    return rospy;
};