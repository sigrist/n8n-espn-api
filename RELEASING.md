# Release Process

Este documento descreve o processo automatizado de release para o n8n-nodes-espn-api.

## 🚀 Processo Simplificado

O processo de release foi totalmente automatizado. Você só precisa criar e fazer push de uma tag Git:

```bash
# Criar uma tag
git tag v0.0.1-rc3

# Fazer push da tag
git push origin v0.0.1-rc3
```

## 🤖 O que acontece automaticamente

Quando você faz push de uma tag com prefixo `v*`, o sistema executa automaticamente:

1. **Extrai a versão da tag** (ex: `v0.0.1-rc3` → `0.0.1-rc3`)
2. **Atualiza o package.json** com a versão extraída
3. **Faz commit** da alteração no package.json na branch main
4. **Detecta se é pre-release** (verifica se contém: alpha, beta, rc, pre, dev)
5. **Cria a GitHub Release** com:
   - Tag correta
   - Marcação de pre-release (se aplicável)
   - Notas do CHANGELOG.md (se disponível)
6. **Dispara a publicação no npm** com:
   - Versão correta (extraída da tag)
   - Tag npm apropriada (`next` para pre-release, `latest` para stable)

## 📋 Convenções de Versionamento

Este projeto segue [Semantic Versioning](https://semver.org/):

- **MAJOR.MINOR.PATCH** (ex: `1.0.0`) - Release estável
- **MAJOR.MINOR.PATCH-rc.N** (ex: `0.0.1-rc2`) - Release Candidate
- **MAJOR.MINOR.PATCH-beta.N** (ex: `0.0.1-beta1`) - Beta
- **MAJOR.MINOR.PATCH-alpha.N** (ex: `0.0.1-alpha1`) - Alpha

## 📝 Preparando uma Release

### 1. Atualizar o CHANGELOG.md

Antes de criar a tag, atualize o `CHANGELOG.md` com as mudanças da nova versão:

```markdown
## [0.0.1-rc3] - 2025-11-15

### Added
- Nova funcionalidade X

### Fixed
- Correção do bug Y

### Changed
- Alteração do comportamento Z
```

### 2. Criar e Fazer Push da Tag

```bash
# Certifique-se de estar na branch main e atualizado
git checkout main
git pull origin main

# Criar a tag anotada
git tag -a v0.0.1-rc3 -m "Release v0.0.1-rc3"

# Fazer push da tag
git push origin v0.0.1-rc3
```

### 3. Monitorar o Workflow

Acesse o GitHub Actions para monitorar a execução:
- [Auto Release on Tag](../../actions/workflows/auto-release.yml)
- [Release and Publish](../../actions/workflows/release.yml)

## 🔧 Workflows Envolvidos

### 1. Auto Release on Tag (`.github/workflows/auto-release.yml`)

**Disparo**: Push de tag `v*`

**Ações**:
- Extrai versão da tag
- Detecta se é pre-release
- Atualiza package.json
- Cria GitHub Release

### 2. Release and Publish (`.github/workflows/release.yml`)

**Disparo**: Quando uma release é publicada

**Ações**:
- Extrai versão da tag de release
- Atualiza package.json com versão correta
- Executa build e testes
- Publica no npm com tag apropriada
- Faz upload do tarball para a release

## ⚠️ Troubleshooting

### Release duplicada
Se você vir duas releases sendo criadas, verifique se não criou a release manualmente no GitHub. O processo correto é apenas fazer push da tag.

### Versão errada no npm
O workflow agora extrai automaticamente a versão da tag. Se ainda assim houver problemas, verifique se a tag está no formato correto (`vX.Y.Z`).

### Workflow não executa
Certifique-se de que:
- A tag começa com `v` (ex: `v0.0.1-rc3`, não `0.0.1-rc3`)
- Você fez push da tag para o repositório remoto
- Os workflows estão habilitados no repositório

## 📦 Exemplo Completo

```bash
# 1. Atualizar código e testes
git add .
git commit -m "feat: add new feature"

# 2. Atualizar CHANGELOG.md
# ... editar o arquivo ...
git add CHANGELOG.md
git commit -m "docs: update changelog for v0.0.2"

# 3. Fazer push para main
git push origin main

# 4. Criar e fazer push da tag
git tag -a v0.0.2 -m "Release v0.0.2"
git push origin v0.0.2

# 5. Aguardar workflows completarem
# Verificar em: https://github.com/sigrist/n8n-espn-api/actions
```

## 🎯 Checklist de Release

- [ ] Código testado e funcionando
- [ ] CHANGELOG.md atualizado com a nova versão
- [ ] Branch main atualizada
- [ ] Tag criada no formato correto (`vX.Y.Z`)
- [ ] Tag enviada para o repositório remoto
- [ ] Workflows executados com sucesso
- [ ] Release criada no GitHub
- [ ] Pacote publicado no npm com versão correta
