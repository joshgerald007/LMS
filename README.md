# LMS (Learning Management System) for PMFTCI

System Requirements:

- Vue JS 3
- Node 20.4.0
- npm 9.6.6
- quasar 2.2.0

### How to setup local dev environment

- Install NodeJS 20.x or later and the npm 9.x locally
- Install quasar 2.2.0 `npm global add @quasar/cli`
- Clone Git Repository
- Install local JS Dependencies `npm install`

### How to start dev environment

- `quasar dev`

### Configure IDE (JetBrains / Sublime / VS Code / WebStorm)

- Install and enable Prettier plugin, use local prettier package and enable
  **On save** setting
- Install and enable eslint

### Contributing Code

- Please ensure that all files that have been changed, have been run through
  **prettier** before committing them to git.

### How to build and deploy

- Update the .env file for the API endpoint on backend
- `quasar build`
- copy the output folder on the prod server `dist/spa`

### ENV

- .env
- API_URL: variable use for the API endpoint on backend
