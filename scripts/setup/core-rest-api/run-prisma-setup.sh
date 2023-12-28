#!/bin/bash

SCHEMA_PATH="./apps/core-rest-api/src/app/adapters/database/infra/prisma/postgresql.schema.prisma"

# Analisamos todos os argumentos fornecidos
for arg in "$@"; do
    case $arg in
        --action=*)
        # Extraímos o valor depois de '=' e substituímos as vírgulas por espaços
        ACTIONS="${arg#*=}"
        # Converta a string delimitada por vírgulas em um array
        IFS=',' read -ra ACTIONS_ARRAY <<< "$ACTIONS"
        shift
        ;;
    esac
done

# Verificamos e executamos as ações em ordem: migrate e depois generate
for action in "${ACTIONS_ARRAY[@]}"; do
    if [ "$action" == "migrate" ]; then
        pnpm exec prisma migrate dev --schema=$SCHEMA_PATH
    elif [ "$action" == "generate" ]; then
        pnpm exec prisma generate --schema=$SCHEMA_PATH
    elif [ "$action" == "studio" ]; then
        pnpm exec prisma studio --schema=$SCHEMA_PATH
    elif [ "$action" == "validate" ]; then
        pnpm exec prisma validate --schema=$SCHEMA_PATH
    else
        echo "Ação desconhecida: $action"
    fi
done
