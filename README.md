# README Documentation
---
## Occassion Invitation Generator
- By [Yussuph Ibitoye](https://linkedin.com/in/ibitoyewaley)
- This is a mini occassion invitation card generator. It needs to be hosted on a webserver with docker-compose installed

---
### Tasks

These are all the that should be done before running the project.

#### 1. Create a dot env (.env) file
* Create a .env file in the parent directory with the following contents (Modify as needed)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.env  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;APP_NAME=<app_name>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;APP_PATH=<app_name>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MYSQL_DATABASE=<database_name>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MYSQL_USER=<mysql_username>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MYSQL_PASSWORD=<mysql_password>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MYSQL_ROOT_PASSWORD=<mysql_root_password>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DB_HOST=<db_container_name>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DB_USERNAME=<mysql_username>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DB_PASSWORD=<mysql_password>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DB_NAME=<db_name> - No space  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DB_SECRET=<db_secret> E.g: 8dgfjhfdfdj2a$15$BTBx1kghhfgfeFuxHT5vKDPjvtSO  
    

#### 3. Run Docker-Compose
* Run docker-compose command to create containers for the following services:
  - php
  - db
  - phpmyadmin
  - nodejs
  - apache
  - web (Invite Gen App)

#### 4. Education is when you read the fine print. Experience is what you get if you don't
* ...

#### 5. Education is when you read the fine print. Experience is what you get if you don't
* ...

---
## Author: 
[oibitoye](https://github.com/oibitoye)
