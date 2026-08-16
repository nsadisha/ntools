# Ntools

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.5.

## Environment setup

Copy `.env.example` to `.env` and fill in the values from your Appwrite
console (Project Settings, and Database → Collections for the collection
IDs):

```
cp .env.example .env
```

`npm install`, `npm start`, `npm run build`, `npm run watch`, and
`npm test` all regenerate `src/environment/environment.ts` from `.env`
automatically before running — you never edit that file directly.
Production deployments (Netlify) read the same 6 keys from real
environment variables set in the site's dashboard, not from a committed
file.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Last Deployment

[![Netlify Status](https://api.netlify.com/api/v1/badges/c472b568-876e-4397-a135-56a5023b879a/deploy-status)](https://app.netlify.com/sites/ntool/deploys)
