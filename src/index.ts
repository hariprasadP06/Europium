import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();
const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/person", async (c) => {
  const person = await prismaClient.person.findMany();
  return c.json({ person }, 200);
});

// serve(
//   {
//     fetch: app.fetch,
//     port: 3000,
//   },
//   (info) => {
//     console.log(`Server is running on http://localhost:${info.port}`);
//   }
// );
app.post("/person", async (c) => {
  const { name, phoneNumber } = await c.req.json();

  const persons = await prismaClient.person.create({
    data: {
      name,
      phoneNumber,
    },
  });
  return c.json(persons, 201);
});

app.patch("/person/:phoneNumber", async (c) => {
  const { phoneNumber } = c.req.param();
  const { name } = await c.req.json();

  const persons = await prismaClient.person.update({
    where: {
      phoneNumber,
    },
    data: {
      name,
    },
  });

  return c.json(persons, 200);
});

app.delete("/person/:phoneNumber", async (c) => {
  const { phoneNumber } = c.req.param();
  const persons = await prismaClient.person.delete({
    where: {
      phoneNumber,
    },
  });

  return c.json({ persons }, 200);
});

console.log("Server is running on http://localhost:3000");
serve(app);
