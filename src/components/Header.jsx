import { Settings, Sun, Moon } from 'lucide-react'
import FitnessRing from './FitnessRing'

function ChickenIcon({ size = 14, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 2C13 2 11 3.5 11 6c0 1.5.5 2.5 1 3L6 16c-1 1-1 3 0 4s3 1 4 0l7-6c.5.5 1.5 1 3 1 2.5 0 4-2 4-4 0-1.5-.8-2.8-2-3.5" />
      <path d="M9 17l2 2" />
    </svg>
  )
}

function WheatIcon({ size = 14, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22V8" />
      <path d="M7 8c0-2.5 2-4 5-4s5 1.5 5 4-2 4-5 4-5-1.5-5-4z" />
      <path d="M5 12c0-2 1.5-3 4-3" />
      <path d="M19 12c0-2-1.5-3-4-3" />
      <path d="M5 16c0-2 1.5-3 4-3" />
      <path d="M19 16c0-2-1.5-3-4-3" />
    </svg>
  )
}

function AvocadoIcon({ size = 14, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2C9 2 6.5 5.5 6.5 10.5C6.5 16.5 9 22 12 22C15 22 17.5 16.5 17.5 10.5C17.5 5.5 15 2 12 2Z" />
      <ellipse cx="12" cy="14" rx="2.5" ry="3.2" />
    </svg>
  )
}

const MACRO_CONFIG = [
  {
    key: 'protein',
    label: 'Protein',
    color: 'bg-emerald-400',
    Icon: ChickenIcon,
    iconColor: 'text-emerald-400',
  },
  {
    key: 'carbs',
    label: 'Carbs',
    color: 'bg-amber-400',
    Icon: WheatIcon,
    iconColor: 'text-amber-400',
  },
  {
    key: 'fat',
    label: 'Fat',
    color: 'bg-rose-400',
    Icon: AvocadoIcon,
    iconColor: 'text-rose-400',
  },
]

export default function Header({
  consumed = 0,
  goal = 3000,
  macros = { protein: 0, carbs: 0, fat: 0 },
  macroGoals = { protein: 150, carbs: 300, fat: 100 },
  onOpenSettings,
  darkMode = false,
  onToggleTheme,
}) {
  const dk = darkMode

  return (
    <header
      className={`sticky top-0 z-10 backdrop-blur-2xl border-b px-4 pt-3 pb-4 transition-colors duration-300 ${
        dk
          ? 'bg-[#0C0C0E]/85 border-white/[0.06]'
          : 'bg-white/80 border-gray-200/60'
      }`}
    >
      {/* Nav bar */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={onToggleTheme}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-all active:scale-90 ${
            dk
              ? 'text-white/30 hover:text-white/70 hover:bg-white/[0.06]'
              : 'text-gray-400 hover:text-gray-700 hover:bg-black/[0.05]'
          }`}
          aria-label={dk ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {dk ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        <span
          className={`text-[20px] font-black tracking-tight select-none transition-colors duration-300 ${
            dk ? 'text-white' : 'text-[#0a0a0a]'
          }`}
        >
          bulkr
        </span>

        <button
          type="button"
          onClick={onOpenSettings}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-all active:scale-90 ${
            dk
              ? 'text-white/30 hover:text-white/70 hover:bg-white/[0.06]'
              : 'text-gray-400 hover:text-gray-700 hover:bg-black/[0.05]'
          }`}
          aria-label="Settings"
        >
          <Settings size={17} />
        </button>
      </div>

      {/* Calorie ring */}
      <div className="flex justify-center mt-3">
        <FitnessRing consumed={consumed} goal={goal} size={120} stroke={10}>
          <div className="flex flex-col items-center leading-none">
            <span
              className={`text-[26px] font-bold tabular-nums tracking-tight transition-colors duration-300 ${
                dk ? 'text-white' : 'text-black'
              }`}
            >
              {consumed.toLocaleString()}
            </span>
            <span
              className={`text-[11px] font-medium mt-1.5 transition-colors duration-300 ${
                dk ? 'text-white/35' : 'text-gray-500'
              }`}
            >
              / {goal.toLocaleString()} kcal
            </span>
          </div>
        </FitnessRing>
      </div>

      {/* Macro card */}
      <div
        className={`grid grid-cols-3 gap-4 mt-4 rounded-2xl px-4 py-3.5 transition-colors duration-300 ${
          dk
            ? 'bg-white/[0.05] border border-white/[0.08]'
            : 'bg-white/70 border border-white/80 shadow-[0_2px_16px_rgba(0,0,0,0.06)]'
        }`}
      >
        {MACRO_CONFIG.map(({ key, label, color, Icon, iconColor }) => {
          const eaten = Math.round(macros[key] || 0)
          const goal_g = macroGoals[key]
          const pct = Math.min(100, goal_g > 0 ? (eaten / goal_g) * 100 : 0)

          return (
            <div key={key} className="flex flex-col gap-2">
              {/* Label row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Icon size={12} className={iconColor} />
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                      dk ? 'text-white/35' : 'text-gray-500'
                    }`}
                  >
                    {label}
                  </span>
                </div>
                <span
                  className={`text-[11px] font-semibold tabular-nums transition-colors duration-300 ${
                    dk ? 'text-white/65' : 'text-gray-700'
                  }`}
                >
                  {eaten}g
                </span>
              </div>

              {/* Thick pill bar */}
              <div
                className={`h-3 w-full rounded-full overflow-hidden transition-colors duration-300 ${
                  dk ? 'bg-white/[0.07]' : 'bg-black/[0.07]'
                }`}
              >
                <div
                  className={`h-full rounded-full ${color} transition-all duration-500`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </header>
  )
}
