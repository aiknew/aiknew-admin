import { getSchema } from "@tiptap/core"
import { type Extensions } from "@tiptap/core"
import { DOMParser } from "@tiptap/pm/model"

/**
 * Convert HTML string to ProseMirror Node instance
 * @param {string} htmlString - The HTML string to convert.
 * @param {Extensions} extensions - Array of Tiptap extensions used to generate the HTML.
 * @returns {ProseMirrorNode} Returns a ProseMirror Node object.
 */
export function HTMLToProseMirrorNode(
  htmlString: string,
  extensions: Extensions,
) {
  // Create ProseMirror Schema based on Tiptap extensions list
  const schema = getSchema(extensions)

  // Create a temporary DOM element to contain the HTML string
  const domNode = document.createElement("div")
  domNode.innerHTML = htmlString.trim()

  // Create a DOMParser instance and configure it with the Schema
  const parser = DOMParser.fromSchema(schema)

  // Parse the DOM node to generate ProseMirror Node
  const proseMirrorNode = parser.parse(domNode)

  return proseMirrorNode
}
