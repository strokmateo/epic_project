import React from "react";

const BackButton: React.FC = () => {
    const goBack = () => {
        window.history.back();
    };
    return (
        <button
            className="bg-black bg-opacity-50 text-white w-36 absolute top-5 left-5 h-12 rounded-lg z-40 transform transition-transform duration-200 hover:scale-105 hover:bg-opacity-75"
            onClick={goBack}
        >
            Back
        </button>
    );
};

export default BackButton;
