

go to
https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch

select database

npm init -y
npm install prisma typescript tsx @types/node --save-dev

npx tsc --init

go  to   tsconfig.json

search  and replace 
"rootDir": "./src", 

 "outDir": "./dist", 

 npx prisma
 npx prisma init

 go to  .env and replace database  user, password   and dbName (mydb)

 npm i express
 npm i --save-dev @types/express
 npm i ts-node-dev --save-dev
 npm i cors
 npm i --save-dev @types/cors

 create a folder to the root called "src"
 make file  inside src called server.ts


 copy all of this to the server.ts


=>

 import express from 'express'


const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

go to package.json and add this inside script =>    "dev": "ts-node-dev --respawn --transpile-only src/server.ts"

create a file called app.ts  inside src folder


npx prisma migrate dev