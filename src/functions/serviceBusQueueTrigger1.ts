import "@azure/functions-extensions-servicebus";
import {ServiceBusMessageManager} from "@azure/functions-extensions-servicebus"
import { app, InvocationContext } from "@azure/functions";

export async function serviceBusQueueTrigger1(serviceBusMessageManager: ServiceBusMessageManager, context: InvocationContext): Promise<void> {
    //context.log('Service bus queue function processed message:', serviceBusMessageManager);
    await serviceBusMessageManager.serviceBusMessageActions.complete(serviceBusMessageManager.messages[0]);
    context.log('Completing the message', serviceBusMessageManager);
}

app.serviceBusQueue('serviceBusQueueTrigger1', {
    connection: 'ServiceBusConnection',
    queueName: 'testqueue',
    sdkBinding: true,
    autoCompleteMessages: false,
    cardinality: "many",
    handler: serviceBusQueueTrigger1
});
