import { Link } from 'react-router-dom';
import illustration1 from '../images/ill1.png';

function P4(){
    return(
        <>
            <div id="container4">
                <div className="container4-box1">
                    <img src={illustration1}/>
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
                            Don't have an account?<Link to='/signUp'><a href=''>Sign Up here</a></Link>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default P4;