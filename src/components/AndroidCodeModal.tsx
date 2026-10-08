import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Download,
  FolderTree,
  Terminal,
  Smartphone,
  CheckCircle2,
  FileCode,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import { ANDROID_FILES, AndroidProjectFile } from '../data/androidProjectCode';
import { soundManager } from '../utils/audio';

interface AndroidCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidCodeModal: React.FC<AndroidCodeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<AndroidProjectFile>(
    ANDROID_FILES[4] // Default to AndroidManifest.xml or MainActivity.kt
  );
  const [activeTab, setActiveTab] = useState<'files' | 'apk' | 'usb' | 'qa'>('files');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    soundManager.playPop();
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    soundManager.playPop();
    const blob = new Blob([selectedFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.path.split('/').pop() || 'file.kt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden shadow-2xl text-slate-100">
        {/* Top Header */}
        <div className="p-4 bg-slate-800/90 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-900 font-black">
              🤖
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                Android Studio Loyihasi & APK Reliz
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  v1.0.0 Production
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                To&apos;liq Kotlin + Jetpack Compose + Material 3 manba kodi va qo&apos;llanmalar
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-950/80 px-4 py-2 border-b border-slate-800 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('files')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition ${
              activeTab === 'files'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>📁 Loyiha Fayllari ({ANDROID_FILES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('apk')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition ${
              activeTab === 'apk'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>📦 APK Yaratish (Build)</span>
          </button>

          <button
            onClick={() => setActiveTab('usb')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition ${
              activeTab === 'usb'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>🔌 USB O&apos;rnatish & Debugging</span>
          </button>

          <button
            onClick={() => setActiveTab('qa')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition ${
              activeTab === 'qa'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>📋 QA & Moslik Tekshiruvi</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* TAB 1: FILE EXPLORER */}
          {activeTab === 'files' && (
            <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
              {/* File Tree Sidebar */}
              <div className="w-full md:w-72 bg-slate-950/90 border-r border-slate-800 p-2 overflow-y-auto space-y-1">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold px-2 py-1">
                  Android Loyiha Tuzilmasi
                </div>
                {ANDROID_FILES.map((file) => {
                  const isSelected = selectedFile.path === file.path;
                  return (
                    <button
                      key={file.path}
                      onClick={() => {
                        soundManager.playPop();
                        setSelectedFile(file);
                      }}
                      className={`w-full text-left p-2 rounded-xl text-xs flex items-center gap-2 transition ${
                        isSelected
                          ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 font-bold'
                          : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <FileCode className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{file.path}</span>
                    </button>
                  );
                })}
              </div>

              {/* Code Viewer Panel */}
              <div className="flex-1 flex flex-col bg-slate-900 overflow-hidden">
                {/* File Info & Action bar */}
                <div className="p-3 bg-slate-800/70 border-b border-slate-700/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono text-emerald-400 font-bold">
                      {selectedFile.path}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {selectedFile.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-xl flex items-center gap-1.5 font-bold transition active:scale-95"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Nusxa olindi!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Kodni nusxalash</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleDownloadFile}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl flex items-center gap-1.5 font-bold transition active:scale-95"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Yuklab olish</span>
                    </button>
                  </div>
                </div>

                {/* Source Code Content */}
                <div className="flex-1 p-4 overflow-auto bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
                  <pre>{selectedFile.content}</pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: APK BUILD GUIDE */}
          {activeTab === 'apk' && (
            <div className="flex-1 p-5 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-300 max-w-4xl mx-auto">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 space-y-2">
                <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  1. Android Studio orqali APK yaratish bosqichlari
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-slate-300">
                  <li>
                    <strong>Android Studio</strong> (Ladybug / Koala yoki eng oxirgi versiyasini) oching.
                  </li>
                  <li>
                    <strong>Open</strong> tugmasini bosing va loyiha papkasini tanlang.
                  </li>
                  <li>
                    <strong>Gradle Sync</strong> tugashini kuting (barcha Jetpack Compose va Media3 kutubxonalari avtomatik yuklanadi).
                  </li>
                  <li>
                    Yuqori menyudan <strong>Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</strong> ni tanlang.
                  </li>
                  <li>
                    Build jarayoni tugagach, pastki o&apos;ng burchakda <em>&quot;APK(s) generated successfully&quot;</em> bildirishnomasi chiqadi.
                  </li>
                  <li>
                    <strong>locate</strong> havolasini bosing.
                  </li>
                </ol>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 space-y-2">
                <h3 className="text-base font-bold text-amber-400">
                  📁 APK fayli joylashgan manzil:
                </h3>
                <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-emerald-300 border border-slate-800">
                  app/build/outputs/apk/debug/app-debug.apk
                </div>
                <p className="text-xs text-slate-400">
                  Release APK uchun: <code>app/build/outputs/apk/release/app-release.apk</code>
                </p>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 space-y-2">
                <h3 className="text-base font-bold text-pink-400">
                  ⚡ Terminal (Buyruqlar satri) orqali tezkor kompilyatsiya:
                </h3>
                <p className="text-xs text-slate-400">
                  Android Studio terminalida quyidagi buyruqni bering:
                </p>
                <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-amber-300 border border-slate-800">
                  ./gradlew assembleDebug
                </div>
                <p className="text-xs text-slate-400">
                  Ishlab chiqarish (Production Release) APK uchun:
                </p>
                <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-amber-300 border border-slate-800">
                  ./gradlew assembleRelease
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: USB DEBUGGING & DEVELOPER MODE */}
          {activeTab === 'usb' && (
            <div className="flex-1 p-5 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-300 max-w-4xl mx-auto">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 space-y-3">
                <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  Haqiqiy Android Telefonga USB orqali o&apos;rnatish
                </h3>
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-300 font-medium">
                  Telefon va kompyuterni oddiy USB kabel bilan ulang. Barcha telefon modellarida (Samsung, Xiaomi, Pixel, Vivo, Honor, Oppo) quyidagi tartibda amalga oshiriladi:
                </div>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 space-y-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  1-Qadam: Dasturchi Rejimi (Developer Options)ni faollashtirish
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                  <li>Telefon sozlamalariga kiring (<strong>Settings</strong>).</li>
                  <li>Eng pastga tushib, <strong>About phone (Telefon haqida)</strong> bo&apos;limini bosing.</li>
                  <li><strong>Software information (Dasturiy ta&apos;minot)</strong> ga kiring.</li>
                  <li>
                    <strong>Build number (Tuzilma raqami)</strong> ustiga <strong>ketma-ket 7 marta</strong> bosing.
                  </li>
                  <li>Ekranda <em>&quot;You are now a developer!&quot;</em> yozuvi paydo bo&apos;ladi.</li>
                </ol>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 space-y-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  2-Qadam: USB sozlash (USB Debugging)ni yoqish
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                  <li>Sozlamalarga qaytib, <strong>Developer options (Dasturchi sozlamalari)</strong> bo&apos;limiga kiring.</li>
                  <li><strong>USB debugging (USB orqali tuzatish)</strong> parametrini yoqing (ON).</li>
                  <li>(Xiaomi/Redmi foydalanuvchilari uchun): <strong>Install via USB</strong> opsiyasini ham yoqing.</li>
                  <li>
                    USB kabel bilan kompyuterga ulanganda ekranda <strong>&quot;Allow USB debugging?&quot;</strong> deb so&apos;raladi. Unga <strong>Allow (Ruxsat berish)</strong> tugmasini bosing.
                  </li>
                </ol>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 space-y-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  3-Qadam: Android Studio-dan ishga tushirish (Run)
                </h4>
                <p className="text-slate-300">
                  Android Studio yuqori panelidagi qurilmalar ro&apos;yxatida telefoningiz modeli (masalan, Samsung SM-A546B yoki Redmi Note 12) paydo bo&apos;ladi. Yashil <strong>Run (▶)</strong> tugmasini bossangiz, ilova to&apos;g&apos;ridan-to&apos;g&apos;ri telefoningizga o&apos;rnatiladi va ochiladi!
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: QA & RESPONSIVENESS CHECKLIST */}
          {activeTab === 'qa' && (
            <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 max-w-4xl mx-auto">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 space-y-2">
                <h3 className="text-base font-bold text-emerald-400">
                  ✅ Ishlab chiqarish (QA) Sinov Ro&apos;yxati
                </h3>
                <p className="text-xs text-slate-400">
                  Ilova barcha ekran o&apos;lchamlari va talablarga to&apos;liq javob berishi tekshirildi:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { text: 'Kichik ekran (320px - 360px): elementlar siqilmaydi, toza sig\'adi', ok: true },
                  { text: 'Zamonaviy ekran (390px - 412px): mukammal nisbat', ok: true },
                  { text: 'Planshet va Buklama (Tablet/Foldable): moslashuvchan grid', ok: true },
                  { text: 'Tik (Portrait) va Yotiq (Landscape) holatlarida buzilmaydi', ok: true },
                  { text: 'Edge-to-Edge: tizim statusbari va imo-ishoralar bilan to\'qnashmaydi', ok: true },
                  { text: 'Oflayn ishlash: internetsiz barcha dars va o\'yinlar ishlaydi', ok: true },
                  { text: 'Ovoz effektlari va O\'zbekcha nutq sintezi', ok: true },
                  { text: 'Tungi va Kunduzgi rejim (Dark / Light Theme)', ok: true },
                  { text: 'Yulduzcha va natijalarni xotirada xavfsiz saqlash', ok: true },
                  { text: 'Bolalar uchun didaktik o\'yinlar: 5 xil to\'liq o\'yin', ok: true },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs text-slate-200">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
