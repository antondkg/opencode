import { Button } from "@opencode-ai/ui/button"
import { base64Encode } from "@opencode-ai/util/encode"
import { createEffect, createMemo, For, Show, type JSX } from "solid-js"
import { useGlobalSync } from "@/context/global-sync"
import { useLanguage } from "@/context/language"
import { NewSessionItem, SessionItem, SessionSkeleton, type SessionItemProps } from "./sidebar-items"
import { childMapByParent, sortedRootSessions } from "./helpers"

export function MobileSessionSidebar(props: {
  directory: string
  sortNow: () => number
  prefetchSession: SessionItemProps["prefetchSession"]
  archiveSession: SessionItemProps["archiveSession"]
}): JSX.Element {
  const globalSync = useGlobalSync()
  const language = useLanguage()
  const [workspaceStore, setWorkspaceStore] = globalSync.child(props.directory, { bootstrap: false })
  const slug = createMemo(() => base64Encode(props.directory))
  const sessions = createMemo(() => sortedRootSessions(workspaceStore, props.sortNow()))
  const children = createMemo(() => childMapByParent(workspaceStore.session))
  const loading = createMemo(() => workspaceStore.status !== "complete" && sessions().length === 0)
  const hasMore = createMemo(() => workspaceStore.sessionTotal > sessions().length)

  createEffect(() => {
    globalSync.child(props.directory, { bootstrap: true })
  })

  const loadMore = async () => {
    setWorkspaceStore("limit", (limit) => (limit ?? 0) + 5)
    await globalSync.project.loadSessions(props.directory)
  }

  return (
    <div class="flex h-full min-h-0 w-full flex-col bg-background-base">
      <nav class="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-2 py-3 no-scrollbar">
        <NewSessionItem
          slug={slug()}
          mobile
          sidebarExpanded={() => true}
          clearHoverProjectSoon={() => undefined}
          setHoverSession={() => undefined}
        />
        <Show when={loading()}>
          <SessionSkeleton />
        </Show>
        <For each={sessions()}>
          {(session) => (
            <SessionItem
              session={session}
              slug={slug()}
              mobile
              popover={false}
              showArchive={false}
              children={children()}
              sidebarExpanded={() => true}
              sidebarHovering={() => false}
              nav={() => undefined}
              hoverSession={() => undefined}
              setHoverSession={() => undefined}
              clearHoverProjectSoon={() => undefined}
              prefetchSession={props.prefetchSession}
              archiveSession={props.archiveSession}
            />
          )}
        </For>
        <Show when={hasMore()}>
          <div class="relative w-full py-1">
            <Button
              variant="ghost"
              class="flex w-full justify-start pl-9 pr-10 text-left text-14-regular text-text-weak"
              size="large"
              onClick={(event: MouseEvent) => {
                void loadMore()
                ;(event.currentTarget as HTMLButtonElement).blur()
              }}
            >
              {language.t("common.loadMore")}
            </Button>
          </div>
        </Show>
      </nav>
    </div>
  )
}
