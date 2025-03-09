export interface IRepository {
    retrieveMultipleRecords(schemaName: string, options: string, maxPageSize: number): Promise<ComponentFramework.WebApi.RetrieveMultipleResponse>;
}

export class Repository implements IRepository {
    private _webAPI: ComponentFramework.WebApi;
    private _utility: ComponentFramework.Utility;

    constructor(webAPI: ComponentFramework.WebApi, utility: ComponentFramework.Utility) {
        this._webAPI = webAPI;
        this._utility = utility;
    }

        public async retrieveMultipleRecords(schemaName: string, options: string, maxPageSize: number): Promise<ComponentFramework.WebApi.RetrieveMultipleResponse> {
        return this._webAPI.retrieveMultipleRecords(schemaName, options, maxPageSize);
    }
}