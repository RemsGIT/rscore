export const getSlug0fGame = (gameName: string) => {
    return gameName.replace(/\s/g, '').replace(/[/'"]/g, '').toLowerCase()
}


