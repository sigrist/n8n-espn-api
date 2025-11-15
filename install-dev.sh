#!/bin/bash

# Script para instalar o node ESPN API no N8N (desenvolvimento)

set -e

echo "🏗️  N8N ESPN API - Instalação para Desenvolvimento"
echo "================================================"
echo ""

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script no diretório raiz do projeto (n8n-espn-api)"
    exit 1
fi

# Verificar se o nome do pacote está correto
if ! grep -q "@paulo.sigrist/n8n-nodes-espn-api" package.json; then
    echo "❌ Erro: package.json não contém @paulo.sigrist/n8n-nodes-espn-api"
    exit 1
fi

echo "📦 Instalando dependências..."
npm install

echo ""
echo "🔨 Compilando o projeto..."
npm run build

# Verificar se o build foi bem-sucedido
if [ ! -d "dist" ]; then
    echo "❌ Erro: Build falhou, diretório dist não encontrado"
    exit 1
fi

echo ""
echo "✅ Build completado com sucesso!"
echo ""
echo "📌 Escolha o método de instalação:"
echo ""
echo "1) npm link (recomendado para desenvolvimento)"
echo "2) instalação local direta"
echo "3) copiar instruções apenas"
echo ""
read -p "Escolha uma opção (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🔗 Criando link npm..."
        npm link

        echo ""
        echo "✅ Link criado! Agora execute no diretório do N8N:"
        echo ""
        echo "   cd ~/.n8n"
        echo "   npm link @paulo.sigrist/n8n-nodes-espn-api"
        echo "   n8n start"
        echo ""
        ;;
    2)
        PROJECT_DIR=$(pwd)
        echo ""
        echo "📦 Para instalar localmente, execute:"
        echo ""
        echo "   cd ~/.n8n"
        echo "   npm install $PROJECT_DIR"
        echo "   n8n start"
        echo ""
        ;;
    3)
        PROJECT_DIR=$(pwd)
        echo ""
        echo "📋 Instruções de Instalação"
        echo "=============================="
        echo ""
        echo "Opção 1 - npm link (desenvolvimento):"
        echo "   cd $PROJECT_DIR"
        echo "   npm link"
        echo "   cd ~/.n8n"
        echo "   npm link @paulo.sigrist/n8n-nodes-espn-api"
        echo "   n8n start"
        echo ""
        echo "Opção 2 - Instalação local:"
        echo "   cd ~/.n8n"
        echo "   npm install $PROJECT_DIR"
        echo "   n8n start"
        echo ""
        echo "Opção 3 - Via GitHub:"
        echo "   cd ~/.n8n"
        echo "   npm install sigrist/n8n-espn-api"
        echo "   n8n start"
        echo ""
        ;;
    *)
        echo "❌ Opção inválida"
        exit 1
        ;;
esac

echo "🎉 Processo concluído!"
echo ""
echo "💡 Dicas:"
echo "   - Após mudanças, rode 'npm run build' e reinicie o n8n"
echo "   - Para desinstalar: cd ~/.n8n && npm uninstall @paulo.sigrist/n8n-nodes-espn-api"
echo "   - Para ver logs: n8n start --log-level debug"
echo ""
