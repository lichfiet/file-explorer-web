import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react"; // Make sure to import useState

import FileExplorer from '../components/projects/tools/fileExplorer/fileExplorer'
import XmlToJson from '../components/projects/tools/xmlToJson/xmlToJson'

const Projects = function () {

    const [preview, setPreview] = useState(undefined);

    return (

        <div className="container" style={{
            margin: "auto",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }}>
            {preview}
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet"></link>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet"></link>

            <hgroup>
                <h2 style={{ color: "white" }}>File Explorer</h2>
                <h2></h2>
            </hgroup>
            <article className="overrideArticle">

                <FileExplorer setPreview={setPreview} />

            </article>

        </div>
    )
}

export default Projects;
