import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  UserButton
} from "@clerk/chrome-extension"
import { useState } from "react"
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom"

import { client } from "../background"
import type { Post } from "../server/db/schema"

function Welcome() {
  // const { getToken, isSignedIn } = useAuth()
  const [data, setData] = useState("")
  const [posts, setPosts] = useState<Post[]>([])

  const handleClick = () => {
    void (async () => {
      await client.post.create.mutate({ name: data })
      // await createPost(data)
      setData("")
    })()
  }

  return (
    <div
      style={{
        padding: 16,
        minWidth: 300
      }}>
      <UserButton />
      <h2>
        Welcome to your{" "}
        <a href="https://www.plasmo.com" target="_blank">
          Plasmo
        </a>{" "}
        Extension!
      </h2>
      <ul>
        {posts.map((post) => (
          <li key={post.name}>{post.name}</li>
        ))}
      </ul>
      <input
        onChange={(e) => setData(e.target.value)}
        value={data}
        placeholder="Add your name"
      />
      <button onClick={handleClick}>Submit</button>
    </div>
  )
}

function ClerkProviderWithRoutes() {
  const navigate = useNavigate()
  // const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={
        "pk_test_Y2xvc2luZy1vY2Vsb3QtNTguY2xlcmsuYWNjb3VudHMuZGV2JA"
      }
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
                    <Welcome />
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
