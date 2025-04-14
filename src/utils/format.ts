import { ITipoDocumentos } from "@/types/ITipoDocumentos"
import { format } from "date-fns";


export const formatDocumento = (document: string, tipoDocumento: ITipoDocumentos) => {

    if (tipoDocumento == "RG") {
        document = document.replace(/\D/g, '');
        document = document.replace(/(\d{2})(\d)/, '$1.$2');
        document = document.replace(/(\d{3})(\d)/, '$1.$2');
        return document.replace(/(\d{3})(\d{1})$/, '$1-$2');
    }
    if (tipoDocumento == "CPF") {
        document = document.replace(/\D/g, '');
        document = document.replace(/(\d{3})(\d)/, '$1.$2');
        document = document.replace(/(\d{3})(\d)/, '$1.$2');
        document = document.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return document
    }
    if (tipoDocumento == "RNE") {
        document = document.toUpperCase().replace(/[^A-Z0-9]/g, '');
        return document.replace(/([A-Z]{1,2})(\d{0,7})/, '$1$2');
    }

}

export const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length <= 10) {
        return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
        return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
};


export function formatarPreco(valor: number | undefined) {
    valor = valor == undefined ? 0 : valor;
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(valor);
}

export const formatarStringDate = (date: string | Date, horas?: boolean): string => {
    if (horas) {
        if (date instanceof Date) {
            return date.toLocaleDateString("pt-BR", {
                timeZone: "America/Sao_Paulo",
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: "2-digit",
                hour12: false,
                minute: "2-digit",
            });
        }
        return new Date(date + "T00:00:00").toLocaleDateString("pt-BR", {
            timeZone: "America/Sao_Paulo",
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour12: false,
            minute: "2-digit",
        });
    }

    if (date instanceof Date) {
        return date.toLocaleDateString("pt-BR", {
            timeZone: "America/Sao_Paulo",
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
    return new Date(date + "T00:00:00").toLocaleDateString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

export const formatarStringDateZulu = (data: string | Date) => {
    return format(data, "yyyyMMdd'T'HHmmss'Z'");
}