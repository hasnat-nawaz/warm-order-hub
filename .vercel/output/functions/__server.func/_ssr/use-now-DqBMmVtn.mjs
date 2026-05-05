import { r as reactExports } from "../_libs/react.mjs";
function useNow(intervalMs = 3e4) {
  const [now, setNow] = reactExports.useState(() => /* @__PURE__ */ new Date());
  reactExports.useEffect(() => {
    const tick = () => setNow(/* @__PURE__ */ new Date());
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}
export {
  useNow as u
};
