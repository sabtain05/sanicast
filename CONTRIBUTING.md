# Contributing to sanicast 

First off, thank you for considering contributing to `sanicast`! It's developers like you that make open-source such a fantastic community. 

Whether you're fixing bugs, adding new parsers, or improving documentation, your help is always welcome.

## 🐛 Found a Bug or Have a Feature Request?
Before writing any code, please check if an [issue](https://github.com/sabtain05/sanicast/issues) already exists. 
- If it does, feel free to add your thoughts or volunteer to fix it.
- If not, open a new issue explaining the bug or detailing your proposed feature.

## Local Development Setup

To work on `sanicast` locally, follow these steps:

1. **Fork the repository** on GitHub.
2. **Clone your fork** to your local machine:
   ```bash
   git clone [https://github.com/sabtain05/sanicast.git](https://github.com/sabtain05/sanicast.git)
   cd sanicast

```

3. **Install dependencies** (we use npm):
```bash
npm install

```



## Making Changes

1. **Create a new branch** for your feature or bug fix:
```bash
git checkout -b feature/awesome-new-parser

```


2. **Write your code**. The core logic lives in the `src/` directory.
3. **Write tests!** We use [Vitest](https://vitest.dev/?utm_source=gemini) for testing. If you add a new parser or feature, make sure to add a test case in `src/index.test.ts`.
4. **Run the tests** to ensure everything passes:
```bash
npm test

```


5. **Build the project** to make sure TypeScript compiles successfully:
```bash
npm run build

```



## Coding Guidelines

* **Zero Dependencies:** The core philosophy of `sanicast` is to remain completely lightweight and zero-dependency. Please do not add external libraries to `dependencies`.
* **Bulletproof Execution:** Parsers should never throw uncaught errors. They should gracefully handle chaotic data (e.g., returning `null` or a fallback value if something is completely unparseable).
* **TypeScript:** Keep the codebase strictly typed. Use explicit types where necessary and avoid using `any` unless absolutely required by the schema design.

## Submitting a Pull Request (PR)

1. Commit your changes with a clear and descriptive commit message.
2. Push your branch to your forked repository.
3. Open a Pull Request against the `main` branch of the `sabtain05/sanicast` repository.
4. In your PR description, explain what changes you made, why you made them, and link any relevant issues.

Thank you for helping make data cleaning easier for everyone!

```