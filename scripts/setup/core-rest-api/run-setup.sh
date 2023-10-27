#!/bin/bash

# Subir o docker-compose
echo "Subindo docker-compose..."
docker compose -f "$PWD/docker-compose.yaml" up -d # rodar script sempre da raiz do projeto

# Verificar se o docker-compose subiu corretamente
if [ $? -ne 0 ]; then
    echo "Erro ao subir o docker-compose."
    exit 1
fi

# Dê algum tempo para que os serviços do docker-compose estejam prontos (se necessário)
# sleep 10

# Rodar o script core-prisma-setup com os parâmetros passados
echo "Executando run-prisma-setup..."

bash "$(dirname "$0")/run-prisma-setup.sh" "$@"

# Verificar se o core-prisma-setup rodou corretamente
if [ $? -ne 0 ]; then
    echo "Erro ao executar core-prisma-setup."
    exit 1
fi

echo "Finalizado."
