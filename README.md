````markdown
# Nestified

A collection of high-quality **NestJS** utilities, modules, and tooling — crafted to make building backend applications faster, cleaner, and more maintainable.

> All packages are published under the [`@nestified`](https://www.npmjs.com/org/nestified) scope on npm.

---

## 📦 Packages

| Package                                                          | Description                                          | Version                                                            |
| ---------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------ |
| [`@nestified/correlation-id`](./packages/correlation-id)         | Middleware + interceptor for request correlation IDs | ![npm](https://img.shields.io/npm/v/@nestified/correlation-id)     |
| [`@nestified/centralized-logger`](./packages/centralized-logger) | Structured logging with correlation ID support       | ![npm](https://img.shields.io/npm/v/@nestified/centralized-logger) |

---

## 🚀 Getting Started

### Install a Package

All packages are scoped under `@nestified` and can be installed individually:

```bash
npm install @nestified/correlation-id
# or
yarn add @nestified/correlation-id
# or
pnpm add @nestified/correlation-id
```
````

---

## 🛠 Development

This repository is a **Turborepo** monorepo. Each package lives in `packages/` and is built independently.

### Prerequisites

- [Node.js](https://nodejs.org/) >= 22
- [pnpm](https://pnpm.io/) >= 9 (recommended)

### Install dependencies

```bash
pnpm install
```

### Build all packages

```bash
pnpm build
```

### Run in dev mode (watch mode)

```bash
pnpm dev
```

### Lint all packages

```bash
pnpm lint
```

---

## 📂 Project Structure

```
nestified/
├── packages/
│   ├── correlation-id/       # @nestified/correlation-id
│   └── centralized-logger/   # @nestified/centralized-logger
├── turbo.json                # Turborepo pipeline config
├── tsconfig.base.json        # Base TypeScript config for all packages
└── package.json              # Workspace and devDependencies
```

---

## 📜 Publishing a Package

> You must be logged into npm with access to the `@nestified` organization.

```bash
cd packages/correlation-id
npm version patch   # or minor / major
npm publish --access public
```

---

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/my-feature`.
3. Commit your changes: `git commit -m 'Add my feature'`.
4. Push to your branch: `git push origin feature/my-feature`.
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

```

---

If you want, I can now also **write a minimal `README.md` template** for each package inside `packages/*` so that `@nestified/correlation-id` and `@nestified/centralized-logger` each have their own docs ready for npm publishing. That way, your monorepo and npm pages will look professional from day 1.
```
