import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p className="footer-title">
                    &copy; {new Date().getFullYear()} UTA Datathon
                </p>
                <p className="footer-subtitle">
                    Designed & developed by{" "}
                    <strong>The UTA Datathon Development Team</strong>
                </p>
                <a
                    href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                >
                    MLH Code of Conduct
                </a>
            </div>
            <div className="footer-spacer"></div>
        </footer>
    );
}