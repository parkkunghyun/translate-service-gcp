'use client';

import React, { useState } from 'react';
import { AiOutlineCopy, AiOutlineSound } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useSynthesizeSpeech } from '@/app/hooks/ttsHook';

const ImageTranslatedComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const ttsMutation = useSynthesizeSpeech();

  const exampleImages = [
    '/images/ex1.png',
    '/images/ex2.jpg',
    '/images/ex3.jpg',
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setExtractedText('');
    }
  };

  const handleSelectExampleImage = async (imagePath) => {
    try {
      const response = await fetch(imagePath); // URL에서 이미지 가져오기
      const blob = await response.blob(); // Blob으로 변환
      const file = new File([blob], `example-${Date.now()}.png`, { type: blob.type });
      setSelectedImage(file); // 변환된 파일을 상태로 저장
      setExtractedText('');
    } catch (error) {
      toast.error('예제 이미지를 처리하는 중 오류가 발생했습니다.');
      console.error('Error processing example image:', error);
    }
  };

  const handleExtractText = async () => {
    if (!selectedImage) {
      toast.error('이미지를 업로드하거나 선택해주세요.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    if (typeof selectedImage === 'string') {
      formData.append('image_url', selectedImage); // 서버에서 URL 처리 지원 시
    } else {
      formData.append('image', selectedImage);
    }

    try {
      const response = await axios.post('https://fastapi-cloud-run-266457465664.us-central1.run.app/extract-text/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setExtractedText(response.data.extracted_text);
      toast.success('텍스트 추출 완료!');
    } catch (error) {
      console.error('Error extracting text:', error);
      toast.error('텍스트 추출에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (extractedText.trim()) {
      navigator.clipboard.writeText(extractedText)
        .then(() => toast.success('텍스트가 복사되었습니다!'))
        .catch(() => toast.error('복사에 실패했습니다.'));
    } else {
      toast.error('복사할 텍스트가 없습니다.');
    }
  };

  const handleTextToSpeech = async (text) => {
    if (!text.trim()) {
      toast.error("음성으로 변환할 텍스트가 없습니다.");
      return;
    }

    ttsMutation.mutate(
      { inputText: text, ttsLanguage: "en-US" },
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

  return (
    <>
      <p className='text-sm font-bold '>음성은 영어 이미지만 출력이 가능합니다.</p>
      <div className="flex flex-col justify-center w-full gap-16 md:flex-row">
        {/* Image Upload Section */}
        <div className="border-2 relative flex flex-col shadow-[-7px_7px_0px_#000000] rounded-lg min-w-[300px] h-[250px] md:w-[400px] md:h-[400px]">
          <div className="flex items-center py-2 my-2 font-bold border-b-2">
            <p className="flex-1 ml-2">이미지를 업로드하거나 선택해주세요.</p>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="px-2 py-2 bg-transparent focus:outline-none"
          />
          {selectedImage && (
            <img
              src={typeof selectedImage === 'string' ? selectedImage : URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="object-contain w-full pb-4"
            />
          )}
          <button
            onClick={handleExtractText}
            disabled={isLoading}
            className="absolute bottom-0 p-1 mt-2 text-center text-white bg-green-300 rounded-md shadow-lg right-1"
          >
            {isLoading ? '처리 중...' : '이미지 분석하기'}
          </button>
        </div>

        {/* Example Images Section */}
        <div className="fixed flex flex-col items-center justify-center gap-4 bottom-4">
          <p className="font-bold">예제 이미지</p>
          <div className="flex gap-4">
            {exampleImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Example ${index + 1}`}
                className="w-24 h-24 border-2 rounded-md cursor-pointer hover:scale-105 hover:opacity-75"
                onClick={() => handleSelectExampleImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Extracted Text Section */}
        <div className="border-2 flex flex-col shadow-[-7px_7px_0px_#000000] rounded-lg min-w-[300px] h-[250px] md:w-[400px] md:h-[400px]">
          <div className="flex items-center py-2 my-2 font-bold border-b-2">
            <p className="flex-1 ml-2">추출된 텍스트</p>
          </div>
          <div className="h-full p-2 bg-transparent focus:outline-none">
            {extractedText || '텍스트 추출 결과가 여기에 표시됩니다.'}
          </div>
          <div className="flex items-center border-t-2">
            <div className="flex flex-1 gap-4 px-4 my-2.5 text-xl">
              <AiOutlineSound onClick={() => handleTextToSpeech(extractedText)} className="text-2xl cursor-pointer hover:text-slate-400" />
              <AiOutlineCopy
                onClick={handleCopy}
                className="text-2xl cursor-pointer hover:text-blue-500"
              />
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
    </>
  );
};

export default ImageTranslatedComponent;
