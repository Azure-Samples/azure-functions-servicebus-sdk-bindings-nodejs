# Azure Functions Samples for Service Bus SDK Bindings for Node.js

This repository provides examples demonstrating how to use Azure Service Bus SDK bindings with Azure Functions in Node.js (TypeScript). These examples showcase enhanced SDK-binding capabilities, enabling direct access to Azure Service Bus SDK objects and message management operations.

## Overview

The repository contains a sample project illustrating how to work with Azure Service Bus in Azure Functions:

- **serviceBusSampleWithComplete**: Demonstrates using SDK bindings with Service Bus queue triggers, including manual message completion.

## Prerequisites

- Node.js (v20 or later)
- Azure Functions Core Tools (v4 or later)
- Azure Service Bus namespace or Service Bus emulator for local testing

## Project Details

### serviceBusSampleWithComplete

This example shows how to use the SDK binding with a Service Bus queue trigger. The function demonstrates:

- Using SDK bindings with Service Bus message context
- Manual message completion using the SDK
- Accessing message properties and body
- Handling cardinality for multiple messages

```typescript
// Key points:
import "@azure/functions-extensions-servicebus"; // Required first import
import {ServiceBusMessageContext} from "@azure/functions-extensions-servicebus"

export async function serviceBusQueueTrigger(
  serviceBusMessageContext: ServiceBusMessageContext, // SDK binding provides this context
  context: InvocationContext
): Promise<void> {
  // Access full SDK capabilities for message management
  await serviceBusMessageContext.actions.complete(serviceBusMessageContext.messages[0]);
  context.log('Completing the message', serviceBusMessageContext.messages[0]);
}

app.serviceBusQueue('serviceBusQueueTrigger1', {
    connection: 'ServiceBusConnection',
    queueName: 'testqueue',
    sdkBinding: true,
    autoCompleteMessages: false,
    cardinality: "many",
    handler: serviceBusQueueTrigger
});
```

## Running the Example

The project can be run locally using Azure Functions Core Tools.

**Navigate to the project folder:**

```bash
cd serviceBusSampleWithComplete
```

**Install dependencies:**

```bash
npm install
```

**Configure local settings by updating the `local.settings.json` file with your Service Bus connection:**

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "ServiceBusConnection__fullyQualifiedNamespace": "your-servicebus-namespace.servicebus.windows.net"
  }
}
```

**Build the project:**

```bash
npm run build
```

**Start the function app:**

```bash
func start
```

## Key Features of Service Bus SDK Bindings

- Direct access to Azure Service Bus SDK objects and methods
- Enhanced message management with manual completion/abandonment
- Support for both single and multiple message processing (cardinality)
- Improved error handling and message property access
- Reduced boilerplate code compared to traditional bindings

## Learn More

- [Azure Functions documentation](https://docs.microsoft.com/azure/azure-functions/)
- [Azure Service Bus SDK documentation](https://docs.microsoft.com/azure/service-bus-messaging/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.