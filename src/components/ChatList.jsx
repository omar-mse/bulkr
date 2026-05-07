import { useEffect, useRef } from 'react'
import ChatBubble from './ChatBubble'

export default function ChatList({ messages, darkMode = false }) {
  const endRef = useRef(null)
  const isEmpty = messages.length <= 1

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <main className="flex-1 overflow-y-auto px-4 py-4 relative">
      {/* Watermark — only when no food logs exist yet */}
      {isEmpty && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className={`text-[96px] font-black tracking-tighter transition-colors duration-300 ${
              darkMode ? 'text-white/[0.035]' : 'text-black/[0.04]'
            }`}
          >
            bulkr
          </span>
        </div>
      )}

      {messages.map((m, i) => {
        const prev = messages[i - 1]
        const isRoleSwitch = !prev || prev.role !== m.role
        return (
          <ChatBubble
            key={m.id}
            message={m}
            isRoleSwitch={isRoleSwitch}
            darkMode={darkMode}
          />
        )
      })}
      <div ref={endRef} />
    </main>
  )
}
