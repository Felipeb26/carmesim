"use client"

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { IException } from "@/types/IException"
import { IFuncionario } from "@/types/IFuncionario"
import { IPagination } from "@/types/IPgaination"
import { formatPhoneNumber } from "@/utils/format"
import { toast } from "sonner"


export default function ArtistaCard({ artistas }: { artistas: IException | IPagination<IFuncionario> }) {

    if ("status" in artistas) {
			console.log(artistas.message)
        toast.error(artistas.message)
        return <>
            <h3>
                {artistas.message}
            </h3>
        </>
    }

    return <>
        {artistas.data.map((func, index) => {
            return (
                <Card key={index} className="min-w-[280px] max-w-[450px] flex flex-col px-8 h-fit">
                    <CardTitle>
                        {func.bio}
                    </CardTitle>
                    <CardDescription>
                        <p>
                            {func.nome}
                        </p>
                        <p>
                            {func.especialidade}
                        </p>
                    </CardDescription>
                    <CardContent className="flex flex-col gap-2 px-0">
                        <p>
                            {func.email}
                        </p>
                        <p>
                            {formatPhoneNumber(func.telefone)}
                        </p>
                        <p>
                            {func.funcionarioType}
                        </p>
                    </CardContent>
                </Card>
						)
        })}
    </>
}
