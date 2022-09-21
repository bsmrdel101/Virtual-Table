# Virtual-Table
A virtual tabletop fop 5e D&amp;D.

## Installation
- Clone the repo, and do `npm run i`.
- Create an SQL database named `virtual_table`.
    - The database manager I use is Postico, you can get it [here](https://eggerapps.at/postico/).
    - In order to set up you can look at this [guide](https://eggerapps.at/postico/docs/v1.5.21/connect-to-local-postgresql-server.html).
- Copy and run the queries from `database.sql` inside your database manager, in order to set up your tables.
- Create a `.env` file, and put this inside of it:
```
PGUSER="< Your name >"
PGHOST="localhost"
PGPASSWORD=""
PGDATABASE="virtual_table"
PGPORT=5432
SESSION_SECRET=< Random string of characters >
```
_You can generate a session secret [here](https://randomkeygen.com/)_.
- Do `npm run start`
- Go to `http://localhost:3000/register` to create an account.