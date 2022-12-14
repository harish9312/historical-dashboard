var fs = require("fs");
const path = require("path");
const chalk = require("chalk");

function copyData() {
  const modelName = process.argv[2];
  const props = process.argv[3];
  const resourceName = process.argv[4];
  if (!modelName || !props) {
    console.error(
      chalk.red(
        'π‘ Please pass model name as first, props types as second argument eg. "{ name: string } and resource name as third argument." π‘'
      )
    );
    return;
  }

  if (modelName.includes("{") || modelName.includes("}")) {
    console.error(
      chalk.redBright("π° First Argument must be the model name π°")
    );
    return;
  }

  if (!props.includes("{") || !props.includes("}")) {
    console.error(
      chalk.redBright(
        `π° Second Argument must be the prop types  eg. "{ name: string }"π°`
      )
    );
    return;
  }

  if (!resourceName) {
    console.error(
      chalk.redBright(
        `π° Third Argument must be the resource name for the modelπ°`
      )
    );
    return;
  }

  const filePath = path.resolve(`src/models/${modelName}.ts`);
  const data = `
  import { BaseModel } from './BaseModel';
  interface I${modelName}Props ${props}

export class ${modelName} extends BaseModel<I${modelName}Props>{
    constructor(props: any) {
        super(props)
        this.props = props;
    }
    static resource = ${resourceName}
}`;

  fs.writeFile(filePath, data, function(err) {
    if (err) throw err;
    console.log(
      chalk.greenBright(
        `ππ ${modelName} has been generated succcess fully with the Resource Name: ${chalk.yellowBright(
          resourceName
        )}...!!! ππ`
      )
    );
    console.log("");
    console.log(chalk.magentaBright(`Created with β€οΈ  from Harish Soni`));
  });
}

copyData();
