export interface IOCRService<T> {
    extractData (frontImagePath : string , backImagePath : string) : Promise<T>;
}