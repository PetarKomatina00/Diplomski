import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { cartItemModel } from '../../interfaces/cartItemModel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Storage/Redux/store';
import userModel from '../../interfaces/userModel';
import { useNavigate } from 'react-router-dom';
import { emptyUserState, setLoggedInUser } from '../../Storage/Redux/userAuthSlice';
let logo = require('../../Assets/Images/web-developer.png');
function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [steps, setSteps] = useState<number>(0);
    const shoppingCartFromStore: cartItemModel[] = useSelector(
        (state: RootState) => state.shoppingCartStore.cartItems ?? []
    )
    const userData: userModel = useSelector((state: RootState) => state.userAuthStore)
    let email = "";
    if (userData != undefined || userData != null) {
        email = userData.email     
    }
    if (email != "") {
        fetch('https://diplomskiapi.azurewebsites.net/api/auth/' + email)
            .then(x => {
                return x.json()
            })
            .then(x => {
                setSteps(x.result);
            })
    }
    //console.log(steps);
    useEffect(() => {
        let discount = 0;
        if(steps > 500){
            discount = 70;
        }
        else if(steps > 250){
            discount = 50;
        }
        else if(steps > 50){
            discount = 30;
        }
        else if(steps > 20){
            discount = 25;
        }
        localStorage.setItem("discount", discount.toString())
    }, [steps])
    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(setLoggedInUser({ ...emptyUserState }))
        navigate("/")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <NavLink className='nav-link' aria-current="page" to="/">
                        <img src={logo} style={{ height: "40px" }} className='m-1' />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
                            <li className="nav-item">
                                {steps}
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>

                            {true && <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/shoppingCart">
                                    <i className="bi bi-cart"></i>
                                    {userData.id && `${shoppingCartFromStore?.length}`}
                                </NavLink>
                            </li>}

                            {/* <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/authentication">
                                    Authentication
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/authorization">
                                    Authorization
                                </NavLink>
                            </li> */}
                            {true && <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Admin panel
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" onClick={() => navigate("Lekovi/SviLekovi")}>Svi Lekovi</a>
                                    </li>
                                </ul>
                            </li>}

                            <div className='d-flex' style={{ marginLeft: "auto" }}>

                                {userData.id && (
                                    <>
                                        <li className='nav-item pt-1'>
                                            <span className='nav-link active'
                                                style={{
                                                    background: "transparent",
                                                    border: 0
                                                }}>
                                                Welcome, {userData.fullName}
                                            </span>

                                        </li>
                                        <li className='nav-item pt-1'>
                                            <button
                                                className='btn btn-success btn-outlined rouned-pill text-white mx-2'
                                                style={{
                                                    border: "none",
                                                    height: "40px",
                                                    width: "100px",
                                                }}
                                                onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </li>
                                    </>)}
                                {!userData.id && (<>
                                    <li className='nav-item text-white'>
                                        <NavLink className="nav-link" to="/register">
                                            Register
                                        </NavLink>
                                    </li>
                                    <li className='nav-item text-white'>
                                        <NavLink className="nav-link" to="/login">
                                            Login
                                        </NavLink>
                                    </li>
                                </>)}
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header