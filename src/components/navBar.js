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

                <div className="container-fluid">
                    <nav id="nav">
                        <ul>
                            <a onClick={() => handleChange("home")} className="contrast navTitle"><li className="nav-name"><strong>Trevor Lichfield</strong></li></a>
                        </ul>
                        <ul>
                            <a onClick={() => handleChange("home")}><li className="nav-link">HOME</li></a>
                            <a onClick={() => handleChange("about")}><li>ABOUT</li></a>
                            <a onClick={() => handleChange("workExperience")}><li>WORK</li></a>
                            <a onClick={() => handleChange("projects")}><li>PROJECTS</li></a>
                        </ul>
                        <ul>
                            <li><a class="contrast socialMedia outline" href="https://github.com/lichfiet"><i class="socialMediaIcon fab fa-github"></i></a></li>
                            <li><a class="contrast socialMedia outline" href="https://www.linkedin.com/in/tlichfield/"><i class="socialMediaIcon fab fa-linkedin-in"></i></a></li>
                        </ul>
                    </nav>
                </div>
                <Outlet />
            </div>
        </>
    );
}

export default NavBar;