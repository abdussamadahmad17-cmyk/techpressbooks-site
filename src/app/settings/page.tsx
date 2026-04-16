import type { Metadata } from "next"
import Container from "@/components/layout/container"
import PageHeader from "@/components/layout/page-header"
import ThemeSettingsPanel from "@/components/settings/theme-settings-panel"
import PreferenceCard from "@/components/settings/preference-card"

export const metadata: Metadata = {
  title: "Settings",
  description: "Customize appearance and reading preferences."
}

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Settings"
        title="Customize your experience"
        description="Adjust appearance preferences now, with language, reading, and accessibility options ready to expand later."
      />

      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ThemeSettingsPanel />
            </div>

            <div className="space-y-6">
              <PreferenceCard
                title="Language"
                description="English is the default language right now. Multi-language support can be added next."
                status="Coming next"
              />

              <PreferenceCard
                title="Reading preferences"
                description="Compact layout, larger text, and reduced motion can be added as the next personalization layer."
                status="Planned"
              />

              <PreferenceCard
                title="Accessibility"
                description="Additional accessibility controls can be introduced after appearance settings are stable."
                status="Planned"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
