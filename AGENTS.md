# AGENTS.md

## Dev environment tips
- Use `uv run server.py` to start the backend/development server.
- **Exclusive Package Management**: Use ONLY `uv` for all package management tasks. Do not use other package managers like pip or poetry.
- The project consists of a Python backend and a Vanilla JS/HTML frontend.
- `index.html`, `style.css`, and `main.js` are the core frontend files.
- `server.py` and `main.py` handle the backend logic.

## Testing instructions
- Ensure the server starts correctly with `uv run server.py` before finalizing changes.
- Check the frontend interaction in `index.html` manually if automated tests are not set up.
- Verify that `uv.lock` is consistent if new dependencies are added.

## Commit instructions
- **Commit on Task Completion**: You must commit the entire source code every time a task is completed.
- Ensure commit messages are descriptive and follow standard conventions.

## Naming Conventions
- **Files/Functions/Variables**: `snake_case`
- **Classes**: `PascalCase`

## Code Quality
- **Style**: Follow `ruff` formatter and linter
- **Type Hints**: Required for public APIs and core logic
- **Testing**: Use `pytest` for core behavior validation

## Documentation
- **Markdown Policy**: 
  - Do NOT create unnecessary `.md` files
  - When required, create only under `/Rules/` directory
  - Always ask user confirmation before creating