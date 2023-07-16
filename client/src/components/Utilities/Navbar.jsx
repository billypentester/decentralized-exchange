
import logo from './../../images/logo.png'
import { Link } from 'react-router-dom'
import ConnectWallet from './ConnectWallet';
import detectEthereumProvider from "@metamask/detect-provider";
import { useEffect, useContext } from "react";
import { Token1Context } from "../../contexts/Token1Context";

function Navbar({shadow}) {

    const { connectWallet, walletAddress } = useContext(Token1Context);

    useEffect(() => {
        if (shadow) 
        {
            document.querySelector('.navbar').classList.remove('shadow-none')
            document.querySelector('.navbar').classList.add('shadow-lg')
        }
        else
        {
            document.querySelector('.navbar').classList.remove('shadow-lg')
            document.querySelector('.navbar').classList.add('shadow-none')
        }
    }, [shadow]);

  return (  
    <>  

    <nav className='navbar fixed-top navbar-expand-lg navbar-dark bg-primary w-100 shadow-none' >  

        <div className="container-lg container-fluid">    


            <Link className="navbar-brand mt-2 mt-lg-0 p-2" to="/">
                <img src={logo} alt="DEX" width='70px' loading="lazy" />
            </Link> 

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#NavbarComponent" aria-controls="NavbarComponent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-bars"></i>
            </button>

            <div className="collapse navbar-collapse" id="NavbarComponent"> 

                <hr className="d-lg-none text-light" />

                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link mx-3 my-1 text-light" to="/swap">Swap</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link mx-3 my-1 text-light" to="/tokens">Tokens</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link mx-3 my-1 text-light" to="/pools">Pools</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link mx-3 my-1 text-light" to="/bridge">Bridge</Link>
                    </li>
                </ul> 

                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       
                    {
                        walletAddress.length > 0 ? 
                        <button type="button" className="btn btn-light mx-2 btn-pill my-1">
                            <span>{walletAddress.substring(0,8)}...{walletAddress.substring(38)}</span> 
                        </button>
                        : 
                        <button type="button" className="btn btn-light mx-2 btn-rounded my-1" data-toggle="modal" data-target="#exampleModal">              
                            <span> Connect Wallet </span> 
                        </button>
                    }
                  
                    <div className="d-flex justify-content-center">

                        <button type="button" className="btn btn-light mx-2 btn-floating my-1 col-5">
                            <i style={{ fontSize:'20px' }} className="fa-solid fa-gear text-primary"  ></i>
                        </button>

                        <button type="button" className="btn btn-light mx-2 btn-floating my-1 col-5">
                            <a className='text-dark' style={{ fontSize:'14px', textDecoration:'none' }}  rel="noreferrer noopener" target="_blank" href={"https://medium.com/decentralized-exchange" } >Blogs</a>
                        </button>

                    </div>
                    
                </ul> 

            </div> 

        </div> 

    </nav>


    <ConnectWallet />

</>
  )
}

export default Navbar