import { NextResponse } from 'next/server';
import { getRpcUrls, serverConfig } from '@/lib/serverConfig';
import type { ConfigResponse } from '@/types/config';

// Cache da configuração por 1 hora
const CACHE_TIME = 60 * 60 * 1000; // 1 hora em ms
let cachedConfig: ConfigResponse | null = null;
let cacheTimestamp = 0;

export async function GET() {
  try {
    const now = Date.now();
    
    // Verificar se o cache ainda é válido
    if (cachedConfig && (now - cacheTimestamp) < CACHE_TIME) {
      return NextResponse.json(cachedConfig, {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      });
    }

    // Gerar nova configuração
    const rpcUrls = getRpcUrls();
    const config: ConfigResponse = {
      rpcUrls,
      walletConnectProjectId: !!serverConfig.walletConnectProjectId,
      hasInfuraKey: !!serverConfig.infuraApiKey,
    };

    // Atualizar cache
    cachedConfig = config;
    cacheTimestamp = now;

    return NextResponse.json(config, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Erro ao carregar configuração:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}