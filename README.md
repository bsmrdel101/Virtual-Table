# Virtual-Table
A virtual tabletop for 5e D&amp;D.

This is an old repo, checkout [tabletop-of-many-things](https://github.com/bsmrdel101/tabletop-of-many-things)

## Installation
- Clone the repo, and do `npm run i`.
- Setup database with [docker](https://www.docker.com/).
    - Do `npm run docker:setup`
- Create a `.env` file, and put this inside of it:
```
PGUSER="bennett"
PGHOST="localhost"
PGPASSWORD="db"
PGDATABASE="bennett"
PGPORT=5438
```
- Do `npm run start`
- Go to `http://localhost:3000/register` to create an account.
