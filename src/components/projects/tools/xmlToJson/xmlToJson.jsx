import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; // Make sure to import useState


const XmlToJson = function () {




    return (
        <div className="container-fluid">
            <div className="grid">
                <div>
                    <textarea
                        placeholder="XML" style={{resize: 'none', height: '500px'}}>
                    </textarea>
                </div>
                <div>
                    <textarea placeholder="JSON" readonly style={{resize: 'none', height: '500px'}}>
                    </textarea>
                </div>
            </div>

        </div>
    )
}

export default XmlToJson;