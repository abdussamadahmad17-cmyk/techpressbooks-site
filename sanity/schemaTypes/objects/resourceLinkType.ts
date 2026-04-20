import { defineField, defineType } from "sanity"

export const resourceLinkType = defineType({
  name: "resourceLink",
  title: "Resource Link",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "url", title: "URL", type: "url", validation: (rule) => rule.required() }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "GitHub", value: "github" },
          { title: "Docs", value: "docs" },
          { title: "Resource", value: "resource" }
        ]
      }
    }),
    defineField({ name: "description", title: "Description", type: "text" })
  ]
})
