// import illustration1 from '../images/ill1.png';
import "./components.css"
import Link from "next/link";

function LoginPage(){
    return(
        <>
            <div id="container4">
                <div className="container4-box1">
                    {/* <img src={illustration1}/> */}
                </div>

                <div className="container4-box2">
                    <section id="page4-s1">
                        <div className="s1">
                            Login
                        </div>
                    </section>

                    <section id="page4-s2">
                        <div className="s2">
                            <div className="s2-label">
                                Email
                            </div>
                            <div className="s2-input">
                                <input type='text'/>
                            </div>
                        </div>
                        <div className="s2">
                            <div className="s2-label">
                                Password
                            </div>
                            <div className="s2-input">
                                <input type='password'/>
                            </div>
                        </div>
                    </section>
                    
                    <section id="page4-s3">
                        <div className="s3-1">
                            Log In
                        </div>
                        <div className="s3-2">
                            Don't have an account?<Link href='/register'>Sign Up here</Link>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default LoginPage;