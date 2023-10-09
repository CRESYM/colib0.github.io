---
layout: default
title: How to contribute
---

# How to contribute?

If you want to post an article about a component or a test case, please use the following procedure:

## Set up your Git environment and clone the project: 

- Make sure that Git is installed on your computer. (e.g. on windows, you can use Git BASH: [installation link](https://gitforwindows.org/)).

- from a terminal, go to your working directory and folder: `cd ~/Documents/colib`

- Clone the project : `git clone https://github.com/CRESYM/colib0.github.io.git`

- Verify you are on the main branch: `git status` should return `on branch main`

## Create an issue and related branch

- for any post creation, modification or deletion, please create an issue on the github space of the colib project with one of the following tag: **new component**, **new test case**, **modify component**, **modify test case**. A dedicated template should be proposed to you depending on the type of issue.

- create a branch using the issue number: `git checkout -b issue_number_name_of_new_branch`

## Create a post 

- please use the following <a href="{{'pages/templates/modelTemplate' | relative_url}}">model template</a> and <a href="{{'pages/templates/testCaseTemplate' | relative_url}}">test case template</a>.

- put your post in the right pages folder (_pages/models/...)

- you can see the how your changes impact the website by running locally a static site generator such as Jekyll (for more information, see [testing-your-github-pages-site-locally-with-jekyll](https://docs.github.com/fr/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll) )

- before pushing any Authentify yourself using `git config --global user.email *you@example.com*` and `git config --global user.name *Your name*`

## Validation process

- create a merge request and select at least one reviewer among the cresym team. 

- review of your request will not take longer than two weeks.




