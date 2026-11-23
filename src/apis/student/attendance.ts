
export const fetchStudentAttendanceData = async () => {
    const response = await fetch('./sample/student-attendance.json')

    if(!response.ok){
        throw new Error('Unable to fetch Student Attendance Data')
    }

    const fetchedData = await response.json()

    return fetchedData
}