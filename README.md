<p align="center">
    <img alt="GoStack" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-03/blob/master/.github/logo.png" width="200px" />
</p>

<h1 align="center">
  FastFeet API (Back-end) - GoStack10
</h1>

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

API REST para controle de transportadoras em geral.

### Modulos disponíveis no momento:

Cadastro de destinatários.

### GoStack10 - RocketSeat

![](header.png)

-------------------------------------------------------------------------------------

## Technologies
JavaScript (Node.js)

-------------------------------------------------------------------------------------

## Requirido
- [Node.js LTS version](https://nodejs.org/en/)

-------------------------------------------------------------------------------------

## Instalação

git clone https://github.com/PauloFelipeM/fastfeet-api-go-stack.git

cd /fastfeet-api-go-stack/ -> "npm install" or "yarn install"

Criar um arquivo .env e realizar as configurações necessárias da aplicação de acordo com o arquivo .env_example

-------------------------------------------------------------------------------------

## Usage

### Dependencias:

Dentro da sua pasta rode o comando de sua preferência para instalar as dependencias: "yarn dev" or "npm run dev"

Para modo de debug com VSCode: "yarn dev:debug"

-------------------------------------------------------------------------------------

### Migração:

Criar as tabelas:

YARN: "yarn sequelize db:migrate" ou NPM: "npx sequelize-cli db:migrate"

##### OBS: O banco de dados já deve está criado para realizar os procedimentos acima!.

-------------------------------------------------------------------------------------

### Criar usuário para autenticação:

Rodar execute o comando "yarn sequelize db:seed:all" na raiz do projeto.

Irá criar o usuário com as seguintes crendeciais:

Email: admin@fastfeet.com

Senha: 123456

-------------------------------------------------------------------------------------

### Envio de E-mails:

Para realizar os envios de e-mails é necessário primeiramente configurar o banco de dados REDIS.

Após a instalação, no arquivo .env informar o REDIS_HOST (ip de onde se encontra o banco de dados) REDIS_PORT (Porta do Redis, geralmente 6379)

Para iniciar a fila de envio de e-mails é necessário rodar o comando: "yarn queue".

Após isso o gerenciamento da fila de e-mails será ativado enviado os mesmos.

-------------------------------------------------------------------------------------

## 🚩 Rotas e Autenticação

Veja [AQUI](ROUTES.md) o processo de autenticação do usuário e todas as rotas disponivéis.

-------------------------------------------------------------------------------------

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

Criado por [Paulo Felipe Martins](https://www.linkedin.com/in/paulo-felipe-martins-3940b011a/)
