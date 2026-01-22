"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { UseCaseSidebar } from "@/components/summarization/use-case-sidebar"
import { MainContent } from "@/components/summarization/main-content"
import { PipelineSidebar } from "@/components/summarization/pipeline-sidebar"

export default function SummarizationPage() {
  const [activeCase, setActiveCase] = useState(1)

  const handleResetConfig = () => {
    // Reset configuration logic
    console.log("Resetting configuration to defaults")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <Header />
        <Button
          variant="outline"
          className="bg-transparent border-[#5a5650] text-foreground hover:bg-[#3a3733]"
        >
          API Doc
        </Button>
      </header>

      <main className="flex-1 px-6 py-6">
        <div className="flex gap-8 h-full">
          <UseCaseSidebar activeCase={activeCase} onCaseChange={setActiveCase} />
          <MainContent activeCase={activeCase} />
          <PipelineSidebar onResetConfig={handleResetConfig} />
        </div>
      </main>
    </div>
  )
}
