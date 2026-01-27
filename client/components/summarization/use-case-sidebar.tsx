"use client"

import { cn } from "@/lib/utils"

interface UseCaseSidebarProps {
  activeCase: number
  onCaseChange: (caseNum: number) => void
}

const useCases = [
  { id: 1, label: "xx Summarization" },
  { id: 2, label: "xxx Summarization" },
  { id: 3, label: "xx Summarization" },
]

export function UseCaseSidebar({ activeCase, onCaseChange }: UseCaseSidebarProps) {
  return (
    <aside className="w-36 shrink-0">
      <h2 className="text-lg font-medium text-foreground mb-6">Summarization</h2>
      <nav className="flex flex-col gap-4">
        {useCases.map((useCase) => (
          <button
            key={useCase.id}
            onClick={() => onCaseChange(useCase.id)}
            className={cn(
              "text-left text-sm transition-colors pb-1",
              activeCase === useCase.id
                ? "text-foreground border-b-2 border-[#d4a574]"
                : "text-[#9a958d] hover:text-foreground"
            )}
          >
            {useCase.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
