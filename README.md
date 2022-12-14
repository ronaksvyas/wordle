## Screenshots

![image](https://user-images.githubusercontent.com/4312585/196310722-3a199276-4e15-49c6-b212-d98d378130b9.png)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Dev Setup

First, clone the repo and install all dependencies:

```bash
npm install
# or
yarn install
``` 

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Demo site

See the demo at http://wordle.ronakvyas.com

## Notes

I made this fun project to learn React. I have used useReducer for keypress action and useEffect hook for fetching new word and validating the current word in dictionary through an API. I also used [Chakra UI](https://chakra-ui.com/) for React Components

Special thanks to https://github.com/awsare/Wordle-API for providing public api for this.

If this API doesn't work, I will update it with something else. Raise an issue if you find it not working and I will be happy to fix it.
