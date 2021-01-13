import React, { Fragment } from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'

export default function IndexPage() {
    return (
        <Fragment>
            <Layout useNavBar useFooter>
                <Seo title="Home Page" />

                <main className="Page">
                    <h1>Home Page</h1>
                </main>
            </Layout>
        </Fragment>
    )
}
