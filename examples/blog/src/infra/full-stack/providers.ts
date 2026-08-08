import { Provider } from "@nestjs/common";

import { FullStackUnitOfWork } from "./full-stack.unit-of-work";
import { UNIT_OF_WORK_PROVIDER } from "../nest";


export const providers: Provider[] = [
    {
        provide: UNIT_OF_WORK_PROVIDER,
        useClass: FullStackUnitOfWork
    }
]