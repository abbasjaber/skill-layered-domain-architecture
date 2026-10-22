---
name: layered-domain-architecture
description: Use when designing, building, or refactoring backend features, APIs, controllers, services, repositories, or database migrations following clean layered domain architecture and TDD principles.
---

# Layered Domain Architecture & Development Guidelines

## Overview

This skill provides a standardized, battle-tested framework for building clean, maintainable, and scalable backend applications using **Layered Domain Architecture** and **Test-Driven Development (TDD)**.

All code is strictly separated into distinct layers with clear boundaries: transport handling, domain logic, data access, and API serialization.

---

## When to Use

- When scaffolding or implementing a new backend feature, API endpoint, or domain module.
- When refactoring "fat controllers" or business logic scattered across models and request handlers.
- When isolating database access into clean repository abstractions.
- When establishing or reviewing TDD test coverage for endpoints and services.
- When writing database migrations that require strict reversibility and referential integrity.

### When NOT to Use

- For trivial one-off utility scripts or developer CLI scratchpads with no persistence layer.
- When the project explicitly enforces a different design paradigm (e.g., pure micro-functions or event sourcing without repositories).

---

## The Layered Architecture Blueprint

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

### Layer Rules & Responsibilities

| Layer | Primary Responsibility | Strict Constraints |
| :--- | :--- | :--- |
| **1. Transport (Controllers / Handlers)** | Validate HTTP requests, invoke Service layer, return standardized response envelopes. | **Never** run direct database queries, ORM calls, or core domain logic. |
| **2. Domain (Services / Use Cases)** | Encapsulate core business logic, domain rules, authorization policies, and orchestrate persistence via injected Repositories. | **Never** instantiate concrete repositories directly; depend strictly on Repository interfaces. |
| **3. Data Access (Repositories)** | Perform database queries, ORM builder operations, aggregations, counts, and data mutations. | **Never** leak transport logic or HTTP concepts into this layer. Only this layer touches the database. |
| **4. Serialization (Resources / DTOs)** | Transform database entities and service results into consistent, versioned API response contracts. | **Never** expose raw database columns, password hashes, secrets, or internal entity IDs directly. |

---

## Dependency Injection & Inversion of Control (IoC)

1. **Code to Interfaces**: Every Service and Repository must have an explicit contract/interface defining its public API:
   - Service: `<Domain><Feature>ServiceInterface` &rarr; `<Domain><Feature>Service`
   - Repository: `<Domain><Feature>RepositoryInterface` &rarr; `<Domain><Feature>Repository`
2. **Central Container Registration**: Bind contracts to implementations in the application's service provider or IoC container.
3. **Mockability**: By coding strictly to interfaces, both Services and Controllers can be unit-tested with lightweight mocks or test doubles without spinning up live databases.

---

## Route Registration & API Security

1. **Modular Route Files**: Slice routes by domain/audience (e.g., `routes/v1/<domain>.<ext>`) with API version prefixes (e.g., `/api/v1/...`).
2. **Group-Level Middleware**: Enforce authentication guards, permission checks, rate limiters, and CORS headers at the route-group level.
3. **Route Inventory Verification**: Maintain an automated route registration test or inventory checklist to verify only expected routes are exposed, preventing accidental endpoint leakage.

---

## Mandatory TDD Verification Matrix

Follow **Test-Driven Development (TDD)**: write failing tests before writing feature implementation code.

For every endpoint or feature, verify these 5 standard scenarios:

| Test Case | HTTP Status | Verification Goal |
| :--- | :--- | :--- |
| **1. Unauthenticated** | `401 Unauthorized` | Verify requests without valid tokens/credentials are rejected. |
| **2. Unauthorized (RBAC)** | `403 Forbidden` | Verify requests with valid tokens but lacking proper roles or permissions are denied. |
| **3. Validation / Edge Cases** | `400 / 422 Unprocessable` | Verify missing required fields, invalid formats, or boundary violations fail cleanly with standard error messages. |
| **4. Success Scenario** | `200 OK / 201 Created` | Verify valid requests perform the expected mutation, return the correct status, and conform to the response envelope. |
| **5. Database Rollback** | N/A | Verify transactions roll back cleanly on errors and avoid leaving partial state in the database. |

---

## Database Schema & Migration Standards

1. **Strict Reversibility**: Every migration must be bi-directional:
   - `up()` applies the change.
   - `down()` cleanly and completely reverses the change.
   - Always verify: run migration &rarr; rollback &rarr; re-migrate.
2. **Primary Keys**: Use UUIDs / ULIDs for public-facing entities to eliminate ID enumeration vulnerabilities.
3. **Foreign Keys & Referential Integrity**: Explicitly define foreign key constraints with appropriate deletion behavior (`restrictOnDelete`, `cascadeOnDelete`, or `nullOnDelete`).
4. **Performance & Indexes**: Add indexes for foreign keys, filtered columns, search fields, and sorting columns. Add check constraints for enum-like states.
5. **Zero Downtime Safe**: Never drop columns or lock large production tables in a single step; use phased, nullable additions.

---

## Code Quality, Linting & Type Safety

1. **Linter & Formatter Execution**: Always run the project's linter and formatter before concluding any task (e.g., Pint, ESLint, Prettier, Ruff, Black, Golangci-lint).
2. **Strict Typing**: Enable strict types, type declarations, return types, and parameter type hints.
3. **Zero Lint Errors**: Code must pass with zero errors and zero warnings.

---

## Operating Checklist for AI Agents & Developers

- [ ] **Evidence Before Assertions**: Execute tests and linters directly in terminal. Confirm output before claiming a task is complete.
- [ ] **No Hardcoded Secrets**: Never write, log, or commit API keys, tokens, credentials, or `.env` files into source control.
- [ ] **Minimal Diffs**: Keep changes focused on the requested task. Do not reformat or refactor unrelated files.
- [ ] **Preserve Comments**: Preserve existing comments, docstrings, and architectural rationale unless specifically asked to change them.
