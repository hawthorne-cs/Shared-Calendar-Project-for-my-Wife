# Shared Calendar Project

A platform where friends, couples, companies, or groups can share their calendars and schedule events together.

## Project Structure

This project is organized into a frontend and backend directory structure:

```
/
├── frontend/           # Next.js frontend
│   ├── src/            # Frontend source code
│   │   ├── app/        # Next.js app router
│   │   ├── components/ # React components
│   │   ├── lib/        # Frontend utilities
│   │   └── styles/     # CSS and styling files
│   ├── public/         # Static assets
│   ├── package.json    # Frontend dependencies
│   └── ...             # Other frontend config files
│
├── backend/            # Express API backend
│   ├── src/            # Backend source code
│   │   ├── controllers/ # API controllers
│   │   ├── models/     # Data models
│   │   ├── routes/     # API routes
│   │   ├── middleware/ # Express middleware
│   │   └── utils/      # Backend utilities
│   ├── prisma/         # Prisma database schema and migrations
│   ├── package.json    # Backend dependencies
│   └── ...             # Other backend config files
│
└── ... 
```