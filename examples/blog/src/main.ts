import { IServerProvider } from "@ask-ell/node";

import { createApplication } from "./infra";


async function main(): Promise<void> {
    const application: IServerProvider = await createApplication()
    await application.listen(3000);
}

main().catch(console.error);
