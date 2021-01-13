import React, { Fragment } from "react";
import PropTYpes from 'prop-types'

export default function Layout(props) {
    return (
        <Fragment>
            <main className="main">{props.children}</main>
        </Fragment>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};
