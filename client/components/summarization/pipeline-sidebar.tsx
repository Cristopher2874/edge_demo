"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface PipelineConfig {
  length: string
  format: string
  type: string
  piiMasking: boolean
  classesToSelect: string
}

interface PipelineSidebarProps {
  onResetConfig: () => void
}

export function PipelineSidebar({ onResetConfig }: PipelineSidebarProps) {
  const [config, setConfig] = useState<PipelineConfig>({
    length: "long",
    format: "paragraph",
    type: "full-conversation",
    piiMasking: false,
    classesToSelect: "value",
  })

  const [openSections, setOpenSections] = useState({
    entry: true,
    guardrail: true,
    summaryNode: false,
    taggingNode: true,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <aside className="w-64 shrink-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-foreground">Pipeline</h2>
      </div>

      <div className="space-y-4">
        {/* Entry Section */}
        <Collapsible open={openSections.entry} onOpenChange={() => toggleSection("entry")}>
          <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-foreground w-full">
            {openSections.entry ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
            Entry
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-4">
            <ConfigSelect
              label="Length"
              value={config.length}
              onValueChange={(value) => setConfig((prev) => ({ ...prev, length: value }))}
              options={[
                { value: "short", label: "Short" },
                { value: "medium", label: "Medium" },
                { value: "long", label: "Long" },
              ]}
            />
            <ConfigSelect
              label="Format"
              value={config.format}
              onValueChange={(value) => setConfig((prev) => ({ ...prev, format: value }))}
              options={[
                { value: "paragraph", label: "Paragraph" },
                { value: "bullet-points", label: "Bullet Points" },
                { value: "numbered-list", label: "Numbered List" },
              ]}
            />
            <ConfigSelect
              label="Type"
              value={config.type}
              onValueChange={(value) => setConfig((prev) => ({ ...prev, type: value }))}
              options={[
                { value: "full-conversation", label: "Full Conversation" },
                { value: "last-message", label: "Last Message" },
                { value: "custom-range", label: "Custom Range" },
              ]}
            />
          </CollapsibleContent>
        </Collapsible>

        {/* Guardrail Section */}
        <Collapsible open={openSections.guardrail} onOpenChange={() => toggleSection("guardrail")}>
          <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-foreground w-full">
            {openSections.guardrail ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
            Guardrail
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9a958d]">PII Masking</span>
              <Switch
                checked={config.piiMasking}
                onCheckedChange={(checked) => setConfig((prev) => ({ ...prev, piiMasking: checked }))}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Summary Node Section */}
        <Collapsible open={openSections.summaryNode} onOpenChange={() => toggleSection("summaryNode")}>
          <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-foreground w-full">
            {openSections.summaryNode ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
            Summary Node
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <p className="text-sm text-[#6a655d]">No configuration options available.</p>
          </CollapsibleContent>
        </Collapsible>

        {/* Tagging Node Section */}
        <Collapsible open={openSections.taggingNode} onOpenChange={() => toggleSection("taggingNode")}>
          <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-foreground w-full">
            {openSections.taggingNode ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
            Tagging Node
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <ConfigSelect
              label="Classes to select"
              value={config.classesToSelect}
              onValueChange={(value) => setConfig((prev) => ({ ...prev, classesToSelect: value }))}
              options={[
                { value: "value", label: "Value" },
                { value: "sentiment", label: "Sentiment" },
                { value: "topic", label: "Topic" },
              ]}
            />
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="mt-8">
        <Button
          variant="outline"
          onClick={onResetConfig}
          className="w-full bg-transparent border-[#5a5650] text-foreground hover:bg-[#3a3733]"
        >
          Reset to Default Configuration
        </Button>
      </div>
    </aside>
  )
}

interface ConfigSelectProps {
  label: string
  value: string
  onValueChange: (value: string) => void
  options: { value: string; label: string }[]
}

function ConfigSelect({ label, value, onValueChange, options }: ConfigSelectProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-[#6a655d]">{label}</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full bg-[#3a3733] border-[#4a4640] text-foreground">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-[#3a3733] border-[#4a4640]">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} className="text-foreground">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
