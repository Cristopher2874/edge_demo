"use client"

import { useState } from "react"
import type { PipelinePayload } from "@/types/pipeline"
import SummaryTab from "@/components/Tabs/SummaryTab"
import AnalyticsTab from "@/components/Tabs/AnalyticsTab"
import ExpertTab from "@/components/Tabs/ExpertTab"
import HistoryTab from "@/components/Tabs/HistoryTab"
import styles from "./page.module.css"

type Tab = "Summary" | "Analytics" | "Expert" | "History"

const TAB_ENDPOINTS: Record<Tab, string> = {
  Summary: "/api/summary",
  Analytics: "/api/analytics",
  Expert: "/api/expert",
  History: "/api/history",
}

export default function IATPlayground() {
  const [activeTab, setActiveTab] = useState<Tab>("Summary")

  const handleSendPayload = async (payload: PipelinePayload) => {
    const endpoint = TAB_ENDPOINTS[activeTab]

    console.log(`[v0] Sending payload to ${endpoint} for ${activeTab} tab:`, payload)

    // In a real application, you would make an API call here:
    // try {
    //   const response = await fetch(endpoint, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(payload),
    //   })
    //   const data = await response.json()
    //   console.log('[v0] API response:', data)
    // } catch (error) {
    //   console.error('[v0] API error:', error)
    // }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>IAT Playground</h1>
        <p className={styles.subtitle}>Select one example to start</p>
      </header>

      <nav className={styles.tabs}>
        {(["Summary", "Analytics", "Expert", "History"] as Tab[]).map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main className={styles.main}>
        {activeTab === "Summary" && <SummaryTab onSendPayload={handleSendPayload} />}
        {activeTab === "Analytics" && <AnalyticsTab onSendPayload={handleSendPayload} />}
        {activeTab === "Expert" && <ExpertTab onSendPayload={handleSendPayload} />}
        {activeTab === "History" && <HistoryTab />}
      </main>
    </div>
  )
}
