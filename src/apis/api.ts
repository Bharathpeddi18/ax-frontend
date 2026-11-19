const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8000';





export const fetchSubmissions = async () => {
    const response = await fetch(`${BACKEND_URL}/students`);

    if (!response.ok) {
        throw new Error("Failed to fetch students");
    }

    return response.json();
}

export async function addStudent(data: FormData) {
    const response = await fetch(`${BACKEND_URL}/add-student`, {
        method: 'POST',
        body: data
    });

    if (!response.ok) {
        throw new Error("Failed to add student");
    }

    return response.json();
}