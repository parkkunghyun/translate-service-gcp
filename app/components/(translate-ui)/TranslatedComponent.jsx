'use client';

import { useState, useEffect } from 'react';
import { AiOutlineSound, AiOutlineCopy } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import { useTranslateText } from '@/app/hooks/translateHook';
import { useSynthesizeSpeech } from '@/app/hooks/ttsHook';

export default function TranslatedComponent() {
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [ttsLanguageCode, setTtsLanguageCode] = useState("ko-KR");

  const translateMutation = useTranslateText();
  const ttsMutation = useSynthesizeSpeech();

  // Copy functionality
  const handleCopy = (text) => {
    if (text.trim()) {
      navigator.clipboard.writeText(text)
        .then(() => toast.success("텍스트가 복사되었습니다!"))
        .catch(() => toast.error("복사에 실패했습니다."));
    } else {
      toast.error("입력된 글자가 없습니다...");
    }
  };

  // Translate functionality
  const handleTranslate = () => {
    if (!inputText.trim()) {
      toast.error("번역할 내용을 입력해주세요.");
      return;
    }

    translateMutation.mutate(
      { inputText, selectedLanguage },
      {
        onSuccess: (data) => {
          setResultText(data);
          console.log(data);
        },
        onError: () => {
          toast.error('번역 오류가 발생했습니다.');
        }
      }
    );
  };

  // TTS (Text to Speech) functionality
  const handleTextToSpeech = async (text) => {
    console.log('tts text => ', text);
    console.log('tts lan code => ', ttsLanguageCode);
    if (!text.trim()) {
      toast.error("음성으로 변환할 텍스트가 없습니다.");
      return;
    }

    ttsMutation.mutate(
      { inputText: text, ttsLanguage: ttsLanguageCode },
      {
        onSuccess: (data) => {
          const audio = new Audio(`data:audio/mp3;base64,${data}`);
          audio.play();
        },
        onError: () => {
          toast.error('음성 변환 오류가 발생했습니다.');
        }
      }
    );
  };

  // Update TTS language code when selected language changes
  useEffect(() => {
    switch (selectedLanguage) {
      case 'ko':
        setTtsLanguageCode('ko-KR');
        break;
      case 'en':
        setTtsLanguageCode('en-US');
        break;
      case 'zh':
        setTtsLanguageCode('zh-CN');
        break;
      case 'ja':
        setTtsLanguageCode('ja-JP');
        break;
      default:
        setTtsLanguageCode('en-US');
    }
  }, [selectedLanguage]);

  return (
    <div className="flex flex-col justify-center w-full gap-16 md:flex-row">
      {/* Input Section */}
      <div className="border-2 flex flex-col shadow-[-7px_7px_0px_#000000] rounded-lg min-w-[300px] h-[250px] md:w-[400px] md:h-[400px]">
        <div className="flex items-center py-2 my-2 font-bold border-b-2 ">
          <p className="flex-1 ml-2 ">문장 or 단어를 입력해보세요.</p>
          <select
            className="mr-2 bg-[#FFF6F6] focus:outline-none "
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="ko">한국어</option>
            <option value="en">영어</option>
            <option value="zh">중국어</option>
            <option value="ja">일본어</option>
          </select>
        </div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="h-full px-2 bg-transparent focus:outline-none "
          placeholder="번역할 내용을 입력하세요"
        />
        
        <div className="flex items-center border-t-2 ">
          <div className="flex flex-1 gap-4 px-4 my-2 text-xl">
            <AiOutlineSound onClick={() => handleTextToSpeech(inputText)} className="text-2xl cursor-pointer hover:text-slate-400" />
            <AiOutlineCopy onClick={() => handleCopy(inputText)} className="text-2xl cursor-pointer hover:text-blue-500" />
          </div>
          <button
            onClick={handleTranslate}
            className="p-2 text-center text-white bg-green-400 border-l-2 rounded-md shadow-lg "
          >
            번역하기
          </button>
        </div>
      </div>

      {/* Output Section */}
      <div className="border-2 flex flex-col shadow-[-7px_7px_0px_#000000] rounded-lg min-w-[300px] h-[250px] md:w-[400px] md:h-[400px] ">
        <div className="flex items-center py-2 my-2 font-bold border-b-2 ">
          <p className="flex-1 ml-2">번역 결과</p>
        </div>
        <p
          onChange={(e) => setResultText(e.target.value)}
          className="h-full p-2 bg-transparent focus:outline-none "
          placeholder="번역 결과가 여기에 표시됩니다"
        >{resultText}</p>
        <div className="flex items-center border-t-2 dark:border-white">
          <div className="flex flex-1 gap-4 px-4 my-2.5 text-xl">
            <AiOutlineSound onClick={() => handleTextToSpeech(resultText)} className="text-2xl cursor-pointer hover:text-slate-400" />
            <AiOutlineCopy onClick={() => handleCopy(resultText)} className="text-2xl cursor-pointer hover:text-blue-500" />
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
