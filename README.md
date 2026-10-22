# Layered Domain Architecture Skill

An Agent Skill providing production-grade guidelines, design patterns, and testing protocols for building backend systems using **Layered Domain Architecture** and **Test-Driven Development (TDD)**.

Designed for AI coding assistants (Google Antigravity, Claude Code, Cursor, GitHub Copilot CLI, Codex) and human engineering teams.

---

## ⚡ Instant One-Line Installation with `npx`

No cloning or manual copying needed! Anyone can install the skill with one command:

### 1. Install into Current Project (Recommended)
Run this inside any project root to add the skill to `.agents/skills/layered-domain-architecture`:
```bash
npx github:abbasjaber/skill-layered-domain-architecture
```
*Then commit `.agents/skills` to Git so your entire team and their AI agents have it automatically.*

### 2. Install Globally (For All Projects on Machine)
Installs into `~/.gemini/config/skills` and `~/.agents/skills`:
```bash
npx github:abbasjaber/skill-layered-domain-architecture --global
```

### 3. Install Everywhere (Current Project + Globally)
```bash
npx github:abbasjaber/skill-layered-domain-architecture --all
```

---

## 🎯 Architecture Blueprint

```
[ HTTP / Transport Layer ]      Controllers / Handlers / Resolvers
           │
           ▼
[ Domain / Application Layer ]  Services / Use Cases (Interfaces & Implementations)
           │
           ▼
[ Data Access Layer ]          Repositories / Data Mappers (Interfaces & Implementations)
           │
           ▼
[ Serialization Layer ]        Resources / DTOs / Serializers
```

### Key Principles

- **Separation of Concerns**: Controllers handle transport only; Services handle business rules; Repositories handle database persistence; Resources handle API response contracts.
- **Dependency Inversion**: Code to interfaces. Services and Repositories expose explicit contracts bound via IoC containers.
- **Strict TDD Verification**: Every endpoint must pass tests for **401** (Unauthenticated), **403** (Unauthorized/RBAC), **400/422** (Validation & boundary limits), **200/201/204** (Success), and database transaction rollback integrity.
- **Database Safety**: All migrations must be strictly reversible (`up` and `down`), use UUID/ULID primary keys, and enforce referential integrity.

---

## 💡 How to Use

AI agents will automatically load this skill whenever tasks match triggering conditions such as:
- Designing or implementing new backend features, APIs, or domain modules.
- Refactoring fat controllers or extracting repositories.
- Setting up TDD feature test suites or endpoint verification.
- Writing reversible database migrations.

You can also prompt your agent explicitly:
```text
/layered-domain-architecture
```
or
```text
Follow the layered-domain-architecture skill to design the billing module.
```

---

## 📦 Manual Installation (Git Clone Alternative)

#### Globally
```bash
git clone https://github.com/abbasjaber/skill-layered-domain-architecture.git ~/.gemini/config/skills/layered-domain-architecture
```

#### Inside a Project
```bash
mkdir -p .agents/skills
git clone https://github.com/abbasjaber/skill-layered-domain-architecture.git .agents/skills/layered-domain-architecture
```

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.
