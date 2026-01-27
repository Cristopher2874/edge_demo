"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MainContentProps {
  activeCase: number
}

interface SummaryData {
  conversationId: string;
  configId: string;
  summary: string;
  tags: string[];
}

const useCaseDescriptions: Record<number, string> = {
  1: "ss-Summarization demo",
  2: "ss-Summarization demo",
  3: "ss-Summarization demo",
}

export function MainContent({ activeCase }: MainContentProps) {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [summaryData, setSummaryData] = useState<SummaryData>({
    conversationId: '',
    configId: '',
    summary: '',
    tags: [],
  })

  const SVC_URL = "xx"

  const handleGenerate = async () => {
    setIsGenerating(true);

    const format_instructions = {"length": "long", "format": "bullet", "section": "issue_action"};
    const currentTime = Date.now() / 1000;

    const sampleBody = {
      "conversation_id": "test-conv",
      "config_id": "test-conf",
      "conversations": [
        {
          "tag": "SpeakerA",
          "conversation": inputText.slice(0, -15),
          "metadata": { "timestamp": currentTime },
        },
        {
          "tag": "SpeakerA",
          "conversation": inputText.slice(-15),
          "metadata": { "timestamp": currentTime },
        },
      ],
      "format_instructions": format_instructions,
      "pipeline_type": "default"
    };

    try {
      const response = await fetch(SVC_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sampleBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      setSummaryData(responseData);
      setOutputText(JSON.stringify(responseData, null, 2));
    } catch (error) {
      console.error('Error:', error);
      setOutputText('Failed to generate summary');
    } finally {
      setIsGenerating(false);
    }
  };
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
              {summaryData.conversationId && (
                <div>
                  <p><strong>Conversation ID:</strong> {summaryData.conversationId}</p>
                  <p><strong>Config ID:</strong> {summaryData.configId}</p>
                  <p><strong>Summary:</strong> {summaryData.summary}</p>
                  <p><strong>Tags:</strong> {summaryData.tags.join(', ')}</p>
                </div>
              )}
              {!summaryData.conversationId && (outputText || <span className="text-[#6a655d]">Output will appear here...</span>)}
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
