export interface Project {
    id: string;
    name: string;
    description: string;
    endDate: string;
  }
  
  export interface Assignment {
    userEmail: string;
    projectId: string;
    status: 'assigned' | 'completed';
  }
  
  export interface User {
    email: string;
    firstName: string;
    lastName: string;
  }
  
  // Get projects from localStorage
  export function getProjects(): Project[] {
    return JSON.parse(localStorage.getItem('projects') || '[]');
  }
  
  // Get users from localStorage
  export function getUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }