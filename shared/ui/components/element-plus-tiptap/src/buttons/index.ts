import { defineAsyncComponent } from "vue"

export const BUTTON_MAP = {
  "align-center": defineAsyncComponent(
    () => import("./align-center-button.vue"),
  ),
  "align-justify": defineAsyncComponent(
    () => import("./align-justify-button.vue"),
  ),
  "align-left": defineAsyncComponent(() => import("./align-left-button.vue")),
  "align-right": defineAsyncComponent(() => import("./align-right-button.vue")),
  blockquote: defineAsyncComponent(() => import("./blockquote-button.vue")),
  bold: defineAsyncComponent(() => import("./bold-button.vue")),
  "bullet-list": defineAsyncComponent(() => import("./bullet-list-button.vue")),
  "code-block": defineAsyncComponent(() => import("./code-block-button.vue")),
  "font-size": defineAsyncComponent(() => import("./font-size-button.vue")),
  "heading-1": defineAsyncComponent(() => import("./heading-1-button.vue")),
  "heading-2": defineAsyncComponent(() => import("./heading-2-button.vue")),
  "heading-3": defineAsyncComponent(() => import("./heading-3-button.vue")),
  highlight: defineAsyncComponent(() => import("./highlight-button.vue")),
  "horizontal-rule": defineAsyncComponent(
    () => import("./horizontal-rule-button.vue"),
  ),
  italic: defineAsyncComponent(() => import("./italic-button.vue")),
  link: defineAsyncComponent(() => import("./link-button.vue")),
  "ordered-list": defineAsyncComponent(
    () => import("./ordered-list-button.vue"),
  ),
  redo: defineAsyncComponent(() => import("./redo-button.vue")),
  strike: defineAsyncComponent(() => import("./strike-button.vue")),
  table: defineAsyncComponent(() => import("./table-button.vue")),
  underline: defineAsyncComponent(() => import("./underline-button.vue")),
  undo: defineAsyncComponent(() => import("./undo-button.vue")),
}

export type buttons = keyof typeof BUTTON_MAP
