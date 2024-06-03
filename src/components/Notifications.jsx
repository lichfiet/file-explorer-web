import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

export const notify = (message, type = "default") => {
    switch(type) {
        case "error":
            toast.error(message);
            break;
        case "success":
            toast.success(message);
            break;
        case "info":
            toast.info(message);
            break;
        case "warn":
            toast.warn(message);
            break;
        default:
            toast(message);
    }
}

const CloseButton = ({ closeToast }) => {
    return (
        <>
        <i onClick={closeToast} className='fa fa-solid fa-x'></i>
        </>
    );

}

const Notification = () => {
    return (
        <ToastContainer 
            className="toastContainerCustom"
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false} 
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            closeButton={CloseButton}
        />
    );
}

export default Notification;