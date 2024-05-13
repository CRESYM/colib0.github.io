---
layout: base
title: How to contribute?
---

# Contributing Guidelines for Colib Documentation

Imagine a shared library of dynamic simulations – transparent, high-quality, and packed with real-world applications. We invite you to contribute an article focusing on a component or a test case. Explore the various sections to find guidance on how to make your contribution.  

[Set up your Git environment and clone the project](#set-up-your-git-environment-and-clone-the-project)

[Create an issue and related branch](#create-an-issue-and-related-branch)

[Create a post](#create-a-post)

[Validation process](#validation-process)

## Set up your Git environment and clone the project: <a id="set-up-your-git-environment-and-clone-the-project"></a>

Please follow the prerequisites to begin the project. 

- Install GIT on your system (e.g. Windows, macOS, Linux)
    - Windows: Download the Git for Windows installer from the [official Git Website](https://git-scm.com/download/win) 
    - macOS: Install Git using [Homebrew](https://brew.sh/)
    - Linux: The exact installation process may vary depending on your specific Linux distribution.
        - Debian/Ubuntu: `sudo apt update && sudo apt install git`
    - Verify installation: Open a terminal window and type `git --version`.

- Refer to the [README file](https://github.com/CRESYM/colib0.github.io#) to follow the installation guide and steps for setting up the website locally.

## Create an issue and related branch: <a id="create-an-issue-and-related-branch"></a>

- Create an issue before making any changes as it helps in tracking and managing contributions. 
  
- For any [post creation](https://github.com/CRESYM/colib0.github.io/issues/new?assignees=GJCRESYM%2C+matoubongrain&labels=enhancement%2Cnew+component&projects=Colib0&template=Add_Model_TestCases.yml&title=%5BModel%2F+Test+case+Name%5D%3A+), [modification](https://github.com/CRESYM/colib0.github.io/issues/new?assignees=GJCRESYM%2C+matoubongrain&labels=enhancement%2Cmodify+component&projects=Colib0&template=Modify_Model_TestCases.yml&title=%5BName%2FID+of+the+model%2F+test+case+to+be+improved%5D%3A+), [evaluation](https://github.com/CRESYM/colib0.github.io/issues/new?assignees=GJCRESYM%2C+matoubongrain&labels=enhancement%2Cbug%2Cevaluate+component&projects=Colib0&template=Evaluate.yml&title=%5BName%2FID+of+the+model%2F+test+case+to+be+evaluated%5D%3A+) or [reporting a bug](https://github.com/CRESYM/colib0.github.io/issues/new?assignees=GJCRESYM%2C+matoubongrain&labels=bug%2Ctriage&projects=Colib0&template=Report_Bug.yml&title=%5BBug%5D%3A+), please create an issue on the github space of the Colib project. A dedicated issue template should be proposed to you depending on the type of issue.
    
- Create a new branch with a naming convention: `issue_number_name_of_new_branch` (e.g- 116_modify_how_to_contribute)
  
## Create a post <a id="create-a-post"></a>

- Please use the following [model template](/pages/templates/modelTemplate) and [test case template](/pages/templates/testCaseTemplate) for your reference.
  
- Make sure you are posting in the right "pages" folder (pages/models/...)
  
- Refer to [Author's guidelines](/pages/about/authorGuidelines) and [Electrical, Electronics and Control notations and conventions](/pages/about/notationAndConventions) before creating a post.

- You can see the how your changes impact the website by running locally a static site generator such as Jekyll (for more information, see [testing-your-github-pages-site-locally-with-jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll) ) or refer to [README file](https://github.com/CRESYM/colib0.github.io#) for setting up the website locally.

- Verify your changes: 
    - `git status`: Check the status of your local repository to see what files have been modified, staged, or are untracked.
    - Code review : Review your changes to ensure quality and adherence to standards.
    - Testing     : Run any relevant tests to ensure your changes haven't introduced any regressions or errors.
  
- Preparing for push:
    - Push your updated branch to [Colib repository](https://github.com/CRESYM/colib0.github.io/branches).


## Validation process <a id="validation-process"></a>

- Create a pull request to the **dev** branch (**Note: pull requests are not accepted to the main branch**) and select at least one reviewer from the cresym team.

- Review of your request will be done in a timely manner to manage expectations. 
  
- Reach out to the reviewers and seek help or clarifications when needed. 






