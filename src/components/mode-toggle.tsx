import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="w-20 h-10 rounded-full bg-slate-200" />
    }

    const isDark = theme === "dark"

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`
                relative w-20 h-10 rounded-full cursor-pointer transition-colors duration-500 overflow-hidden border-2 scale-75 origin-center
                ${isDark ? "bg-[#0f172a] border-slate-700" : "bg-[#60a5fa] border-blue-400"}
                shadow-inner hover:scale-[0.80] active:scale-75 transition-transform
            `}
            aria-label="Toggle theme"
        >
            {/* Sky Elements - Stars (Night) */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${isDark ? "opacity-100" : "opacity-0"}`}>
                <div className="absolute top-2 left-8 w-[2px] h-[2px] bg-white rounded-full animate-pulse" />
                <div className="absolute top-4 left-12 w-[1px] h-[1px] bg-white rounded-full animate-pulse delay-700" />
                <div className="absolute bottom-6 right-10 w-[2px] h-[2px] bg-white rounded-full animate-pulse delay-300" />
            </div>

            {/* Sky Elements - Clouds (Day) */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${isDark ? "opacity-0" : "opacity-100"}`}>
                <CloudIcon className="absolute top-1 right-3 text-white/60 w-5 h-5" />
                <CloudIcon className="absolute bottom-2 left-8 text-white/40 w-4 h-4" />
            </div>

            {/* Sun / Moon Thumb */}
            <div
                className={`
                    absolute top-1 z-20 w-7 h-7 rounded-full transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] shadow-md
                    ${isDark
                        ? "left-[calc(100%-2.25rem)] bg-slate-100 shadow-[0_0_10px_2px_rgba(255,255,255,0.3)]" // Moon
                        : "left-1 bg-yellow-300 shadow-[0_0_10px_2px_rgba(253,224,71,0.5)]" // Sun
                    }
                `}
            >
                {/* Moon Craters */}
                {isDark && (
                    <>
                        <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-slate-300 rounded-full opacity-50" />
                        <div className="absolute bottom-2 right-2 w-1 h-1 bg-slate-300 rounded-full opacity-50" />
                    </>
                )}
            </div>

            {/* City Skyline */}
            <div className="absolute bottom-0 left-0 right-0 h-full z-10 pointer-events-none flex items-end justify-center px-1 gap-0.5">

                {/* Building 1 */}
                <div className={`w-3 h-5 ${isDark ? "bg-[#1e293b]" : "bg-blue-300"} transition-colors duration-500 rounded-t-sm flex flex-col justify-evenly items-center py-0.5`}>
                    <Window isDark={isDark} />
                    <Window isDark={isDark} />
                </div>

                {/* Building 2 (Tall) */}
                <div className={`w-4 h-7 ${isDark ? "bg-[#0f172a]" : "bg-blue-400"} transition-colors duration-500 rounded-t-sm flex flex-col justify-evenly items-center py-0.5`}>
                    <div className="flex gap-0.5">
                        <Window isDark={isDark} />
                        <Window isDark={isDark} />
                    </div>
                    <div className="flex gap-0.5">
                        <Window isDark={isDark} />
                        <Window isDark={isDark} />
                    </div>
                    <div className="flex gap-0.5">
                        <Window isDark={isDark} />
                        <Window isDark={isDark} />
                    </div>
                </div>

                {/* Building 3 */}
                <div className={`w-3 h-4 ${isDark ? "bg-[#1e293b]" : "bg-blue-300"} transition-colors duration-500 rounded-t-sm flex flex-col justify-evenly items-center py-0.5`}>
                    <Window isDark={isDark} />
                    <Window isDark={isDark} />
                </div>
                {/* Building 4 */}
                <div className={`w-5 h-6 ${isDark ? "bg-[#334155]" : "bg-blue-500"} transition-colors duration-500 rounded-t-sm flex flex-col justify-evenly items-center py-0.5`}>
                    <div className="flex gap-1">
                        <Window isDark={isDark} delay="delay-100" />
                        <Window isDark={isDark} delay="delay-300" />
                    </div>
                    <div className="flex gap-1">
                        <Window isDark={isDark} delay="delay-200" />
                        <Window isDark={isDark} delay="delay-500" />
                    </div>
                </div>
            </div>
        </button>
    )
}

const Window = ({ isDark, delay = "" }: { isDark: boolean, delay?: string }) => (
    <div
        className={`
            w-1 h-1 rounded-[1px] transition-all duration-700
            ${isDark
                ? `bg-yellow-400 shadow-[0_0_4px_1px_rgba(250,204,21,0.6)] ${delay} animate-pulse` // Lights ON
                : "bg-white/40" // Lights OFF (Day reflection)
            }
        `}
    />
)

const CloudIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.5 14C3.567 14 2 12.433 2 10.5C2 8.567 3.567 7 5.5 7C5.73669 7 5.96577 7.02796 6.1842 7.08157C6.73815 4.79374 8.78852 3 11.25 3C14.3129 3 16.899 5.09459 17.728 7.9429C17.9782 7.92519 18.2356 7.91667 18.5 7.91667C20.9853 7.91667 23 9.93139 23 12.4167C23 14.902 20.9853 16.9167 18.5 16.9167H5.5V14Z" />
    </svg>
)
