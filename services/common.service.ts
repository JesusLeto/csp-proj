import client from "../db/connecting";

export abstract class CommonService {
    protected db = client
}