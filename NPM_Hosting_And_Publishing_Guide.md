# Guide: How to Publish and Access Private Packages (NPM & Bitbucket)

This document provides a comprehensive step-by-step guide on how to publish, access, and share your project privately using **npm** and **Bitbucket**, along with a detailed comparison of using a **Public npm Account** (Pros vs. Cons).

---

## Table of Contents
1. [Method 1: Publishing a Private Package to npm (Paid)](#method-1-publishing-a-private-package-to-npm-paid)
2. [Method 2: Installing Directly from Private Bitbucket (Free)](#method-2-installing-directly-from-private-bitbucket-free)
3. [Analysis: Pros & Cons of Public npm Packages](#analysis-pros--cons-of-public-npm-packages)
4. [Summary Recommendations](#summary-recommendations)

---

## Method 1: Publishing a Private Package to npm (Paid)

This method publishes your package directly to the npm registry as a private, scoped package. Only authorized users or team members can install it.

### Step 1: Get a Paid npm Account
1. Visit [npmjs.com](https://www.npmjs.com/) and register for an account.
2. Upgrade to a paid plan:
   * **npm Pro** (for individual developers who want private packages).
   * **npm Teams/Enterprise** (for organizations).

### Step 2: Log in to npm via CLI
Open your terminal inside your project directory and login:
```bash
npm login
```
Provide your username, password, email, and the OTP (One-Time Password) sent to your authenticator app or email.

### Step 3: Configure `package.json`
Your package **must be scoped** (prefixed with your npm username or organization name) to be published privately.
1. Open your project's `package.json`.
2. Update the `name` field to include your scope (e.g., `@your-username/package-name`).
3. Add `publishConfig` to enforce restricted (private) access:

```json
{
  "name": "@your-npm-username/my-project",
  "version": "1.0.0",
  "private": false,
  "publishConfig": {
    "access": "restricted"
  }
}
```

> [!IMPORTANT]
> The `"access": "restricted"` flag guarantees that the package is uploaded securely as a private package and is not public.

### Step 4: Publish to npm
Run the publish command:
```bash
npm publish
```

### Step 5: Install the Private Package in Another Project
To install this package elsewhere, the developer/server must first log in using `npm login` with an account that has read permissions, and then run:
```bash
npm install @your-npm-username/my-project
```

---

## Method 2: Installing Directly from Private Bitbucket (Free)

If you don't want to pay for npm, you can bypass the npm registry entirely and pull the code directly from a private Bitbucket repository using Git.

### Step 1: Push Your Code to Bitbucket
Make sure your project is committed and pushed to a private repository on Bitbucket:
`git@bitbucket.org:username/my-private-repo.git`

### Step 2: Configure Authentication (Required for Installation)
For npm to pull the package from a private Bitbucket repository, the machine doing the installation needs authorization.

#### Option A: SSH Key Setup (Recommended)
1. Generate an SSH Key pair on your machine.
2. Add the public SSH Key to your **Bitbucket Account Settings -> SSH Keys**.
3. Test your SSH connection:
   ```bash
   ssh -T git@bitbucket.org
   ```

#### Option B: App Password / Access Token (For HTTPS)
1. Go to **Bitbucket Settings -> Personal Access Tokens** or **App Passwords**.
2. Create a new token with `Read` access to repositories.

### Step 3: Install the Package
Run the npm install command pointing directly to your Git repository:

* **Using SSH (Recommended):**
  ```bash
  npm install git+ssh://git@bitbucket.org:username/my-private-repo.git
  ```
  *(You can target a specific branch or version using tags: `...repo.git#main` or `...repo.git#v1.0.0`)*

* **Using HTTPS with App Password / Access Token:**
  ```bash
  npm install git+https://username:app-password@bitbucket.org/username/my-private-repo.git
  ```

---

## Analysis: Pros & Cons of Public npm Packages

If you choose to use a standard **Public npm Account** (which is completely free) to publish your package, here are the advantages and severe risks involved:

### 🌟 Pros (Fayde)
1. **Completely Free:** No subscription fees for unlimited public packages.
2. **Zero Auth Configuration:** Anyone can run `npm install package-name` instantly. No need to manage SSH keys, npm logins, or access tokens on CI/CD platforms or deployment servers.
3. **Open-Source Contribution:** Excellent if you want the community to use, test, and improve your code.

### ⚠️ Cons (Nuksan)
> [!WARNING]
> Hosting commercial or proprietary source code on a public npm registry presents critical security and IP risks.

1. **Intellectual Property (IP) Exposure:** Your entire compiled and source code is visible and downloadable by anyone on the internet. Anyone can copy your logic or replicate your product.
2. **Accidental Secrets/Credential Leaks:** If you accidentally bundle configuration files, API keys, private tokens, or `.env` files, they will be instantly indexed and public.
3. **Loss of Control:** Anyone can clone, modify, or republish your package without your permission.

---

## Summary Recommendations

| Use Case | Recommended Solution | Cost |
| :--- | :--- | :--- |
| **Open Source** (Public Utility) | **Public npm Account** | Free |
| **Internal Business Logic** (Secure & Private) | **Direct Bitbucket Install (Method 2)** | Free |
| **Corporate Package Distribution** (Standardized) | **Private npm Account (Method 1)** | Paid ($7/user/month) |

---

## 🔒 Security Considerations for this Application

To ensure your application's source code and credentials remain secure, apply the following best practices:

### 1. Frontend Secret Protection (Vite Env Variables)
* **Risk:** Variables starting with `VITE_` are bundled into the client-side JavaScript. Users can read them by inspecting the browser source.
* **Best Practice:** Do not store sensitive backend keys, databases connection strings, or API secrets in `.env` files. Use `.env` only for public URLs, environment names, or toggles.

### 2. Secure Auth Token Storage
* **Risk:** Storing JWT/auth tokens in `localStorage` makes them readable via JavaScript, posing a risk during Cross-Site Scripting (XSS) attacks.
* **Best Practice:** Consider utilizing **HttpOnly Cookies** (configured server-side) for secure token management. If `localStorage` must be used, enforce strict output sanitization in React to prevent XSS.

### 3. Exclude Sensitive Files from Version Control
* **Risk:** Leaking local environment configs (`.env`) to Git/Bitbucket repositories.
* **Best Practice:** Ensure your `.gitignore` includes local configurations:
  ```text
  .env
  .env.local
  .env.development.local
  .env.production.local
  ```

### 4. Regularly Audit Dependencies
* **Risk:** Vulnerabilities in third-party npm packages.
* **Best Practice:** Periodically run:
  ```bash
  npm audit
  ```
  to identify and patch vulnerable libraries.
