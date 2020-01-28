# FastFeet API (Back-end) - GoStack10

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

-------------------------------------------------------------------------------------

## Usage

### Dependencias:

Dentro da sua pasta rode o comando de sua preferência para instalar as dependencias: "yarn dev" or "npm run dev"

-------------------------------------------------------------------------------------

### Migração:

No arquivo database.js dentro da pasta "src/config" é necessário realizar a configuração do banco de dados:
```
module.exports = {
  dialect: 'postgres', // Qual o banco de dados ex: postgres, mysql
  host: 'localhost', // Local onde o banco está configurado
  username: 'usuario_do_banco',
  password: 'senha_do_usuario',
  database: 'nome_do_banco',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
```
Após as configurações, executar o comando abaixo para criar as tabelas:

YARN: "yarn sequelize db:migrate" ou NPM: "npx sequelize-cli db:migrate"

##### OBS: O banco de dados já deve está criado para realizar os procedimentos acima!.

-------------------------------------------------------------------------------------

### Criar usuário para autenticação:

Rodar execute o comando "yarn sequelize db:seed:all" na raiz do projeto.

Irá criar o usuário com as seguintes crendeciais:

Email: admin@fastfeet.com

Senha: 123456

-------------------------------------------------------------------------------------

## 🚩 Rotas e Autenticação

Veja [AQUI](ROUTES.md) o processo de autenticação do usuário e todas as rotas disponivéis.

-------------------------------------------------------------------------------------

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

Criado por [Paulo Felipe Martins](https://www.linkedin.com/in/paulo-felipe-martins-3940b011a/)
