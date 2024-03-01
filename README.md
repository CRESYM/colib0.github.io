# Installation Guide

## 1. Install Ruby 2.6.5
- Go to [RubyInstaller](https://rubyinstaller.org/downloads/archives/) and download the Ruby+Devkit 2.6.5 installer.

## 2. Install Gem
- Visit [RubyGems](https://rubygems.org/pages/download?locale=fr) and follow the instructions to install Gem.

## 3. Install GCC for Jekyll
- Download and install GCC for Jekyll from [SourceForge](https://sourceforge.net/projects/mingw/).

## 4. Install Make for Jekyll
1. Open a new PowerShell terminal.
2. Run the following lines written in the quickstart on [Scoop](https://scoop.sh/#/) (check if the commands below are the same on the website):
    ```powershell
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
    ```
    Close the terminal after running the above commands.
3. Search for Make using the search bar on [Scoop](https://scoop.sh/#/).
4. Open a new PowerShell terminal.
5. Execute the following command to install Make:
    ```powershell
    scoop install main/make
    ```

## 5. Install Git
- Download and install Git from [Git Official Website](https://git-scm.com/downloads).

## 6. Install Visual Studio Code (Recommended)
- Download and install Visual Studio Code from [VSCode Official Website](https://code.visualstudio.com/download).

Follow these steps to install the necessary tools for Jekyll and additional recommended tools.

# Additional Steps for Website Setup

## 1. Use Git to Clone the Work on Your Computer
- Open a terminal or PowerShell window.
- Navigate to the directory where you want to clone the website's work.
- Run the following command:
    ```bash
    git clone <repository_url>
    ```
    Replace `<repository_url>` with the URL of the repository.

## 2. Open the Website's Folder with VSCode
- Open Visual Studio Code (VSCode).
- Use the menu or shortcut to open the folder where you cloned the website's work.

## 3. Open a New Terminal
- In VSCode, open a new terminal window.

## 4. Run Bundle Install
- In the terminal, navigate to the website's folder.
- Run the following command to install dependencies:
    ```bash
    bundle install
    ```

## 5. Run Bundle Exec Jekyll Serve
- After installing dependencies, run the following command to serve the website locally:
    ```bash
    bundle exec jekyll serve
    ```

## Final Step: Visit the Website
- Once the Jekyll server is running, visit the website in your browser at [http://localhost:4000](http://localhost:4000).

## Troubleshooting:
- If you encounter the error message "Bundle command not found," run the following command to install Bundler:
    ```bash
    gem install bundler
    ```
    Then, retry running `bundle install`.
