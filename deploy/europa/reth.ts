import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import Config from '../../config.json';

const TOKEN = Config.europa.rocketETH;

const func: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {

    try {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;

    const { deployer} = await getNamedAccounts();

    const deployed = await deploy(
        TOKEN.contract,
        {
            from: deployer,
            log: Config.log,
            gasPrice: "100000"
        }
    );

    console.log("Deployed: ", deployed);

    const address: string = deployed.address;

    await hre.run(Config.taskName, {
        address,
        contract: TOKEN.verifyPath 
    });

    } catch (err) {

    }
}

export default func;

func.tags = Config.ima.tags.concat(TOKEN.tag);
