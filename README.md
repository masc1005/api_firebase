# operand

## Como iniciar o projeto

### Backend 

- instale as dependências `yarn` || `npm install`
- preencha as variaveis de ambiente com o modelo apresentado no .env.example
- Crie um projeto dentro do firebase.
  - Va nas configurações do projeto e na aba de service accounts e click em `generate new private key`
- O arquivo .json sera gerado para acessar o ambiente firebase como admin, o insira na raiz do projeto
  - exemplo do arquivo: `NomeDoApp-firebase-adminsdk-HASH.json`
- Insira o caminho do arquivo .json em: `backend/src/config/firebase.ts` na linha `11`
- Para iniciar podemos rodar em ambiente dev com o comando: `yarn dev`
- ou podemos iniciar após o build com os comandos: `yarn tsc` para buildar e depois `yarn start` para executar

### Frontend

- instale as dependências `yarn` || `npm install`
- Insira a url do backend com a porta que digitou no .env, no arquivo: `frontend/src/plugins/axios.js` na linha `04`
- execute com `yarn serve`
