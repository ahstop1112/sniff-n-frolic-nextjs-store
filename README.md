# Snff & Frolic NextJS Store (Pet Supplier Store)
https://app.sniffnfrolic.com

## Overview
This is a production-style **Next.js + TypeScript** project focused on scalable frontend architecture and real-world application structure rather than feature completeness.

The project demonstrates **system design, incremental migration, and integration strategies** commonly seen in modern web applications.

---

## Project Status
🚧 **Work in Progress**

This project is intentionally developed in **phases**, prioritizing architectural clarity and long-term scalability over feature completeness.

---

## Architecture Strategy

### Phase 1 — Headless Frontend with WooCommerce API
The initial version integrates with **WooCommerce REST APIs** as a backend service.

**Goals**
- Validate frontend architecture independently from backend ownership
- Enable rapid iteration using an existing commerce backend
- Establish core data flows with minimal infrastructure overhead

**Implementation Highlights**
- Next.js frontend consuming WooCommerce APIs
- Typed API mapping using TypeScript interfaces
- Centralized service layer to abstract external dependencies

---

### Phase 2 — Custom Node.js Backend + Database (In Progress)
The next phase introduces a **custom Node.js backend and database**, progressively replacing WooCommerce as the primary data source.

**Goals**
- Gain full ownership over data models and business logic
- Improve performance, flexibility, and scalability
- Support features not easily achievable with WooCommerce

**Planned Stack**
- Node.js (REST / GraphQL)
- Database (PostgreSQL / MongoDB)
- Authentication and authorization layer
- Domain-driven data models

---

### Incremental Integration Approach
Rather than performing a full rewrite, the system follows an **incremental migration strategy**.

- Frontend remains stable while backend services are introduced feature by feature
- API contracts remain consistent to avoid breaking changes
- Reduces risk while enabling continuous delivery

---

## Tech Stack
- **Next.js** (App Router)
- **TypeScript**
- **React**
- WooCommerce REST API (Phase 1)
- Node.js backend (Phase 2, in progress)
- Database integration (planned)

---

## Key Features
- Server-side rendering and layout composition using Next.js
- Strong type safety across frontend and API boundaries
- Reusable component and service architecture
- Clear separation between presentation, data, and domain logic

---

## Architecture Decisions
- Adopted **Next.js App Router** for layout composition and server-side rendering
- Abstracted backend dependencies behind a service layer
- Designed frontend data contracts to be backend-agnostic
- Prioritized incremental migration over risky full-system rewrites

---

## Trade-offs
- External API constraints in Phase 1
- Additional abstraction layers increase short-term complexity
- Feature parity is achieved gradually, not immediately

---

## Getting Started
```bash
npm install
npm run dev
