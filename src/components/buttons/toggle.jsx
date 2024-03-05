const Toggle = ({ func, text1, text2, opt1Param, opt2Param, stateVar }) => {
    return (
        <fieldset>
            <input className="toggle" defaultChecked={stateVar === opt1Param ? "true" : ""} type="radio" id="S3" name="connection-type" onClick={() => { func(opt1Param) }} />
            <label className="toggle-text" htmlFor="S3">{text1}</label>
            <input className="toggle" defaultChecked={stateVar === opt2Param ? "true" : ""} type="radio" id="SFTP" name="connection-type" onClick={() => { func(opt2Param) }} />
            <label className="toggle-text" htmlFor="SFTP">{text2}</label>
        </fieldset>
    )
}

export default Toggle;