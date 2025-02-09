import { config } from "@/config";

async function generateKey() {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(config.localStorage.secretKey),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode("algum-sal"),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

async function encryptData(data: any) {
  const key = await generateKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(JSON.stringify(data))
  );

  return JSON.stringify({
    iv: Array.from(iv),
    data: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
  });
}

async function decryptData(encryptedData: any) {
  try {
    const key = await generateKey();
    const iv = new Uint8Array(encryptedData.iv);
    const encryptedBytes = Uint8Array.from(atob(encryptedData.data), (c) =>
      c.charCodeAt(0)
    );

    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      encryptedBytes
    );

    return JSON.parse(new TextDecoder().decode(decrypted));
  } catch (error) {
    console.error("Erro ao descriptografar:", error);
    return null;
  }
}

export { decryptData, encryptData };
