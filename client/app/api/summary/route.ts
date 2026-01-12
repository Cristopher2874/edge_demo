import { type NextRequest, NextResponse } from "next/server"
import type { PipelinePayload, ApiResponse } from "@/types/pipeline"

export async function POST(request: NextRequest) {
  try {
    const payload: PipelinePayload = await request.json()

    // TODO: Replace with actual API integration
    // For now, return mock data based on the pipeline configuration
    const response: ApiResponse = {
      summary:
        "Customer Mark Montoya contacted CenterPoint Energy regarding an energy bill payment issue. The representative Heather Bird acknowledged the problem and offered assistance. Mark expressed frustration about not being able to pay his bills, and Heather provided support to help resolve the situation.",
      tags: ["Billing Issue", "Payment Assistance", "Customer Support", "Energy Services", "Financial Hardship"],
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("[API] Error in /api/summary:", error)
    return NextResponse.json({ error: "Failed to process summary request" }, { status: 500 })
  }
}
