# webpack-graphql-server
Starter kit for apollo graphql server using webpack and typescript

What does it include:
----
    1. exported schema as example for GraphQL Schema
    2. Working Apollo Server (webpack + tslint + tsloader)
    3. Typescript 2.6.1 => ES6
    4. Dockerfile to make the graphql-server a container.
    5. unit testing (jest) + coverage report (jest --coverage).
    6. working with graphql-tools
    7. standard-version for auto SemVer.

Notes
----
Please note that you will need to rename the library name in some files:

    1. package.json (ofcourse ;))

Useful commands:
----
    npm run build       - build the library files (Required for start:watch)
    npm run build:watch - build the library files in watchmode (Useful for development)
    npm start           - Start the server
    npm run start:watch - Start the server in watchmode (Useful for development)
    npm test            - run tests once
    npm run test:watch  - run tests in watchmode (Useful for development)
    npm run test:growl  - run tests in watchmode with growl notification (even more useful for development)
    npm run upver       - runs standard-version to update the server version.

How to run it:
----
```bash
    npm start
```

Files explained:
----
    1. src                         - directory is used for typescript code that is part of the project
        1a. main.ts                - Main server file. (Starting Apollo server)
        1b. main.spec.ts           - Tests file for main
        1c. service                - Module used to build schema
            - index.ts             - simple logic to merge all modules into a schema using graphql-tools
        1d. schema.spec.ts         - Basic test for schema.
        1e. main.test.ts           - Main for tests runner.
        1f. config                 - directory contains server config files
        1g. database               - directory contains database conectors files
        1.h util                   - directory contains utils files
    3. package.json                - file is used to describe the library
    4. tsconfig.json               - configuration file for the library compilation
    6. tslint.json                 - configuration file for the linter
    7. typings.json                - typings needed for the server
    8. webpack.config.js           - configuration file of the compilation automation process for the library
    9. webpack.config.test.js      - configuration file of the compilation when testing
    

Output files explained:
----
    1. node_modules - directory npm creates with all the dependencies of the module (result of npm install)
    2. dist         - directory contains the compiled server (javascript)
    3. html-report  - output of npm test, code coverage html report.

