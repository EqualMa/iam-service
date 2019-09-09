declare module "rollup-plugin-babel" {
  const babel: (options: any) => any;
  export default babel;
}
declare module "rollup-plugin-auto-external" {
  function autoExternal(): any;
  export default autoExternal;
}
declare module "rollup-plugin-terser" {
  export function terser(): any;
}
