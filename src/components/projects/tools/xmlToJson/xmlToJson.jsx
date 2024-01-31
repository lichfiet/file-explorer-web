const XmlToJson = function () {
    
    return (
        <div className="container-fluid">
            <div className="toolsContainer">
                <div className="grid">
                    <div>
                        <textarea
                            placeholder="XML" style={{ resize: 'none', height: '500px' }} className="xmlToJsonInput">
                        </textarea>
                    </div>
                    <div>
                        <textarea placeholder="JSON" readonly style={{ resize: 'none', height: '500px' }} className="xmlToJsonInput">
                        </textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default XmlToJson;