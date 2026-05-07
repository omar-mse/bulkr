import clsx from 'clsx'

export default function ChatBubble({ message, isRoleSwitch, darkMode = false }) {
  const isUser = message.role === 'user'
  const dk = darkMode
  const spacingClass = isRoleSwitch ? 'mt-4' : 'mt-1'

  if (isUser) {
    return (
      <div className={clsx('flex justify-end', spacingClass)}>
        <div
          className={`max-w-[75%] px-4 py-2.5 text-[15px] leading-relaxed rounded-[20px] break-words font-medium ${
            dk ? 'bg-indigo-600 text-white' : 'bg-[#007aff] text-white'
          }`}
        >
          {message.image && (
            <img
              src={message.image}
              alt=""
              className="rounded-2xl mb-2 max-h-64 w-full object-cover"
            />
          )}
          {message.text && <span>{message.text}</span>}
        </div>
      </div>
    )
  }

  return (
    <div className={clsx('flex items-end gap-2', spacingClass)}>
      {/* Avatar — visible only on first message in a sequence */}
      {isRoleSwitch ? (
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 select-none ${
            dk ? 'bg-white/[0.09] text-white/50' : 'bg-black/[0.08] text-black/50'
          }`}
          aria-hidden="true"
        >
          B
        </div>
      ) : (
        <div className="w-7 shrink-0" />
      )}

      {/* Bubble */}
      <div
        className={`max-w-[75%] px-4 py-2.5 text-[15px] leading-relaxed rounded-[20px] break-words transition-colors duration-300 ${
          dk
            ? 'bg-white/[0.07] text-white/90 border border-white/[0.07]'
            : 'bg-[#e9e9eb] text-black'
        }`}
      >
        {message.text}
      </div>
    </div>
  )
}
