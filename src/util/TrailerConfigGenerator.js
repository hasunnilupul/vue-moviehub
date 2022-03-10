export const getTrailerData = (trailer) => {
    let data = trailer
    if (data.key) {
        switch (data.site) {
            case 'YouTube':
                data.url = `https://www.youtube.com/watch?v=${data.key}`
                data.embeded_url = `https://www.youtube.com/embed/${data.key}`
                data.poster = `https://img.youtube.com/vi/${data.key}/maxresdefault.jpg`
                break;
        }
    }
    return data
}