import type { NextApiRequest, NextApiResponse } from "next";
import { exec } from "child_process";
import { parse } from "url";

const BLOCKED_HOSTS = ["localhost", "127.0.0.1", "0.0.0.0"];

/**
 * Valida se o comando contém uma URL permitida.
 * @param command O comando cURL a ser validado
 * @returns boolean
 */
const isValidUrl = (command: string): boolean => {
  const matches = command.match(/curl\s+(['"]?)(https?:\/\/[^\s'"]+)/);
  if (!matches) return false;

  const url = matches[2];
  const parsedUrl = parse(url);

  return !(parsedUrl.hostname && BLOCKED_HOSTS.includes(parsedUrl.hostname));
};

/**
 * Sanitiza o comando para evitar execução de comandos perigosos.
 * @param command O comando cURL enviado pelo usuário
 * @returns string
 */
const sanitizeCommand = (command: string): string => {
  return command
    .replace(/(;|&|`|\||>|<)/g, "") // Remove operadores perigosos
    .replace(/\s*--output\s*\S+/g, "") // Remove -o / --output
    .trim();
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido!" });
  }

  let { command } = req.body;

  if (!command || typeof command !== "string") {
    return res.status(400).json({ message: "Comando inválido!" });
  }

  command = sanitizeCommand(command);

  if (!command.startsWith("curl ")) {
    return res
      .status(400)
      .json({ message: "Apenas comandos cURL são permitidos!" });
  }

  if (!isValidUrl(command)) {
    return res.status(400).json({ message: "URL inválida ou proibida!" });
  }

  // if (command.length > 500) {
  //   return res.status(400).json({ message: "Comando muito longo!" });
  // }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ message: stderr, details: error?.message });
    }
    res.status(200).json({ output: stdout });
  });
}
