import React from "react";
import { LaunchesListQuery } from "../../generated/graphql";
import './style.css';

interface Props {
    data: LaunchesListQuery;
    setid: (str: string) => void;
    islit: boolean;
}

const Launch: React.FC<Props> = ({ setid, data, islit }) => {
    return (
        <div className={`${islit ? '' : 'dark'} launches`}>
            <h3>All Space X Launches</h3>

            <select name="launch" id="launch" className="launch" onChange={(e) => setid(e.target.value)}>
                <option key={'select'} value="select">Select</option>
                {!!data.launches && data.launches.map((launch, i) => !!launch &&
                    <option key={i} className="LaunchesItem" value={launch.id && launch.id !== undefined ? launch.id.toString() : ''} >
                        {launch.mission_name} - {launch.launch_year}
                    </option>
                )}
            </select>


            <ol className="LaunchesOL">
                {!!data.launches && data.launches.map((launch, i) => !!launch &&
                    <li key={i} className="LaunchesItem" onClick={() => 
                        setid(launch.id && launch.id !== undefined ? launch.id.toString() : '')
                    }>
                        {launch.mission_name} - {launch.launch_year} (<span className={launch.launch_success ? "LaunchDetailsSuccess" : launch.launch_success === null ? "" : "LaunchDetailsFailed"}>{JSON.stringify(launch.launch_success) === 'true' ? "success" : JSON.stringify(launch.launch_success) === 'null' ? "unknown" : "failed"}</span>)
                    </li>
                )}
            </ol>
        </div>
    );
}

export default Launch;