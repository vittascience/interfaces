// TODO: direct imports are not variables, because you can do stuff like:
//         import os.path
//       What should the variable be? Blockly will mangle it, but we should really be
//       doing something more complicated here with namespaces (probably make `os` the
//       variable and have some kind of list of attributes. But that's in the fading zone.
PyBlock.prototype["ast_Import"] = function (node) {
  const name = node.names[0].name.v;
  let asname;
  if (node.names[0].asname != null) asname = node.names[0].asname.v;
  else asname = name;

  if (
    typeof PyBlock.prototype.FUNCTIONS_BLOCKS[name] == "undefined" &&
    typeof PyBlock.prototype.IMPORT_FUNCTIONS[name] == "undefined"
  ) {
    const notif = new VittaNotif();
    notif.displayNotification(null, "Attention cette librairie n'est pas disponible avec les blocs, veuillez passer en mode code.", "bg-warning")
  }
  
  PyBlock.prototype.IMPORT[asname] = name;
  return null;
};

// Alias ImportFrom because of big overlap
PyBlock.prototype["ast_ImportFrom"] = function (node) {
  let name = node.module.v;
  PyBlock.prototype.IMPORT[name] = name;
  // from __ import *
  if (node.names[0] && node.names[0].name.v == "*") {
    for (e in PyBlock.prototype.FUNCTIONS_BLOCKS[name]) {
      PyBlock.prototype.IMPORT_FUNCTIONS[e] = PyBlock.prototype.IMPORT[e] || {};
      PyBlock.prototype.IMPORT_FUNCTIONS[e] =
        PyBlock.prototype.FUNCTIONS_BLOCKS[name][e];
    }
  }

  // from ___ import ___
  else if (node.names[0]) {
    PyBlock.prototype.IMPORT_FUNCTIONS[node.names[0].name.v] =
      PyBlock.prototype.FUNCTIONS_BLOCKS[name][node.names[0].name.v];
  }

  if (
    typeof PyBlock.prototype.FUNCTIONS_BLOCKS[name] == "undefined" &&
    typeof PyBlock.prototype.IMPORT_FUNCTIONS[name] == "undefined"
  ) {
    const notif = new VittaNotif();
    notif.displayNotification(null, "Attention cette librairie n'est pas disponible avec les blocs, veuillez passer en mode code.", "bg-warning")
  }

  return null;
};
