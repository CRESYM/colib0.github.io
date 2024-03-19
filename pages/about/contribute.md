---
layout: base
title: How to contribute?
---

# Contributing Guidelines for Colib Documentation

Imagine a shared library of dynamic simulations – transparent, high-quality, and packed with real-world applications. We invite you to contribute an article focusing on a component or a test case. Explore the various sections to find guidance on how to make your contribution.  

[Set up your Git environment and clone the project](#set-up-your-git-environment-and-clone-the-project)

[Create a post](#create-a-post)

[Create an issue and related branch](#create-an-issue-and-related-branch)

[Validation process](#validation-process)

## Set up your Git environment and clone the project: <a id="set-up-your-git-environment-and-clone-the-project"></a>

Please follow the prerequisites to begin the project. 

- Install GIT on your system (e.g. Windows, macOS, Linux)
    - Windows: Download the Git for Windows installer from the [official Git Website](https://git-scm.com/download/win) 
    - macOS: Install Git using [Homebrew](https://brew.sh/)
    - Linux: The exact installation process may vary depending on your specific Linux distribution.
        - Debian/Ubuntu: `sudo apt update && sudo apt install git`
    - Verify installation: Open a terminal window and type `git --version`.

- In your terminal, navigate to the "Colib" folder: `cd ~/Documents/colib`

- Clone the project : `git clone https://github.com/CRESYM/colib0.github.io.git`

- Verify you are on the main branch: `git status` should return `on branch main`


## Create a post <a id="create-a-post"></a>

- Please use the following [model template](/pages/templates/modelTemplate) and [test case template](/pages/templates/testCaseTemplate) for your reference.
- Make sure you are posting in the right "pages" folder (pages/models/...)

- You can see the how your changes impact the website by running locally a static site generator such as Jekyll (for more information, see [testing-your-github-pages-site-locally-with-jekyll](https://docs.github.com/fr/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll) )

- Verify your changes: 
    - `git status`: Check the status of your local repository to see what files have been modified, staged, or are untracked.
    - Code review : Review your changes to ensure quality and adherence to standards.
    - Testing     : Run any relevant tests to ensure your changes haven't introduced any regressions or errors.
- Preparing for push:
    - Before pushing any updates, authentify yourself using `git config --global user.email *you@example.com*` and `git config --global user.name *Your name*`


## Create an issue and related branch: <a id="create-an-issue-and-related-branch"></a>

- Create an issue before making any changes as it helps in tracking and managing contributions. 
  
- For any post creation, modification or deletion, please create an issue on the github space of the colib project with one of the following tag: **new component**, **new test case**, **modify component**, **modify test case**. A dedicated issue template should be proposed to you depending on the type of issue.
    
- create a branch using the issue number: `git checkout -b issue_number_name_of_new_branch`



## Validation process <a id="validation-process"></a>

- Create a merge request and select at least one reviewer among the cresym team. 

- Review of your request will be done in a timely manner to manage expectations. 
- Reach out to the reviewers and seek help or clarifications when needed. 






