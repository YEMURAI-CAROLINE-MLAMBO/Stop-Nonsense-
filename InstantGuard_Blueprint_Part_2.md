# InstantGuard Blueprint Part 2: Feature Scope & Technology Stack

This document details the specific features required for InstantGuard and recommends a pragmatic technology stack for its development.

---

### 1. InstantGuard Feature Scope

InstantGuard is comprised of three distinct software components: the User Application, the Responder Application, and the Backend Platform.

#### A. User Application (Mobile)

The primary goal is simplicity and speed in a moment of distress.

*   **Onboarding & Setup:**
    *   `[Feature]` User registration via phone number with SMS OTP verification.
    *   `[Feature]` Simple profile creation (Name).
    *   `[Feature]` Address registration using a map-based pin drop, verified by the device's current GPS location to ensure the user is physically present.
    *   `[Feature]` Pre-configuration of a primary access method from a predefined list (`I will open`, `Guard on duty`, etc.).
    *   `[Feature]` Registration of 1-2 "Access Contact" phone numbers.
    *   `[Feature]` Secure, PCI-compliant registration of a payment method (e.g., credit/debit card).

*   **Core Functionality:**
    *   `[Feature]` A single, large, and unambiguous on-screen Panic Button.
    *   `[Feature]` A mandatory 8-10 second countdown after panic activation, with a clear option to cancel using a PIN or biometric authentication.
    *   `[Feature]` A simple, clear status display screen showing the state of an active incident (e.g., "Dispatching," "Responder En Route," "Incident Resolved").
    *   `[Feature]` In-app notifications for key status changes.

*   **Post-Incident & Account Management:**
    *   `[Feature]` A prompt for immediate payment upon incident resolution.
    *   `[Feature]` A simple incident history view.
    *   `[Feature]` A settings screen to manage profile, address, access contacts, and payment details.
    *   `[Feature]` A visible "Account Restricted" status if payment for a previous incident is outstanding.

#### B. Responder Application (Mobile)

The primary goal is to provide clear, actionable information with minimal distraction.

*   **Core Functionality:**
    *   `[Feature]` Secure login for vetted and approved responders.
    *   `[Feature]` A prominent "Go On Duty" / "Go Off Duty" toggle that controls their availability in the dispatch pool.
    *   `[Feature]` A loud, full-screen alert for new incidents, displaying the user's address and pre-configured access information.
    *   `[Feature]` Simple "Accept" / "Decline" buttons for new alerts.
    *   `[Feature]` Once a job is accepted, an in-app map view with a route to the user's location (via integration with a mapping service).

*   **Incident Management:**
    *   `[Feature]` Buttons to communicate key stages: "On-Site" and "Incident Resolved."
    *   `[Feature]` An option to log "Access Failed" if entry cannot be gained.
    *   `[Feature]` A simple view for past job history and earnings.

#### C. Backend Platform & Dispatch Logic

This is the central nervous system of InstantGuard.

*   **User & Responder Management:**
    *   `[Feature]` Secure databases for user and responder profiles, credentials, and associated data.
    *   `[Feature]` System for vetting and approving new security provider partners and their individual responders.

*   **Dispatch & Geolocation Engine:**
    *   `[Feature]` Real-time GPS location tracking for all "On Duty" responders.
    *   `[Feature]` Geospatial database queries to identify the nearest 2-3 responders to a new incident in real-time.
    *   `[Feature]` The core "first-to-accept" dispatch logic that locks a job for the first responder and cancels it for others.
    *   `[Feature]` Automated, time-based escalation logic (e.g., expand search radius after 30s, 60s).

*   **Third-Party Service Integrations:**
    *   `[Feature]` **Push Notifications:** To instantly alert responder and user apps.
    *   `[Feature]` **SMS/Telephony Gateway:** To send the automated "Access Contact" notifications.
    *   **Payment Gateway:** To securely process all user payments.
    *   **Mapping Service:** To provide routing information for responders.

---

### 2. Recommended Technology Stack

This stack is chosen for speed of development, scalability, and cost-effectiveness for InstantGuard.

*   **Mobile Applications (User & Responder):**
    *   **Framework:** **React Native**. It enables the development of both iOS and Android apps from a single TypeScript/JavaScript codebase, significantly reducing InstantGuard development time and cost.

*   **Backend:**
    *   **Runtime/Framework:** **Node.js** with **NestJS** (a TypeScript framework). This choice provides high performance for real-time I/O operations and maintains language consistency with the frontend.
    *   **Database:** **PostgreSQL** with the **PostGIS** extension. PostGIS is a robust, open-source, and industry-standard solution for handling the critical geospatial queries required for the dispatch engine.
    *   **Real-time Communication:** **WebSockets** (e.g., via the Socket.IO library) to manage the instantaneous communication needed for alerts and location updates.

*   **Infrastructure & Deployment:**
    *   **Cloud Provider:** **Amazon Web Services (AWS)** or **Google Cloud Platform (GCP)**. Both offer the necessary suite of managed services, scalability, and free tiers suitable for InstantGuard.
    *   **Application Hosting:** A Platform-as-a-Service (PaaS) like **AWS Elastic Beanstalk** or **Google App Engine** to simplify deployment and scaling of the Node.js backend.
    *   **Database Hosting:** A managed database service like **Amazon RDS for PostgreSQL** or **Google Cloud SQL** to offload the burden of database maintenance, backups, and scaling.
    *   **Containerization:** **Docker** to ensure a consistent environment for the backend application from development through to production.
