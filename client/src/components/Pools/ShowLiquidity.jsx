import React, {useState} from 'react'
import { Link } from 'react-router-dom';

function ShowLiquidity() {

    const [position, setPosition] = React.useState({ x: 25});
    const [isDragging, setIsDragging] = React.useState(false);

    const handleMouseDown = (event) => {
        setIsDragging(true);
    };

    const handleMouseMove = (event) => {
        if (isDragging && event.target.tagName === 'circle') {
        if(position.x + event.movementX < 25){
            setPosition({ x: 25 });
        }
        else if(position.x + event.movementX > 475){
            setPosition({ x: 475 });
        }
        else{
            const tranformX = `translateX(${position.x + event.movementX}px)`
            event.target.style.transform = tranformX;
            setPosition({ x: position.x + event.movementX });
        }
        }
    };

    const handleMouseUp = (event) => {
        setIsDragging(false);
    };

    const handleMouseLeave = (event) => {
        setIsDragging(false);
    };

  return (
    <div class="container d-flex justify-content-center" style={{ marginTop:'4rem' }}>
        <div className="bg-light col-7 m-5 rounded-3 shadow-3-strong p-3">

            <div className="d-flex justify-content-between align-items-center mb-4 mx-3">
                <div>
                    <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" alt="bitcoin" width="50" height="50" />
                    <strong className="mx-3">Bitcoin</strong>
                </div>
                <div>
                    <Link to="/pools/liquiditystat/add" className="btn btn-primary mx-2">Add Liquidity</Link>
                    <Link to="/pools/liquiditystat/remove" className="btn btn-outline-primary mx-2">Remove Liquidity</Link>
                </div>
            </div>

            <div className="d-flex justify-content-around mb-4 mx-3">
                <div className="col-6">
                    <div className="d-flex flex-column mx-4 mb-3 px-4 bg-secondary rounded-3 h-100">
                        <svg class="range-svg" viewBox="0 0 500 100">
                            <rect class="range-track" x="25" y="45" width="450" height="10" rx="5" />
                            <circle draggable class="range-handle range-handle--left" cx={position.x} cy="50" r="12" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseLeave} />
                            <circle class="range-handle range-handle--right" cx="475" cy="50" r="12" />
                            <rect class="range-selection" x="25" y="45" width="450" height="10" rx="5" />
                        </svg>
                    </div>
                </div>
                <div className="col-6">
                    <div className="d-flex flex-column">
                        <div className="bg-primary p-3 rounded-3 text-white my-2">
                            <h6 className="lead">Liquidity</h6>
                            <h4 className="text-white my-2">$12345</h4>
                            <div class="bg-light text-dark px-3 py-2 rounded-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h6>UNI</h6>
                                    <h6>0.1205</h6>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h6>ETH</h6>
                                    <h6>0.1104</h6>
                                </div>
                            </div>
                        </div>
                        <div className="bg-primary p-3 rounded-3 text-white my-2">
                            <h6 className="lead">Unclaimed Fee</h6>
                            <h4 className="text-white my-2">$12345</h4>
                            <div class="bg-light text-dark px-3 py-2 rounded-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h6>UNI</h6>
                                    <h6>0.1205</h6>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h6>ETH</h6>
                                    <h6>0.1104</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>

            <div class="mb-4 mx-3">
                <h5>Price Range</h5>
                <div className="d-flex my-3 flex-column align-items-center">
                    <div className="col-12 row justify-content-center">
                        <div className="d-flex flex-column col-5 text-center bg-primary rounded-3 mx-1 p-2 text-white">
                            <h4 className="mx-2">0.71464</h4>
                            <h6 className="mx-2 lead">min Price</h6>
                        </div>
                        <div className="d-flex flex-column col-5 text-center bg-primary rounded-3 mx-1 p-2 text-white">
                            <h4 className="mx-2">0.74128</h4>
                            <h6 className="mx-2 lead">max Price</h6>
                        </div>
                    </div>
                    <div className="d-flex flex-column col-10 text-center bg-primary rounded-3 m-2 p-2 text-white">
                        <h4 className="mx-2">0.73135</h4>
                        <h6 className="mx-2 lead">current Price</h6>
                    </div>
                </div>
            </div>



        </div>
    </div>
  )
}

export default ShowLiquidity