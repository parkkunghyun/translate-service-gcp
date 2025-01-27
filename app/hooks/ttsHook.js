import { useMutation } from "@tanstack/react-query"
import { synthesizeSpeech } from "../actions/translateAction";

export const useSynthesizeSpeech = () => {
    return useMutation({
        mutationFn: synthesizeSpeech,
        onError: (error) => {
            console.error('TTS 오류:', error.message);
        },
    })
}