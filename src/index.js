const MiscWebComponents = {
  BaseComponent: require("./base"),
  // ContextMenuComponent: require("./context-menu"),
  // DraggableComponent: require("./draggable"),
  // FrameComponent: require("./frame"),
  // ResizeableComponent: require("./resizeable"),
}

if (typeof module !== "undefined") {
  module.exports = MiscWebComponents
}

if (typeof window !== "undefined") {
  window.MiscWebComponents = MiscWebComponents
}
