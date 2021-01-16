import React, { Fragment, useEffect, useState } from 'react'
import CharacterComics from '../components/characters/character-comics'
import CharacterCover from '../components/characters/character-cover'
import CharacterStories from '../components/characters/character-stories'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Tabs from '../components/tabs'
import TabPane from '../components/tabs/tabPane'
import { getCharacterById } from '../services/characters.service'

function Character(props) {
    const { location } = props
    const [character, setCharacter] = useState({})

    const queryParams = new URLSearchParams(location.search)
    const characterId = queryParams.get('id')

    useEffect(() => {
        const getCharacterData = async () => {
            const { data } = await getCharacterById(characterId)
            setCharacter(data?.data.results ? data?.data.results[0] : {})
        }

        getCharacterData()
    }, [])

    return (
        <Fragment>
            <Seo title={character?.name} description={character?.description} />

            <Layout useNavBar useFooter>
                <main className="CharacterPage">
                    <CharacterCover character={character} />

                    <section>
                        <Tabs>
                            <TabPane label="Comics">
                                <CharacterComics characterId={characterId} />
                            </TabPane>
                            <TabPane label="Stories">
                                <CharacterStories characterId={characterId} />
                            </TabPane>
                        </Tabs>
                    </section>
                </main>
            </Layout>
        </Fragment>
    )
}

export default Character
