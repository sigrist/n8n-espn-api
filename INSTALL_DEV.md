# Instalação para Desenvolvimento

Este guia explica como instalar e testar o node ESPN API localmente antes de publicar no npm.

## Pré-requisitos

- Node.js 18.x ou superior
- n8n instalado e funcionando
- Git

## ⚠️ Problema Comum: devDependencies não instaladas

Se ao rodar `npm install` você vê apenas 1 pacote instalado em vez de ~560, é porque as devDependencies não foram instaladas.

**Solução:**

```bash
# Opção 1: Forçar instalação das devDependencies
npm install --include=dev

# Opção 2: Reinstalar do zero (recomendado)
rm -rf node_modules package-lock.json
npm install

# Opção 3: Desabilitar modo produção (se NODE_ENV=production)
unset NODE_ENV
npm install
```

## Método 1: npm link (Recomendado)

Este método cria um link simbólico, facilitando o desenvolvimento:

### 1. Compilar o projeto

```bash
cd ~/n8n-espn-api
npm install
npm run build
```

### 2. Criar link global

```bash
npm link
```

### 3. Linkar no N8N

```bash
cd ~/.n8n
npm link @paulo.sigrist/n8n-nodes-espn-api
```

### 4. Reiniciar o N8N

```bash
n8n start
```

### Atualizar após mudanças

```bash
cd ~/n8n-espn-api
npm run build
# Reinicie o n8n
```

## Método 2: Instalação Local

Instalar diretamente do diretório:

```bash
# 1. Compilar
cd ~/n8n-espn-api
npm install
npm run build

# 2. Instalar no N8N
cd ~/.n8n
npm install ~/n8n-espn-api

# 3. Reiniciar
n8n start
```

## Método 3: Instalação via GitHub

Instalar diretamente do repositório GitHub:

```bash
cd ~/.n8n

# Instalar da branch main
npm install sigrist/n8n-espn-api

# Reiniciar
n8n start
```

## Script Automatizado

Use o script fornecido para facilitar:

```bash
cd ~/n8n-espn-api
chmod +x install-dev.sh
./install-dev.sh
```

O script oferece opções interativas para:
1. npm link (recomendado)
2. Instalação local direta
3. Apenas mostrar instruções

## Verificação

Após instalar, verifique se o node está disponível:

1. Abra o N8N no navegador
2. Crie um novo workflow
3. Procure por "ESPN API" nos nodes disponíveis
4. Deve aparecer com o ícone ESPN

## Troubleshooting

### Erro: `tsc: not found`

**Problema:** As devDependencies não foram instaladas.

**Solução:**

```bash
cd ~/n8n-espn-api

# Ver quantos pacotes foram instalados
npm list --depth=0

# Se mostrar apenas 1 pacote, reinstale:
rm -rf node_modules package-lock.json
npm install

# Deve instalar ~560 pacotes
# Agora compile:
npm run build
```

### Node não aparece no N8N

```bash
# Verificar se está instalado
cd ~/.n8n
npm list @paulo.sigrist/n8n-nodes-espn-api

# Verificar logs do n8n
n8n start --log-level debug
```

### Erro ao importar

```bash
# Reconstruir o projeto
cd ~/n8n-espn-api
rm -rf dist node_modules
npm install
npm run build

# Reinstalar no n8n
cd ~/.n8n
npm uninstall @paulo.sigrist/n8n-nodes-espn-api
npm link @paulo.sigrist/n8n-nodes-espn-api  # ou npm install ~/n8n-espn-api
```

### Mudanças não refletem

Se você fez mudanças mas elas não aparecem:

```bash
# 1. Recompilar
cd ~/n8n-espn-api
npm run build

# 2. Limpar cache do n8n (se necessário)
rm -rf ~/.n8n/cache

# 3. Reiniciar n8n
n8n start
```

### NODE_ENV=production bloqueando devDependencies

```bash
# Verificar
echo $NODE_ENV

# Se mostrar "production", desabilite:
unset NODE_ENV
npm install
```

## Desinstalação

### Se usou npm link:

```bash
cd ~/.n8n
npm unlink @paulo.sigrist/n8n-nodes-espn-api

cd ~/n8n-espn-api
npm unlink
```

### Se usou npm install:

```bash
cd ~/.n8n
npm uninstall @paulo.sigrist/n8n-nodes-espn-api
```

## Testando o Node

### Exemplo 1: Obter Placar da NFL

1. Adicione o node "ESPN API" ao workflow
2. Configure:
   - **Resource**: NFL
   - **Operation**: Get Scoreboard
   - **Date**: vazio (para hoje) ou 20240115
   - **Limit**: 10
3. Execute o node
4. Verifique a saída JSON

### Exemplo 2: Times da Premier League

1. Adicione o node "ESPN API"
2. Configure:
   - **Resource**: Soccer
   - **League**: English Premier League
   - **Operation**: Get Teams
   - **Limit**: 20
3. Execute o node

### Exemplo 3: Classificação da NBA

1. Adicione o node "ESPN API"
2. Configure:
   - **Resource**: NBA
   - **Operation**: Get Standings
   - **Season**: vazio (para temporada atual)
3. Execute o node

## Desenvolvimento com Hot Reload

Para desenvolvimento mais rápido:

```bash
# Terminal 1: Watch mode
cd ~/n8n-espn-api
npm run dev

# Terminal 2: N8N
n8n start --log-level debug
```

Sempre que salvar mudanças no TypeScript, o build será recompilado automaticamente. Você só precisa reiniciar o n8n.

## Próximos Passos

Após testar localmente:

1. Fazer commit das mudanças
2. Criar uma release no GitHub
3. O workflow automático publicará no npm
4. Usuários poderão instalar via Community Nodes

## Suporte

Se encontrar problemas:

1. Verifique os logs: `n8n start --log-level debug`
2. Verifique o build: `npm run build`
3. Verifique o lint: `npm run lint`
4. Abra um issue no GitHub

## Referências

- [n8n Custom Nodes Documentation](https://docs.n8n.io/integrations/creating-nodes/)
- [npm link Documentation](https://docs.npmjs.com/cli/v8/commands/npm-link)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)
