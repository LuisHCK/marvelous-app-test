import React, { Fragment, useEffect, useState } from 'react'
import Seo from '../components/seo'
import Layout from '../components/layout'
import { getComicById } from '../services/comics.service'
import ComicPageCover from '../components/comics/comic-page-cover'
import Tabs from '../components/tabs'
import TabPane from '../components/tabs/tabPane'
import ComicCharacters from '../components/comics/comic-characters'
import ComicStories from '../components/comics/comic-stories'
import ComicImages from '../components/comics/comic-images'

export default function Comic(props) {
    const { location } = props
    const [comic, setComic] = useState({})

    const queryParams = new URLSearchParams(location.search)
    const comicId = queryParams.get('id')

    useEffect(() => {
        const getComicData = async () => {
            const { data } = await getComicById(comicId)
            setComic(data?.data.results ? data?.data.results[0] : {})
        }

        getComicData()
    }, [comicId])

    return (
        <Fragment>
            <Seo
                title={comic?.title}
                description={comic?.description?.slice(0, 90)}
            />

            <Layout useNavBar useFooter>
                <main className="ComicPage">
                    <ComicPageCover comic={comic} />

                    <section>
                        <Tabs>
                            <TabPane label="Characters">
                                <ComicCharacters comicId={comicId} />
                            </TabPane>

                            <TabPane label="Stories">
                                <ComicStories comicId={comicId} />
                            </TabPane>

                            <TabPane label="Images">
                                <ComicImages
                                    images={comic?.images}
                                    description={comic?.title}
                                />
                            </TabPane>
                        </Tabs>
                    </section>
                </main>
            </Layout>
        </Fragment>
    )
}
