import * as qs from "qs";

import { Gateway, getGateway, Response } from "../interfaces";

import { HelpGetResponse } from "./../models/HelpDTO";

export class HelpAPI {
    private readonly gateway: Gateway;

    constructor(gateway?: Gateway) {
        this.gateway = gateway || getGateway();
    }

    getHelpFiles(): Promise<Response<any>> {
        return this.gateway.get("helpFiles/", {});
    }

    getHelpFileById(path: string): Promise<Response<any>> {
        return this.gateway.get(`help${path}/`, {});
    }
}

export const helpApi = new HelpAPI();
