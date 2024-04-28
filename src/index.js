const MiscWebComponents = {
  Base: require("./base"),
  // ContextMenu: require("./context-menu"),
  Draggable: require("./draggable"),
  // Frame: require("./frame"),
  // Resizeable: require("./resizeable"),
}

if (typeof module !== "undefined") {
  module.exports = MiscWebComponents
}

if (typeof window !== "undefined") {
  window.MiscWebComponents = MiscWebComponents
}
