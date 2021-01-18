const NO_SCROLL_CLASS = 'no-scroll'

/**
 * Disable body scroll
 */
export const disableBodyScroll = () => {
    const body = document.body
    body.classList.add(NO_SCROLL_CLASS)
}

/**
 * Restory body scroll
 */
export const restoreBodyScroll = () => {
    const body = document.body
    body.classList.remove(NO_SCROLL_CLASS)
}
