# GreenReward API

> Backend da plataforma **GreenReward** — uma aplicação que premia boas ações sustentáveis com um sistema de pontos resgatáveis em prêmios.

A API gerencia usuários, corporações parceiras, missões (boas ações), pontuação acumulada e resgate de prêmios. Pontos podem ser transferidos entre usuários e convertidos em recompensas oferecidas pelas corporações.

## Domínio

- **User** — pessoa física que executa missões e acumula pontos.
- **Corporation** — empresa parceira que oferece missões e prêmios.
- **Mission** — boa ação proposta (com tags, detalhes e recompensa em pontos).
- **MissionUser** — vínculo de execução de uma missão por um usuário (com status).
- **Award / PrizeRedemption** — prêmios disponíveis e seu resgate via pontos.
- **PointsLog / PointsTransfer** — histórico de pontuação e transferências entre usuários.
- **Address / StoredFile** — entidades de apoio (endereço, arquivos como fotos de comprovação).

## Stack

- **NestJS 10** (Node.js + TypeScript)
- **PostgreSQL** + **Prisma ORM**
- **JWT** + **Passport** para autenticação
- **bcrypt** + pepper para hashing de senha
- **Helmet** para hardening de headers
- **class-validator** / **class-transformer** para validação de DTOs
- **Swagger** (`@nestjs/swagger`) para documentação automática
- **Poku** para testes
- **Docker Compose** para ambiente de desenvolvimento

## Estrutura

```
src/
├── main.ts               # bootstrap (Helmet, Swagger, validação)
├── app.module.ts
├── core/                 # configurações, decorators, guards globais
├── shared/               # helpers e utilitários compartilhados
└── modules/
    ├── auth/             # login, JWT, estratégias Passport
    ├── user/             # cadastro e perfil de usuários
    ├── corporation/      # empresas parceiras
    ├── mission/          # missões (boas ações) e execuções
    └── award/            # prêmios e resgates
prisma/
├── schema.prisma         # modelo de dados completo
├── migrations/
└── seed.ts               # dados iniciais
```

## Rodando localmente

### Pré-requisitos

- Node.js 16+
- Docker + Docker Compose (para subir o Postgres)
- Ou um PostgreSQL local na porta 5432

### Setup

```bash
git clone https://github.com/Rafael-Dagostim/green-reward-api.git
cd green-reward-api
npm install
cp .env.example .env
```

Preencha o `.env`:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/green-rewards
PORT=3000
JWT_SECRET=<segredo-jwt>
PWD_PEPPER=<pepper-para-senhas>
POINT_VALUE_PER_BRL=10
```

### Subir o banco

```bash
docker-compose up -d db
```

### Aplicar migrations e seed

```bash
npm run database:migration:run   # roda migrations + gera client Prisma
npx prisma db seed               # popula com dados iniciais
```

### Rodar a API

```bash
npm run start:dev    # modo watch
# ou
npm run start        # modo normal
```

A documentação Swagger fica disponível em `http://localhost:<PORT>/api`.

## Scripts úteis

| Script | Descrição |
|---|---|
| `npm run start:dev` | API com hot-reload |
| `npm run start:debug` | API em modo debug com watch |
| `npm run build` | Build de produção |
| `npm run start:prod` | Roda a build (`dist/main`) |
| `npm run lint` | ESLint com `--fix` |
| `npm run format` | Prettier nos fontes |
| `npm run test:run` | Roda os testes via Poku |
| `npm run database:migration:generate` | Cria nova migration a partir do schema |
| `npm run database:migration:run:prod` | Aplica migrations em produção |

## Autenticação

A API usa JWT via header `Authorization: Bearer <token>`. O fluxo é:

1. `POST /auth/login` com credenciais → retorna JWT.
2. Anexar o token em todas as requisições autenticadas.

Senhas são armazenadas com bcrypt + pepper (definido em `PWD_PEPPER`).

## Sistema de pontos

A variável `POINT_VALUE_PER_BRL` define quantos pontos equivalem a 1 BRL na hora de calcular recompensas. Toda movimentação de pontos é registrada em `PointsLog` para auditoria; transferências entre usuários geram um `PointsTransfer`.

## Licença

Veja [LICENSE](./LICENSE).
