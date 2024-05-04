(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/utils.js
  var require_utils = __commonJS({
    "src/utils.js"(exports, module) {
      function getAllElements(root) {
        if (!root) {
          return getAllElements(document.head).concat(getAllElements(document.body));
        }
        const out = [root];
        Array.from(root.children).forEach((child) => {
          out.push(...getAllElements(child).filter((el) => !out.includes(el)));
        });
        if (root.shadowRoot) {
          Array.from(root.shadowRoot.children).forEach((child) => {
            out.push(...getAllElements(child).filter((el) => !out.includes(el)));
          });
        }
        return out;
      }
      module.exports = { getAllElements };
    }
  });

  // src/base.js
  var require_base = __commonJS({
    "src/base.js"(exports, module) {
      var { getAllElements } = require_utils();
      Object.defineProperty(Node.prototype, "localShadowRoot", {
        configurable: true,
        enumerable: true,
        get() {
          if (this instanceof ShadowRoot) {
            return this;
          }
          if (this.shadowRoot) {
            return this.shadowRoot;
          }
          let temp = this;
          while (temp.parentNode) {
            if (temp.parentNode instanceof ShadowRoot) {
              return temp.parentNode;
            }
            if (temp.parentNode.shadowRoot) {
              return temp.parentNode.shadowRoot;
            }
            temp = temp.parentNode;
          }
          return void 0;
        },
        set() {
          throw new Error("The `localShadowRoot` property is read-only!");
        }
      });
      var BaseComponent = class extends HTMLElement {
        static template = `
    <template>
      <div class="x-base">
        <slot></slot>
      </div>
    </template>
  `;
        constructor() {
          super();
          const parser = new DOMParser();
          const fragment = parser.parseFromString(
            this.constructor.template,
            "text/html"
          );
          const shadow = this.attachShadow({ mode: "open" });
          shadow.appendChild(
            fragment.querySelector("template").content.cloneNode(true)
          );
        }
        connectedCallback() {
          if (super.connectedCallback) {
            super.connectedCallback();
          }
          this.dispatchEvent(new CustomEvent("mount"));
          return this;
        }
        disconnectedCallback() {
          if (super.disconnectedCallback) {
            super.disconnectedCallback();
          }
          this.dispatchEvent(new CustomEvent("unmount"));
          return this;
        }
        querySelector() {
          return getAllElements(this).find((el) => el.matches(...arguments));
        }
        querySelectorAll() {
          return getAllElements(this).filter((el) => el.matches(...arguments));
        }
      };
      customElements.define("x-base", BaseComponent);
      module.exports = BaseComponent;
    }
  });

  // src/index.js
  var require_src = __commonJS({
    "src/index.js"(exports, module) {
      var MiscWebComponents = {
        BaseComponent: require_base()
        // ContextMenuComponent: require("./context-menu"),
        // DraggableComponent: require("./draggable"),
        // FrameComponent: require("./frame"),
        // ResizeableComponent: require("./resizeable"),
      };
      if (typeof module !== "undefined") {
        module.exports = MiscWebComponents;
      }
      if (typeof window !== "undefined") {
        window.MiscWebComponents = MiscWebComponents;
      }
    }
  });
  require_src();
})();
