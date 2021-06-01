import { ComponentCluster } from "../structures/ComponentCluster";
import { UniversalComponentType } from "./types/components";

export default function compileComponents(components: UniversalComponentType): ComponentCluster {
  const compiledComponents = ((): ComponentCluster => {
    if (components instanceof ComponentCluster) return components;
    if (!(components instanceof Array)) return new ComponentCluster(components);
    const cluster = new ComponentCluster(...components);

    return cluster
  })();

  return compiledComponents;
}