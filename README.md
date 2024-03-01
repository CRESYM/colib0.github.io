# Collaborative Open-Source Dynamic Simulation Library

The power system and energy systems at large experience a paradigm shift with many novel , active components connected. Appraising the behavior and reactions of such new items is critical for network operators to simulate and anticipate system operation, and for this, available, reliable up to date and possibly specifically targeted component models are required.

At present, on one hand, operators manage to gather and build pragmatically a model database of the components directly connected to their network. They remain however blind or use rough proxies to cope with:
-	Components indirectly connected (e.g. to neighboring, coupled networks, such as electricity or gas grids ; and/or quite likely in a soon future: across sectors )
-	Future connected ones (components at design stage, latest technology, and proprietary manufacturer models). 
On the other hand, research also suffers from the lack of all the necessary component models and is slowed down by the effort required to circumvent it.

They both face the need for a collaborative shared dynamic simulation library that would benefit to all by its high quality, transparency of model equations, and concrete applications (real test cases).

In this Colib workspace, we aim at addressing  power systems components, networks, and small and large test cases for steady-state and dynamic stability studies.
For each of them, the description of the object is presented on one side, and the links to open source implementations with indicators on the quality on the other side.

Want to contribute? Go see: [How to contribute page](/about/contribute)


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

Follow these steps to install the necessary tools for Jekyll.