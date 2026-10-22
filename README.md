# Layered Domain Architecture Skill

An Agent Skill providing production-grade guidelines, design patterns, and testing protocols for building backend systems using **Layered Domain Architecture** and **Test-Driven Development (TDD)**.

Designed for AI coding assistants (Google Antigravity, Claude Code, Cursor, GitHub Copilot CLI, Codex) and human engineering teams.

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

## 📦 Installation

### Option 1: Global Installation (All Projects on Your Machine)

#### For Antigravity
```bash
git clone https://github.com/abbasjaber/skill-layered-domain-architecture.git ~/.gemini/config/skills/layered-domain-architecture
```

#### For Universal Agent Runtimes (Claude Code, Cursor, Codex, etc.)
```bash
git clone https://github.com/abbasjaber/skill-layered-domain-architecture.git ~/.agents/skills/layered-domain-architecture
```

### Option 2: Project-Level Installation (Share with Your Team)

Inside your project repository root:
```bash
mkdir -p .agents/skills
git clone https://github.com/abbasjaber/skill-layered-domain-architecture.git .agents/skills/layered-domain-architecture
```
*Commit `.agents/skills/layered-domain-architecture` to Git so any team member or agent who clones the repo automatically has the skill active.*

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

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.
