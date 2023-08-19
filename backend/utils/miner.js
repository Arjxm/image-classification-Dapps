import BN from "bn.js";
import logUpdate from 'log-update';
import cliSpinners from 'cli-spinners';
import chalk from "chalk";

const {frames} = cliSpinners.dots;

class Miner{
    constructor(account){
        this.account = account;
        console.log(account);
    }

    findUnderTargetHash(web3, challenge, difficulty){
        const target = challenge.div(difficulty);
        console.log(target)
        let nonce = 0;
        let i = 0;

        logUpdate.done();

        return new Promise((resolve) => {
            let calculatedHash = new BN("f".repeat(64), 16);
            while (calculatedHash.cmp(target) === 1) {
              nonce++;
              calculatedHash = new BN(
                web3.utils
                  .soliditySha3(challenge.toString(), this.account, nonce)
                  .slice(2),
                16
              );
      
              logUpdate(
                frames[(i = ++i % frames.length)] +
                  ` Mining ${chalk.greenBright(nonce)}`
              );
            }
      
            logUpdate.clear();
            resolve(nonce);
          });


    }

}


export default Miner;