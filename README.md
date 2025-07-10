## Pré Requisitos

* Node.js 22 ou superior

## Sequencia para criar o projeto

Criar o package com o comando:
npm init -y

-----

## Instalar o Express para gerenciar requisições, rotas e URL's
```
npm i express

```

## Para utilizar o support a Typescript, é necessário instalar os seguintes pacotes
```
npm i --save-dev @types/express
npm i --save-dev @types/node
```
## Instalar o compilador do projeto com Typescript e reiniciar o projeto quando o arquivo é modificado.
```
npm i --save-dev ts-node
```

## Gerar o arquivo de configuração para o Typescript
```
npx tsc --init
```

## Para compilar o arquivo Typescript
```
npx tsc
```

## Executar o arquivo gerado com Node.js
```
node dist/index.js
```

## Para instalar as depêndencias e bibliotecas e conectar no banco de dados com Typescript
```
npm install typeorm --save
npm install reflect-metadata --save
```
## Instalar o driver do banco de dados (Postgre neste caso)
```
npm install pg --save
```

