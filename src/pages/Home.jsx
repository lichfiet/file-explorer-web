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

            <div className="" style={{
                display: "flex",
                alignItems: "", // Add this line to center the div vertically
                height: "100vh", // Add this line to make the div take up the full height of the viewport
            }}>

                {modal}

                    <div className="container">
                        <FileExplorer setModal={setModal} createPopUpNotif={showPopup} closeModal={closeModal} />
                    </div>
            </div>
        </>
    )
}

export default Home;
