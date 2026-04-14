import { defineField, defineType } from "sanity"

export const codeBlockType = defineType({
  name: "codeBlock",
  title: "Code Block",
  type: "object",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      initialValue: "text"
    }),
    defineField({
      name: "filename",
      title: "Filename",
      type: "string"
    }),
    defineField({
      name: "code",
      title: "Code",
      type: "text",
      rows: 12
    })
  ]
})