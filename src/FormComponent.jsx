import React from 'react';

const FormComponent = ({onChange, onSubmit, maxSolDate}) => (
    <div>
        <h1>Mars Photo API</h1>
        <br/>
        <div>
            <h2>Curiosity</h2>
            <form onSubmit={onSubmit}>
                <label>
                    Sol<br/>
                    <input id="sol=date" type="number" name="sol" onChange={onChange} required min="1" max={maxSolDate
                    }/>
                </label>
                <br/>
                <br />
                <label>
                    Camera<br/>
                    <select name="camera" onChange={onChange}>
                        <option value="fhaz">Front Hazard Avoidance</option>
                        <option value="rhaz">Rear Hazard Avoidance</option>
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

export default FormComponent;