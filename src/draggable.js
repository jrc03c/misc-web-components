const BaseComponent = require("./base")

class DraggableComponent extends BaseComponent {
  static css = /* css */ `
    x-draggable {
      position: absolute;
      left: 0;
      top: 0;
    }

    x-draggable.has-grab-cursor {
      cursor: grab;
    }

    x-draggable.is-being-dragged {
      cursor: grabbing;
    }

    x-draggable.is-being-dragged,
    x-draggable.is-being-dragged * {
      user-select: none;
    }
  `

  x_ = 0
  y_ = 0

  constructor(data) {
    data = data || {}
    super(data)
    this.dataset.isBeingDragged = false
    this.dataset.isHLocked = false
    this.dataset.isVLocked = false
    this.dataset.mouseX = 0
    this.dataset.mouseY = 0
    this.dataset.x = 0
    this.dataset.y = 0
    this.on("mount", this.onMount)
  }

  onLockStatusChange() {
    const isHLocked = JSON.parse(this.dataset.isHLocked)
    const isVLocked = JSON.parse(this.dataset.isVLocked)

    if (!isHLocked || !isVLocked) {
      this.classList.add("has-grab-cursor")
    } else {
      this.classList.remove("has-grab-cursor")
    }
  }

  onMount() {
    const boundOnLockStatusChange = this.onLockStatusChange.bind(this)
    const boundOnMouseDown = this.onMouseDown.bind(this)
    const boundOnMouseMove = this.onMouseMove.bind(this)
    const boundOnMouseUp = this.onMouseUp.bind(this)

    const boundOnPositionAttributeChange =
      this.onPositionAttributeChange.bind(this)

    this.on("mousedown", boundOnMouseDown)
    window.addEventListener("mousemove", boundOnMouseMove)
    window.addEventListener("mouseup", boundOnMouseUp)

    this.onAttributeChange("data-is-h-locked", boundOnLockStatusChange)
    this.onAttributeChange("data-is-v-locked", boundOnLockStatusChange)
    this.onAttributeChange("data-x", boundOnPositionAttributeChange)
    this.onAttributeChange("data-y", boundOnPositionAttributeChange)

    this.x_ = parseFloat(this.dataset.x)
    this.y_ = parseFloat(this.dataset.y)

    const isHLocked = JSON.parse(this.dataset.isHLocked)
    const isVLocked = JSON.parse(this.dataset.isVLocked)

    if (!isHLocked || !isVLocked) {
      this.classList.add("has-grab-cursor")
    }

    this.updateComputedStyle(true)
    this.off("mount", this.onMount)
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

  onPositionAttributeChange() {
    this.x_ = parseFloat(this.dataset.x)
    this.y_ = parseFloat(this.dataset.y)
    this.updateComputedStyle()
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
