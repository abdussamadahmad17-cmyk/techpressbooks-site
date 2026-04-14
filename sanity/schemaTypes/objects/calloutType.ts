import { defineField, defineType } from "sanity"

export const calloutType = defineType({
  name: "callout",
  title: "Callout",
  type: "object",
  fields: [
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      options: {
        list: ["info", "warning", "success", "danger"],
        layout: "radio"
      },
      initialValue: "info"
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string"
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 4
    })
  ]
})