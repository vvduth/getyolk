<h1 align="center">💪 Get Yolk🤖</h1>

> An AI-powered coach for combat athletes — functional strength, clean diets, and zero fluff.


## 🥊 What is Get Yolk?

**Get Yolk** is a smart fitness platform tailored for combat sports athletes who want to train smarter, not just harder. Powered by Gemini AI and Vapi Voice Assistant, it delivers **personalized functional strength workouts** and **affordable, whole food-based meal plans** — all with minimal supplements.


## Highlights:

- 🚀 Tech stack: Next.js, React, Tailwind & Shadcn UI
- 🎙️ Voice AI Assistant (Vapi)
- 🧠 LLM Integration (Gemini AI)
- 🏋️ Personalized Workout Plans
- 🥗 Custom Diet Programs
- 🔒 Authentication & Authorization (Clerk)
- 💾 Database (Convex)
- 🎬 Real-time Program Generation
- 💻 Layouts
- 🎭 Client & Server Components

## Features

- **Smart AI Coach**: Chat with a voice-enabled coach that understands your training goals, injuries, and schedule.
- **Combat-Specific Strength Workouts**: Focus on **functional, free-weight exercises** to build power, explosiveness, and mobility.
- **Budget Meal Planning**: Personalized diets using **cheap, whole-food ingredients** — think oats, rice, beans, eggs, and seasonal produce — while minimizing the use of supplements.
- **User Accounts**: Sign in with GitHub, Google, or email
- **Program Manager**: Save and switch between multiple training/diet plans — only your current plan is active.
- **Mobile-Ready UI**: Built with responsive design and modern components



## 💡 Core Philosophy

This isn’t your typical gym bro app. We believe in:

- Training like a fighter: mobility, core strength, balance, and explosiveness
- Eating real food: sustainable meals built around affordable, nutritious staples
- No unnecessary supplements: focus on whole-food sources for your protein, carbs, and fats


## Setup .env file

```js
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Clerk Redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Vapi Voice AI
NEXT_PUBLIC_VAPI_WORKFLOW_ID=
NEXT_PUBLIC_VAPI_API_KEY=

# Convex Database
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
```

## Getting Started

1. Clone the repository
2. Install dependencies:

```shell
npm install
```

3. Set up your environment variables as shown above
4. Run the development server:

```shell
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This application can be easily deployed to Vercel:

```shell
npm run build
npm run start
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Technologies Used

- **Next.js**: React framework for building the frontend and API routes
- **Tailwind CSS & Shadcn UI**: For styling and UI components
- **Clerk**: Authentication and user management
- **Vapi**: Voice agent platform for conversational AI
- **Convex**: Real-time database
- **Gemini AI**: Large Language Model for generating personalized fitness programs

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Vapi Documentation](https://docs.vapi.ai)
- [Convex Documentation](https://docs.convex.dev)
- [Gemini AI Documentation](https://ai.google.dev/gemini-api)