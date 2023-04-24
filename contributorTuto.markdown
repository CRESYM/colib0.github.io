# How to set up your Git environment and use Git? 

- One way is to use Git BASH (install it from https://gitforwindows.org/) to be able to use Git from a command line (it emulates the "git" command as in a Linux environment).

- Once Git BASH is installed, open a Git BASH command prompt

- Change your working directory to your dedicated folder (for instance: "cd C:/Users/User1/Documents/Colib0", use the tabulation for auto-completion)

- Clone the project in your directory using the HTTPS link from the github deposit.

- To check the existing branches, us "git branch"

- To check for modifications in the deposit, use "git fetch"

- To import last modifications to your local version, use "git pull"

- Use "git diff" to check the difference between the deposit and your local version (use "git diff *file.ext*" for a specific file)

- Use "git status" for general information of your local version

- Authentify yourself using "git config --global user.email *you@example.com*" and "git config --global user.name *Your name*"

- If you have modified a file and want to save the changes, first add it using "git add *file.ext*". To commit the changes (posssibly for multiple files) and leave a comment on the commit, use "git commit -m "comment"" 

- If you want to create a new branch, use "git branch *name of the branch*". If the branch concerns an issue, indicate the issue number as *number_name of the branch*. To move to that branch, use "git checkout *number_name of the branch*".

# How to see how your changes impact the web page? 

- One way is to use Git BASH (install it from https://gitforwindows.org/) to be able to use Git from a command line (it emulates the "git" command as in a Linux environment).

- Once Git BASH is installed, open a Git BASH command prompt.

- Install Ruby and the Jekyll module (link?).

- Check if Jekyll is properly installed using "jekyll -v" (it checks the version you have).

- Go to your project folder and do "bundle exec jekyll serve"

- Open a web browser and go to "localhost:4000"

