# express-starter
NodeJS &amp;  Express &amp; Knex &amp; Async Await &amp; Decorators &amp; PBKDF2

#### Run app in development mode:

```bash
npm run dev
```

#### Run tests:

```bash
npm run test
```

#### Deploy into Docker:

```bash
make deploy
```

#### Add new account
curl -i -X POST -H "Content-Type: application/json" -d '{"email":"email@gmail.com", "password":123}' http://127.0.0.1:8500/api/accounts
