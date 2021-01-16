import httpClient, { buildPath } from './api.service'
const baseUrl = 'stories'

/**
 * Get Story List
 * @param {Object} params
 * @returns {Promise}
 */
export const getStories = (params = {}) => httpClient.get(baseUrl, { params })

/**
 * Retrieve a Story resource by id
 * @param {Number|String} id Story id
 * @param {Object} params Request Params
 * @returns {Promise}
 */
export const getStoryById = (id, params = {}) =>
    httpClient.get(buildPath(baseUrl, id), { params })

/**
 * Retrieve a storie's Characers
 * @param {Number|String} id Story id
 * @param {Object} params Request params
 * @returns {Promise}
 */
export const getStoryCharacters = (id, params = {}) =>
    httpClient.get(buildPath(baseUrl, id, 'characters'), { params })

/**
 * Retrieve a storie's Comics
 * @param {Number|String} id Story id
 * @param {Object} params Request params
 * @returns {Promise}
 */
export const getStoryComics = (id, params = {}) =>
    httpClient.get(buildPath(baseUrl, id, 'comics'), { params })
