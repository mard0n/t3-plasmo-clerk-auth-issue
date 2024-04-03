# t3-plasmo-clerk integration

Figuring out how to integrate clerk with chrome extension building framework (plasmo)

## Getting started

You'll need a Clerk account and local MySQL database (which will be instantiated automatically)

- Clone this project `git clone git@github.com:mard0n/t3-plasmo-clerk-auth-issue.git`
- `cd t3-plasmo-clerk-auth-issue`
- `pnpm install` or `yarn install` or `npm install`
- Run `./start-database.sh` - it will create local MySQL docker instance. `DATABASE_URL` is automatically configured if the script runs successfully
- Add your Clerk account env variables `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (same as `PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY`) and `CLERK_SECRET_KEY`
- Run `pnpm dev` it will run Next and Plasmo servers
- Load the built extension in your chrome browser. [Here is the link to help you out with that](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)

## Goal

The main goal is to authenticate the user inside the tab pages `./tabs` [Tab Pages - Plasmo](https://docs.plasmo.com/framework/tab-pages) or inside the popup `./popup.tsx` [Popup - Plasmo](https://docs.plasmo.com/framework/ext-pages#adding-a-popup-page) and the requests made inside the content scripts/background workers need to send reflect that user is authenticated (send the token or whatever necessary for trpc clerk wrapper to identify the user)

This is how you open the tab pages `chrome-extension://[---chrome extension id---]/tabs/welcome.html`

## Learn More

- [T3 Stack Documentation](https://create.t3.gg/)
- [Plasmo](https://docs.plasmo.com/)
- [Clerk](https://clerk.com/docs)
