<div align="center">
  <h1>🏙️ CityResolved</h1>
  <p><strong>Comprehensive Public Infrastructure Issue Reporting System</strong></p>
  
  <p>
    <a href="https://city-resolved.web.app/">Live Website</a> •
    <a href="https://github.com/S-Arafin/City-Resolved">Client Repository</a> •
    <a href="https://github.com/S-Arafin/City-Resolved-Backend">Server Repository</a>
  </p>
</div>

<br />

> **CityResolved** bridges the gap between citizens and municipal authorities. It enables citizens to report real-world infrastructure issues (like potholes, broken lights, and garbage overflow) while providing government staff with the tools to track, manage, and resolve them efficiently through an automated, AI-assisted pipeline.

<br />

## 🔐 Demo Credentials

Use the following credentials to test role-based access control and system functionalities.

<table>
  <thead>
    <tr>
      <th>Role</th>
      <th>Email</th>
      <th>Password</th>
      <th>Access Level</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Admin</b></td>
      <td><code>arafin@assignment11.com</code></td>
      <td><code>arafin@assignment11</code></td>
      <td>Full Control, Manage Users/Staff, Analytics</td>
    </tr>
    <tr>
      <td><b>Staff</b></td>
      <td><code>sultan@thetown.com</code></td>
      <td><code>123456</code></td>
      <td>Manage Assigned Issues, Update Status</td>
    </tr>
  </tbody>
</table>

---

## ✨ Key Features

1.  **🤖 AI-Powered Automated Reporting:** Integrated the **Gemini 1.5 Flash** vision model to automatically analyze uploaded image evidence and intelligently pre-fill issue reporting forms. This standardizes data entry and accelerates the reporting pipeline.
2.  **🔐 Role-Based Access Control (RBAC):** Distinct dashboards and functionalities for **Admin**, **Staff**, and **Citizen** roles, secured by robust JWT verification.
3.  **📝 Issue Reporting System:** Citizens report issues with detailed descriptions, categories, locations, and AI-assisted image uploads (hosted via ImageBB/Cloudinary).
4.  **⏱️ Real-Time Status Tracking:** Issues transition through a strict lifecycle (`Pending` → `In-Progress` → `Resolved` → `Closed`) with instant UI updates.
5.  **📜 Interactive Timeline:** Detailed audit logs track issue modifications, logging who updated the issue, what changed, and when.
6.  **💳 Secure Payment Integration:** Integrated **Stripe** payment gateway for:
    * **Priority Boosts:** Elevate an issue's status to "High" for rapid response.
    * **Premium Subscriptions:** Unlock unlimited reporting limits.
7.  **🛠️ Admin Management Suite:** Comprehensive statistics, user moderation (block/unblock), staff onboarding, and targeted issue delegation.
8.  **👨‍🔧 Staff Workflow:** Dedicated task views for staff members to manage assignments and update resolution statuses in real time.
9.  **👍 Public Upvote System:** Community-driven prioritization allowing logged-in citizens to highlight critical issues.
10. **🔍 Advanced Search & Filtering:** Granular filtering by category, status, or priority, alongside exact title search capabilities.
11. **📊 Data Visualization:** Interactive administrative and staff dashboards utilizing Recharts for metrics like "Total Revenue" and "Resolved vs Pending Issues".
12. **📱 Responsive Design:** Fluid interfaces engineered with **Tailwind CSS** and **DaisyUI** for seamless cross-device compatibility.
13. **🛡️ Secure API Architecture:** Backend routes strictly protected by JWT tokens and role-verification middleware to prevent unauthorized data mutation.

---

## 🛠️ Technology Stack

### Frontend Architecture
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

* **UI/UX:** Component-based architecture utilizing DaisyUI for rapid styling and SweetAlert2 for interactive feedback.
* **Data Synchronization:** TanStack Query (React Query) handles efficient caching and state synchronization.
* **Network:** Secure Axios instances configured with interceptors for automated JWT handling and 401/403 error resolution.
* **Integrations:** Stripe.js for payment processing and Recharts for data visualization.

### Backend & AI Infrastructure
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white)

* **Core API:** Robust REST API server built on Node.js and Express.js.
* **Database:** MongoDB for flexible, scalable NoSQL data storage.
* **Artificial Intelligence:** Google Gemini API (1.5 Flash) implemented for automated image analysis and structural data extraction.
* **Authentication & AuthZ:** Firebase Admin SDK handles server-side user verification, paired with JWT for stateless, secure authorization.

---

## 🛡️ Security Measures

This application implements a multi-layered security strategy to guarantee data integrity and protect user resources:

* **Environment Isolation:** Sensitive credentials (Firebase Config, Stripe Secret, MongoDB URI, Gemini API Key) are strictly maintained in `.env` files and excluded from version control.
* **Token Verification:** All private and administrative server routes mandate a `verifyToken` middleware, validating Firebase ID tokens prior to execution.
* **Role-Based Middleware Guards:** Destructive or elevated actions are heavily guarded by specialized checks (e.g., `verifyAdmin`) to restrict access exclusively to authorized personnel.
* **Automated Session Invalidation:** Client-side `useAxiosSecure` interceptors automatically catch authorization failures, purging invalid sessions and forcing re-authentication.
* **PCI-Compliant Payment Handling:** Stripe handles all financial transactions via `clientSecret` generation, ensuring credit card data never touches our application servers.