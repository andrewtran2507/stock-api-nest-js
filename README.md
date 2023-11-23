## Description
```bash
An API Check Check Stock from API 3rd
```
Feature list handles
- **API** - **NestJS + Typescript + GraphQL + Mikro-ORM + Postgresql + Alpha Vantage (API 3rd)**
  - GraphQL query stockTimeSeries based on function code
    - TIME_SERIES_INTRADAY
    - TIME_SERIES_DAILY
    - TIME_SERIES_DAILY_ADJUSTED
    - TIME_SERIES_WEEKLY
    - TIME_SERIES_WEEKLY_ADJUSTED
    - TIME_SERIES_MONTHLY
    - TIME_SERIES_MONTHLY_ADJUSTED
    - SYMBOL_SEARCH
    - GLOBAL_QUOTE
    - Handling error
  - query to get Array list of stockTimeSeries based on function code and stock list
    - TIME_SERIES_INTRADAY
    - TIME_SERIES_DAILY
    - TIME_SERIES_DAILY_ADJUSTED
    - TIME_SERIES_WEEKLY
    - TIME_SERIES_WEEKLY_ADJUSTED
    - TIME_SERIES_MONTHLY
    - TIME_SERIES_MONTHLY_ADJUSTED
    - SYMBOL_SEARCH
    - GLOBAL_QUOTE
    - Handling error
  - Post - CRUD with graphQL to check the source code after init can code on
    - Create/Read/Update/Delete
    - Checking migration
    - Checking lint + prettier

## ENV
```bash
NODEJS: v18.14.0
PostgreSQL 14
```

## API setup
```bash
1. git clone <repo>
2. cd stock-api-nest-js
3. yarn # install node_modules then
4. vim .env
# change some config below like your local to the API can connect to your postgres DB
POSTGRES_PORT='your postgres port'
POSTGRES_USER='your postgres user'
POSTGRES_PASSWORD='your postgres password'
5. yarn migration:up # migration run then we can start app, if not please connect to me
6. yarn start:dev
7. HAPPY CODING
```

## Planning
```bash
https://docs.google.com/document/d/1Zs7XKEDe7fisY87HwftIm9tfBCSqRbuTHdCXfoal2hU/edit
```

## API App
**Project Structure**
![Screenshot](public/demo/code-structure.png?raw=true)

**Get list stock**
![Screenshot](public/demo/call-get-stock-1.png?raw=true)

**Validate wrong input**
![Screenshot](public/demo/call-get-error-stock-2.png?raw=true)

**Create a post**
![Screenshot](public/demo/create-a-post.png?raw=true)

**DD Show**
![Screenshot](public/demo/db-show.png?raw=true)


## Stay in touch

*- Author - Andrew.Tran*
