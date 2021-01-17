/**
 * Load favorites from local storage
 * @returns {{
 *  comics: Array<String|Number>,
 *  characters: Array<String|Number>,
 *  stories: Array<String|Number>
 * }}
 */
export const loadData = () => {
    const dataString = window.localStorage.getItem('favorites') || {
        comics: [],
        characters: [],
        stories: [],
    }

    return typeof dataString === 'string' ? JSON.parse(dataString) : dataString
}

const saveData = (payload) =>
    window.localStorage.setItem('favorites', JSON.stringify(payload))

/**
 * Remove value from array
 * @param {Array<Object} data
 * @param {String|Number} value Casted to Number
 */
const removeId = (data, value) =>
    data.filter((item) => Number(item.id) !== Number(value))

/**
 * Add a new favorite
 * @param {Object} Comic Comic object
 */
export const addComic = (comic) => {
    let data = loadData()
    data.comics = [...data.comics, comic]
    saveData(data)
}

export const isComicFavorite = (comicId) => {
    return !!loadData().comics?.find(
        (comic) => Number(comic.id) === Number(comicId)
    )
}

/**
 *
 * @param {String, Number} comicId
 */
export const removeComic = (comicId) => {
    let data = loadData()
    data.comics = removeId(data.comics, comicId)
    saveData(data)
}

/**
 * Add a new favorite
 * @param {String|Number} characterId
 */
export const addCharacter = (characterId) => {
    let data = loadData()
    data.characters = [...data.characters, characterId]
    saveData(data)
}

export const removeCharacter = (characterId) => {
    let data = loadData()
    data.characters = removeId(data.characters, characterId)
    saveData(data)
}

export const isCharacterFavorite = (characterId) => {
    return !!loadData().characters?.find(
        (character) => Number(character.id) === Number(characterId)
    )
}

/**
 * Add a new favorite
 * @param {String|Number} storyId
 */
export const addStory = (storyId) => {
    let data = loadData()
    data.stories = [...data.stories, storyId]
    saveData(data)
}

export const removeStory = (storyId) => {
    let data = loadData()
    data.stories = removeId(data.stories, storyId)
    saveData(data)
}

export const isStoryFavorite = (storyId) => {
    return !!loadData().stories?.find(
        (story) => Number(story.id) === Number(storyId)
    )
}
