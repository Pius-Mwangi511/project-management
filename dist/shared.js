// Get projects from localStorage
export function getProjects() {
    return JSON.parse(localStorage.getItem('projects') || '[]');
}
// Get users from localStorage
export function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}
