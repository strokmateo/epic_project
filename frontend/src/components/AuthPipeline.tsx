import { useState } from "react";
import { authEventType } from "../types/AuthTypes";
import StartScreen from "./game-ui/startScreen";
import EnterTown from "./game-ui/enterTown";
import AuthScene from "./game-ui/authScene";

export default function AuthPipeline({
    authFormComponent,
}: {
    authFormComponent: React.ReactElement;
}) {
    const eventSequence: authEventType[] = ["startScreen", "enterTown", "auth"];
    const [authEventIndex, setAuthEventIndex] = useState<number>(0);

    let renderEvent: React.ReactElement = <div>Something went wrong!</div>;

    const nextEventHandler = () => {
        setAuthEventIndex((prevIndex) => prevIndex + 1);
    };

    const currentEvent = eventSequence[authEventIndex];

    const knock = new Audio("/src/assets/audio/town_entrance.mp3");
    knock.load();

    if (currentEvent === "startScreen") {
        renderEvent = (
            <StartScreen
                onClick={() => {
                    knock.play();
                    nextEventHandler();
                }}
            />
        );
    } else if (currentEvent === "enterTown") {
        renderEvent = <EnterTown onClick={nextEventHandler} />;
    } else if (currentEvent === "auth") {
        renderEvent = <AuthScene authForm={authFormComponent} />;
    }

    return renderEvent;
}
