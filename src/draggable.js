const BaseComponent = require("./base")

class DraggableComponent extends BaseComponent {
  static template = /* html */ `
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

  x_ = 0
  y_ = 0

  constructor(data) {
    data = data || {}
    super(data)
    this.inner = this.querySelector(".x-draggable")
    this.dataset.isBeingDragged = false
    this.dataset.isHLocked = false
    this.dataset.isVLocked = false
    this.dataset.mouseX = 0
    this.dataset.mouseY = 0
    this.dataset.x = 0
    this.dataset.y = 0
    this.addEventListener("mount", this.onMount)
  }

  onLockStatusChange() {
    const isHLocked = JSON.parse(this.dataset.isHLocked)
    const isVLocked = JSON.parse(this.dataset.isVLocked)

    if (!isHLocked || !isVLocked) {
      this.inner.classList.add("has-grab-cursor")
    } else {
      this.inner.classList.remove("has-grab-cursor")
    }
  }

  onMount() {
    const boundOnLockStatusChange = this.onLockStatusChange.bind(this)
    const boundOnMouseDown = this.onMouseDown.bind(this)
    const boundOnMouseMove = this.onMouseMove.bind(this)
    const boundOnMouseUp = this.onMouseUp.bind(this)
    const boundOnPositionChange = this.onPositionChange.bind(this)

    this.addEventListener("mousedown", boundOnMouseDown)
    window.addEventListener("mousemove", boundOnMouseMove)
    window.addEventListener("mouseup", boundOnMouseUp)

    this.addAttributeChangeListener("data-is-h-locked", boundOnLockStatusChange)

    this.addAttributeChangeListener("data-is-v-locked", boundOnLockStatusChange)

    this.addAttributeChangeListener("data-x", boundOnPositionChange)
    this.addAttributeChangeListener("data-y", boundOnPositionChange)

    this.x_ = parseFloat(this.dataset.x)
    this.y_ = parseFloat(this.dataset.y)

    const isHLocked = JSON.parse(this.dataset.isHLocked)
    const isVLocked = JSON.parse(this.dataset.isVLocked)

    if (!isHLocked || !isVLocked) {
      this.inner.classList.add("has-grab-cursor")
    }

    this.updateComputedStyle(true)
    this.removeEventListener("mount", this.onMount)
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
    this.inner.classList.add("is-being-dragged")

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
    this.inner.classList.remove("is-being-dragged")

    if (wasBeingDragged) {
      this.dispatchEvent(
        new CustomEvent("drag-end", { detail: this.getBoundingClientRect() }),
      )
    }

    return this
  }

  onPositionChange() {
    this.x_ = parseFloat(this.dataset.x)
    this.y_ = parseFloat(this.dataset.y)
    this.updateComputedStyle()
  }

  updateComputedStyle(shouldForceUpdate) {
    if (shouldForceUpdate || !JSON.parse(this.dataset.isHLocked)) {
      this.inner.style.left = this.x_ + "px"
    }

    if (shouldForceUpdate || !JSON.parse(this.dataset.isVLocked)) {
      this.inner.style.top = this.y_ + "px"
    }
  }
}

customElements.define("x-draggable", DraggableComponent)
module.exports = DraggableComponent
