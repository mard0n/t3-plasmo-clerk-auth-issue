import React, { useEffect, useState } from "react"

import { fetchPosts } from "../background/messages/fetchPosts"
import type { Post } from "../server/db/schema"

const ContextIndex = () => {
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    fetchPosts()
      .then((posts) => {
        setPosts(posts)
      })
      .catch(console.error)
  }, [])
  return (
    <>
      <h1>Hello from Context</h1>
      <ul>
        {posts.map((post) => {
          return <li key={post.name}>{post.name}</li>
        })}
      </ul>
    </>
  )
}

export default ContextIndex
