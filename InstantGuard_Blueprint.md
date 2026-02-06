# InstantGuard Blueprint: On-Demand Private Security Coordination Platform

This document outlines the strategic and operational framework for a Minimum Viable Product (InstantGuard) designed to provide on-demand, speed-first private security coordination in South Africa. All decisions are based on the core principles of accessibility, speed, and inclusivity.

---

### 1. Concept Stress-Test & Mitigations

This section identifies key operational risks and the corresponding mitigation strategies embedded into InstantGuard design.

| Risk Category          | Identified Weakness / Risk                                   | InstantGuard Mitigation Strategy                                                                                                                              |
| ---------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Service Reliability**| Partner responders may not be online or ready ("ghost responders"). | **"On Duty" System:** Responders must toggle to an "On Duty" status in their dedicated app to be included in the dispatch pool. This ensures every alert is sent to an active, available unit. |
| **Physical Access**    | Gaining access to complexes, flats, and standalone homes without keys is a primary bottleneck. | **Layered, Pre-Configured Access:** Users pre-configure their primary access method during onboarding. InstantGuard auto-notifies a designated contact (guard, neighbour) via SMS/call upon dispatch. |
| **Financial Viability**| The "dispatch first, pay later" model is vulnerable to payment defaults. | **Capped Risk & Service Throttling:** InstantGuard will accept a default rate of <=5%. After one unpaid incident, a user's account is restricted (they can still trigger an alarm but won't get a response) until the balance is settled. This avoids punitive measures while protecting the system. |
| **User Safety & Trust**| False alarms can erode responder trust and increase costs. | **Mandatory Cancellation Window:** A user has an 8-10 second window after pressing the panic button to cancel the alert using a PIN or biometric authentication. After this, the dispatch is considered live and chargeable. |

---

### 2. Speed Architecture & Dispatch Workflow

InstantGuard's primary competitive advantage is speed. The architecture is designed exclusively to minimize the time from panic signal to on-site presence.

1.  **Initiation (T=0s):**
    *   User activates the panic button in their app.
    *   The 8-10 second cancellation window begins.
    *   Upon confirmation, the backend identifies the top 2-3 closest "On Duty" responders based on real-time GPS data.

2.  **Simultaneous Alert & First-to-Accept (T < 30s):**
    *   InstantGuard sends a simultaneous alert to all top responders.
    *   The alert includes the user's address and their pre-configured access method.
    *   The first responder to accept the dispatch is assigned the job. The alert is immediately cancelled for all other responders. This "first-to-accept" model is proven by platforms like Uber to maximize acceptance speed.

3.  **Automated Escalation (T >= 30s):**
    *   **If no responder accepts within 30 seconds:** The system automatically expands the dispatch radius and alerts the next group of available responders.
    *   **If no responder accepts within 60 seconds:** The system escalates further, alerting all available responders within a wider predefined zone.
    *   This automated, time-based escalation occurs without human intervention to prevent delays.

4.  **Responder App:**
    *   A lightweight, dedicated mobile application is the core tool for responders. Its only functions are to toggle "On Duty" status, receive and accept alerts, navigate to the location, and mark incidents as "resolved."

---

### 3. Access Solutions (Without Keys)

This system is designed to work with South Africa's diverse housing realities, focusing on low-friction, realistic methods.

1.  **User Onboarding - Pre-Configuration:**
    *   During setup, the user must select their primary access method from a simple list:
        *   "I will open my gate/door remotely."
        *   "There is a guard on duty at my complex/street."
        *   "My property is on an open street (no gate)."
        *   "Access requires an intercom."
    *   The user must also pre-register 1-2 "Access Contact" phone numbers (e.g., their own alternate number, a complex security guard, a trusted neighbour).

2.  **Dispatch - Auto-Notification:**
    *   The moment a responder accepts a dispatch, InstantGuard triggers an automated SMS or phone call to the pre-registered Access Contact(s).
    *   **Example SMS:** *"URGENT: An emergency response has been dispatched to [User Address]. Please facilitate immediate access for the response unit."*

3.  **On-Site Protocol - Failed Access:**
    *   If a responder arrives and cannot gain access, they will not wait idly. The protocol is:
        *   Attempt to contact the user via the app.
        *   Secure the visible perimeter of the property.
        *   Maintain a visible presence (vehicle lights, etc.) to act as a deterrent.
        *   Log the access failure in the app. This presence alone provides value and mitigates risk.

---

### 4. Payment Model & Financial Safeguards

The model prioritizes access over pre-payment, with fair and simple processes.

1.  **Payment Tiers:**
    *   **Free Access:** The app is free to download and set up an account.
    *   **Pay-Per-Incident:** A flat fee is charged for each successful dispatch.
    *   **Ultra-Light Subscription (Post-InstantGuard):** A small monthly fee could cover a certain number of dispatches or provide a discount on the per-incident fee.

2.  **Post-Incident Payment Flow:**
    *   Once a responder marks the incident as "resolved," the user receives an immediate in-app notification.
    *   This notification includes the response time, the final cost, and a prompt to pay using a pre-registered card or other payment method.

3.  **Default Management:**
    *   **Maximum Unpaid Incidents:** 1
    *   **Enforcement:** After one unpaid incident, the user's account is placed in a "restricted" state. They can still use the app to trigger a panic signal (ensuring they are never left completely without help), but a response will not be dispatched until the outstanding amount is settled. This is a service throttle, not a punitive legal action.
    *   **Acceptable Default Rate:** InstantGuard financial model will assume a payment default rate of up to 5%.

---

### 5. Final InstantGuard Assumptions Summary

*   **Primary User:** Residents of standalone houses, townhouses, and small complexes in metropolitan Johannesburg.
*   **Core Competitive Weapon:** Demonstrably faster response times than incumbent private security.
*   **Access Solution:** Solved via user pre-configuration and automated SMS/call notifications, not key-holding.
*   **Responder Tool:** A dedicated, lightweight mobile application for going "On Duty" and accepting jobs.
*   **Dispatch Logic:** Multi-responder, simultaneous alerts with a "first-to-accept" lock and automated, time-based escalation.
*   **Service Scope:** Home-based security incidents only.
*   **Financial Model:** Dispatch-first, pay-later, with a clearly defined and capped risk for payment defaults.
