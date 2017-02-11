import * as fs from 'fs';

export class EthereumContract {
  private web3: any;
  private name: string;
  private nameTitleCase: string;
  private abi: any;
  private code: any;

  public constructor(web3: any, name: string, nameTitleCase: string) {
    this.web3          = web3;
    this.name          = name;
    this.nameTitleCase = nameTitleCase;

    let contractSource   = fs.readFileSync(process.cwd() + '/solidity/' + this.name + '.sol').toString();
    let contractCompiled = this.web3.eth.compile.solidity(contractSource);
    this.abi  = contractCompiled['<stdin>:' + nameTitleCase].info.abiDefinition;
    this.code = contractCompiled['<stdin>:' + nameTitleCase].code;
  }

  public new(): Promise<ContractResult> {
    return new Promise<ContractResult>((resolve: (result: ContractResult) => void) => {
      this.web3.eth.contract(this.abi).new({data: this.code}, (err: any, contract: any) => {
        if (err) {
          console.log(err);
          return resolve({
            isValid: false
          });
        } else if (contract.address) {
          resolve({
            isValid: true,
            contract: contract
          });
        }
      });
    });
  }

  public get(address: string): any {
    return this.web3.eth.contract(this.abi).at(address);
  }
}

interface ContractResult {
  isValid: boolean;
  contract?: any;
}
