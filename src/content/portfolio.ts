export const contact = {
  email: 'basseydata@gmail.com',
  github: 'https://github.com/data-baze',
  linkedin: 'https://www.linkedin.com/in/data-bassey/',
};

export type Project = {
  slug: string; name: string; category: string; role: string; summary: string;
  scope: string; stack: string[]; highlight: string; context: string; problem: string;
  decisions: { title: string; text: string }[];
  journey: { title: string; text: string }[];
  architecture: string[]; quality: string[]; outcome: string; features?: string[];
};

export const projects: Project[] = [
  {
    "slug": "payvessel",
    "name": "Payvessel",
    "category": "Fintech · Merchant operations",
    "role": "Senior Frontend Developer",
    "summary": "Merchant and admin dashboards for transaction operations, granular permissions, fraud controls, and dispute resolution.",
    "scope": "Collaborated on the merchant dashboard, landing page, and admin console; implemented transaction management, role-based access, and operational tooling.",
    "stack": [
      "React",
      "Redux",
      "Tailwind CSS"
    ],
    "features": [
      "Single & batch transactions",
      "Role-based permissions",
      "Blacklist & dispute tooling"
    ],
    "highlight": "Payments visibility. Operational control.",
    "context": "Payvessel's merchant and administrative interfaces support different sides of payment operations: merchants need usable dashboards, while internal teams need tools for processing transactions and resolving issues.",
    "problem": "Transaction administration, permission-sensitive actions, and support workflows needed to work together in a responsive, maintainable interface.",
    "decisions": [
      {
        "title": "Support transaction work at different scales",
        "text": "Built transaction management features supporting both single and batch actions, giving administrators workflows for handling individual items and groups of transactions."
      },
      {
        "title": "Make operational access explicit",
        "text": "Implemented role-based access control with granular permissions for multiple admin roles. These frontend controls shape the available interface; backend authorization remains responsible for enforcing access to protected operations."
      },
      {
        "title": "Connect control, support, and performance",
        "text": "Built banner-management and blacklist systems and improved customer-support and dispute-resolution tooling. Optimized frontend performance and state management across the admin dashboard."
      }
    ],
    "journey": [
      {
        "title": "Review",
        "text": "Merchants and administrators use dashboards to understand transaction activity."
      },
      {
        "title": "Act",
        "text": "Authorized staff work with single or batch transaction operations."
      },
      {
        "title": "Resolve",
        "text": "Support, dispute-resolution, and blacklist tooling help staff handle operational issues."
      }
    ],
    "architecture": [
      "Merchant dashboard / Admin console",
      "Role-based navigation & actions",
      "React / Redux application state",
      "Transaction & operations APIs"
    ],
    "quality": [
      "Granular role-based permissions organize administrative capabilities.",
      "Performance and state-management improvements support dashboard load speed and responsiveness.",
      "Single and batch transaction workflows, blacklist controls, and dispute tooling support day-to-day payment operations."
    ],
    "outcome": "Delivered transaction-management features, granular permissions, banner and blacklist controls, and improved support workflows as part of the merchant and admin dashboard redesign."
  },
  {
    "slug": "dancity",
    "name": "Dancity v2",
    "category": "Fintech · Wallet & payments",
    "role": "Lead Frontend Developer",
    "summary": "A wallet and payments platform with facial-recognition KYC, bank-transfer onboarding, and dashboard and card-management interfaces.",
    "scope": "Designed the frontend architecture and project structure, led code reviews, and implemented identity verification, onboarding, bank-transfer, dashboard, and card-management interfaces.",
    "stack": [
      "Amazon Rekognition"
    ],
    "features": [
      "Facial-recognition KYC",
      "Bank transfers & onboarding",
      "Wallet & card interfaces"
    ],
    "highlight": "Identity verification meets everyday payments.",
    "context": "Dancity v2 brings virtual top-ups, bill payments, and wallet-based transactions into a unified web interface.",
    "problem": "Users needed to move from identity verification and onboarding into payment and account-management workflows, supported by a frontend structure that the engineering team could extend consistently.",
    "decisions": [
      {
        "title": "Integrate identity verification into onboarding",
        "text": "Implemented facial-recognition identity verification using Amazon Rekognition for KYC (Know Your Customer), alongside onboarding workflows. My contribution was the verification integration and user-facing flow."
      },
      {
        "title": "Build the payment and account interfaces",
        "text": "Built secure bank-transfer workflows, the user dashboard, and card-management interfaces, focusing on intuitive navigation and reliable interactions across the payment experience."
      },
      {
        "title": "Establish shared frontend foundations",
        "text": "Designed the application architecture and scalable project structure, managed pull requests, and led code reviews to keep implementation consistent across the team."
      }
    ],
    "journey": [
      {
        "title": "Verify",
        "text": "Facial-recognition KYC supports identity verification during onboarding."
      },
      {
        "title": "Transact",
        "text": "Bank-transfer workflows connect onboarding with the payment experience."
      },
      {
        "title": "Manage",
        "text": "Dashboard and card-management interfaces support ongoing account use."
      }
    ],
    "architecture": [
      "Onboarding & KYC interface",
      "Amazon Rekognition integration",
      "Dashboard & transfer workflows",
      "Card-management interfaces"
    ],
    "quality": [
      "Code reviews and a shared project structure support consistent frontend delivery.",
      "Identity verification is integrated into the onboarding journey.",
      "Dashboard, transfer, and card-management interfaces emphasize clear navigation and reliable user interactions."
    ],
    "outcome": "Delivered the frontend foundations and key user journeys for KYC, onboarding, bank transfers, the dashboard, and card management, while leading pull-request reviews."
  },
  {
    slug: 'enterprise-innovation', name: 'Enterprise Innovation Platform', category: 'Enterprise · Frontend',
    role: 'Senior Frontend Engineer',
    summary: 'An innovation platform connecting idea submission, assessment, and governance across six user roles.',
    scope: 'Frontend architecture and feature delivery at Infinion Technologies for a financial services group, alongside other frontend engineers and backend teams.',
    stack: ['React', 'TypeScript', 'RTK Query', 'MSAL', 'Jest', 'Cypress'],
    highlight: 'Six roles. One configurable frontend.',
    context: 'Enterprise Innovation Platform supports enterprise innovation at a financial services group. Ideators, reviewers, and administrators work through different stages of the same submission lifecycle.',
    problem: 'Multiple roles, evolving API contracts, and parallel feature development required consistent routing and predictable state across a complex application.',
    decisions: [
      { title: 'Resolve navigation from configuration', text: 'Centralized route, role, and layout configuration instead of hardcoding access behaviour on each screen. Protected routes and lazy-loaded screens give feature areas clearer boundaries. Frontend access rules organize the interface; server-side authorization remains a separate responsibility.' },
      { title: 'Keep multi-stage workflows consistent', text: 'Built dynamic submission forms and AI-assisted and manual review-scoring interfaces. Addressed state-initialization issues so scores, comments, and submission data render consistently across different navigation paths.' },
      { title: 'Design for the person using the data', text: 'Built role-specific dashboards and paginated, filterable tables for submissions, users, and assessments, aligning each view with live backend response shapes.' },
    ],
    journey: [
      { title: 'Submit', text: 'Multi-stage forms capture ideas and supporting information.' },
      { title: 'Assess', text: 'Reviewers score submissions across idea, pretotype, and pitch rounds.' },
      { title: 'Monitor', text: 'Role-specific dashboards surface review status and scoring analytics.' },
    ],
    architecture: ['Role-aware routes & layouts', 'Isolated feature screens', 'Redux Toolkit / RTK Query', 'Authenticated backend APIs'],
    quality: ['Jest unit tests and Cypress end-to-end tests for submission, assessment, and authentication flows.', 'Resolved undefined-state crashes and made dynamic forms and drawers resilient to changing API payloads.', 'Lazy-loaded screens and modular feature boundaries support maintainability across collaborating engineers.'],
    outcome: 'Delivered configurable navigation, role-specific dashboards, dynamic submission and scoring workflows, and more resilient frontend state. The work demonstrates architectural ownership in a shared enterprise codebase.',
  },
  {
    slug: 'intrust', name: 'InTrust', category: 'Insurance · Frontend',
    role: 'Senior Frontend Engineer',
    summary: 'A claims operations console and a companion customer portal, connecting internal teams with policyholders.',
    scope: 'Owned the B2B platform frontend end-to-end and implemented customer-portal authentication and live API integration.',
    stack: ['React', 'TypeScript', 'RTK Query', 'MSAL', 'Azure', 'Cypress'],
    highlight: '40+ permissions. Two connected experiences.',
    context: 'Customer Service, Finance, and Admin teams process insurance claims through an internal console. Policyholders use a companion portal to track claims, review history, and access chatbot support.',
    problem: 'Different operational roles need different actions and information, while customers need a clear view of their own claims. Both applications require reliable authenticated access to live data.',
    decisions: [
      { title: 'Make permissions part of the architecture', text: 'Built a frontend RBAC system with 40+ granular permissions and configurable routing. This structures the actions visible to each role, alongside authorization enforced by the backend.' },
      { title: 'Centralize authenticated data access', text: 'Built a custom RTK Query layer with silent MSAL token refresh for the internal platform. Implemented login, email/OTP verification, password creation, and token handling for the customer portal.' },
      { title: 'Reuse the interface foundations', text: 'Built a reusable component system, cursor-based pagination aligned with Cosmos DB responses, and real-time notifications. Migrated customer dashboard, claims, and analytics views from mock data to backend integration.' },
    ],
    journey: [
      { title: 'Access', text: 'Staff and customers enter through their respective authentication flows.' },
      { title: 'Process', text: 'Internal teams work through claims with role-appropriate actions.' },
      { title: 'Track', text: 'Customers follow claim progress, review history, and access guided support.' },
    ],
    architecture: ['B2B console / Customer portal', 'Permissions & reusable UI', 'Authenticated query layer', 'Claims APIs & cursor pagination'],
    quality: ['Jest unit tests and Cypress end-to-end coverage of core journeys across both applications.', 'Silent token refresh in the internal platform API layer supports continued authenticated access.', 'Shipped the internal platform as an installable PWA on Azure Static Web Apps.'],
    outcome: 'Delivered the internal platform frontend and key customer-portal workflows, spanning permissions, authentication, claims data, analytics, and embedded support.',
  },
  {
    slug: 'marketplace-backend', name: 'Marketplace backend', category: 'Commerce · Backend',
    role: 'Senior Backend Engineer',
    summary: 'A modular commerce backend covering seller onboarding, inventory reservations, checkout, and real-time order updates.',
    scope: 'Owned backend architecture, authentication, database design, commerce workflows, and deployment preparation.',
    stack: ['NestJS', 'PostgreSQL', 'Prisma', 'Redis', 'Socket.IO', 'Jest'],
    highlight: 'From account creation to order updates.',
    context: 'A multi-vendor marketplace needs shared commerce foundations for sellers and customers: accounts, catalogs, orders, inventory, and analytics.',
    problem: 'Authentication, inventory availability, and order updates must stay coherent across several business domains and competing purchase flows.',
    decisions: [
      { title: 'Separate business domains', text: 'Architected NestJS modules for sellers, products, orders, and customers. A global validation pipe and authentication guard establish shared request handling, with an explicit opt-out for public routes.' },
      { title: 'Reserve inventory during checkout', text: 'Implemented Redis-based cart holds with expiration as part of the reservation and checkout flow, addressing competition for inventory during purchase windows.' },
      { title: 'Connect identity, data, and events', text: 'Built Redis-backed OTP magic-link login, Google OAuth, and JWT access/refresh token handling. Designed PostgreSQL schemas and Prisma migrations, with Redis Pub/Sub and Socket.IO for order and inventory notifications.' },
    ],
    journey: [
      { title: 'Authenticate', text: 'Customers and sellers access protected capabilities through authenticated APIs.' },
      { title: 'Reserve & order', text: 'Time-limited cart holds support the checkout and inventory flow.' },
      { title: 'Stay updated', text: 'Order and inventory events reach connected clients through real-time notifications.' },
    ],
    architecture: ['Clients & OpenAPI contract', 'NestJS domain modules', 'PostgreSQL / Prisma + Redis', 'Pub/Sub → Socket.IO clients'],
    quality: ['Global request validation and protected-by-default routing make shared API rules explicit.', 'Swagger/OpenAPI documentation supports frontend integration; the project stack includes Jest and Supertest.', 'Prepared local and serverless deployment configurations, addressing Swagger asset bundling and WebSocket adapter compatibility.'],
    outcome: 'Implemented the backend commerce flow alongside identity, database migrations, analytics, and API documentation, and prepared the application for local and serverless deployment.',
  },
  {
    slug: 'conversational-banking', name: 'Conversational Banking Platform', category: 'Banking · Frontend',
    role: 'Senior Frontend Developer',
    summary: 'Conversational banking interfaces and a companion console for service management and chat analytics.',
    scope: 'Built the banking chatbot interaction engine, administrative interfaces, and a shared authenticated API layer.',
    stack: ['React', 'TypeScript', 'Redux Toolkit', 'MSAL', 'Chart.js', 'PWA'],
    highlight: 'Customer conversations. Operational context.',
    context: 'A conversational banking frontend supports customer self-service, while an internal console gives staff tools for managing service information and reviewing interactions.',
    problem: 'The customer interface needed to support interactions beyond plain text. The companion console needed useful operational views and consistent access to authenticated APIs.',
    decisions: [
      { title: 'Support richer conversations', text: 'Built message rendering, suggestion buttons, file upload, camera capture, geolocation, and session persistence for the chatbot interface.' },
      { title: 'Give operations a companion workspace', text: 'Built ATM, branch, and loan management interfaces, chat-history drilldowns, and Chart.js analytics with PDF export.' },
      { title: 'Share authentication behaviour', text: 'Implemented a Microsoft-identity authenticated API layer with token injection and 401 retry logic across the customer and admin applications.' },
    ],
    journey: [
      { title: 'Converse', text: 'Customers interact through messages and suggested actions.' },
      { title: 'Provide context', text: 'Supported interactions include files, camera capture, and location.' },
      { title: 'Manage & review', text: 'Staff manage service information and inspect chat history and analytics.' },
    ],
    architecture: ['Chat frontend / Admin console', 'Conversation & dashboard state', 'Shared Microsoft identity API layer', 'Banking services APIs'],
    quality: ['Session persistence supports continuity in the conversation interface.', 'A shared token-injection and 401 retry layer keeps authentication behaviour consistent across applications.', 'Administrative analytics include PDF export for reviewing information beyond the dashboard.'],
    outcome: 'Delivered customer interaction features and supporting operational tools. My contribution covered the application frontend and integrations.',
  },
];

