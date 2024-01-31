import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; // Make sure to import useState

import FileExplorer from '../../components/projects/tools/fileExplorer/fileExplorer'
import XmlToJson from '../../components/projects/tools/xmlToJson/xmlToJson'


const Projects = function () {
    const [selectedOption, setSelectedOption] = useState(<FileExplorer />);
    const [projDesc, setProjDesc] = useState(
        <div>
            <h2 className="overrideHeading">File Explorer</h2>

            <p className="overrideSubHeading">This simple file explorer uses React.js as a front-end, a RESTful Node.js API as the
                backend, and AWS S3 Object storage leveraging the API Gateway to create routes for managing
                files inside the buckets</p>
        </div>
    );

    function handleChange(value) {
        (value === "fileExplorer" ? setSelectedOption(<FileExplorer />) : console.log("meow"));
        (value === "xmlToJson" ? setSelectedOption(<XmlToJson />) : console.log("meow"))
    }



    return (
        <div className="container">


            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet"></link>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet"></link>
            <article className="overrideArticle">
                <div className="container-fluid">
                    <h3>
                        Tools
                    </h3>
                    <nav id="nav">
                        <ul>
                        </ul>
                        <ul>
                            <li>Select a tool</li>
                            <li>
                                <select onChange={(event) => handleChange(event.target.value)}>
                                    <option value="fileExplorer">File Explorer</option>
                                    <option value="xmlToJson">Xml to Json</option>
                                </select>
                            </li>
                        </ul>
                        <ul>
                        </ul>
                    </nav>

                </div>
                <article className="overrideArticle">
                <header>
                    {projDesc}
                </header>
                <body>
                    <div className="container-fluid tool">
                        {/** This is the selected tool */ selectedOption}
                    </div>
                </body>
                <footer>
               
                </footer>
            </article>
            </article>

        </div>
    )
}

export default Projects;
