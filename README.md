# Casa do Hambúrguer

Projeto full stack para uma hamburgueria, com cardápio digital, cadastro de usuários e carrinho de compras. O sistema ainda está em desenvolvimento.

## Funcionalidades atuais

- Cadastro e login de usuários
- Consulta de produtos
- Adição, remoção e alteração de quantidades no carrinho
- Exclusão de produtos por administradores

O fluxo completo de pedidos ainda está em desenvolvimento.

## Tecnologias

- **Front-end:** React, TypeScript e Tailwind CSS
- **Back-end:** Node.js e Express
- **Banco de dados:** PostgreSQL e Prisma
- **Autenticação:** JWT, cookies e bcrypt

## Como executar

É necessário ter Node.js, npm e PostgreSQL instalados.

1. Clone o repositório:

```bash
git clone https://github.com/Pietro-tms/casa-do-hamburguer.git
cd casa-do-hamburguer
```

2. Crie o arquivo `BACKEND/.env` com as variáveis `DATABASE_URL` e `JWT_SECRET`.

3. Inicie o back-end:

```bash
cd BACKEND
npm install
npx prisma migrate dev
npx prisma generate
npm run dev
```

4. Em outro terminal, inicie o front-end:

```bash
cd FRONTEND
npm install
npm run dev
```

## Status

Em desenvolvimento. O projeto ainda não possui versão publicada para uso em produção.
