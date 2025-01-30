import { cn } from "../../lib/utils";
import Character from "./character";
import Dialog from "./dialog";

export default function CharacterDialog({
    characterSrc,
    className,
    text = null,
    dialogVisibility = true,
}: //scale = 0.75,
{
    characterSrc: string;
    className?: string;
    text?: string | null;
    dialogVisibility?: boolean;
    //scale?: number; ako bude trebalo ikad
}) {
    return (
        <div className={cn("relative", className)}>
            {/* Dialog */}
            {text && (
                <div
                    className={`${
                        !dialogVisibility && "animate-slideOut"
                    } relative z-10`}
                >
                    <Dialog text={text} />
                </div>
            )}

            {/* Character */}
            <div className="absolute bottom-0 right-0 w-1/2 flex justify-center z-20 translate-y-28">
                <Character
                    imageSrc={characterSrc}
                    scale={0.75}
                    className="animate-slide-up-character"
                />
            </div>
        </div>
    );
}
