const makeKey = require("@jrc03c/make-key")

class BaseComponent extends HTMLElement {
  static css = `
    x-base {
      color: red;
    }
  `

  static instanceCount = 0
  static styleElement = null

  static template = `
    <slot></slot>
  `

  eventListenerRemovers = []
  mutationObserver = null

  constructor() {
    super()

    this.id = makeKey(8)

    const currentHTML = this.innerHTML
    this.innerHTML = this.constructor.template

    if (currentHTML.length > 0) {
      const currentHTMLContainsSlots = currentHTML.match(/<.*?slot=".*?".*?>/g)
      const slots = Array.from(this.querySelectorAll("slot"))

      if (slots.length > 0) {
        if (currentHTMLContainsSlots) {
          const parser = new DOMParser()
          const fragment = parser.parseFromString(currentHTML, "text/html")

          const children = Array.from(fragment.head.children).concat(
            Array.from(fragment.body.children),
          )

          children.forEach(child => {
            const slotName = child.getAttribute("slot") || "(none)"

            const slot =
              slotName === "(none)"
                ? slots[0]
                : slots.find(slot => slot.name === slotName)

            if (slot) {
              slot.parentElement.replaceChild(child, slot)
            } else {
              throw new Error(
                `\`${this.constructor.name}\` elements do not contain "${slotName}" slots!`,
              )
            }
          })
        } else {
          this.innerHTML = this.innerHTML.replace(
            /<slot.*?>.*?<\/slot>/g,
            currentHTML,
          )
        }
      } else {
        throw new Error(
          `A \`${this.constructor.name}\` element received slotted content, but \`${this.constructor.name}\` elements have no slots in which to receive such content!`,
        )
      }
    }
  }

  addEventListener(name) {
    if (name.includes("attribute-change:") && !this.mutationObserver) {
      this.mutationObserver = new MutationObserver(mutations => {
        for (const mutation of mutations) {
          if (mutation.type === "attributes") {
            this.dispatchEvent(
              new CustomEvent("attribute-change:" + mutation.attributeName),
            )
          }
        }
      })

      this.mutationObserver.observe(this, { attributes: true })
    }

    return super.addEventListener(...arguments)
  }

  connectedCallback() {
    this.constructor.instanceCount++

    if (this.constructor.instanceCount === 1) {
      this.constructor.styleElement = document.createElement("style")
      this.constructor.styleElement.innerHTML = this.constructor.css
      document.body.appendChild(this.constructor.styleElement)
    }

    this.dispatchEvent(new CustomEvent("mount"))
    return this
  }

  disconnectedCallback() {
    this.constructor.instanceCount--

    if (this.constructor.instanceCount < 1) {
      this.constructor.styleElement.parentElement.removeChild(
        this.constructor.styleElement,
      )
    }

    this.eventListenerRemovers.forEach(fn => fn())

    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
    }

    this.dispatchEvent(new CustomEvent("unmount"))
    return this
  }

  toObject() {
    return {
      id: this.id,
    }
  }
}

module.exports = BaseComponent
