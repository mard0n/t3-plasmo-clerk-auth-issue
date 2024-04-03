import { sendToBackground, type PlasmoMessaging } from "@plasmohq/messaging"

import type { RouterInputs, RouterOutputs } from "~/utils/api"

import { client } from ".."

type Request = RouterInputs["post"]["create"]
type Response = RouterOutputs["post"]["create"]

const handler: PlasmoMessaging.MessageHandler<Request, Response> = async (
  req,
  res
) => {
  console.log("createPost bg req.req", req.body)

  const response = await client.post.create.mutate(req.body!)
  res.send(response)
}

export async function createPost(name: string) {
  console.log("createPost", name)

  const res = await sendToBackground<Request, Response>({
    name: "createPost",
    body: { name }
  })

  return res
}

export default handler
