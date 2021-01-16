import React from 'react'
import Layout from '../components/layout'
import '../assets/scss/pages/not-found/not-found.scss'

export default function NotFoundPage() {
    return (
        <Layout useNavBar useFooter>
            <main className="NotFoundPage">
                <div className="NotFoundPage-info">
                    <h1>404 PAGE NOT FOUND</h1>
                    <p>Check that you typed the address correctly,</p>

                    <p>
                        go back to your previous page or try using our site
                        search to find something specific.
                    </p>
                </div>

                <div className="NotFoundPage-image"></div>
            </main>
        </Layout>
    )
}
