const today = new Date();
const year = today.getFullYear();

function Footer() {
    return <div className="footer">© Clemons {year}</div>
}

export default Footer;
