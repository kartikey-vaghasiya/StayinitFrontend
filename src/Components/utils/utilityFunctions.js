function getFirstImage(props) {
    if (Array.isArray(props.imageUrlArray) && props.imageUrlArray.length > 0) {
        return props.imageUrlArray[0].url;
    } else {
        return undefined;
    }
}

export { getFirstImage, }