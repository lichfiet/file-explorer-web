import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react"; // Make sure to import useState

import FileExplorer from '../components/FileExplorer/FileExplorer.jsx'
import Notification, { notify } from '../components/Notifications/Notifications.jsx';

const Home = function () {

    const [modal, setModal] = useState(undefined);

    const closeModal = () => {
        setModal(undefined);
    }

    const showPopup = (message, type) => {
        notify(message, type);
    }

    return (
        <>
            <Notification />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet"></link>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet"></link>

            <div className="container" style={{
                margin: "auto",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingTop: "5vh"
            }}>

                {modal}

                <article className="overrideArticle">
                    <div className="container-fluid">
                        <FileExplorer setModal={setModal} createPopUpNotif={showPopup} closeModal={closeModal} />
                    </div>
                </article>
            </div>
        </>
    )
}

export default Home;
