import React from 'react'
import BeatLoader from "react-spinners/BeatLoader";

function Loader({ loading }) {

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw', backgroundColor: 'rgba(255, 255, 255, 0.7)', zIndex: 9999}}>
            <BeatLoader style={{ position: 'absolute', top: '50%', left: '50%' }}
                color="#3459e6"
                loading={loading}
                cssOverride={override}
                size={20}
                aria-label="BeatLoader"
                data-testid="loader"
            />
        </div>
    )
}

export default Loader