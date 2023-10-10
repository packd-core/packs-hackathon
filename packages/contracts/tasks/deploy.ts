import { task, types } from 'hardhat/config'
import { deploySystem } from '../scripts/deploy';
import { getSystemConfig } from '../utils/deployConfig';

task("deploy", "Deploy the contracts to the selected chain (defaults to localhost)")
    .setAction(async (args, hre) => {
        const systemConfig = getSystemConfig(hre);
        return await deploySystem(hre, await hre.ethers.provider.getSigner(), systemConfig)
    });