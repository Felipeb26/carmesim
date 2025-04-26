import { IException } from "@/types/errors/IException";
import { useQuery } from "@tanstack/react-query";

interface CustomRequest<T> {
    key: unknown[],
    enabled: boolean,
    request: () => Promise<IException | T>
    refetchInterval?: number | false
    staleTime?: number
}

export const useRequest = <T>({ key, enabled, request, refetchInterval = 1000 * 20, staleTime }: CustomRequest<T>) => {
    return useQuery({
        queryKey: key, queryFn: () => request(), enabled: enabled,
        refetchInterval: refetchInterval,
        staleTime: staleTime,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: true
    });
}