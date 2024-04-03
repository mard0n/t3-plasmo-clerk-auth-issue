import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp
} from "@clerk/chrome-extension"
import React, { useEffect, useState } from "react"
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom"

import { fetchPosts } from "./background/messages/fetchPosts"
import type { Post } from "./server/db/schema"

const PopupIndex = () => {
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
      <h1>Hello from Popup</h1>
      <ul>
        {posts.map((post) => {
          return <li key={post.name}>{post.name}</li>
        })}
      </ul>
    </>
  )
}

function ClerkProviderWithRoutes() {
  const navigate = useNavigate()
  // const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ""}
      navigate={(to) => navigate(to)}>
      <div className="App">
        <main className="App-main">
          <Routes>
            <Route path="/sign-up/*" element={<SignUp signInUrl="/" />} />
            <Route
              path="/"
              element={
                <>
                  <SignedIn>
                    <PopupIndex />
                  </SignedIn>
                  <SignedOut>
                    <SignIn
                      afterSignInUrl="chrome-extension://dbdkcndcpijgjbdiigjgljbhpfoghooh/tabs/welcome-auth.html"
                      signUpUrl="/sign-up"
                    />
                  </SignedOut>
                </>
              }
            />
          </Routes>
        </main>
      </div>
    </ClerkProvider>
  )
}

function App() {
  return (
    <MemoryRouter>
      <ClerkProviderWithRoutes />
    </MemoryRouter>
  )
}

export default App
