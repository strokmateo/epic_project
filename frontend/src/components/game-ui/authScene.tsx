import React from "react";

export default function AuthScene({
    authForm,
}: {
    authForm: React.ReactElement;
}) {
    return (
        <div className="bg-auth-background w-screen h-screen bg-cover flex items-end relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50 animate-fade-in z-10"></div>
            <div className="z-20 text-white">{authForm}</div>
        </div>
    );
}
