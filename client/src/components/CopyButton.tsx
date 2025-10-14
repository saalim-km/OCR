import { Check, Copy } from "lucide-react"
import { useState } from "react"

export const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
    >
      {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
      <span className="text-xs">{copied ? "Copied" : "Copy"}</span>
    </button>
  )
}
