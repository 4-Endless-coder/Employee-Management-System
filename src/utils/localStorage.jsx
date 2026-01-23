const employees = [
  {
    "id": 1,
    "firstName": "Arjun",
    "email": "e1@e.com",
    "password": "123",
    "taskCounts": { "active": 2, "newTask": 1, "completed": 1, "failed": 0 },
    "tasks": [
      {
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false,
        "taskTitle": "UI Redesign",
        "taskDescription": "Redesign the dashboard homepage.",
        "taskDate": "2024-02-20",
        "category": "Design"
      },
      {
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false,
        "taskTitle": "Client Meeting",
        "taskDescription": "Discuss project requirements.",
        "taskDate": "2024-02-18",
        "category": "Meeting"
      },
      {
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false,
        "taskTitle": "Fix Navbar",
        "taskDescription": "Navbar not collapsing on mobile.",
        "taskDate": "2024-02-22",
        "category": "Development"
      }
    ]
  },
  {
    "id": 2,
    "firstName": "Sneha",
    "email": "employee2@example.com",
    "password": "123",
    "taskCounts": { "active": 1, "newTask": 0, "completed": 1, "failed": 0 },
    "tasks": [
      {
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false,
        "taskTitle": "DB Optimization",
        "taskDescription": "Optimize SQL queries.",
        "taskDate": "2024-02-19",
        "category": "Database"
      },
      {
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false,
        "taskTitle": "Design System",
        "taskDescription": "Update color palette.",
        "taskDate": "2024-02-15",
        "category": "Design"
      }
    ]
  },
  {
    "id": 3,
    "firstName": "Ravi",
    "email": "employee3@example.com",
    "password": "123",
    "taskCounts": { "active": 2, "newTask": 1, "completed": 1, "failed": 0 },
    "tasks": [
      {
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false,
        "taskTitle": "Onboarding Flow",
        "taskDescription": "Design user onboarding screens.",
        "taskDate": "2024-02-25",
        "category": "UX Design"
      },
      {
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false,
        "taskTitle": "API Docs",
        "taskDescription": "Document new API endpoints.",
        "taskDate": "2024-02-23",
        "category": "Documentation"
      },
      {
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false,
        "taskTitle": "Code Review",
        "taskDescription": "Review authentication PRs.",
        "taskDate": "2024-02-12",
        "category": "Development"
      }
    ]
  },
  {
    "id": 4,
    "firstName": "Priya",
    "email": "employee4@example.com",
    "password": "123",
    "taskCounts": { "active": 2, "newTask": 1, "completed": 0, "failed": 0 },
    "tasks": [
      {
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false,
        "taskTitle": "Social Assets",
        "taskDescription": "Create marketing banners.",
        "taskDate": "2024-02-26",
        "category": "Marketing"
      },
      {
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false,
        "taskTitle": "Footer Update",
        "taskDescription": "Update footer links.",
        "taskDate": "2024-02-21",
        "category": "Design"
      }
    ]
  },
  {
    "id": 5,
    "firstName": "Karan",
    "email": "employee5@example.com",
    "password": "123",
    "taskCounts": { "active": 2, "newTask": 1, "completed": 1, "failed": 0 },
    "tasks": [
      {
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false,
        "taskTitle": "Unit Testing",
        "taskDescription": "Write tests for user service.",
        "taskDate": "2024-02-27",
        "category": "QA"
      },
      {
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false,
        "taskTitle": "Performance Audit",
        "taskDescription": "Run Lighthouse checks.",
        "taskDate": "2024-02-24",
        "category": "Analysis"
      },
      {
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false,
        "taskTitle": "Team Lunch",
        "taskDescription": "Organize monthly lunch.",
        "taskDate": "2024-02-01",
        "category": "HR"
      }
    ]
  }
];

const admin = [
  {
    "id": 1,
    "email": "admin@me.com", 
    "password": "123"
  }
];

export const setLocalStorage = () => {
    if (!localStorage.getItem('employees')) {
        localStorage.setItem('employees', JSON.stringify(employees));
    }
    if (!localStorage.getItem('admin')) {
        localStorage.setItem('admin', JSON.stringify(admin));
    }
}

export const getLocalStorage = () => {
    const employees = JSON.parse(localStorage.getItem('employees'));
    const admin = JSON.parse(localStorage.getItem('admin'));

    return { employees, admin };
}