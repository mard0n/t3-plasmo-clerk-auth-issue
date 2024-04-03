/* eslint-disable @typescript-eslint/no-floating-promises */
import { QueryClient } from "@tanstack/react-query"
import { createTRPCClient, httpBatchLink } from "@trpc/client"
import { createTRPCQueryUtils } from "@trpc/react-query"
import superjson from "superjson"

import { type AppRouter } from "~/server/api/root"

const queryClient = new QueryClient()

export {}
console.log(
  "Live now; make now always the most precious time. Now will never come again."
)

export const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.PLASMO_PUBLIC_BASE_URL}/api/trpc`,
      // You can pass any HTTP headers you wish here
      // async headers() {
      //   return {
      //     authorization: `Bearer ${await getAuthToken()}`,
      //   };
      // },
      transformer: superjson
    })
  ]
})
export const clientUtils = createTRPCQueryUtils({ queryClient, client })
