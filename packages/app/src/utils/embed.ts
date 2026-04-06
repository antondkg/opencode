import { createSignal } from "solid-js"

declare global {
  interface Window {
    __OPENCODE_EMBED__?: boolean
    __OPENWORK_OPENCODE_CONFIG__?: {
      mobile?: {
        sessionSidebar?: {
          enabled?: boolean
          defaultOpen?: boolean
          defaultWidth?: number
          showProjectRail?: boolean
          showArchive?: boolean
          toggleLocation?: string
        }
        hideSessionTabs?: boolean
        terminalMode?: string
        showMobileFileTreeEntry?: boolean
      }
    }
  }
}

export function isEmbed(): boolean {
  return typeof window !== "undefined" && window.__OPENCODE_EMBED__ === true
}

export function getEmbedConfig() {
  return typeof window !== "undefined" ? window.__OPENWORK_OPENCODE_CONFIG__ : undefined
}

// ── Embed session sidebar (independent from upstream sidebar) ──

export type EmbedSidebarSide = "left" | "right"

const SIDEBAR_WIDTH = 200
const SIDE_KEY = "openwork-embed-sidebar-side"
const OPEN_KEY = "openwork-embed-sidebar-open"

function loadSide(): EmbedSidebarSide {
  try {
    const v = localStorage.getItem(SIDE_KEY)
    if (v === "left" || v === "right") return v
  } catch {}
  return "left"
}

function loadOpen(): boolean {
  try {
    return localStorage.getItem(OPEN_KEY) === "true"
  } catch {}
  return false
}

const [embedSidebarSide, setEmbedSidebarSideRaw] = createSignal<EmbedSidebarSide>(loadSide())
const [embedSidebarOpen, setEmbedSidebarOpenRaw] = createSignal(loadOpen())

export function getEmbedSidebarSide() {
  return embedSidebarSide()
}

export function setEmbedSidebarSide(side: EmbedSidebarSide) {
  setEmbedSidebarSideRaw(side)
  try { localStorage.setItem(SIDE_KEY, side) } catch {}
}

export function toggleEmbedSidebarSide() {
  setEmbedSidebarSide(embedSidebarSide() === "left" ? "right" : "left")
}

export function getEmbedSidebarOpen() {
  return embedSidebarOpen()
}

export function setEmbedSidebarOpen(open: boolean) {
  setEmbedSidebarOpenRaw(open)
  try { localStorage.setItem(OPEN_KEY, String(open)) } catch {}
}

export function toggleEmbedSidebar() {
  setEmbedSidebarOpen(!embedSidebarOpen())
}

export const EMBED_SIDEBAR_WIDTH = SIDEBAR_WIDTH
