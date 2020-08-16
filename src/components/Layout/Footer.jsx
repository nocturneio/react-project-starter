import React, {Component} from 'react';
import Logo from "../Logo";

export default class Footer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="footer animated fadeIn delay-0_5s">
                <nav className="navbar container" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <Logo/>
                    </div>

                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start"/>

                        <div className="navbar-end">
                            <a className="navbar-item" href={"YOUR_CGU"} target="_blank">
                                CGU
                            </a>
                        </div>
                    </div>
                </nav>
            </footer>
        );
    }
}
