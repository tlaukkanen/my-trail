#!/bin/bash

# Note: You'll need to be logged in with your
#       azure-cli before running these commands

webappname=mytrail$RANDOM
rgname=rg-mytrail-dev

# Create a resource group
az group create --location germanynorth --name $rgname

# Create an App Service plan in 'FREE' tier
az appservice plan create --name $webappname --resource-groupo $rgname --sku F1

# Create a web app
az webapp create --name $webappname --resource-group $rgname --plan $webappname
