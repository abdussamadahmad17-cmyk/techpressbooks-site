import { defineField, defineType } from "sanity"

export const downloadItemType = defineType({
  name: "downloadItem",
  title: "Download Item",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "file", title: "File", type: "file", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "version", title: "Version", type: "string" })
  ]
})
