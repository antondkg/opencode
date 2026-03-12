export type OpenWorkOpencodeConfig = {
  mobile?: {
    sessionSidebar?: {
      enabled?: boolean
      defaultOpen?: boolean
      defaultWidth?: number
      showProjectRail?: boolean
      showArchive?: boolean
      toggleLocation?: "titlebar"
    }
    hideSessionTabs?: boolean
    terminalMode?: "dock" | "main-pane"
    showMobileFileTreeEntry?: boolean
  }
}

const DEFAULT_CONFIG: Required<NonNullable<OpenWorkOpencodeConfig["mobile"]>> = {
  sessionSidebar: {
    enabled: false,
    defaultOpen: false,
    defaultWidth: 172,
    showProjectRail: true,
    showArchive: true,
    toggleLocation: "titlebar",
  },
  hideSessionTabs: false,
  terminalMode: "dock",
  showMobileFileTreeEntry: true,
}

export const getOpenWorkConfig = (): OpenWorkOpencodeConfig => {
  if (typeof window === "undefined") return {}
  return window.__OPENWORK_OPENCODE_CONFIG__ ?? {}
}

export const getOpenWorkMobileConfig = () => {
  const mobile = getOpenWorkConfig().mobile
  const sessionSidebar = {
    ...DEFAULT_CONFIG.sessionSidebar,
    ...mobile?.sessionSidebar,
  }

  return {
    sessionSidebar,
    hideSessionTabs: mobile?.hideSessionTabs ?? DEFAULT_CONFIG.hideSessionTabs,
    terminalMode: mobile?.terminalMode ?? DEFAULT_CONFIG.terminalMode,
    showMobileFileTreeEntry: mobile?.showMobileFileTreeEntry ?? DEFAULT_CONFIG.showMobileFileTreeEntry,
  }
}
