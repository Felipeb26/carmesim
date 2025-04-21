"use server"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function PrivacyPolicyPage() {
    return (
        <div className="max-w-3xl mx-auto p-6 flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">
                        Política de Privacidade
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex flex-col gap-4 text-base leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold">1. Dados Coletados</h2>
                        <p>
                            Podemos coletar as seguintes informações pessoais através de formulários: nome completo,
                            CPF, RG ou RNE, data de nascimento e informações de contato.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold">2. Uso das Informações</h2>
                        <p>
                            Os dados fornecidos serão utilizados exclusivamente para fins de identificação interna,
                            contato e prestação de serviços relacionados ao site. Não utilizamos seus dados para
                            fins de comercialização, publicidade ou para alimentar inteligência artificial.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold">3. Proteção dos Dados</h2>
                        <p>
                            Adotamos medidas técnicas e organizacionais para proteger seus dados pessoais contra
                            acesso não autorizado, perda, uso indevido ou divulgação.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold">4. Compartilhamento de Dados</h2>
                        <p>
                            Seus dados não serão vendidos, alugados ou compartilhados com terceiros para fins
                            comerciais. Este site é hospedado na plataforma Vercel, que não coleta nem armazena
                            dados pessoais dos usuários, apenas fornece a infraestrutura para o funcionamento do site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold">5. Direitos do Usuário</h2>
                        <p>
                            Você tem o direito de solicitar a correção, atualização ou exclusão dos seus dados
                            pessoais a qualquer momento. Para isso, entre em contato através dos canais disponibilizados
                            no site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold">6. Atualizações desta Política</h2>
                        <p>
                            Esta política pode ser atualizada periodicamente para refletir eventuais mudanças na legislação
                            ou nas práticas de tratamento de dados. A versão vigente será sempre publicada nesta página.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold">7. Contato</h2>
                        <p>
                            Em caso de dúvidas sobre esta Política de Privacidade, entre em contato conosco através das
                            informações disponíveis na página de Contato do site.
                        </p>
                    </section>
                    <div className="pt-6">
                        <Link href="/cookies" className="text-blue-600 hover:underline">
                            Leia também nossa Política de Cookies
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
