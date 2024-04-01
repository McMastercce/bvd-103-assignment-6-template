import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'

import { ObservableDefaultApi } from './ObservableAPI';

import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";
export class PromiseDefaultApi {
    private api: ObservableDefaultApi

    public constructor(
        configuration: Configuration,
        requestFactory?: DefaultApiRequestFactory,
        responseProcessor?: DefaultApiResponseProcessor
    ) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param name 
     */
    public sayHelloWithHttpInfo(name: string, _options?: Configuration): Promise<HttpInfo<string>> {
        const result = this.api.sayHelloWithHttpInfo(name, _options);
        return result.toPromise();
    }

    /**
     * @param name 
     */
    public sayHello(name: string, _options?: Configuration): Promise<string> {
        const result = this.api.sayHello(name, _options);
        return result.toPromise();
    }


}



