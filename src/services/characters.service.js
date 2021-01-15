import httpClient, { buildPath } from './api.service'
const baseUrl = 'characters'

/**
 * Get Character List
 * @param {Object} params
 * @returns {Promise}
 */
export const getCharacters = (params = {}) =>
    httpClient.get(baseUrl, { params })

/**
 * Retrieve a Character resource by id
 * @param {Number|String} id Character id
 * @param {Object} params Request Params
 * @returns {Promise}
 */
export const getCharacterById = (id, params = {}) =>
    httpClient.get(buildPath(baseUrl, id), { params })
