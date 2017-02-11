import {EthereumContract} from './EthereumContract';

export class HelloWorldContract extends EthereumContract {
  public constructor(web3: any) {
    super(web3, 'hello-world', 'HelloWorld');
  }
}