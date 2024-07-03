import { Html } from "@react-three/drei";
export function Loading({ progress }: { progress: number }) {
  <Html>
    <span className="canvas-load"></span>
    <p
      style={{
        fontSize: 14,
        color: "#f1f1f1",
        fontWeight: 800,
        marginTop: 40,
      }}
    >
      {progress.toFixed(2)}%
    </p>
  </Html>;
}
