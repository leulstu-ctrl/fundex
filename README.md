# Fundex Payment Clone

This is a fullstack web application that replicates the payment flow for trading plans, featuring a 70% discount logic and crypto payment options (BTC and USDT-TRC20).

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
2.  Browse the available trading plans. Notice the **70% discount** applied to the prices (e.g., a $599 plan is shown as ~$179.7).
3.  Click **"Select Plan"** on any card.
4.  A payment modal will appear.
5.  Toggle between **Bitcoin (BTC)** and **Tether (USDT - TRC20)** tabs.
    *   **BTC Address:** `bc1q0le434h22m4rawmwzu5gmlncz3exe9dr2mrpz8`
    *   **USDT Address:** `THpsj7RXGncJs6jBbrXGskn7woiKCS8CpQ`
6.  Scan the QR code or copy the address to simulate a payment.

## Project Structure

*   `frontend/`: React application source code.
*   `backend/`: Express server source code.
*   `package.json`: Root configuration to manage both workspaces.
