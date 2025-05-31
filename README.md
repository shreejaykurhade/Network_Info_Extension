# Speed Checker

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)]([https://github.com/your-username/speed-checker](https://github.com/shreejaykurhade/Network_Info_Extension/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/shreejaykurhade/Network_Info_Extension.svg?style=social)](https://github.com/shreejaykurhade/Network_Info_Extension/stargazers)

A simple and elegant browser extension to check your internet download speed, ping, and display detailed IP information.

---

## Table of Contents

-   [Features](#features)
-   [Installation](#installation)
    -   [Via Chrome Web Store (Coming Soon)](#via-chrome-web-store-coming-soon)
    -   [Loading Unpacked Extension](#loading-unpacked-extension)
-   [Usage](#usage)
-   [How it Works](#how-it-works)

---

## Features

* **Live Download Speed Test:** Get real-time updates on your download speed during the test.
* **Average Download Speed:** Calculates and displays your average download speed.
* **Ping Test:** Measures the latency to a test server.
* **IP Address Display:** Shows your IPv4 and IPv6 addresses.
* **Detailed IP Information:** Provides information about your ISP, city, region, and country.
* **Clean and Intuitive UI:** A user-friendly interface to quickly get your network stats.

---

## Installation

You can install the Speed Checker extension by loading it as an unpacked extension in your browser. Future plans include publishing it to the Chrome Web Store for easier installation.

### Via Chrome Web Store (Coming Soon)

Once published, you'll be able to install the extension directly from the Chrome Web Store. A link will be provided here.

### Loading Unpacked Extension

Follow these steps to load the extension in your Chromium-based browser (e.g., Chrome, Brave, Edge):

1.  **Clone the repository (or download the ZIP):**
    ```bash
    git clone [https://github.com/your-username/speed-checker.git](https://github.com/shreejaykurhade/Network_Info_Extension.git)
    cd Network_Info_Extension
    ```
    If you don't use Git, you can download the repository as a ZIP file from GitHub and extract it to a folder.

2.  **Open Extension Management:**
    * Open your browser.
    * Navigate to `chrome://extensions` (or `edge://extensions` for Edge, `brave://extensions` for Brave).

3.  **Enable Developer Mode:**
    * In the top-right corner of the extensions page, toggle on **"Developer mode"**.

4.  **Load Unpacked:**
    * Click the **"Load unpacked"** button that appears.
    * Browse to the directory where you cloned or extracted the Speed Checker repository (the folder containing `index.html`, `script.js`, `style.css`, and `manifest.json`).
    * Select the folder and click **"Select Folder"**.

5.  **Pin the Extension (Optional):**
    * After loading, the Speed Checker icon (a globe) should appear in your browser's toolbar.
    * Click on the puzzle piece icon (Extensions) in your toolbar.
    * Find "Speed Checker" and click the pin icon next to it to keep it visible in your toolbar for quick access.

---

## Usage

Once the extension is installed and pinned:

1.  Click on the **Speed Checker icon** in your browser's toolbar.
2.  A pop-up will appear and automatically start measuring your internet speed, ping, and fetching your IP information.
3.  The **"Live Speed"** will update as the test progresses.
4.  Once the test is complete (approximately 10 seconds), the **Average Download Speed**, **Ping**, and your **IP details** will be displayed.

---

## How it Works

The Speed Checker extension uses a combination of JavaScript APIs to perform its functions:

* **Download Speed:**
    * It fetches a large test file (`Fronalpstock_big.jpg` from Wikimedia Commons) in chunks.
    * It measures the time taken to download the file and calculates the speed in Mbps (Megabits per second).
    * To get a more robust average, it runs multiple samples over `TEST_DURATION` (10 seconds) and discards the highest and lowest readings before averaging the rest.
* **Ping:**
    * It sends a `HEAD` request to `https://example.com` (via `corsproxy.io` to bypass CORS restrictions).
    * The time taken for this request-response cycle is measured as the ping in milliseconds.
* **IP Information:**
    * **IPv4:** Fetches from `https://api.ipify.org`.
    * **IPv6:** Fetches from `https://api64.ipify.org`.
    * **Detailed IP Info (ISP, City, Region, Country):** Fetches from `https://ipapi.co/json/`.
* **Manifest V3:** The extension adheres to Google's Manifest V3 specifications for enhanced security and performance.

---
