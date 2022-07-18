# Stol - useful desktop

[Production environment](https://stol.zhilin.app/)

![Demo](http://g.recordit.co/PkivSz6u9r.gif)

## Features

- Authentication / Demo mode
- Localization (RU / EN)
- Notepad
- Reminders
- User Settings

## Tech Stack

- Typescript
- React
- Redux Toolkit
- Tailwind CSS
- Atlassian Design
- Vite
- Vitest
- Cypress

## Folder structure

- cypress - E2E tests
- src
  - assets - Styles, images, etc.
  - components - UI components shared between features
  - features - App features
    - auth - User authentication
    - localization - App localization
    - notes - Notepad
    - reminders - Reminders
    - settings - User settings
  - services - Shared helpers, services
    - api - API communication
    - dayjs - Date/Time helpers
    - hooks - Shared react hooks
