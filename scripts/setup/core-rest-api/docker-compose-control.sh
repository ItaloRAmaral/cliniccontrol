#!/bin/bash

# Analisamos todos os argumentos fornecidos
for arg in "$@"; do
    if [[ $arg == --action=* ]]; then
        # Extraímos o valor depois de '=' e substituímos as vírgulas por espaços
        ACTIONS="${arg#*=}"
        # Converta a string delimitada por vírgulas em um array
        IFS=',' read -ra ACTIONS_ARRAY <<< "$ACTIONS"
        shift
    fi
done

echo "Iniciando o docker-compose..."

# Verificamos e executamos as ações em ordem
for action in "${ACTIONS_ARRAY[@]}"; do
    if [ "$action" == "up" ]; then
      docker compose -f "$PWD/docker-compose.yaml" up -d
    elif [ "$action" == "down" ]; then
      docker compose -f "$PWD/docker-compose.yaml" down -v
    elif [ "$action" == "stop" ]; then
      docker compose -f "$PWD/docker-compose.yaml" stop
    elif [ "$action" == "restart" ]; then
      docker compose -f "$PWD/docker-compose.yaml" restart
    else
        echo "Ação desconhecida: $action"
    fi
done

echo "Ações executadas com sucesso."
