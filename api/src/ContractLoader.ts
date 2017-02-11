import * as fs from 'fs';

export class ContractLoader {
  private web3: any;
  private availableContracts: string[];
  private contracts: {
    [contract: string]: {
      abi: any,
      code: any
    }
  };

  public constructor(web3: any) {
    this.web3 = web3;

    this.availableContracts = [
      'hello-world'
    ];

    this.contracts = {};
    this.load();
  }

  private load(): void {
    for (let i = 0; i < this.availableContracts.length; i++) {
      let contract             = this.availableContracts[i];
      let contractSource       = fs.readFileSync('./contracts/' + contract + '.sol');
      let contractCompiled     = this.web3.eth.compile.solidity(contractSource);
      this.contracts[contract] = {
        abi:  contractCompiled.info.abiDefinition,
        code: contractCompiled.code
      };
    }
  };

}

