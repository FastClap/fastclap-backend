# FastClap

FastClap is an all-in-one software to help assistant directors to count their scenarios.

## How does it work?

It's a WebApp on which you can create an account to gain access to our services :

We provide the simplest way to count your scenario !

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
Put your database superuser credentials in the `.env` file. (They must be kept warn !)

And now, let's run the Docker containers :
```bash
docker-compose --profile all up
```

### Usage

**[COMING SOON]** You can access the platform by this link :  [http://localhost:3000/](http://localhost:3000/)
**[COMING SOON]** Now that your project is running on port 3000, you can check that all is good by entering [http://localhost:3000/healthcheck](http://localhost:3000/healthcheck) in your browser.</br>
**[COMING SOON]** You can also have access to the documentation at the following address:  [http://localhost:3000/docs](http://localhost:3000/docs)

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
