import { sendToBackground, type PlasmoMessaging } from "@plasmohq/messaging"

import type { RouterInputs, RouterOutputs } from "~/utils/api"

import { clientUtils } from ".."

export type Request = RouterInputs["post"]["getAll"]
export type Response = RouterOutputs["post"]["getAll"]

const handler: PlasmoMessaging.MessageHandler<Request, Response> = async (
  req,
  res
) => {
  const response = await clientUtils.post.getAll.fetch()
  res.send(response)
}

export async function fetchPosts() {
  const res = await sendToBackground<Request, Response>({
    name: "fetchPosts"
  })

  return res
}

export default handler
