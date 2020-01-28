## URL BASE: http://localhost:3333

Dado obrigatório das rotas com autenticação(token):

OBS: Necessário que o token seja passado em todas as requisições (Exceto as rotas 'sessions').

Padrão do header:

Authorization = Bearer {token};

Exemplo:Authorization=Bearer $2y$10$7w0aibkgJEURXBLV8f4AgenbkxIgEJsJlcSCz5GRMZJj

Em todas as rotas é necessário informar o token no header da requisição.
O token adquirido no login irá será passado em um header chamando ‘Authorization’.
Caso não seja informado a rota não aceitará a requisição.

## Rotas:

### Login

Method: POST

END POINT: /sessions

body da requisição: email, password

RETORNO: Dados do usuário e token

---------------------------------

### Destinatários

#### LISTAR TODOS

Method: GET

END POINT: /recipients

RETORNO: Retorna todos os destinatários


#### PEGAR UM

Method: GET

END POINT: /recipients/:id

parametros de rota: id do destinatário

RETORNO: Retorna os dados do destinatário


#### NOVO

Method: POST

END POINT: /recipients

body da requisição obrigatório: name, street, number, state, city, postal_code

body da requisição opcional: complement

RETORNO: Retorna os dados do destinatário cadastrado


#### ATUALIZAR

Method: PUT

END POINT: /recipients

body da requisição obrigatório: name, street, number, state, city, postal_code

body da requisição opcional: complement

RETORNO: Retorna os dados do destinatário atualizado


#### DELETAR

Method: DELETE

END POINT: /recipients/:id

parametros de rota: id do destinatário

RETORNO: Mensagem de sucesso da remoção

----------------------------------------
