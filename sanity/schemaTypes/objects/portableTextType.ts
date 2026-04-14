import { defineArrayMember, defineType } from "sanity"

export const portableTextType = defineType({
  name: "portableText",
  title: "Portable Text",
  type: "array",
  of: [
    defineArrayMember({ type: "block" }),
    defineArrayMember({ type: "codeBlock" }),
    defineArrayMember({ type: "callout" })
  ]
})