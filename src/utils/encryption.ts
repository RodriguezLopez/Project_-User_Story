import crypto from 'crypto';

/**
 * Cifrado híbrido: AES-256-GCM + RSA
 * - Los datos se cifran con AES-256-GCM (simétrico, rápido)
 * - La clave AES se cifra con RSA (asimétrico, seguro)
 */

// Generar par de claves RSA (ejecutar una vez)
export function generateRSAKeyPair(): { publicKey: string; privateKey: string } {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });
  return { publicKey, privateKey };
}

// Cifrar datos con AES-256-GCM
export function encryptAES(data: string, key: Buffer): { encrypted: string; iv: string; authTag: string } {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex'),
  };
}

// Descifrar datos con AES-256-GCM
export function decryptAES(encrypted: string, key: Buffer, iv: string, authTag: string): string {
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'hex'));
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

// Cifrar clave AES con RSA
export function encryptRSA(data: Buffer, publicKey: string): string {
  return crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    data
  ).toString('base64');
}

// Descifrar clave AES con RSA
export function decryptRSA(encryptedData: string, privateKey: string): Buffer {
  return crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(encryptedData, 'base64')
  );
}

// Función principal: Cifrado híbrido completo
export function hybridEncrypt(data: string, publicKey: string): {
  encryptedData: string;
  encryptedKey: string;
  iv: string;
  authTag: string;
} {
  // 1. Generar clave AES aleatoria
  const aesKey = crypto.randomBytes(32); // 256 bits
  
  // 2. Cifrar datos con AES
  const { encrypted, iv, authTag } = encryptAES(data, aesKey);
  
  // 3. Cifrar clave AES con RSA
  const encryptedKey = encryptRSA(aesKey, publicKey);
  
  return {
    encryptedData: encrypted,
    encryptedKey,
    iv,
    authTag,
  };
}

// Función principal: Descifrado híbrido completo
export function hybridDecrypt(
  encryptedData: string,
  encryptedKey: string,
  iv: string,
  authTag: string,
  privateKey: string
): string {
  // 1. Descifrar clave AES con RSA
  const aesKey = decryptRSA(encryptedKey, privateKey);
  
  // 2. Descifrar datos con AES
  return decryptAES(encryptedData, aesKey, iv, authTag);
}
