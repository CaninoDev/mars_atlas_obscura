import React from 'react';

const AppComponent = ({onChange, onSubmit}) => (
    <div>
        <h1>Mars Photo API</h1>
        <br/>
        <div>
            <h2>Curiosity</h2>
            <form onSubmit={onSubmit}>
                <label>
                    Sol<br/>
                    <input id="sol=date" type="number" name="solDate" />
                </label>
                <br/>
                <br />
                <label>
                    Camera<br/>
                    <select name="camera" onchange={onChange}>
                        <option value="fhaz" selected>Front Hazard</option>
                        <option value="rhaz">Front Hazard Avoidance</option>
                        <option value="mast">Mast</option>
                        <option value="chemcam">Chemistry and Camera Comnplex</option>
                        <option value="mahli">Mars Hand Lens Imager</option>
                        <option value="mardi">Mars Descent Imager</option>
                        <option value="navcam">Navigation</option>
                    </select>
                </label>
                <br />
                <br />
                <button type="submit">Find Photos</button>
            </form>
        </div>
    </div>
);

export default AppComponent;