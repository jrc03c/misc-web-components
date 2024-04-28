const makeKey = require("@jrc03c/make-key")

class BaseComponent extends HTMLElement {
  static css = ""
  static template = ""

  eventListenerRemovers = []

  constructor(data) {
    super(...arguments)
    data = data || {}
    this.classList.add("x-base")
    this.id = data.id || makeKey(8)
    this.innerHTML = this.constructor.template
    this.styleElement = document.createElement("style")
    this.styleElement.innerHTML = this.constructor.css
  }

  connectedCallback() {
    document.body.appendChild(this.styleElement)
    this.dispatchEvent(new CustomEvent("mount"))
    return this
  }

  disconnectedCallback() {
    this.styleElement.parentElement.removeChild(this.styleElement)
    this.eventListenerRemovers.forEach(remove => remove())
    this.dispatchEvent(new CustomEvent("unmount"))
    return this
  }

  setSlotContent() {
    return this
  }

  toObject() {
    return {
      id: this.id,
    }
  }
}

customElements.define("x-base", BaseComponent)
module.exports = BaseComponent
