import { NextResponse } from 'next/server';
import { getRpcUrls, serverConfig } from '@/lib/serverConfig';

export async function GET() {
  try {
    const rpcUrls = getRpcUrls();
    
    // Retorna apenas as informações necessárias para o client
    return NextResponse.json({
      rpcUrls,
      walletConnectProjectId: serverConfig.walletConnectProjectId,
      // Não expor a API key diretamente
      hasInfuraKey: !!serverConfig.infuraApiKey,
    });
  } catch (error) {
    console.error('Erro ao carregar configuração:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}