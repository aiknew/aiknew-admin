<script lang="ts" setup>
import { AppBasicModal } from "@aiknew/shared-ui-components"
import { computed, h, ref, useTemplateRef } from "vue"
import { z } from "zod"
import {
  AppFormItemTips,
  buildI18nSchema,
  type Fields,
} from "@aiknew/shared-ui-components"
import { useLangStore } from "@/stores/lang"
import { useArticleCreate, useArticleUpdate, type Article } from "@/api/article"
import {
  useArticleCategoryAll,
  type ArticleCategory,
} from "@/api/article-category"
import { tField } from "@aiknew/shared-ui-locales"
import { buildTree } from "@aiknew/shared-utils"
import { useI18n } from "vue-i18n"
import { useAdminForm } from "@/composables/use-admin-form"
import type AdminEditor from "@/components/editor/admin-editor.vue"

interface Emits {
  (e: "submit"): void
  (e: "close"): void
}

const emit = defineEmits<Emits>()
const langStore = useLangStore()
const { t } = useI18n()
const modalRef = useTemplateRef<InstanceType<typeof AppBasicModal>>("modalRef")
const editorRef = ref<InstanceType<typeof AdminEditor>>()
const editId = ref<string>()
const { mutateAsync: createArticle } = useArticleCreate()
const { mutateAsync: updateArticle } = useArticleUpdate()
const { data: articleCategories } = useArticleCategoryAll()

const categoriesTree = computed(() => {
  return buildTree(articleCategories.value, "id", "parentId")
})

const languages = langStore.enabledLangs
const { AppForm, formApi } = useAdminForm({
  fields: () =>
    [
      {
        as: "ElInput",
        label: t("article.articleTitle"),
        name: "title",
        i18n: true,
        schema: () =>
          buildI18nSchema(
            z
              .string({
                error: t("article.titleRequired"),
              })
              .nonempty({
                error: t("article.titleRequired"),
              })
              .default(""),
            languages,
          ),
      },
      {
        as: {
          component: "AdminFileSelect",
          props: {
            selectLimit: 1,
          },
        },
        label: t("article.coverImg"),
        name: "coverImageId",
        schema: z.optional(
          z
            .array(
              z
                .object({
                  id: z.string(),
                  filePath: z.string(),
                })
                .optional(),
              {
                error: t("article.coverImgRequired"),
              },
            )
            .optional(),
        ),
      },
      {
        as: {
          component: "ElTreeSelect",
          props: {
            style: { minWidth: "200px" },
            valueKey: "id",
            nodeKey: "id",
            checkStrictly: true,
            props: {
              label: (data: ArticleCategory) =>
                tField(data.translations, "name").value,
            },
            data: categoriesTree.value,
          },
        },
        label: t("article.articleCategory"),
        name: "articleCategoryId",
        schema: () =>
          z
            .string({
              error: t("article.articleCategoryIdRequired"),
            })
            .min(1, {
              error: t("article.articleCategoryIdRequired"),
            }),
      },
      {
        as: {
          component: "AdminEditor",
          ref: editorRef,
        },
        label: t("article.content"),
        name: "content",
        i18n: true,
        schema: () =>
          buildI18nSchema(
            z
              .string({
                error: t("article.contentRequired"),
              })
              .nonempty({
                error: t("article.contentRequired"),
              })
              .refine(
                (html: string) => {
                  const count = editorRef.value?.getChars(html) ?? 0
                  return count > 0
                },
                {
                  error: t("article.contentRequired"),
                },
              )
              .default(""),
            languages,
          ),
      },
      {
        as: "ElSwitch",
        label: t("status"),
        name: "status",
        schema: z.boolean().default(false),
      },
      {
        as: "ElInputNumber",
        label: t("article.fakeViewCount"),
        name: "fakeViewCount",
        container: {
          bottomSlot: h(AppFormItemTips, {
            text: t("article.fakeViewCountTips"),
          }),
        },
        schema: z.number().default(10),
      },
      {
        as: "ElInputNumber",
        label: t("order"),
        name: "order",
        container: {
          bottomSlot: h(AppFormItemTips, { text: t("orderTips") }),
        },
        schema: z.number().default(10),
      },
    ] as const satisfies Fields,
  languages,
  onSubmit: async ({ values }) => {
    const coverImageId = values.coverImageId?.[0]?.id
    if (modalRef.value?.modalMode === "add") {
      await createArticle({ ...values, coverImageId })
    } else if (modalRef.value?.modalMode === "edit" && editId.value) {
      await updateArticle({
        id: editId.value,
        body: { ...values, coverImageId },
      })
    }

    emit("submit")
    handleReset()
  },
})

const add = () => {
  modalRef.value?.show()
  modalRef.value?.setModalMode("add")
  modalRef.value?.setTitle(t("article.addTitle"))
}

const edit = (item: Article) => {
  editId.value = item.id
  modalRef.value?.setModalMode("edit")
  modalRef.value?.setTitle(t("article.editTitle"))
  modalRef.value?.show()

  const coverImageId = item.coverImage ? [item.coverImage] : undefined
  formApi.resetI18nValues(
    { ...item, coverImageId },
    { keepDefaultValues: true },
  )
}

const handleReset = () => {
  modalRef.value?.close()
  formApi.reset()
  emit("close")
}

defineExpose({
  add,
  edit,
})
</script>

<template>
  <AppBasicModal
    ref="modalRef"
    @submit="formApi.handleSubmit"
    @close="handleReset"
  >
    <AppForm />
  </AppBasicModal>
</template>
