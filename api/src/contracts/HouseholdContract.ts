import {EthereumContract} from './EthereumContract';

export class HouseholdContract extends EthereumContract {
  public constructor(web3: any) {
    super(web3, 'household', 'Household');
  }
}