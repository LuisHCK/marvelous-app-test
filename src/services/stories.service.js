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
