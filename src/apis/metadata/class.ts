
export const fetchClassMetaData = async () => {
    const response = await fetch('./sample/metadata/classes.json')

    if(!response.ok){
        throw new Error('Unable to fetch Classes Metadata')
    }

    const fetchedData = await response.json()

    return fetchedData
}