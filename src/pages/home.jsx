import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react"; // Make sure to import useState

import FileExplorer from '../components/projects/tools/fileExplorer/fileExplorer'
import XmlToJson from '../components/projects/tools/xmlToJson/xmlToJson'

const Projects = function () {

    const [preview, setPreview] = useState(<h1>test</h1>);

    const [selectedOption, setSelectedOption] = useState(<FileExplorer setPreview={setPreview}/>);
    const [projDesc, setProjDesc] = useState(
        <ul>
            <h3 className="overrideHeading">File Explorer</h3>
        </ul>

    );

    function handleChange(value) {
        (value === "fileExplorer" ? setSelectedOption(<FileExplorer setPreview={setPreview}/>) : console.log("meow"));
        (value === "xmlToJson" ? setSelectedOption(<XmlToJson />) : console.log("meow"))
    }



    return (
        <div className="container">
            {preview}
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet"></link>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet"></link>

            <article className="overrideArticle">
                <div className="container-fluid">
                    <nav id="nav">
                        <ul>
                            {projDesc}
                        </ul>
                        <ul>
                            <li>
                                Tools
                            </li>
                        </ul>
                        <ul>
                            <li>Select a tool</li>
                            <li>
                                <select onChange={(event) => handleChange(event.target.value)}>
                                    <option value="fileExplorer">File Explorer</option>
                                    <option value="xmlToJson">File Converter</option>
                                </select>
                            </li>
                        </ul>

                    </nav>

                </div>
                <article className="overrideArticle">

                    <div className="container-fluid tool">
                        {/** This is the selected tool */ selectedOption}
                    </div>

                </article>
            </article>

        </div>
    )
}

export default Projects;
