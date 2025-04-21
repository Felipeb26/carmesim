import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function PoliticaCookies() {
    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <Card>
                <CardContent className="space-y-4 p-6">
                    <h1 className="text-3xl font-bold">Política de Cookies</h1>

                    <p>
                        Este site utiliza cookies para garantir o correto funcionamento das páginas e melhorar a experiência do usuário.
                    </p>

                    <h2 className="text-2xl font-semibold">1. O que são Cookies?</h2>
                    <p>
                        Cookies são pequenos arquivos armazenados no seu dispositivo que servem para lembrar de preferências e coletar informações de navegação.
                    </p>

                    <h2 className="text-2xl font-semibold">2. Como usamos Cookies</h2>
                    <p>
                        Utilizamos cookies estritamente necessários para operação do site, como autenticação e autorização do usuario além de monitoramento com foco na segurnça do site. Não utilizamos cookies para publicidade ou rastreamento.
                    </p>

                    <h2 className="text-2xl font-semibold">3. Controle de Cookies</h2>
                    <p>
                        Você pode configurar seu navegador para recusar cookies ou alertá-lo quando eles estiverem sendo enviados. Sem cookies, algumas funcionalidades podem não funcionar corretamente.
                    </p>

                    <div className="pt-6">
                        <Link href="/privacidade" className="text-blue-600 hover:underline">
                            Leia também nossa Política de Privacidade
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}