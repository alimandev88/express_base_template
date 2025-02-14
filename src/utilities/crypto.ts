import { createHash } from "node:crypto";

function encrypt(value: string): string {
  const hash = createHash("sha256");

  hash.update(value);
  return hash.digest("hex");
}

function verify(value: string, encryptHex: string): boolean {
  const hash = createHash("sha256");
  hash.update(value);
  const newHash = hash.digest("hex");
  return newHash === encryptHex;
}

export default { encrypt, verify };
