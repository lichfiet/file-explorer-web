
# file-explorer-web (Main Project Page)

This is the front-end website for my file explorer project. It's a single page web application that provides a UI to interact with S3 Object storage.

*A live preview of this project is running at  [files.trevorlichfield.com](https://files.trevorlichfield.com)*

![File Explorer](https://github.com/user-attachments/assets/a98f3e9a-960f-410c-b438-a744df0a48de)

This project consists of 5 Repositories:
- [file-explorer-web *(this page)*](https://github.com/lichfiet/file-explorer-web)
- [file-explorer-backend (Backend API)](https://github.com/lichfiet/file-explorer-backend)
- [file-explorer-thumbnailer (FFmpeg Thumbnailer)](https://github.com/lichfiet/file-explorer-thumbnailer)
- [file-explorer-infra (AWS Provisioning with Terraform)](https://github.com/lichfiet/file-explorer-infra)
- *WIP [file-explorer-k8s (Kubernetes Deployment w/ Gitops & Observability)](https://github.com/lichfiet/file-explorer-k8s)*

Each one serves a different purpose, but all work to support the functions of this project.


## Start Development
Before you can start development, you will need a to have Docker and Docker Compose installed, as well as an accessible S3 Bucket setup in [file-explorer-infra](https://github.com/lichfiet/file-explorer-infra).


#### Requirements

- Node Version >= 18.0.0
- Docker

### Initial Setup

1. **Web Installation**

    First, run the below commands in your linux terminal:

    ```bash
    git clone https://github.com/lichfiet/file-explorer-web.git &&
    cd ./file-explorer-web &&
    npm -i
    cp .env.sample .env
    ```

    And then to start, run `npm run dev`

    This will start the web interface using Vite, for hot reloading. You'll likely be greeted with an error however, so you'll need to proceed to the next step. 
    
    *(Note: If you would like to only develop the front-end, there is a live instance of the backend running at [https://explorer.trevorlichfield.com](https://explorer.trevorlichfield.com). You'll need to edit the API url in the .env file to point to this instance)*

2. **S3 Bucket Setup**

    Follow the instructions in [file-explorer-infra](https://github.com/lichfiet/file-explorer-infra) to generate access credentials for AWS. If you plan on using SFTP, you can skip this step.

3. **Backend & Thumbnailer Setup**

    If you plan on running the backend and thumbnailer locally, this repository contains a docker-compose file that will start the backend, a thumbnailer container, redis (for thumbnail caching), and a To Be Implemented Postgres database. (Adding support for Minio soon because AWS).

    

### To Do List:
- **Clean up code *(In progress always)***
- **Migrate styles to Tailwind *(Next)***
- *API Reference*
- *Build custom file tree component (currently using a library)*
- *Better mobile experience*
- *Drag and drop move to folder*
- *Add pagination to file output and storage*
- *Auth with api key or jwt token verification.*
- ~~Optimize the SFTP Wrapper and code, make easier to use (It's a mess, not sure how it works but it works on my machine)~~ *Remove SFTP support*
- ~~Create a scalable service for handling file uploads, and file downloads.~~ *Using presigned urls for now*
- ~~Add folders~~
