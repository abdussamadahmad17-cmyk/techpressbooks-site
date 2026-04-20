import { defineField, defineType } from "sanity"

export const purchaseOptionType = defineType({
  name: "purchaseOption",
  title: "Purchase Option",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "url", title: "URL", type: "url", validation: (rule) => rule.required() }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Physical", value: "physical" },
          { title: "Digital", value: "digital" },
          { title: "External", value: "external" }
        ]
      },
      initialValue: "external"
    }),
    defineField({ name: "isPrimary", title: "Primary", type: "boolean", initialValue: false }),
    defineField({ name: "priceText", title: "Price", type: "string" }),
    defineField({ name: "note", title: "Note", type: "string" })
  ]
})
