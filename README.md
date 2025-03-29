# Sveltekit Starter Kit (Svelte 5)

## Technolgies
- redis
- pocketbase

## Features 
- Login with username or password 
- Session management with redis
- App structure with protected routes /app/* 

## Prerequisit 
### For local DEV
Make sure you have redis and pocketbase  installed 
### No Redis or Pocketbase
Install Docker Desktop and run the following command in the root of your project
```sh
    docker compose up -d 
```
Check pocketbase online docs how to setup pocketbase admin user. 

## Install 
```sh
# -- Use degit  
pnpm add degit -g 
degit <this repo> my-project-name

pnpm dlx jsr add @nelreina/redis-client

cp .env.example .env
pnpm run dev
```
