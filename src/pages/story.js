import React, { Fragment, useEffect, useState } from 'react'
import { getStoryById } from '../services/stories.service'
import Seo from '../components/seo'
import StoryCover from '../components/stories/story-cover'
import Layout from '../components/layout'
import StoryCharacters from '../components/stories/story-characters'
import Tabs from '../components/tabs'
import TabPane from '../components/tabs/tabPane'
import StoryComics from '../components/stories/story-comics'

function Story(props) {
    const { location } = props
    const [story, setStory] = useState({})

    const queryParams = new URLSearchParams(location.search)
    const storyId = queryParams.get('id')

    useEffect(() => {
        const getStoryData = async () => {
            const { data } = await getStoryById(storyId)
            setStory(data?.data.results ? data?.data.results[0] : {})
        }

        getStoryData()
    }, [storyId])
    return (
        <Fragment>
            <Seo title={story?.title} description={story?.description} />

            <Layout useNavBar useFooter>
                <main className="StoryPage">
                    <StoryCover story={story} />

                    <section>
                        <Tabs>
                            <TabPane label="Comics">
                                <StoryComics storyId={storyId} />
                            </TabPane>
                            <TabPane label="Characters">
                                <StoryCharacters storyId={storyId} />
                            </TabPane>
                        </Tabs>
                    </section>
                </main>
            </Layout>
        </Fragment>
    )
}

export default Story
