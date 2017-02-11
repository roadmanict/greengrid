import {EthereumContract} from './EthereumContract';

export class PowerExchangeContract extends EthereumContract {
  public constructor(web3: any) {
    super(web3, 'PowerExchange', 'PowerExchange');
  }
}
