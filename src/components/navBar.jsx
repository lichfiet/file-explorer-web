import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; // Make sure to import useState

export function NavBar() {
    let navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState("");

    function handleChange(value) {
        setSelectedOption(value);
    }

    useEffect(() => {
        if (selectedOption) {
            navigate(`/${selectedOption}`);
        }
    }, [selectedOption, navigate]);

    return (
        <>
            <div className="container-fluid">
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet"></link>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet"></link>

                <div className="container" style={{ 'background-color': '#ffff', 'margin-bottom': '30px' }}>
                    <div className="container-fluid">
                        <nav id="nav">
                            <ul>
                                <a onClick={() => handleChange("home")} className="contrast navTitle"><li className="nav-name"><strong>Trevor Lichfield</strong></li></a>
                            </ul>
                            <ul>
                                <a href="" onClick={() => handleChange("home")}><strong><li className="nav-link">HOME</li></strong></a>
                                <a href="" onClick={() => handleChange("about")}><strong><li>ABOUT</li></strong></a>
                                <a href="" onClick={() => handleChange("workExperience")}><strong><li>WORK</li></strong></a>
                                <a href="" onClick={() => handleChange("projects")}><strong><li>PROJECTS</li></strong></a>
                            </ul>
                            <ul>
                                <li><a class="contrast socialMedia outline" href="https://github.com/lichfiet"><i class="socialMediaIcon fab fa-github"></i></a></li>
                                <li><a class="contrast socialMedia outline" href="https://github.com/lichfiet"><i class="socialMediaIcon fab fa-github"></i></a></li>
                                <li><a class="contrast socialMedia outline" href="https://github.com/lichfiet"><i class="socialMediaIcon fab fa-github"></i></a></li>
                                <li><a class="contrast socialMedia outline" href="https://www.linkedin.com/in/tlichfield/"><i class="socialMediaIcon fab fa-linkedin-in"></i></a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <Outlet />
            </div>
        </>
    );
}

export default NavBar;