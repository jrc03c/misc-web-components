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
        mutationObservers = [];
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
        addAttributeChangeListener(attributeName, callback) {
          return this.addEventListener("attribute-change:" + attributeName, callback);
        }
        connectedCallback() {
          if (super.connectedCallback) {
            super.connectedCallback();
          }
          const attributeObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.attributeName) {
                this.dispatchEvent(new CustomEvent("attribute-change"));
                this.dispatchEvent(
                  new CustomEvent("attribute-change:" + mutation.attributeName)
                );
              }
            });
          });
          attributeObserver.observe(this, { attributes: true });
          this.mutationObservers.push(attributeObserver);
          this.dispatchEvent(new CustomEvent("mount"));
          return this;
        }
        disconnectedCallback() {
          if (super.disconnectedCallback) {
            super.disconnectedCallback();
          }
          this.mutationObservers.forEach((observer) => observer.disconnect());
          this.dispatchEvent(new CustomEvent("unmount"));
          return this;
        }
        querySelector() {
          return getAllElements(this).find((el) => el.matches(...arguments));
        }
        querySelectorAll() {
          return getAllElements(this).filter((el) => el.matches(...arguments));
        }
        removeAttributeChangeListener(attributeName, callback) {
          return this.removeEventListener(
            "attribute-change:" + attributeName,
            callback
          );
        }
      };
      customElements.define("x-base", BaseComponent);
      module.exports = BaseComponent;
    }
  });

  // src/draggable.js
  var require_draggable = __commonJS({
    "src/draggable.js"(exports, module) {
      var BaseComponent = require_base();
      var DraggableComponent = class extends BaseComponent {
        static template = (
          /* html */
          `
    <template>
      <style>
        .x-draggable {
          position: absolute;
          left: 0;
          top: 0;
        }

        .x-draggable.has-grab-cursor {
          cursor: grab;
        }

        .x-draggable.is-being-dragged {
          cursor: grabbing;
        }

        .x-draggable.is-being-dragged,
        .x-draggable.is-being-dragged * {
          user-select: none;
        }
      </style>

      <div class="x-draggable">
        <slot></slot>
      </div>
    </template>
  `
        );
        x_ = 0;
        y_ = 0;
        constructor(data) {
          data = data || {};
          super(data);
          this.inner = this.querySelector(".x-draggable");
          this.dataset.isBeingDragged = false;
          this.dataset.isHLocked = false;
          this.dataset.isVLocked = false;
          this.dataset.mouseX = 0;
          this.dataset.mouseY = 0;
          this.dataset.x = 0;
          this.dataset.y = 0;
          this.addEventListener("mount", this.onMount);
        }
        onLockStatusChange() {
          const isHLocked = JSON.parse(this.dataset.isHLocked);
          const isVLocked = JSON.parse(this.dataset.isVLocked);
          if (!isHLocked || !isVLocked) {
            this.inner.classList.add("has-grab-cursor");
          } else {
            this.inner.classList.remove("has-grab-cursor");
          }
        }
        onMount() {
          const boundOnLockStatusChange = this.onLockStatusChange.bind(this);
          const boundOnMouseDown = this.onMouseDown.bind(this);
          const boundOnMouseMove = this.onMouseMove.bind(this);
          const boundOnMouseUp = this.onMouseUp.bind(this);
          const boundOnPositionChange = this.onPositionChange.bind(this);
          this.addEventListener("mousedown", boundOnMouseDown);
          window.addEventListener("mousemove", boundOnMouseMove);
          window.addEventListener("mouseup", boundOnMouseUp);
          this.addAttributeChangeListener("data-is-h-locked", boundOnLockStatusChange);
          this.addAttributeChangeListener("data-is-v-locked", boundOnLockStatusChange);
          this.addAttributeChangeListener("data-x", boundOnPositionChange);
          this.addAttributeChangeListener("data-y", boundOnPositionChange);
          this.x_ = parseFloat(this.dataset.x);
          this.y_ = parseFloat(this.dataset.y);
          const isHLocked = JSON.parse(this.dataset.isHLocked);
          const isVLocked = JSON.parse(this.dataset.isVLocked);
          if (!isHLocked || !isVLocked) {
            this.inner.classList.add("has-grab-cursor");
          }
          this.updateComputedStyle(true);
          this.removeEventListener("mount", this.onMount);
        }
        onMouseDown(event) {
          const isHLocked = JSON.parse(this.dataset.isHLocked);
          const isVLocked = JSON.parse(this.dataset.isVLocked);
          if (isHLocked && isVLocked) {
            return;
          }
          if (!isHLocked) {
            this.dataset.mouseX = event.screenX;
          }
          if (!isVLocked) {
            this.dataset.mouseY = event.screenY;
          }
          this.dataset.isBeingDragged = true;
          this.inner.classList.add("is-being-dragged");
          this.dispatchEvent(
            new CustomEvent("drag-start", { detail: this.getBoundingClientRect() })
          );
          return this;
        }
        onMouseMove(event) {
          const isHLocked = JSON.parse(this.dataset.isHLocked);
          const isVLocked = JSON.parse(this.dataset.isVLocked);
          if (isHLocked && isVLocked) {
            return;
          }
          if (JSON.parse(this.dataset.isBeingDragged)) {
            const dx = event.screenX - parseFloat(this.dataset.mouseX);
            const dy = event.screenY - parseFloat(this.dataset.mouseY);
            if (!isHLocked) {
              this.x_ += dx;
              this.dataset.mouseX = event.screenX;
            }
            if (!isVLocked) {
              this.y_ += dy;
              this.dataset.mouseY = event.screenY;
            }
            this.updateComputedStyle();
            this.dispatchEvent(
              new CustomEvent("drag", { detail: this.getBoundingClientRect() })
            );
          }
          return this;
        }
        onMouseUp() {
          const isHLocked = JSON.parse(this.dataset.isHLocked);
          const isVLocked = JSON.parse(this.dataset.isVLocked);
          if (isHLocked && isVLocked) {
            return;
          }
          const wasBeingDragged = JSON.parse(this.dataset.isBeingDragged);
          this.dataset.isBeingDragged = false;
          this.inner.classList.remove("is-being-dragged");
          if (wasBeingDragged) {
            this.dispatchEvent(
              new CustomEvent("drag-end", { detail: this.getBoundingClientRect() })
            );
          }
          return this;
        }
        onPositionChange() {
          this.x_ = parseFloat(this.dataset.x);
          this.y_ = parseFloat(this.dataset.y);
          this.updateComputedStyle();
        }
        updateComputedStyle(shouldForceUpdate) {
          if (shouldForceUpdate || !JSON.parse(this.dataset.isHLocked)) {
            this.inner.style.left = this.x_ + "px";
          }
          if (shouldForceUpdate || !JSON.parse(this.dataset.isVLocked)) {
            this.inner.style.top = this.y_ + "px";
          }
        }
      };
      customElements.define("x-draggable", DraggableComponent);
      module.exports = DraggableComponent;
    }
  });

  // src/index.js
  var require_src = __commonJS({
    "src/index.js"(exports, module) {
      var MiscWebComponents = {
        BaseComponent: require_base(),
        // ContextMenuComponent: require("./context-menu"),
        DraggableComponent: require_draggable()
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
