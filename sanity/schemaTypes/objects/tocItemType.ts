import { defineField, defineType } from "sanity"

export const tocItemType = defineType({
  name: "tocItem",
  title: "Table of Contents Item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "anchor",
      title: "Anchor",
      type: "string"
    })
  ]
})