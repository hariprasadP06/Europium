import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();
const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

await prismaClient.person.createMany({
  data: [
    {
      name: "Hari",
      phoneNumber: "7760608031",
    },
    {
      name: "mani",
      phoneNumber: "9901373782",
    },
  ],
});

const persons = await prismaClient.person.findMany();
console.log(persons);


// serve(
//   {
//     fetch: app.fetch,
//     port: 3000,
//   },
//   (info) => {
//     console.log(`Server is running on http://localhost:${info.port}`);
//   }
// );
