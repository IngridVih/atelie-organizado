/**
 * Configuração do Firebase. Mantida como null por padrão para garantir o Modo Demonstração offline.
 */
export interface FirebaseAppConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export const FIREBASE_CONFIG: FirebaseAppConfig | null = null;