import { Show } from "solid-js"
import { Tabs } from "@opencode-ai/ui/tabs"
import { useLanguage } from "@/context/language"

export function SessionMobileTabs(props: {
  open: boolean
  mobileTab: "session" | "filetree"
  hasReview: boolean
  reviewCount: number
  onSession: () => void
  onFiletree: () => void
}) {
  const language = useLanguage()

  return (
    <Show when={props.open}>
      <Tabs value={props.mobileTab} class="h-auto shrink-0">
        <Tabs.List>
          <Tabs.Trigger
            value="session"
            class="!w-1/2 !max-w-none"
            classes={{ button: "w-full" }}
            onClick={props.onSession}
          >
            {language.t("session.tab.session")}
          </Tabs.Trigger>
          <Tabs.Trigger
            value="filetree"
            class="!w-1/2 !max-w-none !border-r-0"
            classes={{ button: "w-full" }}
            onClick={props.onFiletree}
          >
            Files
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs>
    </Show>
  )
}
