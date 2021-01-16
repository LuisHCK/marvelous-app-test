import React, { Fragment, useEffect, useState } from 'react'
import StoryCard from '../components/stories/story-card'
import Filter from '../components/filter'
import Layout from '../components/layout'
import PageCover from '../components/page-cover'
import Seo from '../components/seo'
import Spinner from '../components/spinner'
import { getStories } from '../services/stories.service'
import '../assets/scss/pages/stories/stories.scss'
import { getThumbnailURL } from '../utils/thumbnails'

const coverURL = `https://terrigen-cdn-dev.marvel.com/content/prod/1x/011blw-com_mas_dsk_02.jpg`

function Stories() {
    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({orderBy: '-modified'})

    useEffect(() => {
        const getStoriesData = async () => {
            setStories([])
            setLoading(true)
            const { data } = await getStories({ ...filters })

            setStories(data?.data?.results)
            setLoading(false)
        }

        getStoriesData()
    }, [filters])

    const handleFilters = ({ field, value }) => {
        if (value && value !== 'all') {
            setFilters({ [field]: value })
        } else {
            setFilters({})
        }
    }

    const renderStoriesCards = () =>
        stories.map((story, index) => (
            <StoryCard
                key={'new-story-' + index}
                id={story.id}
                name={story.title}
                thumbnail={getThumbnailURL(story.thumbnail)}
                comics={story.comics?.items}
            />
        ))

    const renderSpinner = () => (loading ? <Spinner /> : null)

    return (
        <Fragment>
            <Seo title="Stories" />
            <Layout useNavBar useFooter>
                <PageCover image={coverURL}>
                    <h1>Marvel Stories</h1>
                </PageCover>

                <main className="Page">
                    <section>
                        <div className="StoriesPage-header">
                            <h2>Stories List</h2>

                            <div className="StoriesPage-controls">
                                <Filter
                                    onSelect={handleFilters}
                                    options={sortOptions}
                                    label="Sort by"
                                    field="orderBy"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="ContentRow">
                        {renderSpinner()}

                        {renderStoriesCards()}
                    </section>
                </main>
            </Layout>
        </Fragment>
    )
}

export default Stories

const sortOptions = [{ value: 'modified', label: 'Modified' }]
