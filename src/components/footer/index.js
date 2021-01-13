import React from 'react'
import { Helmet } from 'react-helmet'
import SocialLink from './social-link'
import '../../assets/scss/components/footer/footer.scss'

export default function Footer() {
    return (
        <footer className="Footer">
            <div className="Footer-content">
                <img
                    className="Footer-logo"
                    src={require('../../assets/img/marvel.svg')}
                    alt="Marvel logo"
                />
                <ul className="Footer-links">
                    <SocialLink
                        title="Follow Marvel on Facebook"
                        url="https://www.facebook.com/MarvelLatinoamerica"
                        icon="facebook-f"
                    />

                    <SocialLink
                        title="Follow Marvel on Twitter"
                        url="https://twitter.com/marvel"
                        icon="twitter"
                    />

                    <SocialLink
                        title="Follow Marvel on Instagram"
                        url="https://www.instagram.com/marvel"
                        icon="instagram"
                    />

                    <SocialLink
                        title="Follow Marvel on YouTube"
                        url="https://www.youtube.com/marvel"
                        icon="youtube"
                    />
                </ul>

                <div className="Footer-legalText">©2021 MARVEL</div>
            </div>

            <Helmet>
                <script
                    src="https://kit.fontawesome.com/87131fda1b.js"
                    crossorigin="anonymous"
                ></script>
            </Helmet>
        </footer>
    )
}
