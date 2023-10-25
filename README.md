# gitpusher

![gitpusher-screenshot](https://github.com/abdeltif-b/gitpusher/assets/60190704/aa0d0316-be3f-48fb-b848-47d4434d690f)
GitPusher is a simple application that engages with your GitHub account post-sign-in using the GitHub API.

## About the task

GitPusher tries to answer this challenge:

```
Write a javascript app which interacts with the Github API and does the following:
- authenticates itself with your github account and displays your username in the rendered page
- lists all repositories in your account in the rendered page
- prompts you to select a repository, upon which it fetches all files in the repo and logs their names to the console
- randomly selects one file from the repo, fetches its contents, prepends "Komment Demo Task" to its top, and pushes it back to the repo
- display a success (or failed) message on the rendered page once push is successful
```

## Technologies Used

GitPusher is built using:

- **Next.js:** A React framework for building web applications, this project uses App Routes structure.
- **TypeScript:** A statically-typed superset of JavaScript.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Shadcn:** A UI component library.
- **NextAuth:** An authentication library for secure authentication.

## Preview

You can visit the application at [https://gitpusher.vercel.app/](https://gitpusher.vercel.app/).

## Getting Started

If you'd like to run this project locally, follow these steps:

1. Clone this repository to your local machine.

   ```bash
   git clone https://github.com/abdeltif-b/gitpusher.git
   ```

2. Install project dependencies:
   ```bash
     npm install
     # or
     yarn install
   ```
3. Set up the environment variables for the services utilized, and refer to the [.env.example](https://github.com/abdeltif-b/gitpusher/blob/master/.env.example) file for guidance.
4. Start the development server:

   ```bash
     npm run dev
     # or
     yarn dev
   ```

5. Open your browser and navigate to http://localhost:3000 to interact with the application.

## [Self NOTES] Potential Enhancements (Beyond Task Requirements)

- Implement pagination for the repositories list (e.g. a case where a user have large number of repositories).
- Allow users to choose a specific branch when fetching files from a repository (currently fetching from the default branch only).
- Test edge cases like:
  - Fetching repository with significant files
  - Fetching file content with significant size.
- Include private repositories (requires additional access privileges).
- Expand the test coverage for GitHub API interactions.
- Utilize Parallel Routes for managing distinct content within the same layout.
- Note that repository files data is currently fetched for all repositories during the initial page load and cached for later use, which may or may not be suitable for scenarios involving users with numerous GitHub projects.
