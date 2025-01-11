import { cn } from "../../lib/utils";
import TypewriterEffect from "./typeWriterEffect";

export default function Dialog({
    text,
    className,
}: {
    text: string;
    className?: string;
}) {
    return (
        // currently only works for npc -> player output, todo is to add func for player -> npc input
        <div
            className={cn(
                "bg-slate-300  w-screen h-[150px] animate-slide-up flex font-pixel text-[30px]",
                className
            )}
        >
            <div className="w-1/2 p-2">
                <TypewriterEffect text={text} />
            </div>
        </div>
    );
}
