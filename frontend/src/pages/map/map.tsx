import React from "react";
import "../../templates/BackgroundStyle.css";
import UserInfo from "./UserInfo";
import House from "./House";

const Map: React.FC = () => {
    return (
        <div className="bg-map-background background animate-fade-in font-pixel">
            <UserInfo />
            <House />
        </div>
    );
};

export default Map;
