// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyType = any;

declare module "rollup-plugin-babel" {
  const babel: (options: AnyType) => AnyType;
  export default babel;
}
declare module "rollup-plugin-auto-external" {
  function autoExternal(): AnyType;
  export default autoExternal;
}
declare module "rollup-plugin-terser" {
  export function terser(): AnyType;
}
