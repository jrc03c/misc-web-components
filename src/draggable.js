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

  .x-draggable.has-grab-cursor:active {
    cursor: grabbing;
  }

  .x-draggable:active,
  .x-draggable:active * {
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

    this.eventListenerRemovers.push(() => {
      this.removeEventListener("mousedown", boundOnMouseDown)
    })

    this.eventListenerRemovers.push(() => {
      window.removeEventListener("mousemove", boundOnMouseMove)
    })

    this.eventListenerRemovers.push(() => {
      window.removeEventListener("mouseup", boundOnMouseUp)
    })

    this.mutationObserver = new MutationObserver(this.onMutation.bind(this))
    this.mutationObserver.observe(this, { attributes: true })

    this.x_ = parseFloat(this.dataset.x)
    this.y_ = parseFloat(this.dataset.y)

    this.updateComputedStyle(true)
    return this
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.mutationObserver.disconnect()
    return this
  }

  onMouseDown(event) {
    event.preventDefault()
    event.stopPropagation()

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

        if (isHLocked || isVLocked) {
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

    return this
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

// const createVueComponentWithCSS = require("@jrc03c/vue-component-with-css")

// module.exports = createVueComponentWithCSS({
//   name: "x-draggable",
//   template,
//   emits: ["drag-end", "drag-start", "drag"],

//   props: {
//     "data-is-h-locked": {
//       type: Boolean,
//       required: false,
//       default: () => false,
//     },

//     "data-is-v-locked": {
//       type: Boolean,
//       required: false,
//       default: () => false,
//     },

//     x: {
//       type: Number,
//       required: false,
//       default: () => 0,
//     },

//     y: {
//       type: Number,
//       required: false,
//       default: () => 0,
//     },
//   },

//   data() {
//     return {
//       css,
//       isBeingDragged: false,
//       mouse: { x: 0, y: 0 },
//       x_: 0,
//       y_: 0,
//     }
//   },

//   watch: {
//     x() {
//       this.x_ = this.x
//       this.updateComputedStyle()
//     },

//     y() {
//       this.y_ = this.y
//       this.updateComputedStyle()
//     },
//   },

//   methods: {
//     onMouseDown(event) {
//       event.preventDefault()
//       event.stopPropagation()

//       if (this.isHLocked && this.isVLocked) {
//         return
//       }

//       if (!this.isHLocked) {
//         this.mouse.x = event.screenX
//       }

//       if (!this.isVLocked) {
//         this.mouse.y = event.screenY
//       }

//       this.isBeingDragged = true
//       this.$emit("drag-start", this.$el.getBoundingClientRect())
//     },

//     onMouseMove(event) {
//       if (this.isHLocked && this.isVLocked) {
//         return
//       }

//       if (this.isBeingDragged) {
//         const dx = event.screenX - this.mouse.x
//         const dy = event.screenY - this.mouse.y

//         if (!this.isHLocked) {
//           this.x_ += dx
//           this.mouse.x = event.screenX
//         }

//         if (!this.isVLocked) {
//           this.y_ += dy
//           this.mouse.y = event.screenY
//         }

//         this.updateComputedStyle()
//         this.$emit("drag", this.$el.getBoundingClientRect())
//       }
//     },

//     onMouseUp() {
//       if (this.isHLocked && this.isVLocked) {
//         return
//       }

//       const wasBeingDragged = this.isBeingDragged
//       this.isBeingDragged = false

//       if (wasBeingDragged) {
//         this.$emit("drag-end", this.$el.getBoundingClientRect())
//       }
//     },

//     updateComputedStyle(shouldForceUpdate) {
//       if (shouldForceUpdate || !this.isHLocked) {
//         this.$el.style.left = this.x_ + "px"
//       }

//       if (shouldForceUpdate || !this.isVLocked) {
//         this.$el.style.top = this.y_ + "px"
//       }
//     },
//   },

//   mounted() {
//     this.x_ = this.x
//     this.y_ = this.y
//     this.updateComputedStyle(true)
//     window.addEventListener("mousemove", this.onMouseMove)
//     window.addEventListener("mouseup", this.onMouseUp)
//   },

//   unmounted() {
//     window.removeEventListener("mousemove", this.onMouseMove)
//     window.removeEventListener("mouseup", this.onMouseUp)
//   },
// })
