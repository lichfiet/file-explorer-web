const Toggle = ({ func, text1, text2, opt1Param, opt2Param, stateVar }) => {
    return (
        <fieldset>
            <input className="toggle" checked={stateVar === opt1Param ? "checked" : ""} type="radio" id="S3" name="connection-type" onClick={() => { func(opt1Param) }} />
            <label className="toggle-text" htmlFor="S3">{text1}</label>
            <input className="toggle" checked={stateVar === opt2Param ? "checked" : ""} type="radio" id="SFTP" name="connection-type" onClick={() => { func(opt2Param) }} />
            <label className="toggle-text" htmlFor="SFTP">{text2}</label>
        </fieldset>
    )
}

export default Toggle;