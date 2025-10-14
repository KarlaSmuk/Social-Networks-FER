## 🚀 How to Run App

### Prerequisites

- Node.js (version 18 or higher)
- pnpm

### Installation & Setup

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Start the development server:**

   ```bash
   pnpm run dev
   ```

3. **Open in browser:**
   - The server will start on `http://localhost:5173`
   - The page will automatically reload when you make changes

### Available Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `pnpm dev`     | Start development server with reload |
| `pnpm build`   | Build for production                 |
| `pnpm preview` | Preview production build locally     |
| `pnpm lint`    | Run ESLint to check code quality     |

### Environment Setup

1. **Create environment file:**

   ```bash
   cp .env.example .env
   ```

2. **Add your Google client id to `.env`**
