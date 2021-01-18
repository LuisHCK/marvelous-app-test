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
import InfiniteScroll from 'react-infinite-scroll-component'
import NoContent from '../components/no-content'

const coverURL = `https://terrigen-cdn-dev.marvel.com/content/prod/1x/011blw-com_mas_dsk_02.jpg`

let loadNextTimeout

function Stories() {
    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({ orderBy: '-modified' })
    const [offset, setOffset] = useState(0)
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        const getStoriesData = async () => {
            setLoading(true)
            setHasMore(true)

            try {
                const { data } = await getStories({ ...filters, offset })
                setStories((prev) => [...prev, ...data?.data?.results])
            } catch (error) {
                setLoading(false)
                setHasMore(false)

                console.error(error)
            }

            setLoading(false)
        }

        getStoriesData()
    }, [filters, offset])

    const handleFilters = ({ field, value }) => {
        if (value && value !== 'all') {
            setStories([])
            setOffset(0)
            setFilters({ [field]: value })
        } else {
            setFilters({})
        }
    }

    const handleNext = () => {
        setHasMore(false)

        clearTimeout(loadNextTimeout)

        loadNextTimeout = setTimeout(() => {
            setOffset((prev) => prev + 20)
        }, 500)
    }

    const renderStoriesCards = () => (
        <section className="ContentScroll" id="stories-scroll">
            <InfiniteScroll
                dataLength={stories.length}
                next={handleNext}
                hasMore={hasMore}
                loader={<Spinner />}
                className="Page"
                scrollableTarget="stories-scroll"
            >
                <section className="ContentRow">
                    {stories.map((story, index) => (
                        <StoryCard
                            key={'new-story-' + index}
                            id={story.id}
                            name={story.title}
                            thumbnail={getThumbnailURL(story.thumbnail)}
                            comics={story.comics?.items}
                        />
                    ))}
                </section>
            </InfiniteScroll>
        </section>
    )

    const renderNoContent = () =>
        !loading && !stories.length ? <NoContent /> : null

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

                    <div className="Centered">{renderNoContent()}</div>
                    {renderStoriesCards()}
                </main>
            </Layout>
        </Fragment>
    )
}

export default Stories

const sortOptions = [{ value: 'modified', label: 'Modified' }]
