# MVP Blueprint Part 3: Phased Project Rollout

This document outlines a strategic, three-phase approach to building, testing, and launching the on-demand security platform MVP. The goal is to validate the riskiest assumptions first and gather real-world data before a full-scale launch.

---

### Phase 1: Core Engine Build & Internal Testing

**Objective:** To build and validate the absolute core `Panic -> Dispatch -> Response` loop. This phase focuses exclusively on the backend logic and the responder-side application, proving the system's technical viability before building any user-facing components.

**Components to Build:**
*   **Backend Platform:**
    *   Core database schemas (Responders, Incidents).
    *   Responder authentication and profile management.
    *   Real-time GPS location tracking for responders.
    *   The complete dispatch engine: geospatial queries, "first-to-accept" logic, and automated, time-based escalation.
*   **Responder Application (Minimal):**
    *   Login and "On Duty" / "Off Duty" functionality.
    *   Ability to receive and accept/decline incident alerts.
    *   Basic map view for navigation to a received coordinate.
    *   Functionality to mark an incident as "Resolved."
*   **Internal Testing Tool (Admin Dashboard):**
    *   A simple web interface to manually create "test" panic incidents at specific locations to simulate user alerts.
    *   A live map to view the locations of "On Duty" test responders.

**Validation Gate:** The system must demonstrate its ability to reliably identify the nearest responder(s) and assign an incident in under 5 seconds from the moment a test alert is triggered.

---

### Phase 2: User Application & Alpha Testing

**Objective:** To build the user-facing application and integrate it with the validated backend, creating a full end-to-end system for testing with a trusted, internal group.

**Components to Build:**
*   **User Application:**
    *   Complete user onboarding flow (registration, address verification via GPS pin-drop, payment method setup, access contact registration).
    *   The core Panic Button interface with its PIN-based cancellation window.
    *   Real-time incident status tracking screen.
    *   Post-incident payment and incident history views.
*   **Backend Integrations:**
    *   Integration with a **Payment Gateway** to handle transactions.
    *   Integration with an **SMS/Telephony Gateway** for the automated access notifications.
    *   Integration with **Push Notification** services for both user and responder apps.

**Validation Gate:** Conduct an "Alpha" test with a small group of employees or trusted friends/family. This test must successfully execute the full loop: a real user presses the button on their phone, the dispatch logic works, a test responder receives the alert on their app, and the user's app correctly reflects all status changes. The post-incident payment flow must also be successfully tested.

---

### Phase 3: Controlled Pilot Program (Johannesburg)

**Objective:** To launch the service in a limited, live environment to test the entire system's operational viability, gather real-world performance data, and validate the core value proposition of speed.

**Pilot Scope:**
*   **Geography:** A single, dense, and well-defined metropolitan suburb of Johannesburg (e.g., Sandton, Fourways). This geographical constraint is critical to ensure sufficient responder density.
*   **Partners:** Onboard 2-3 local, licensed private security companies to provide an initial pool of vetted responders.
*   **Users:** Recruit a limited cohort of public users (e.g., 100-200 households) within the designated pilot zone through targeted local marketing.

**Key Metrics to Measure:**
*   **Primary KPI:** Average end-to-end response time (from panic confirmation to responder "On-Site").
*   **Operational KPIs:** Responder acceptance rate, average time-to-accept, frequency and causes of access failures.
*   **Business KPIs:** Payment success rate, payment default rate, customer acquisition cost.
*   **Qualitative Data:** User feedback on the app experience, trust, and perceived value. Responder feedback on their app and the operational flow.

**Validation Gate:** The pilot must demonstrate a statistically significant speed advantage over the average response times of incumbent armed response services in the same area. It must also prove that the operational model (access, dispatch, payment) is sustainable and that users find value in the service. Successful completion of this phase provides the data-driven confidence needed for a wider rollout.
