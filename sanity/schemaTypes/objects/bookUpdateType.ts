import { defineField, defineType } from "sanity"

export const bookUpdateType = defineType({
  name: "bookUpdate",
  title: "Book Update",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "date", title: "Date", type: "datetime", validation: (rule) => rule.required() }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Errata", value: "errata" },
          { title: "Update", value: "update" }
        ]
      }
    }),
    defineField({ name: "body", title: "Body", type: "text", validation: (rule) => rule.required() })
  ]
})
