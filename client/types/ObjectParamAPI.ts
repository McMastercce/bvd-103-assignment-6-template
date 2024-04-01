import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'


import { ObservableDefaultApi } from "./ObservableAPI";
import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";

export interface DefaultApiSayHelloRequest {
    /**
     * 
     * @type string
     * @memberof DefaultApisayHello
     */
    name: string
}

export class ObjectDefaultApi {
    private api: ObservableDefaultApi

    public constructor(configuration: Configuration, requestFactory?: DefaultApiRequestFactory, responseProcessor?: DefaultApiResponseProcessor) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public sayHelloWithHttpInfo(param: DefaultApiSayHelloRequest, options?: Configuration): Promise<HttpInfo<string>> {
        return this.api.sayHelloWithHttpInfo(param.name,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public sayHello(param: DefaultApiSayHelloRequest, options?: Configuration): Promise<string> {
        return this.api.sayHello(param.name,  options).toPromise();
    }

}
