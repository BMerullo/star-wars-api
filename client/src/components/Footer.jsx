const Footer = (props) => {

    // const { title, phone, email } = props

    return (
        <footer>
            <div>
                <h1 className="title">Bob Merullo</h1>
                    <p>bmerullo85@gmail.com</p>
            </div>
            
            <div>
                <ul className="list footer-list">
                <label className="list-label">Connect</label>
                    <li>LinkedIn</li>
                    <li>GitHub</li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;