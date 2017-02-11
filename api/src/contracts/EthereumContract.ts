import * as fs from 'fs';

export class EthereumContract {
  private web3: any;
  private name: string;
  private nameTitleCase: string;
  private _abi: any;
  private _code: any;

  public constructor(web3: any, name: string, nameTitleCase: string) {
    this.web3          = web3;
    this.name          = name;
    this.nameTitleCase = nameTitleCase;

    let contractSource   = fs.readFileSync(process.cwd() + '/solidity/' + this.name + '.sol').toString();
    let contractCompiled = this.web3.eth.compile.solidity(contractSource);
    this._abi  = contractCompiled['<stdin>:' + nameTitleCase].info.abiDefinition;
    this._code = contractCompiled['<stdin>:' + nameTitleCase].code;
  }

  public new(): void {
    this.web3.eth.contract(this.abi).new({data: this.code}, (err: any, contract: any) => {
      if (err) {
        return console.log(err);
      }

      console.log(contract.address);
    });
  }

  public get abi(): any {
    return this._abi;
  }

  public get code(): any {
    return this._code;
  }
}