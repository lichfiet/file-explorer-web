
# file-explorer-web (Main Project Page)

This is the front-end website for my file explorer project. It's a single page web application that allows you to interact with multiple file storage and retrieval apps from one site. It currently supports: *S3 and FTP* as file storage types.

*A live preview of this project is running at  [trevorlichfield.com](https://trevorlichfield.com)*

![fileexplorer](https://github.com/lichfiet/file-explorer-web/assets/143028846/d13e5c49-fcaf-4852-a99b-5a54f19169ee)

This project consists of 4 Repositories:
- [file-explorer-web *(this page)*](https://github.com/lichfiet/file-explorer-web)
- [file-explorer-backend (Node.js Backend API)](https://github.com/lichfiet/file-explorer-backend)
- [file-explorer-infra (AWS Provisioning with Terraform)](https://github.com/lichfiet/file-explorer-infra)
- *file-explorer-k8s (kubernetes coming soon...)*

Each one serves a different purpose, but all work to support the functions of this project.


## Start Development
Before you can start development, you will need a running instance of the [file-explorer-backend](https://github.com/lichfiet/file-explorer-backend) API, as well as a working FTP server or S3 Bucket setup in [file-explorer-infra](https://github.com/lichfiet/file-explorer-infra). I would suggest setting up the S3 bucket for testing because it's much faster, and requires a couple commands to get up and running.

#### Requirements

- Node Version >= 18.0.0
- *docker (soon)*

### Initial Setup

1. **Web Installation**

    First, run the below commands in your linux terminal:

    ```bash
    git clone https://github.com/lichfiet/file-explorer-web.git &&
    cd ./file-explorer-web &&
    npm -i
    mv .env.sample .env
    ```

    And then to start, run `npm run dev`

    At this point, you can open the webpage, but you won't be able to interact with many of the functions. Next, you're going to need to setup the backend API

2. **Backend Installation**

    Follow the instructions in the [file-explorer-backend](https://github.com/lichfiet/file-explorer-backend) repository. It included instructions for getting set up with the S3 or FTP connection methods, whichever is preferred.

### To Do List:
- Clean up code *(In progress always)*
- Store S3 and SFTP config information in SQL db and retrieve based on user
- SSL for production (Might do SSL through Kubernetes and EKS and leave backend using http)
- Optimize the FTP Wrapper to use the "exists" function. Looping through the file array is slow.
- Cleanup SFTP code make easier to use (It's a mess, not sure how it works but it works on my machine)
- Change S3 method to use postgres to index files and folder, and change S3 keys to UUIDs
- Create a scalable service for handling file uploads, and file downloads.
- API Reference
- Auth with api key or jwt token verification.
