"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MainContentProps {
  activeCase: number
}

const useCaseDescriptions: Record<number, string> = {
  1: "Use case 1 blurb: Explore the exciting possibilities of Use Case 1, where innovative solutions meet real-world challenges. Discover how this approach can transform your workflow and enhance productivity!",
  2: "Use case 2 blurb: Dive into the capabilities of Use Case 2, designed to streamline complex processes and deliver actionable insights for your business needs.",
  3: "Use case 3 blurb: Experience the power of Use Case 3, which combines advanced algorithms with intuitive design to solve challenging summarization tasks.",
  4: "Use case 4 blurb: Unlock the potential of Use Case 4, offering comprehensive summarization solutions tailored for enterprise-scale applications.",
}

export function MainContent({ activeCase }: MainContentProps) {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate generation
    setTimeout(() => {
      setOutputText(`Generated summary for Use Case ${activeCase}: This is a sample output demonstrating the summarization capabilities.`)
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="flex items-start justify-between gap-4 mb-4">
        <p className="text-sm text-[#c4beb6] leading-relaxed max-w-2xl">
          {useCaseDescriptions[activeCase]}
        </p>
        <button className="flex items-center gap-2 text-sm text-[#d4a574] hover:text-[#e4b584] transition-colors shrink-0">
          <Download className="size-4" />
          Download Code
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to summarize..."
          className="flex-1 min-h-[200px] rounded-lg border border-[#4a4640] bg-[#3a3733] p-4 text-sm text-foreground placeholder:text-[#6a655d] resize-none focus:outline-none focus:border-[#5a5650]"
        />

        <div className="flex justify-end">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-[#3a3733] hover:bg-[#4a4740] border border-[#5a5650] text-foreground"
          >
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
        </div>

        <Tabs defaultValue="output" className="flex-1">
          <TabsList className="bg-transparent h-auto p-0 gap-4">
            <TabsTrigger 
              value="output" 
              className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#d4a574] rounded-none px-0 pb-2 text-[#9a958d] data-[state=active]:text-foreground"
            >
              Output
            </TabsTrigger>
            <TabsTrigger 
              value="log"
              className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#d4a574] rounded-none px-0 pb-2 text-[#9a958d] data-[state=active]:text-foreground"
            >
              Log
            </TabsTrigger>
          </TabsList>
          <TabsContent value="output" className="mt-4">
            <div className="min-h-[150px] rounded-lg border border-[#4a4640] bg-[#3a3733] p-4 text-sm text-foreground">
              {outputText || <span className="text-[#6a655d]">Output will appear here...</span>}
            </div>
          </TabsContent>
          <TabsContent value="log" className="mt-4">
            <div className="min-h-[150px] rounded-lg border border-[#4a4640] bg-[#3a3733] p-4 text-sm text-[#6a655d]">
              No logs available.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
