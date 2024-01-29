import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; // Make sure to import useState

import FileExplorer from '../../components/projects/tools/fileExplorer/fileExplorer'
import XmlToJson from '../../components/projects/tools/xmlToJson/xmlToJson'


const Projects = function () {
    const [selectedOption, setSelectedOption] = useState(<div className="container"><i><h4 style={{textAlign: "center"}}>Please Select a tool</h4></i></div>);

    function handleChange(value) {
        (value === "fileExplorer" ? setSelectedOption(<FileExplorer />) : console.log("meow"));
        (value === "xmlToJson" ? setSelectedOption(<XmlToJson />) : console.log("meow"))
    }



    return (
        <div className="container">


            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet"></link>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet"></link>


            <div className="container-fluid">
                <section className="">
                    <article className="overrideArticle">
                        <div className="container-fluid">
                            <nav id="nav">
                                <ul>
                                    <hgroup>
                                        <h2 className="overrideHeading">Tools</h2>
                                        <p className="overrideSubHeading">meow</p>
                                    </hgroup>
                                </ul>
                                <ul>
                                    <li>
                                        <select onChange={(event) => handleChange(event.target.value)}>
                                            <option value="">Select a tool</option>
                                            <option value="fileExplorer">File Converter</option>
                                            <option value="xmlToJson">Xml to Json</option>
                                        </select>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <Outlet />
                        <div className="container">
                            {/** This is the selected tool */ selectedOption}
                        </div>
                    </article>
                </section>
                <section>
                    <article className="overrideArticle">
                        <div className="container-fluid">
                            <nav id="nav">
                                <ul>
                                    <hgroup>
                                        <h2 className="overrideHeading">Tools</h2>
                                        <p className="overrideSubHeading">meow</p>
                                    </hgroup>
                                </ul>
                                <ul>
                                    <li className="contrast">Select A Tool</li>
                                    <li>
                                        <select onChange={(event) => handleChange(event.target.value)}>
                                            <option value="home">Home</option>
                                            <option value="fileExplorer">File Converter</option>
                                        </select>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <Outlet />
                        <div className="container">
                        </div>
                    </article>
                </section>
            </div>
        </div>
    )
}

export default Projects;
