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
}

customElements.define("x-base", BaseComponent)
module.exports = BaseComponent
