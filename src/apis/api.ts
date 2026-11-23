const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const fetchSubmissions = async () => {
  const response = await fetch(`${BACKEND_URL}/students`);

  if (!response.ok) {
    throw new Error('Failed to fetch students');
  }

  const result = await response.json();
  return Array.isArray(result) ? result : (result?.data || []);
};

export async function addStudent(data: FormData) {
  const response = await fetch(`${BACKEND_URL}/add-student`, {
    method: 'POST',
    body: data,
  });

  if (!response.ok) {
    throw new Error('Failed to add student');
  }

  return response.json();
}
