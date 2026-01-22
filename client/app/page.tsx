import { Header } from "@/components/header"
import { DemoCard } from "@/components/demo-card"

const demos = [
  {
    title: "Document Ingestion",
    description: "Python SDK that converts documents into vectors stored in a central knowledge store, enabling RAG agents to deliver more accurate, context-aware answers.",
    type: "agent" as const,
    href: "/document-ingestion",
  },
  {
    title: "Agent Pipeline",
    description: "Offers abstractions to orchestrate agent workflows and LLM pipelines, supporting low-code configuration and easy extensibility.",
    type: "agent" as const,
    href: "/agent-pipeline",
  },
  {
    title: "RAG Retrieval",
    description: "Welcome to our platform! Here, you can explore a variety of features designed to enhance your experience.",
    type: "agent" as const,
    href: "/rag-retrieval",
  },
  {
    title: "Summarization",
    description: "Welcome to our platform! Here, you can explore a variety of features designed to enhance your experience.",
    type: "service" as const,
    href: "/summarization",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="px-6 py-4">
        <Header />
      </header>
      <main className="px-6 py-12">
        <h1 className="text-center text-4xl font-serif text-foreground mb-12">Demos</h1>
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {demos.map((demo) => (
            <DemoCard
              key={demo.title}
              title={demo.title}
              description={demo.description}
              type={demo.type}
              href={demo.href}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
