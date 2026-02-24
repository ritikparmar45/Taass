# WhatsApp Web Clone 🚀

A high-fidelity WhatsApp Web clone built with a modern real-time tech stack.

![WhatsApp Clone](https://static.whatsapp.net/rsrc.php/v3/y6/r/wa69p9_PBpX.png)

## ✨ Features

- **Real-time Messaging**: Instant message delivery powered by Convex.
- **WhatsApp UI/UX**: Pixel-perfect replication of WhatsApp Web's design system.
- **Authentication**: Secure login and signup via Clerk.
- **Presence Tracking**: Real-time "online" and "typing..." indicators.
- **Responsive Design**: Works seamlessly on both desktop and mobile.
- **Premium Landing Page**: Professional welcome screen for guest users.

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Backend & Database**: [Convex](https://www.convex.dev/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A Clerk account
- A Convex account

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd WhatsApp-Clone
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file in the root directory and add your keys:
   ```env
   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # Convex
   CONVEX_DEPLOYMENT=dev:...
   NEXT_PUBLIC_CONVEX_URL=https://...
   ```

4. **Run the development server**:
   In terminal 1:
   ```bash
   npx convex dev
   ```
   In terminal 2:
   ```bash
   npm run dev
   ```

5. **Open the app**:
   Visit [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment (Vercel)

1. **Push to GitHub**.
2. **Convex Production**: Set up a production deployment in the Convex Dashboard.
3. **Clerk JWT Template**: Ensure you have a "Convex" JWT template in your Clerk dashboard.
4. **Vercel Project**:
   - Create a new project on Vercel and import your repository.
   - Add all environment variables from `.env.local`.
   - Update the `NEXT_PUBLIC_CONVEX_URL` to your production URL.

## 📄 License

This project is open-source and available under the MIT License.
