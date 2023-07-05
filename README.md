<br />
<div align="center">
  <a href="https://github.com/oslabs-beta/Protract">
    <img src="src/client/assets/protract-readme-logo.png" alt="Logo">
  </a>

<h3 align="center">Protract</h3>

  <p align="center">
    <strong>Supercharge your Angular development process</strong>
    <br />
    <a href="https://protract.dev"><strong>Build Your Angular App »</strong></a>
    <br />
    <a href="https://github.com/oslabs-beta/Protract/issues">Report Bug</a>
    ·
    <a href="https://github.com/oslabs-beta/Protract/issues">Request Feature</a>
  </p>
</div>

<div align="center">

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)
</div>

<details open>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about">About Protract</a></li>
       <li><a href="#features">Features</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#running-online">Running Online</a></li>
        <li><a href="#running-locally">Running Locally</a></li>
      </ul>
    </li>
    <li><a href="#run-exported-project">Run Exported Project</a></li>
    <li><a href="#contributions">Contributions</a></li>
    <li><a href="#contributors">Contributors</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## <h1>About Protract</h1>

Protract is an accessible developer tool built from the ground up to assist with the blueprinting of Angular applications, simplifying the process of creating a hierarchy of components and allowing developers to quickly create the structure of their app so they can start coding faster.

[Here](https://medium.com/) is a medium article describing the philosophy behind Protract.

Visit our website at: https://Protract.dev

<img src="./src/client/assets/gifs/Protract-demo.gif">

## <h1>Features</h1>

### ❗Drag and Drop
Drag and drop functionality to create and organize components
<br>
<br>

### ❗Custom Components
Custom components declared by the user
<p align="center">
<img width="600" src="./src/client/assets/gifs/Create-demo.gif">
</p>
<br>

### ❗Live Updates
Real-time visualization of code for each custom component, file structure of directory, and hierarchy of components
<p align="center">
<img width="600" src="./src/client/assets/gifs/Tree-demo.gif">
</p>
<br>

### ❗Context Switch
Change current component canvas by clicking on the component in file directory or component tree
<br>
<br>

### ❗Cloud Storage
Create, save, load, and delete projects
<p align="center">
<img width="600" src="./src/client/assets/gifs/Projects-demo.gif">
</p>
<br>

### ❗Easy Export
Export projects to use in a newly created Angular project
<p align="center">
<img width="600" src="./src/client/assets/gifs/Export-demo.gif">
</p>
<br>
<br>

### ❗Access Anywhere
In-browser functionality
<br>
<br>

## <h1>Getting Started</h1>

### <h2>Running Online</h2>

You can start using Protract by visiting the website at [protract-link].
To save and load projects you will need to make an account and login. Once your blueprint is completed you can hit the export button on the canvas.

### <h2>Running Locally</h2>
If you would like to run with Docker,

```
 docker pull protractors/protract-prod:latest
```

```
docker run -p <your-preferred-port>:3000 protractors/protract-prod
```

If you would like to use the app by forking and cloning:

Fork this repository to your own GitHub account.
Clone the forked repository to your machine

```
git clone https://github.com/<your-github-username>/protract.git
```

Create a .env in the root directory that contains 2 variables,

```
MONGO_URI=<your-mongo-uri>
mode=production
```

Navigate to the root project directory and install dependencies.

```
cd protract
npm install
```

If you would like to run in development mode, `npm run dev` and visit localhost:3000.

If you would like to run in production mode, `npm run build ` and then `npm start` and visit localhost:3000.

## <h1>Run Exported Project</h1>

In your terminal,

```
npm install -g @angular/cli
```

To install the Angular CLI if it has not already been installed.

```
ng new <your-project>
```

To start your new project.

In your file explorer, extract the zip file and replace the directory’s app folder with the one contained in the zip file.

## <h1>Contributions</h1>
We welcome contributions from the community. If you are interested in contributing to this project, please refer to our <a href="./contributing.md">Contributing Guidelines</a> for more information.


## <h1>Contributors</h1>


|     Developed By      |                                                                                                                                                         |                                                                                                                                                             |
| :-------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------: |
|    Don Do    |   [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Donlebon)    |         [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/)         |
|       Vander Harris       |      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/vdharris/)       |                             [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vanderharris/)                              |
|  Peter Tran  |     [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tranpeter95)      |         [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/peter-tran-6574b81b9/)          |
|     Steven Vaughn    |     [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Svaughn4418)     |         [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/)         |
|      Douglas Yao      |      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/douglas-yao)      |          [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/douglas-yao/)          |

## <h1>License</h1>
<p>Protract is licensed under the terms of the <a href="./LICENSE">MIT license</a>.</p>

