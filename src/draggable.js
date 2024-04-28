// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ `
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
`

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  <slot></slot>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

const BaseComponent = require("./base")

class DraggableComponent extends BaseComponent {
  static css = css
  static template = template

  x_ = 0
  y_ = 0

  constructor(data) {
    data = data || {}
    super(data)
    this.classList.add("x-draggable")
    this.mutationObserver = null
    this.dataset.isBeingDragged = false
    this.dataset.isHLocked = false
    this.dataset.isVLocked = false
    this.dataset.mouseX = 0
    this.dataset.mouseY = 0
    this.dataset.x = 0
    this.dataset.y = 0
  }

  connectedCallback() {
    super.connectedCallback()

    const boundOnMouseDown = this.onMouseDown.bind(this)
    const boundOnMouseMove = this.onMouseMove.bind(this)
    const boundOnMouseUp = this.onMouseUp.bind(this)

    this.addEventListener("mousedown", boundOnMouseDown)
    window.addEventListener("mousemove", boundOnMouseMove)
    window.addEventListener("mouseup", boundOnMouseUp)

    this.mutationObserver = new MutationObserver(this.onMutation.bind(this))
    this.mutationObserver.observe(this, { attributes: true })

    this.x_ = parseFloat(this.dataset.x)
    this.y_ = parseFloat(this.dataset.y)

    const isHLocked = JSON.parse(this.dataset.isHLocked)
    const isVLocked = JSON.parse(this.dataset.isVLocked)

    if (!isHLocked || !isVLocked) {
      this.classList.add("has-grab-cursor")
    }

    this.updateComputedStyle(true)
    return this
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.mutationObserver.disconnect()
    return this
  }

  onMouseDown(event) {
    const isHLocked = JSON.parse(this.dataset.isHLocked)
    const isVLocked = JSON.parse(this.dataset.isVLocked)

    if (isHLocked && isVLocked) {
      return
    }

    if (!isHLocked) {
      this.dataset.mouseX = event.screenX
    }

    if (!isVLocked) {
      this.dataset.mouseY = event.screenY
    }

    this.dataset.isBeingDragged = true
    this.classList.add("is-being-dragged")

    this.dispatchEvent(
      new CustomEvent("drag-start", { detail: this.getBoundingClientRect() }),
    )

    return this
  }

  onMouseMove(event) {
    const isHLocked = JSON.parse(this.dataset.isHLocked)
    const isVLocked = JSON.parse(this.dataset.isVLocked)

    if (isHLocked && isVLocked) {
      return
    }

    if (JSON.parse(this.dataset.isBeingDragged)) {
      const dx = event.screenX - parseFloat(this.dataset.mouseX)
      const dy = event.screenY - parseFloat(this.dataset.mouseY)

      if (!isHLocked) {
        this.x_ += dx
        this.dataset.mouseX = event.screenX
      }

      if (!isVLocked) {
        this.y_ += dy
        this.dataset.mouseY = event.screenY
      }

      this.updateComputedStyle()

      this.dispatchEvent(
        new CustomEvent("drag", { detail: this.getBoundingClientRect() }),
      )
    }

    return this
  }

  onMouseUp() {
    const isHLocked = JSON.parse(this.dataset.isHLocked)
    const isVLocked = JSON.parse(this.dataset.isVLocked)

    if (isHLocked && isVLocked) {
      return
    }

    const wasBeingDragged = JSON.parse(this.dataset.isBeingDragged)
    this.dataset.isBeingDragged = false
    this.classList.remove("is-being-dragged")

    if (wasBeingDragged) {
      this.dispatchEvent(
        new CustomEvent("drag-end", { detail: this.getBoundingClientRect() }),
      )
    }

    return this
  }

  onMutation(mutations) {
    for (const mutation of mutations) {
      if (
        mutation.attributeName === "data-is-h-locked" ||
        mutation.attributeName === "data-is-v-locked"
      ) {
        const isHLocked = JSON.parse(this.dataset.isHLocked)
        const isVLocked = JSON.parse(this.dataset.isVLocked)

        if (!isHLocked || !isVLocked) {
          this.classList.add("has-grab-cursor")
        } else {
          this.classList.remove("has-grab-cursor")
        }
      }

      if (
        mutation.attributeName === "data-x" ||
        mutation.attributeName === "data-y"
      ) {
        this.x_ = parseFloat(this.dataset.x)
        this.y_ = parseFloat(this.dataset.y)
        this.updateComputedStyle()
      }
    }
  }

  setSlotContent() {
    const name = arguments.length === 2 ? arguments[0] : "main"
    const content = arguments.length === 2 ? arguments[1] : arguments[0]
    const slots = Array.from(this.querySelectorAll("slot"))

    const slot =
      slots.length === 1
        ? slots[0]
        : slots.find(slot => slot.getAttribute("name") === name)

    if (content instanceof HTMLElement) {
      slot.appendChild(content)
    } else {
      slot.innerHTML = content
    }
  }

  updateComputedStyle(shouldForceUpdate) {
    if (shouldForceUpdate || !JSON.parse(this.dataset.isHLocked)) {
      this.style.left = this.x_ + "px"
    }

    if (shouldForceUpdate || !JSON.parse(this.dataset.isVLocked)) {
      this.style.top = this.y_ + "px"
    }
  }
}

customElements.define("x-draggable", DraggableComponent)
module.exports = DraggableComponent
