import { type MaybeArray } from "@aiknew/shared-utils";
import { type buttons } from "./buttons";
import type { Editor } from "@tiptap/core";
import type { Component, DefineComponent } from "vue";

export type ToolBarProp =
  MaybeArray<
    buttons | ((editor: Editor) => Component | DefineComponent)
  >[]


export type TipTapEditor = Editor