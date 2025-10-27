import { KubeConfig } from "@kubernetes/client-node";
import { MaybeUndefined } from "@ask-ell/core";


export function getK8SConfig(configFilePath: MaybeUndefined<string>): KubeConfig {
    const config: KubeConfig = new KubeConfig();
    if (configFilePath) {
        config.loadFromFile(configFilePath);
    } else {
        config.loadFromDefault()
    }
    return config;
}