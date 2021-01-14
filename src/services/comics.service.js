import httpClient, { buildPath } from './api.service'
const baseUrl = 'comics'

/**
 * Get Comic List
 * @param {Object} params
 * @returns {Promise}
 */
export const getComics = (params = {}) => httpClient.get(baseUrl, { params })

/**
 * Retrieve a comic resource by id
 * @param {Number|String} id Comic id
 * @param {Object} params Request Params
 * @returns {Promise}
 */
export const getComicById = (id, params = {}) =>
    httpClient.get(buildPath(baseUrl, id), { params })

/**
 * Retrieve a comic's characters
 * @param {Number|String} id Comic id
 * @param {Object} params Request params
 * @returns {Promise}
 */
export const getComicCharacters = (id, params = {}) =>
    httpClient.get(buildPath(baseUrl, id, 'characters'), { params })

/**
 * Retrieve a comic's creators
 * @param {Number|String} id Comic id
 * @param {Object} params Request params
 * @returns {Promise}
 */
export const getComicCreators = (id, params = {}) =>
    httpClient.get(buildPath(baseUrl, id, 'creators'), { params })

/**
 * Retrieve a comic's stories
 * @param {Number|String} id Comic id
 * @param {Object} params Request params
 * @returns {Promise}
 */
export const getComicStories = (id, params = {}) =>
    httpClient.get(buildPath(baseUrl, id, 'stories'), { params })

/**
 * Retrieve a comic's events
 * @param {Number|String} id Comic id
 * @param {Object} params Request params
 * @returns {Promise}
 */
export const getComicEvents = (id, params = {}) =>
    httpClient.get(buildPath(baseUrl, id, 'events'), { params })
