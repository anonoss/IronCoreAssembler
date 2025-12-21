# How to Publish MIPSduino to the Marketplace

To make your extension searchable and installable by everyone on VS Code, Cursor, and Antigravity, you need to publish it to the **Visual Studio Marketplace**.

## Prerequisites

1.  **Microsoft Account**: You need a Microsoft account.
2.  **Azure DevOps Organization**: You need to be able to create a Personal Access Token (PAT).

## Step 1: Create a Publisher

1.  Go to the [Visual Studio Marketplace Management Page](https://marketplace.visualstudio.com/manage).
2.  Log in with your Microsoft account.
3.  Click **Create Publisher**.
4.  **Name**: `AnonOSS` (This **MUST** match the `"publisher"` field in your `package.json`).
    *   *If `AnonOSS` is taken, you must change the `"publisher"` field in `package.json` to your new ID.*
5.  **ID**: `anonoss` (This is the unique identifier).

## Step 2: Generate a Personal Access Token (PAT)

1.  Go to [Azure DevOps](https://dev.azure.com/).
2.  Go to your **User Settings** (icon next to your profile picture) > **Personal access tokens**.
3.  Click **+ New Token**.
4.  **Name**: `MIPSduino-Publish`.
5.  **Organization**: Select "All accessible organizations".
6.  **Scopes**: Scroll to the bottom, find **Marketplace**, and select **Acquire** and **Manage**.
7.  Click **Create**.
8.  **COPY THE TOKEN**. You will not see it again.

## Step 3: Publish from Terminal

Once you have your token, run these commands in your terminal:

```bash
cd mips-toolchain/extension

# Install the publishing tool (if not already installed)
npm install -g vsce

# Login (You will be asked to paste your token)
vsce login AnonOSS

# Publish
vsce publish
```

## Step 4: Publish to Open VSX (Optional but Recommended)

For better support in open-source IDEs (like VSCodium), publish to Open VSX.

1.  Go to [open-vsx.org](https://open-vsx.org/) and create an account.
2.  Create a namespace `AnonOSS`.
3.  Generate an access token in your settings.
4.  Run:
    ```bash
    npx ovsx publish -p <YOUR_OPEN_VSX_TOKEN>
    ```
