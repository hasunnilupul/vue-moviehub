// noinspection JSUnresolvedVariable

const getPosterUrl = (poster_path, size='w500') => {
    return poster_path ? `${api_configuration.images.secure_base_url}${size}${poster_path}` : ''
}

const getBackdropUrl = (backdrop_path, size='w1280') => {
    return backdrop_path ? `${api_configuration.images.secure_base_url}${size}${backdrop_path}` : ''
}

export { getPosterUrl, getBackdropUrl }