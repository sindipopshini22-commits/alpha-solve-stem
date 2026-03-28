import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import { Camera, Upload, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const OCRInput = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      performOCR(file);
    }
  };

  const performOCR = (file) => {
    setLoading(true);
    Tesseract.recognize(
      file,
      'eng',
      { 
        logger: m => {
          if (m.status === 'recognizing text') {
            setProgress(parseInt(m.progress * 100));
          }
        } 
      }
    ).then(({ data: { text } }) => {
      setResult(text.replace(/\r?\n|\r/g, ' '));
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center p-12 border-2 border-dashed border-white/10 rounded-3xl hover:border-primary/50 transition-all cursor-pointer bg-white/5"
           onClick={() => fileInputRef.current.click()}>
        <input 
          type="file" 
          hidden 
          ref={fileInputRef} 
          accept="image/*" 
          onChange={handleImageUpload} 
        />
        <div className="flex flex-col items-center gap-4">
          <div className="p-6 bg-primary/20 rounded-full">
            <Camera size={48} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Snap or Upload Equation</h2>
          <p className="text-text-secondary max-w-sm mx-auto">Upload a photo of your math problem and our AI will transcribe it for you instantly.</p>
          <button className="btn-primary flex items-center gap-2 mt-4">
            <Upload size={18} /> Select Image
          </button>
        </div>
      </div>

      {image && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
          <div className="glass-panel overflow-hidden">
            <img src={image} alt="Uploaded" className="w-full h-auto object-contain" />
          </div>
          <div className="glass-panel p-6 flex flex-col justify-center gap-6">
            <div className="flex items-center gap-3">
              {loading ? <Loader2 className="animate-spin text-primary" /> : <CheckCircle className="text-green-500" />}
              <h3 className="text-xl font-bold">{loading ? `Transcriving... ${progress}%` : "Transcription Complete"}</h3>
            </div>
            
            <div className="bg-black/20 p-4 rounded-xl border border-white/5 font-mono text-lg min-h-[100px] flex items-center justify-center">
              {loading ? (
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
              ) : result || "No text detected."}
            </div>

            {!loading && result && (
              <button onClick={() => {}} className="btn-primary w-full">Use this Equation</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OCRInput;
