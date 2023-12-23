export function NavBar() {
    return (
        <nav id="nav">
            <ul>
                <li><strong>Trevor's Epic Website</strong></li>
            </ul>
            <ul>
                <li>Select A Tool</li>
                <li>
                    <select>            
                        <option>File Converter</option>
                        <option>…</option>
                        <option>…</option>
                    </select>
                </li>
            </ul>
        </nav>
    )
};

export default NavBar();