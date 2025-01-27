// react query에서 사용할 서버 액션 정의

export const translateText = async ({ inputText, selectedLanguage }) => {
    const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputText, selectedLanguage }),
    });

    if (!response.ok) {
        throw new Error('번역 API 호출에 실패했습니다...');
    }
    const data = await response.json();
    return data.translatedText;
}

// TTS API 호출 서버 액션
export const synthesizeSpeech = async (req) => {
    const { inputText, ttsLanguage } = req;
    console.log('inputText:', inputText);
    console.log('ttsLanguage:', ttsLanguage);

    try {
        const response = await fetch('/api/synthesize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputText, ttsLanguage }), // 제대로 전달되는지 확인
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || '음성 합성 실패');
        }

        const data = await response.json();
        return data.audioContent; // Base64로 인코딩된 오디오 콘텐츠
    } catch (error) {
        console.error('Client Error:', error.message);
        throw error; // 호출한 곳에서 처리하도록 다시 던짐
    }
};



