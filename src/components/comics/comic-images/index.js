import React from 'react'
import PropTypes from 'prop-types'
import NoContent from '../../no-content'

function ComicImages(props) {
    const { images } = props

    const renderImages = () =>
        images.map((image, index) => (
            <div key={'comic-image-' + index} className="ImageContainer">
                <img
                    src={`${image.path}.${image.extension}`}
                    alt="Comic image"
                />
            </div>
        ))

    const renderNoContent = () => (!images?.length ? <NoContent /> : null)

    return (
        <div className="ContentRow">
            {renderImages()}

            {renderNoContent()}
        </div>
    )
}

ComicImages.propTypes = {
    images: PropTypes.array,
}

export default ComicImages
