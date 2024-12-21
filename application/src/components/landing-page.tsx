import Image from 'next/image';
// import gif from '../images/prepAssist.gif';
import Link from 'next/link';
import "./components.css";

export function LandingPage(){
    return(
        <>
            <div id="container1">
                <div className="container1-box1">
                    <section id="page1-s1" className="p p1">
                        {/* <Image src={gif} alt='random'/> */}
                    </section>
                    
                    <section id="page1-s2" className="p p2">
                        prep<span>Assist</span>
                    </section>
                    
                    <section id="page1-s3" className="p p3">
                        Get instant answers from notes and PYQs!
                    </section>
                </div>

                <div className="container1-box2">
                    <Link href='/login' style={{textDecoration:"none"}}>
                    <section id="page1-s4" className="p p4 button-class">
                        Login/SignUp
                    </section>
                    </Link>
                    
                    <Link href='/assistant' style={{textDecoration:"none"}}>
                    <section id="page1-s5" className="p p5 button-class">
                        Try demo for free
                    </section>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default LandingPage;