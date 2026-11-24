
export const fetchStudentMasterData = async () => {
    const response = await fetch('./sample/student-master.json')

    if(!response.ok){
        throw new Error('Unable to fetch Student Master Data')
    }

    const fetchedData = await response.json()

    return fetchedData
}