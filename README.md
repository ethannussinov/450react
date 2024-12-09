# 450react - Frontend API for [Django Backend](https://github.com/ethannussinov/450django)

This tutorial will guide you through the process of pulling the **450react** repository, installing necessary dependencies, and running the project locally on both **Windows** and **macOS**. If you're new to React or Git, don't worry—this tutorial will walk you through each step!

## Prerequisites

Before you begin, ensure you have the following tools installed on your computer:

### 1. **Node.js** and **npm** (Node Package Manager)

React requires **Node.js** to run and **npm** to manage dependencies.

- **Download Node.js** (which includes npm) from [here](https://nodejs.org/).
  - Choose the **LTS** version for stability.
  - After installation, verify that Node.js and npm are installed by opening your terminal and running:

    ```
    node --version
    ```

    ```
    npm --version
    ```

    If the version numbers are shown, it means Node.js and npm are installed correctly.

### 2. **Git** (Version Control)

Git is used to pull the project repository from GitHub.

- **Download Git** from [here](https://git-scm.com/downloads) and install it.
- After installation, verify by running:

    ```
    git --version
    ```

    This should display the Git version number.

### 3. **Text Editor** (Optional, for editing the code)

To view and modify the code, you can use any text editor, but we recommend **[VSCode](https://code.visualstudio.com/)** for its ease of use and integration with many tools.

---

## Step-by-Step Guide

### Step 1: Clone the Repository

First, you need to pull the project from GitHub to your local computer.

1. Open **Command Prompt** (Windows) or **Terminal** (macOS).
2. Navigate to the folder where you want to save the project files (e.g., `cd Documents` or `cd Desktop`).
3. Run the following command to clone the repository:

    ```
    git clone https://github.com/ethannussinov/450react.git
    ```

    This will create a folder called `450react` with all the project files inside.

4. Change into the project directory:

    ```
    cd 450react
    ```

---

### Step 2: Install Project Dependencies

Now that the project files are on your computer, you need to install the necessary dependencies using **npm**.

1. Make sure you're in the `450react` directory (if not, use the `cd` command to navigate to it).
2. Run the following command to install all required dependencies:

    ```
    npm install
    ```

    This will install all the libraries and packages needed for the React app to run. You will see a lot of output in the terminal as npm downloads and installs the dependencies.

---

### Step 3: Run the React App Locally

With the dependencies installed, you're ready to run the React app!

1. Run the following command to start the React development server:

    ```
    npm start
    ```

    This will start the server and open the React app in your default web browser. You should see output like this:

    ```
    Compiled successfully!
    You can now view 450react in the browser.
    Local:            http://localhost:3000/
    On Your Network:  http://<your-ip>:3000/
    ```

2. Open your web browser and go to:

    ```
    http://localhost:3000/
    ```

    You should now see your React app running in the browser!

---

### Step 4: Make Changes (Optional)

If you want to modify the app or experiment with it:

1. Open the project folder in your text editor (e.g., **VSCode**).
2. You can find the main app file at `src/App.js`. Open it and make changes to the content.
3. Any changes you make will automatically appear in the browser as long as the development server is running.

---

### Step 5: Troubleshooting

If you encounter any issues, here are a few things to check:

- **Error: Command not found (npm)**: Make sure Node.js and npm are installed correctly. Run `node --version` and `npm --version` to verify.
- **Error: Server not starting**: Ensure you've installed all dependencies by running `npm install` again.

---

For more information about React, visit the official [React Docs](https://reactjs.org/docs/getting-started.html).
