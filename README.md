# TodoList Task Management Application

This is a simple and practical TodoList task management web application built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Core Features
- **Add New Tasks**: Create new tasks with a title and an optional description.
- **Edit and Delete Tasks**: Modify existing tasks or remove them completely.
- **Mark Complete**: Toggle the completion status of each task.
- **Task List Display**: View all tasks in a clean and organized list, sorted by creation time.

### Bonus Features
- **AI Task Assistant**: Automatically generate task descriptions based on the title using an AI model.
- **Data Statistics Dashboard**: View key statistics, including total tasks, completed tasks, and the overall completion rate.
- **Data Import/Export**: Import tasks from a CSV file and export the current task list to a CSV file.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 15
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **AI**: [LangChain](https://js.langchain.com/) with [Anthropic](https://www.anthropic.com/)

## Local Development

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd my-todo-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root of the project and add the following variables:
   ```
   DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"
   ANTHROPIC_API_KEY="your-anthropic-api-key"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This project is intended to be deployed on [Vercel](https://vercel.com/). Ensure that you have configured the necessary environment variables in your Vercel project settings.