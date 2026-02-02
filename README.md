# FundedNext Main Account Clone

This is a fullstack web application that replicates the payment flow for FundedNext trading plans, featuring a 70% discount logic and crypto payment options (BTC and USDT-TRC20).

## Features

*   **Instant Funding:** Select from $6k to $100k account sizes.
*   **Discounted Pricing:** 70% discount applied automatically to all plans.
*   **Crypto Payment:** Supports Bitcoin (BTC) and Tether (USDT-TRC20).
*   **User Details:** Collects Name, Email, and Country before payment.
*   **Simulated Verification:** 15-minute payment timer and simulated blockchain confirmation.
*   **MT5 Credential Delivery:** Simulates sending credentials via email upon success.

## Tech Stack

*   **Frontend:** React, Vite, TailwindCSS
*   **Backend:** Node.js, Express
*   **Other:** `qrcode.react` for dynamic QR generation, `concurrently` for running both servers.

## Prerequisites

*   Node.js (v14 or higher recommended)
*   npm

## Installation

1.  Clone the repository.
2.  Install the project dependencies. Run the following commands from the root directory:

    ```bash
    npm install
    npm run install:all
    ```

    The first command installs the root tools, and the second command installs dependencies for both `frontend` and `backend`.

## Running the Application

To start both the backend server and the frontend development server concurrently:

```bash
npm start
```

*   The **Frontend** will be available at `http://localhost:5173` (or the port Vite assigns).
*   The **Backend** runs on `http://localhost:3001`.

## Usage

1.  Open the application in your browser.
2.  Browse the available **Instant Funding** plans.
3.  Click "Select Plan" on your desired account size.
4.  Enter your Name, Email, and Country.
5.  Proceed to payment and select BTC or USDT.
6.  Click "I have sent the funds" to simulate the payment.
7.  Receive your "MT5 Credentials" success message.
