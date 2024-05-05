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
      function pascalToKebab(x) {
        let out = "";
        x.split("").forEach((char) => {
          const lowerChar = char.toLowerCase();
          if (char !== lowerChar && out.length > 0) {
            out += "-";
          }
          out += lowerChar;
        });
        return out;
      }
      module.exports = { getAllElements, pascalToKebab };
    }
  });

  // src/base.js
  var require_base = __commonJS({
    "src/base.js"(exports, module) {
      var { getAllElements, pascalToKebab } = require_utils();
      var BaseComponent = class {
        static baseElement = "div";
        static classRegistry = [];
        static css = ``;
        static template = `
    <slot></slot>
  `;
        static get className() {
          return "x-" + pascalToKebab(this.name).replace(/-component$/g, "");
        }
        static register() {
          this.classRegistry.push(this);
        }
        constructor(data) {
          data = data || {};
          if (data.el) {
            if (typeof data.el === "string") {
              this.el = document.querySelector(data.el);
            } else if (data.el instanceof HTMLElement) {
              this.el = data.el;
            } else {
              throw new Error(
                `When passing an options object with an "el" property into the \`${this.constructor.name}\` constructor, the "el" value must be a string or an \`HTMLElement\`!`
              );
            }
          } else {
            this.el = document.createElement(this.constructor.baseElement);
          }
          this.el.classList.add(this.constructor.className);
          const injectedHtml = this.el.innerHTML;
          this.el.innerHTML = this.constructor.template;
          if (injectedHtml.length > 0) {
            const injectedHtmlIncludesSlottedContent = injectedHtml.match(/<.*?slot=".*?".*?/g);
            const slots = Array.from(this.el.querySelectorAll("slot"));
            if (slots.length === 0) {
              throw new Error(
                `A(n) \`${this.constructor.name}\` component received slotted content, but its template contains no slots in which to place the content!`
              );
            }
            const parser = new DOMParser();
            const fragment = parser.parseFromString(injectedHtml, "text/html");
            const els = Array.from(fragment.head.children).concat(
              Array.from(fragment.body.children)
            );
            if (els.length === 0) {
              const span = document.createElement("span");
              span.innerHTML = injectedHtml;
              els.push(span);
            }
            if (injectedHtmlIncludesSlottedContent) {
              els.forEach((el) => {
                const slotName = el.getAttribute("slot");
                const slot = slots.find(
                  (slot2) => slot2.getAttribute("name") === slotName
                );
                if (!slot) {
                  throw new Error(
                    `A \`${this.constructor.name}\` component received slotted content for a slot named "${slotName}", but the component's template contains no such slot!`
                  );
                }
                slot.parentElement.replaceChild(el, slot);
              });
            } else {
              let foundAnUnnamedSlot = false;
              slots.forEach((slot) => {
                if (!slot.getAttribute("name")) {
                  foundAnUnnamedSlot = true;
                  const parent = slot.parentElement;
                  parent.replaceChild(els.at(-1), slot);
                  for (let i = els.length - 2; i >= 0; i--) {
                    parent.insertBefore(els[i], els[i + 1]);
                  }
                }
              });
              if (!foundAnUnnamedSlot) {
                throw new Error(
                  `A \`${this.constructor.name}\` component received slotted content for an unnamed slot, but its template has no unnamed slots!`
                );
              }
            }
          }
          if (this.el.parentElement) {
            this.emit("mount");
          }
        }
        emit(name, payload) {
          this.el.dispatchEvent(new CustomEvent(name, { detail: payload }));
          return this;
        }
        mount(parent) {
          parent.appendChild(this.el);
          this.emit("mount");
          return this;
        }
        off(name, callback) {
          this.el.removeEventListener(name, callback);
          return this;
        }
        on(name, callback) {
          const remover = () => {
            this.el.removeEventListener(name, callback);
            this.el.removeEventListener("unmount", remover);
          };
          this.el.addEventListener("unmount", remover);
          this.el.addEventListener(name, callback);
          return remover;
        }
        unmount() {
          if (this.el.parentElement) {
            this.el.parentElement.removeChild(this.el);
          }
          this.emit("unmount");
          return this;
        }
      };
      function findAndLoadComponents(elements) {
        elements.forEach((el) => {
          try {
            const compName = el.getAttribute("component");
            if (compName) {
              const Component = BaseComponent.classRegistry.find(
                (Component2) => Component2.className === compName
              );
              if (Component) {
                new Component({ el });
              }
            }
          } catch (e) {
          }
        });
      }
      var observer = new MutationObserver((mutations) => {
        const els = [];
        mutations.forEach((mutation) => {
          if (mutation.type === "childList") {
            els.push(...Array.from(mutation.addedNodes));
          }
        });
        findAndLoadComponents(els);
      });
      observer.observe(document.body, { childList: true, subtree: true });
      window.addEventListener("load", () => {
        findAndLoadComponents(getAllElements(document.body));
      });
      BaseComponent.register();
      module.exports = BaseComponent;
    }
  });

  // src/draggable.js
  var require_draggable = __commonJS({
    "src/draggable.js"() {
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
