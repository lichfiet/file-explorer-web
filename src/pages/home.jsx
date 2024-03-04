import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react"; // Make sure to import useState

import FileExplorer from '../components/fileExplorer/fileExplorer'

const Home = function () {

    const [modal, setModal] = useState(undefined);

    return (
        <>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet"></link>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet"></link>

            <div className="container" style={{
                margin: "auto",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}>

                {modal}
                <nav>
                    <hgroup>
                        <h2 style={{ color: "white" }}>File Explorer</h2>
                        <p>By Trevor Lichfield</p>

                    </hgroup>
                    <ul>
                        <li><a className="contrast socialMedia outline" href="https://github.com/lichfiet"><i className="socialMediaIcon fab fa-github"></i></a></li>
                        <li><a className="contrast socialMedia outline" href="https://github.com/lichfiet"><i className="socialMediaIcon fab fa-github"></i></a></li>
                        <li><a className="contrast socialMedia outline" href="https://github.com/lichfiet"><i className="socialMediaIcon fab fa-github"></i></a></li>
                        <li><a className="contrast socialMedia outline" href="https://www.linkedin.com/in/tlichfield/"><i className="socialMediaIcon fab fa-linkedin-in"></i></a></li>
                    </ul>

                </nav>

                <article className="overrideArticle">
                    <div className="container-fluid">
                        <FileExplorer setModal={setModal} />
                    </div>
                </article>
            </div>
        </>
    )
}

export default Home;
