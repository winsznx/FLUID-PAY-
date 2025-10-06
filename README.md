

# ⚡ React + Vite Starter

A minimal yet powerful setup to kickstart your **React** projects with **Vite** — optimized for speed, simplicity, and developer experience.
It includes **Hot Module Replacement (HMR)** out of the box and a basic **ESLint** configuration to help maintain clean, consistent code.


## 🔌 Available React Plugins

You can choose between two official plugins, depending on your build preference:

* **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)**
  Uses **Babel** for Fast Refresh — reliable and widely supported.

* **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)**
  Uses **SWC**, a Rust-based compiler, for even **faster builds** and better performance.

> 💡 Tip: For larger projects or CI/CD setups, the SWC version tends to build significantly faster.


## 🧹 ESLint Configuration

This starter includes a **lightweight ESLint setup** to keep your code neat.
For production-grade or enterprise projects, consider enhancing it with:

* **TypeScript** for stronger typing and better scalability.
* **Type-aware linting** using [`typescript-eslint`](https://typescript-eslint.io).
* Starting from the official [React + TypeScript template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) if you plan to grow your codebase.


## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build the app for production
npm run build

# Preview the production build locally
npm run preview
```

## 🧭 What’s Next?

Once you’ve got your app running, you can:

* Add a UI library like **Tailwind CSS** or **Chakra UI**.
* Integrate state management with **Zustand**, **Redux Toolkit**, or **Jotai**.
* Configure environment variables and deployment scripts for your hosting platform.

