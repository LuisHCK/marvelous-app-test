import React, { Fragment } from 'react'
import Layout from '../components/layout'
import NavBar from '../components/navbar'
import Seo from '../components/seo'

export default function IndexPage() {
    return (
        <Fragment>
            <Layout withNavBar>
                <Seo title="Home Page" />

                <div className="home-page">
                    <h1>Home Page</h1>
                </div>
            </Layout>
        </Fragment>
    )
}
