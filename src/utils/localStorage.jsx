const employees = [
  {
    "id": 1,
    "firstName": "Arjun",
    "email": "e1@e.com",
    "password": "123",
    "taskCounts": {
      "active": 1,
      "newTask": 1,
      "completed": 1,
      "failed": 0
    },
    "tasks": [
      {
        "active": false,
        "newTask": true,
        "completed": false,
        "failed": false,
        "taskTitle": "UI Redesign",
        "taskDescription": "Redesign the dashboard homepage using Tailwind CSS.",
        "taskDate": "2026-02-15",
        "category": "Design"
      },
      {
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false,
        "taskTitle": "Client Meeting",
        "taskDescription": "Discuss project requirements with the client.",
        "taskDate": "2026-01-20",
        "category": "Meeting"
      },
      {
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false,
        "taskTitle": "Fix Navigation Bug",
        "taskDescription": "Navbar not collapsing on mobile devices.",
        "taskDate": "2026-02-05",
        "category": "Development"
      }
    ]
  },
  {
    "id": 2,
    "firstName": "Sneha",
    "email": "employee2@example.com",
    "password": "123",
    "taskCounts": {
      "active": 1,
      "newTask": 0,
      "completed": 1,
      "failed": 1
    },
    "tasks": [
      {
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false,
        "taskTitle": "Database Optimization",
        "taskDescription": "Optimize SQL queries for better performance.",
        "taskDate": "2026-02-10",
        "category": "Database"
      },
      {
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false,
        "taskTitle": "Design System Update",
        "taskDescription": "Update the color palette in the design system.",
        "taskDate": "2026-01-25",
        "category": "Design"
      },
      {
        "active": false,
        "newTask": false,
        "completed": false,
        "failed": true,
        "taskTitle": "API Integration",
        "taskDescription": "Integrate the payment gateway API.",
        "taskDate": "2026-01-15",
        "category": "Backend"
      }
    ]
  },
  {
    "id": 3,
    "firstName": "Ravi",
    "email": "employee3@example.com",
    "password": "123",
    "taskCounts": {
      "active": 2,
      "newTask": 1,
      "completed": 1,
      "failed": 0
    },
    "tasks": [
      {
        "active": false,
        "newTask": true,
        "completed": false,
        "failed": false,
        "taskTitle": "Create User Onboarding",
        "taskDescription": "Design the user onboarding flow screens.",
        "taskDate": "2026-02-20",
        "category": "UX Design"
      },
      {
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false,
        "taskTitle": "Write Documentation",
        "taskDescription": "Document the API endpoints for the new module.",
        "taskDate": "2026-02-08",
        "category": "Documentation"
      },
      {
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false,
        "taskTitle": "Code Review",
        "taskDescription": "Review the pull requests for the authentication module.",
        "taskDate": "2026-01-22",
        "category": "Development"
      }
    ]
  },
  {
    "id": 4,
    "firstName": "Priya",
    "email": "employee4@example.com",
    "password": "123",
    "taskCounts": {
      "active": 1,
      "newTask": 1,
      "completed": 0,
      "failed": 1
    },
    "tasks": [
      {
        "active": false,
        "newTask": true,
        "completed": false,
        "failed": false,
        "taskTitle": "Social Media Assets",
        "taskDescription": "Create banners for the upcoming marketing campaign.",
        "taskDate": "2026-02-18",
        "category": "Marketing"
      },
      {
        "active": false,
        "newTask": false,
        "completed": false,
        "failed": true,
        "taskTitle": "Server Migration",
        "taskDescription": "Migrate the production server to AWS.",
        "taskDate": "2026-01-10",
        "category": "DevOps"
      },
      {
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false,
        "taskTitle": "Footer Redesign",
        "taskDescription": "Update the footer links and layout.",
        "taskDate": "2026-02-12",
        "category": "Design"
      }
    ]
  },
  {
    "id": 5,
    "firstName": "Karan",
    "email": "employee5@example.com",
    "password": "123",
    "taskCounts": {
      "active": 2,
      "newTask": 1,
      "completed": 1,
      "failed": 0
    },
    "tasks": [
      {
        "active": false,
        "newTask": true,
        "completed": false,
        "failed": false,
        "taskTitle": "Unit Testing",
        "taskDescription": "Write unit tests for the user service.",
        "taskDate": "2026-02-25",
        "category": "QA"
      },
      {
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false,
        "taskTitle": "Performance Audit",
        "taskDescription": "Run Lighthouse performance checks on the homepage.",
        "taskDate": "2026-02-14",
        "category": "Analysis"
      },
      {
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false,
        "taskTitle": "Team Lunch",
        "taskDescription": "Organize the monthly team lunch.",
        "taskDate": "2026-01-28",
        "category": "HR"
      }
    ]
  }
];

const admin = [
  {
    "id": 1,
    "firstName": "Ashesh",
    "email": "admin@me.com",
    "password": "123"
  }
];

export const setLocalStorage = () => {
    localStorage.setItem('employees', JSON.stringify(employees));
    localStorage.setItem('admin', JSON.stringify(admin));
}

export const getLocalStorage = () => {
    const employees = JSON.parse(localStorage.getItem('employees'));
    const admin = JSON.parse(localStorage.getItem('admin'));

    return { employees, admin };
}