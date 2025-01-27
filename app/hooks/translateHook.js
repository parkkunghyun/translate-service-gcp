import { useMutation } from "@tanstack/react-query"
import { translateText } from "../actions/translateAction"

export const useTranslateText = () => {
    return useMutation({
        mutationFn: translateText,
        onError: (error) => {
            console.error('번역 오류', error.message);
        }
    });
};