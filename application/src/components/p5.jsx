import illustration2 from '../images/ill2.png';

function P5(){
    return(
        <>
        <div id="container4">
                <div className="container4-box1">
                    <img src={illustration2}/>
                </div>

                <div className="container4-box2">
                    <section id="page4-s1">
                        <div className="s1">
                            Signup
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
                        <div className="s2">
                            <div className="s2-label">
                                Confirm Password
                            </div>
                            <div className="s2-input">
                                <input type='password'/>
                            </div>
                        </div>
                    </section>
                    
                    <section id="page4-s3">
                        <div className="s3-1">
                            Sign Up
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default P5;