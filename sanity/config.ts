import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { apiVersion, dataset, projectId } from "./env"
import { schemaTypes } from "./schemaTypes"

export default defineConfig({
  name: "default",
  title: "TechPressBooks Studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes
  },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })]
})