export const experience = [
  { company: 'Infinion Technologies', role: 'Senior Frontend Developer', period: 'Sep 2025 — Present', detail: 'Own frontend architecture for enterprise products, working with product, backend, and AI teams. Delivered authentication, dashboards, and multi-role workflows.', project: 'enterprise-innovation' },
  { company: 'MSORG Developers', role: 'Lead Software Developer', period: 'Mar 2024 — Aug 2025', detail: 'Led eight engineers across full-stack delivery and owned frontend architecture across nine-plus production applications. Built Django/DRF and NestJS services, introduced frontend and backend testing, and mentored engineers.', note: 'Concurrent with Payvessel; the organizations shared executive leadership.', project: undefined },
  { company: 'Payvessel', role: 'Senior Frontend Developer', period: 'Mar 2024 — Aug 2025', detail: 'Redesigned merchant and admin dashboards. Built granular access controls, single and batch transaction actions, and support and dispute-resolution tooling.', note: 'Concurrent with MSORG Developers under shared executive leadership.', project: 'payvessel' },
  { company: 'GOATek', role: 'Software Developer', period: 'Jul 2023 — Feb 2024', detail: 'Built React and TypeScript interfaces against Python backend services, collaborating with distributed teams across time zones.', project: undefined },
  { company: 'Neon Global Technologies', role: 'Web Developer', period: 'Sep 2022 — Jun 2023', detail: 'Built WordPress websites, an analytics dashboard, and an appointment-booking system, with responsive layouts and performance improvements.', project: undefined },
  { company: 'Criset Multiconcept Services', role: 'Web Developer', period: 'Jan 2020 — May 2022', detail: 'Built and maintained small-business websites with WordPress, Bootstrap, JavaScript, and React, customizing themes and improving cross-device usability.', project: undefined },
];

export const capabilities = [
  { title: 'Frontend systems', text: 'React, TypeScript, reusable components, role-aware routing, and predictable application state.', project: 'enterprise-innovation', example: 'Explore Enterprise Innovation Platform' },
  { title: 'Backend delivery', text: 'Django, NestJS, PostgreSQL, authenticated APIs, inventory workflows, and real-time events.', project: 'marketplace-backend', example: 'Explore the marketplace' },
  { title: 'Quality & reliability', text: 'Jest, React Testing Library, Cypress, resilient UI state, and authenticated data access.', project: 'intrust', example: 'Explore InTrust' },
  { title: 'Technical leadership', text: 'Architecture decisions, code reviews, mentoring, and delivery across product and engineering teams.', project: undefined, example: 'Read my experience' },
];
