function getAllElements(root) {
  if (!root) {
    return getAllElements(document.head).concat(getAllElements(document.body))
  }

  const out = [root]

  Array.from(root.children).forEach(child => {
    out.push(...getAllElements(child).filter(el => !out.includes(el)))
  })

  if (root.shadowRoot) {
    Array.from(root.shadowRoot.children).forEach(child => {
      out.push(...getAllElements(child).filter(el => !out.includes(el)))
    })
  }

  return out
}

module.exports = { getAllElements }
