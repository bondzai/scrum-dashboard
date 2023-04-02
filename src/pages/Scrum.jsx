import React from "react";
import ScrumTable from "../components/Scrum";

const Scrum = () => {

    return (
        <div className="home">
            <div className="about">
                <h1> DAILY SCRUM DATA </h1>
                <ScrumTable />
            </div>
        </div>
    )
}

export default Scrum;