export const formatDate = (dateString) => {
    const parsedDate = new Date(dateString)

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }

    return isNaN(parsedDate.getTime())
        ? null
        : parsedDate.toLocaleDateString('en-US', options)
}
