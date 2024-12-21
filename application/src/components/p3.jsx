import { FaArrowRightToBracket } from "react-icons/fa6";
import { Link } from "react-router-dom";

function P3(){
    return(
        <>
            <div id="container3">
                <nav className="navbar">
                    <div className="navbar-links">
                        <Link to='/logIn'><a href="#login" className="logIn">Login</a></Link>
                        <Link to='/signUp'><a href="#signup" className="signUp">SignUp</a></Link>
                    </div>
                </nav>
            
                <section id="page3-s1">
                    <input spellCheck="false" placeholder="Enter your text here"/>
                </section>
                <section id="page3-s2">
                    <FaArrowRightToBracket style={{fontSize:"25px", color:"white"}}/>
                </section>
                <section id="page3-s3"></section>
            </div>
        </>
    )
}

export default P3;