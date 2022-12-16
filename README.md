# FastClap

FastClap is an all-in-one software to help assistant directors to count their scenarios.

It's a WebApp on which you can create an account to gain access to our services :
we provide the simplest way to count your scenario !

## How does it work?

Welcome to the FastClap Backend repository !
You can see here the FastClap REST API that we built to make our Epitech Innovative Project.
You can read our code to understand how we work or either to implement our API in your own application.

## Getting Started

### Requirement

Before starting, I consider that you have several things installed on your computer :
- Docker
- Docker Desktop (macOS only)
- Git
- NodeJS

### Installation

First, you'll need to clone the GitHub repository :
```bash
# via SSH (recommended)
git clone git@github.com:FastClap/forward-backend.git

# via HTTPS
git clone https://github.com/FastClap/forward-backend.git
```

Then, you'll need to install the dependencies.
Move to the root of the repository and run :
```bash
npm install
```

### Quickstart

**Great job !** All the dependencies are downloaded.
Now move to the `dev/` folder :
```bash
cd dev
```

You'll find a `env.example` file that contains all the secrets you'll need to make your app working.
It should look like that :
```bash
NODE_ENV=development

APP_HOST=localhost
APP_PORT=3000

# Put on the following line the name of the database container, neither localhost nor 127.0.0.1
POSTGRES_HOST=database
POSTGRES_PORT=5432
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
```

**Copy this file and rename it as `.env`**

You can see that three fields are empty (`POSTGRES_USER`, `POSTGRES_PASSWORD` and `POSTGRES_DB`).
Choose your database superuser credentials and write them in the `.env` file. (They must be kept warn !)

And now, let's run the Docker containers :
```bash
docker-compose --profile all up
```

If you have any error (especially already in use error), delete all your containers, images and volumes ([Docker documentation](https://docs.docker.com/engine/reference/commandline/rm/)) and stop running postgresql services.
### Usage

**[COMING SOON]** You can access the platform by this link :  [http://localhost:3000/](http://localhost:3000/)</br></br>
Now that your project is running on port 3000, you can check that the FastClap API is up by entering [http://localhost:3000/healthcheck](http://localhost:3000/healthcheck) in your browser.</br></br>
You can also have access to the **documentation** at the following address: [http://localhost:3000/docs](http://localhost:3000/docs) (the error codes, the responses bodies and the requested bodies are not yet set up). If you need the JSON format of the API Documentation, just enter [http://localhost:3000/docs-json](http://localhost:3000/docs-json) in your browser.

## Get involved

You're invited to join this project ! Check out the [contributing guide](./CONTRIBUTING.md).

If you're interested in how the project is organized at a higher level, please contact any team member.

## Our FastClap team :heart:

Fullstack
| [<img src="https://github.com/victorpalle.png?size=85" width=85><br><sub>[Victor PALLE]</sub>](https://github.com/victorpalle)
| :---: |

Frontend Developers
| [<img src="https://github.com/Clement-Fernandes.png?size=85" width=85><br><sub>[Clément FERNANDES]</sub>](https://github.com/Clement-Fernandes) | [<img src="https://github.com/maxime-carabina.png?size=85" width=85><br><sub>[Maxime CARABINA]</sub>](https://github.com/maxime-carabina) | [<img src="https://github.com/ValentinDurieux.png?size=85" width=85><br><sub>[Valentin DURIEUX]</sub>](https://github.com/ValentinDurieux)
| :---: | :---: | :---: |

UX/UI
| [<img src="https://github.com/Clement-Fernandes.png?size=85" width=85><br><sub>[Clément FERNANDES]</sub>](https://github.com/Clement-Fernandes)
| :---: |

Backend Developers
| [<img src="https://github.com/martinvanaud.png?size=85" width=85><br><sub>[Martin VANAUD]</sub>](https://github.com/martinvanaud) | [<img src="https://github.com/Gurvan-Le-Letty.png?size=85" width=85><br><sub>[Gurvan LE LETTY]</sub>](https://github.com/Gurvan-Le-Letty) | [<img src="https://github.com/tibo-pdn.png?size=85" width=85><br><sub>[Tibo PENDINO]</sub>](https://github.com/tibo-pdn)
| :---: | :---: | :---: |

Devops/Ci/Cd
| [<img src="https://github.com/martinvanaud.png?size=85" width=85><br><sub>[Martin VANAUD]</sub>](https://github.com/martinvanaud)
| :---: |
