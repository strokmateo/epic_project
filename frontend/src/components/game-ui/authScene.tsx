import React from "react";
import Character from "./character";

export default function AuthScene({
    authForm,
}: {
    authForm: React.ReactElement;
}) {
    return (
        <div className="bg-auth-background w-screen h-screen bg-cover flex items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
            <Character
                className="absolute bottom-0 right-0 w-1/2 flex justify-center z-20 translate-y-28"
                scale={0.75}
                imageSrc="src/assets/images/town-guard-1.png"
            />
            <div className="z-20 text-white">{authForm}</div>
        </div>
    );
}
