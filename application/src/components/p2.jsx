import { Link } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";

function P2(){
    return(
        <>
            <div id="container2">

                <nav className="navbar">
                    <div className="navbar-links">
                        <Link to='/logIn'><a href="#login" className="logIn">Login</a></Link>
                        <Link to='/signUp'><a href="#signup" className="signUp">SignUp</a></Link>
                    </div>
                </nav>

                <section className="page2-s1">
                    <FaCirclePlus/>
                    <p>Drag & drop file here</p>
                </section>


                <section className="page2-s2 button-class">
                    Upload
                </section>


                <section className="page2-s3">
                    <div>Box 1</div>
                    <div>Box 2</div>
                    <div>Box 3</div>
                    <div>Box 4</div>
                    <div>Box 5</div>  
                    <div>Box 6</div>  
                </section>

                
                <section className="page2-s4 button-class">
                    <Link to='/ansPage' style={{color:"#FFD56C", textDecoration:"none", width:"100%",height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>Proceed</Link>
                </section>
                
            </div>
        </>
    )
}

export default P2;