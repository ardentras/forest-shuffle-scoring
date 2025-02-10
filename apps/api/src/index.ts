import { Hono } from "hono"

import * as factory from "./game/factory"
import { GameBox } from "./game/types"

const factoryRoutes = new Hono()

factoryRoutes.post('/createGame', async (c) => {
  const body = await c.req.json()
  const gameBoxes: GameBox[] = body["gameBoxes"];
  let game = factory.createGame(gameBoxes);

  return c.json({"id": game.id});
});

const app = new Hono().basePath("/api");

app.route("/factory", factoryRoutes);

// export default app

import { serve } from '@hono/node-server'

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})