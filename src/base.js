const { getAllElements } = require("./utils")

Object.defineProperty(Node.prototype, "localShadowRoot", {
  configurable: true,
  enumerable: true,

  get() {
    if (this instanceof ShadowRoot) {
      return this
    }

    if (this.shadowRoot) {
      return this.shadowRoot
    }

    let temp = this

    while (temp.parentNode) {
      if (temp.parentNode instanceof ShadowRoot) {
        return temp.parentNode
      }

      if (temp.parentNode.shadowRoot) {
        return temp.parentNode.shadowRoot
      }

      temp = temp.parentNode
    }

    return undefined
  },

  set() {
    throw new Error("The `localShadowRoot` property is read-only!")
  },
})

class BaseComponent extends HTMLElement {
  static template = `
    <template>
      <div class="x-base">
        <slot></slot>
      </div>
    </template>
  `

  constructor() {
    super()

    const parser = new DOMParser()

    const fragment = parser.parseFromString(
      this.constructor.template,
      "text/html",
    )

    const shadow = this.attachShadow({ mode: "open" })

    shadow.appendChild(
      fragment.querySelector("template").content.cloneNode(true),
    )
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback()
    }

    this.dispatchEvent(new CustomEvent("mount"))
    return this
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) {
      super.disconnectedCallback()
    }

    this.dispatchEvent(new CustomEvent("unmount"))
    return this
  }

  querySelector() {
    return getAllElements(this).find(el => el.matches(...arguments))
  }

  querySelectorAll() {
    return getAllElements(this).filter(el => el.matches(...arguments))
  }
}

customElements.define("x-base", BaseComponent)
module.exports = BaseComponent
