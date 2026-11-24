
export const fetchSectionMetaData = async () => {
    const response = await fetch('./sample/metadata/sections.json')

    if(!response.ok){
        throw new Error('Unable to fetch Section Metadata')
    }

    const fetchedData = await response.json()

    return fetchedData
}