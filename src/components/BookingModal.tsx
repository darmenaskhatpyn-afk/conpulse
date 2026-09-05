import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  Globe, 
  ArrowRight, 
  CalendarCheck, 
  Video, 
  Download, 
  ChevronLeft, 
  User,
  Mail,
  Building,
  Check,
  Phone,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
  Sunset,
  Moon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PricingTier, BookingSubmission } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier?: PricingTier | null;
  onBookingComplete?: (booking: BookingSubmission) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ 
  isOpen, 
  onClose, 
  selectedTier,
  onBookingComplete
}) => {
  const { language } = useLanguage();
  const [step, setStep] = useState<'datetime' | 'details' | 'confirmed'>('datetime');
  
  // Real dynamic dates generation based on today's actual date
  const today = useMemo(() => new Date(), []);
  
  // Helper to format localized dates
  const formatDateMeta = (d: Date, lang: string) => {
    const locale = lang === 'ru' ? 'ru-RU' : lang === 'kz' ? 'kk-KZ' : lang === 'es' ? 'es-ES' : 'en-US';
    return {
      iso: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString(locale, { weekday: 'short' }),
      monthDay: d.toLocaleDateString(locale, { day: 'numeric', month: 'short' }),
      full: d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    };
  };

  // Generate next 6 active calendar days dynamically
  const dynamicDates = useMemo(() => {
    const list = [];
    for (let i = 0; i < 6; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      list.push(formatDateMeta(d, language));
    }
    return list;
  }, [today, language]);

  // Selected Date state
  const [selectedIsoDate, setSelectedIsoDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [isCustomDateOpen, setIsCustomDateOpen] = useState(false);

  // Time Slots categorized by period
  const timePresets = [
    { period: language === 'ru' ? 'Утро' : 'Morning', icon: Sun, slots: ['09:00', '10:00', '11:00', '11:30'] },
    { period: language === 'ru' ? 'День' : 'Afternoon', icon: Sunset, slots: ['13:00', '14:00', '15:00', '16:00', '16:30'] },
    { period: language === 'ru' ? 'Вечер' : 'Evening', icon: Moon, slots: ['17:30', '18:30', '19:00', '20:00'] }
  ];

  const [selectedTime, setSelectedTime] = useState<string>('14:00');
  const [isCustomTime, setIsCustomTime] = useState(false);
  const [customTimeValue, setCustomTimeValue] = useState('14:00');

  // Timezone state
  const [userTimezone, setUserTimezone] = useState<string>('UTC+3');

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setUserTimezone(tz || 'Local Time');
    } catch {
      setUserTimezone('Local Time');
    }
  }, []);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [primaryGoal, setPrimaryGoal] = useState('Double Qualified Lead Conversions');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingSubmission | null>(null);
  const [emailDeliveryStatus, setEmailDeliveryStatus] = useState<{ sent: boolean; recipient?: string } | null>(null);

  if (!isOpen) return null;

  // Compute readable formatted selected date string
  const getFormattedSelectedDate = () => {
    try {
      const [year, month, day] = selectedIsoDate.split('-').map(Number);
      const d = new Date(year, month - 1, day);
      const locale = language === 'ru' ? 'ru-RU' : language === 'kz' ? 'kk-KZ' : language === 'es' ? 'es-ES' : 'en-US';
      return d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return selectedIsoDate;
    }
  };

  const handleCustomTimeChange = (timeStr: string) => {
    setCustomTimeValue(timeStr);
    setSelectedTime(timeStr);
    setIsCustomTime(true);
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    const readableDate = getFormattedSelectedDate();
    
    // Post booking lead to server with reliable async awaiting
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const res = await fetch('/api/leads', {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          website,
          type: 'call_booking',
          data: { 
            selectedDate: readableDate, 
            selectedSlot: selectedTime, 
            timezone: userTimezone, 
            primaryGoal, 
            selectedTier: selectedTier?.name 
          }
        })
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const leadRes = await res.json();
        if (leadRes?.notification) {
          setEmailDeliveryStatus({
            sent: Boolean(leadRes.notification.sent),
            recipient: leadRes.notification.recipient || email
          });
        }
      }
    } catch (err) {
      console.warn('Booking lead server notification notice:', err);
    }

    const newBooking: BookingSubmission = {
      id: 'BK-' + Math.floor(100000 + Math.random() * 900000),
      name,
      email,
      company: company || 'My Brand',
      website: website || 'https://example.com',
      date: readableDate,
      timeSlot: `${selectedTime} (${userTimezone})`,
      attendeesCount: '1-2 Team Members',
      primaryGoal,
      createdAt: new Date().toISOString()
    };

    setConfirmedBooking(newBooking);
    if (onBookingComplete) {
      onBookingComplete(newBooking);
    }
    setIsSubmitting(false);
    setStep('confirmed');

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleDownloadIcs = () => {
    const readableDate = getFormattedSelectedDate();
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ConvertPulse//Strategy Session//EN
BEGIN:VEVENT
SUMMARY:ConvertPulse CRO Strategy & Conversion Teardown with ${name || 'You'}
DESCRIPTION:15-minute intensive conversion funnel teardown for ${website || 'your website'}. Meeting Link: https://meet.google.com/cpt-grow-rev
LOCATION:Google Meet Video Call
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ConvertPulse-Session-${selectedIsoDate}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const minDateIso = today.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white border border-zinc-200/90 rounded-2xl text-zinc-900 p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step 1: Select Date & Time */}
        {step === 'datetime' && (
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-semibold mb-2">
                <Video className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'ru' ? '15-минутная бесплатная консультация' : '15-Min Free Strategy Call'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
                {language === 'ru' ? 'Выберите дату и время звонка' : 'Select Your Strategy Time'}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1 font-normal">
                {language === 'ru' 
                  ? 'Мы проведем живой разбор утечек конверсии на вашем сайте и дадим план действий на 60 дней.' 
                  : 'We will tear down your existing conversion leaks live and deliver your 60-day roadmap.'}
              </p>
              {selectedTier && (
                <div className="mt-3 p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                  <span>
                    {language === 'ru' ? 'Выбранный тариф:' : 'Selected Package:'}{' '}
                    <strong className="font-semibold text-zinc-950">{selectedTier.name}</strong>
                  </span>
                </div>
              )}
            </div>

            {/* Dynamic Date Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-900 flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{language === 'ru' ? 'День встречи' : 'Select Day'}</span>
                </label>
                
                <button
                  type="button"
                  onClick={() => setIsCustomDateOpen(!isCustomDateOpen)}
                  className="text-xs text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>{isCustomDateOpen ? (language === 'ru' ? 'Скрыть календарь' : 'Hide calendar') : (language === 'ru' ? 'Выбрать другую дату...' : 'Choose custom date...')}</span>
                </button>
              </div>

              {/* Quick dynamic cards */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {dynamicDates.map((d, index) => {
                  const isSelected = selectedIsoDate === d.iso && !isCustomDateOpen;
                  const isToday = index === 0;
                  const isTomorrow = index === 1;
                  return (
                    <button
                      key={d.iso}
                      type="button"
                      onClick={() => {
                        setSelectedIsoDate(d.iso);
                        setIsCustomDateOpen(false);
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-950 text-white font-bold border-zinc-950 shadow-xs'
                          : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
                      }`}
                    >
                      <span className="text-[10px] font-medium uppercase tracking-wider block opacity-70">
                        {isToday ? (language === 'ru' ? 'Сегодня' : 'Today') : isTomorrow ? (language === 'ru' ? 'Завтра' : 'Tmrw') : d.dayName}
                      </span>
                      <span className="text-xs sm:text-sm font-bold block mt-0.5">{d.monthDay}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Date Input Panel */}
              {isCustomDateOpen && (
                <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-zinc-600">
                    <span className="font-semibold text-zinc-900 block">{language === 'ru' ? 'Выбор произвольной даты:' : 'Pick any custom calendar date:'}</span>
                    <span className="text-[11px] text-zinc-500">{language === 'ru' ? 'Укажите желаемый день' : 'Select any upcoming date'}</span>
                  </div>
                  <input
                    type="date"
                    min={minDateIso}
                    value={selectedIsoDate}
                    onChange={(e) => setSelectedIsoDate(e.target.value)}
                    className="px-3 py-2 bg-white border border-zinc-300 rounded-xl text-xs font-semibold text-zinc-900 focus:outline-none focus:border-zinc-600 cursor-pointer shadow-2xs"
                  />
                </div>
              )}

              {/* Selected date preview badge */}
              <div className="text-xs text-zinc-500 font-medium flex items-center gap-1.5 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{language === 'ru' ? 'Выбранный день:' : 'Selected date:'} <strong className="text-zinc-900 capitalize">{getFormattedSelectedDate()}</strong></span>
              </div>
            </div>

            {/* Time Selector with Categorized Slots + Custom Exact Time */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-900 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{language === 'ru' ? 'Время встречи' : 'Available Time Slots'}</span>
                </label>
                <div className="text-xs text-zinc-400 font-normal">
                  {userTimezone}
                </div>
              </div>

              {/* Categorized slots */}
              <div className="space-y-2.5">
                {timePresets.map((group) => {
                  const Icon = group.icon;
                  return (
                    <div key={group.period} className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider w-16 shrink-0 flex items-center gap-1">
                        <Icon className="w-3 h-3 text-zinc-400" />
                        {group.period}
                      </span>
                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 flex-1">
                        {group.slots.map((slot) => {
                          const isSelected = selectedTime === slot && !isCustomTime;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => {
                                setSelectedTime(slot);
                                setIsCustomTime(false);
                              }}
                              className={`py-2 px-2 rounded-lg border text-center text-xs font-semibold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
                                  : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Custom Exact Time Picker */}
              <div className="pt-2 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                <span className="text-xs text-zinc-600 font-medium">
                  {language === 'ru' ? 'Нужно другое точное время?' : 'Need a custom exact time?'}
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={customTimeValue}
                    onChange={(e) => handleCustomTimeChange(e.target.value)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold text-zinc-900 focus:outline-none ${
                      isCustomTime ? 'border-zinc-950 bg-zinc-50 ring-1 ring-zinc-950' : 'border-zinc-200 bg-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTime(customTimeValue);
                      setIsCustomTime(true);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      isCustomTime
                        ? 'bg-zinc-950 text-white'
                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                    }`}
                  >
                    {language === 'ru' ? 'Выбрать' : 'Set'}
                  </button>
                </div>
              </div>
            </div>

            {/* Timezone Note */}
            <div className="flex items-center gap-2 text-xs text-zinc-600 bg-zinc-50 p-3 rounded-xl border border-zinc-100 font-normal">
              <Globe className="w-4 h-4 text-zinc-400 shrink-0" />
              <span>
                {language === 'ru'
                  ? `Часовой пояс определен автоматически: ${userTimezone}. Ссылка на Google Meet будет отправлена на почту.`
                  : `Timezone auto-detected as ${userTimezone}. 1-click Google Meet video link will be issued.`}
              </span>
            </div>

            {/* Next Action */}
            <button
              onClick={() => setStep('details')}
              className="w-full py-3.5 text-sm font-bold text-white bg-zinc-950 hover:bg-zinc-800 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>{language === 'ru' ? 'Далее: Контактные данные' : 'Next: Enter Contact Details'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

        {/* Step 2: Contact Details */}
        {step === 'details' && (
          <form onSubmit={handleConfirm} className="space-y-5">
            <div>
              <button
                type="button"
                onClick={() => setStep('datetime')}
                className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-1 mb-2 font-medium cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> 
                {language === 'ru' ? 'Назад к выбору времени' : 'Back to timeslot'}
              </button>
              <h3 className="text-2xl font-extrabold tracking-tight text-zinc-950">
                {language === 'ru' ? 'Контактные данные' : 'Contact & Teardown Details'}
              </h3>
              <p className="text-xs text-zinc-600 mt-1 font-normal">
                {language === 'ru' ? 'Бронирование на' : 'Booking for'}{' '}
                <strong className="font-semibold text-zinc-900 capitalize">{getFormattedSelectedDate()} в {selectedTime}</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-medium text-zinc-700 block mb-1">
                  {language === 'ru' ? 'Ваше имя *' : 'Your Name *'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-normal text-zinc-900 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-700 block mb-1">
                  {language === 'ru' ? 'Рабочий Email *' : 'Work Email *'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-normal text-zinc-900 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-700 block mb-1">
                  {language === 'ru' ? 'Телефон / WhatsApp (для ссылки)' : 'Phone / WhatsApp'}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    placeholder="+7 (701) 000-00-00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-normal text-zinc-900 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-700 block mb-1">
                  {language === 'ru' ? 'Компания' : 'Company Name'}
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Acme Growth Inc."
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-normal text-zinc-900 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-700 block mb-1">
                  {language === 'ru' ? 'Адрес сайта *' : 'Website URL *'}
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="url"
                    required
                    placeholder="https://acme.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-normal text-zinc-900 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-700 block mb-1">
                {language === 'ru' ? 'Главная цель роста' : 'Primary Growth Goal'}
              </label>
              <select
                value={primaryGoal}
                onChange={(e) => setPrimaryGoal(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-normal text-zinc-900 focus:outline-none focus:border-zinc-500"
              >
                <option value="Double Qualified Lead Conversions">
                  {language === 'ru' ? 'Удвоить конверсию в заявки (+100% Lift)' : 'Double Qualified Lead Conversions (+100% Lift)'}
                </option>
                <option value="Fix Checkout / Cart Abandonment">
                  {language === 'ru' ? 'Устранить брошенные корзины на мобильных' : 'Fix Checkout / Cart Abandonment on Mobile'}
                </option>
                <option value="Lower Customer Acquisition Cost (CAC)">
                  {language === 'ru' ? 'Снизить стоимость привлечения клиента (CAC)' : 'Lower Customer Acquisition Cost (CAC) on Paid Ads'}
                </option>
                <option value="Deploy Complete Funnel & Copywriting Overhaul">
                  {language === 'ru' ? 'Полный аудит и перезапуск воронки и копирайтинга' : 'Deploy Complete Funnel & Copywriting Overhaul'}
                </option>
              </select>
            </div>

            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 text-xs text-zinc-600 flex items-center gap-2 font-normal">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {language === 'ru' 
                  ? 'Живой разбор 1-на-1 со старшим архитектором конверсии. Без спама и скрытых условий.' 
                  : 'Includes live 1-on-1 teardown with a Senior Conversion Architect. No sales pitch.'}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !name || !email}
              className="w-full py-3.5 text-sm font-bold text-white bg-zinc-950 hover:bg-zinc-800 disabled:opacity-50 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {language === 'ru' ? 'Бронирование слота...' : 'Securing Session Slot...'}
                </span>
              ) : (
                <>
                  <CalendarCheck className="w-4 h-4" />
                  <span>
                    {language === 'ru' 
                      ? 'Подтвердить встречу и получить ссылку на Google Meet' 
                      : 'Confirm Strategy Call & Get Google Meet Link'}
                  </span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Step 3: Confirmed View */}
        {step === 'confirmed' && (
          <div className="space-y-6 text-center">
            
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl mx-auto flex items-center justify-center shadow-xs">
              <CalendarCheck className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-medium text-zinc-400 block mb-1">
                {language === 'ru' ? 'Номер бронирования' : 'Booking Reference'}: {confirmedBooking?.id}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
                {language === 'ru' ? `Встреча подтверждена, ${name}!` : `You're Confirmed, ${name}!`}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-md mx-auto font-normal">
                {language === 'ru' 
                  ? `Мы зарезервировали 15-минутную сессию на `
                  : `We’ve reserved your 15-minute Strategy Session for `}
                <strong className="font-semibold text-zinc-900 capitalize">{getFormattedSelectedDate()} в {selectedTime}</strong>.
              </p>
            </div>

            {/* Details Summary Card */}
            <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100 text-left text-xs space-y-2.5 max-w-md mx-auto">
              <div className="flex justify-between pb-2 border-b border-zinc-200/60">
                <span className="text-zinc-500 font-medium">
                  {language === 'ru' ? 'Ссылка на встречу:' : 'Meeting Link:'}
                </span>
                <span className="text-zinc-900 font-semibold flex items-center gap-1">
                  <Video className="w-3.5 h-3.5 text-zinc-700" /> Google Meet (Авто-создана)
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-zinc-200/60">
                <span className="text-zinc-500 font-medium">
                  {language === 'ru' ? 'Сайт для аудита:' : 'Target Website:'}
                </span>
                <span className="text-zinc-900 font-semibold">{website || 'Not specified'}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-zinc-200/60">
                <span className="text-zinc-500 font-medium">
                  {language === 'ru' ? 'Подтверждение отправлено на:' : 'Email Confirmation:'}
                </span>
                <span className="text-zinc-900 font-semibold">{email}</span>
              </div>
              {phone && (
                <div className="flex justify-between">
                  <span className="text-zinc-500 font-medium">
                    {language === 'ru' ? 'Телефон / Мессенджер:' : 'Phone / Messenger:'}
                  </span>
                  <span className="text-zinc-900 font-semibold">{phone}</span>
                </div>
              )}
            </div>

            {/* Email Dispatch & Spam Alert Box */}
            <div className="p-3.5 bg-emerald-50/80 border border-emerald-200/70 rounded-xl text-left text-xs max-w-md mx-auto">
              <div className="flex items-start gap-2.5 text-emerald-900">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-emerald-950">
                    {language === 'ru' 
                      ? 'Уведомление и подтверждение отправлены!' 
                      : 'Confirmation email successfully dispatched!'}
                  </p>
                  <p className="text-emerald-800 text-[11px] leading-relaxed">
                    {language === 'ru' 
                      ? 'Если письмо не появилось в папке «Входящие» в течение 1 минуты, проверьте вкладки «Оповещения», «Спам» или «Вся почта» (Gmail иногда группирует письма от самого себя).'
                      : 'If you don\'t see the email in your Inbox, please check "Spam" or "All Mail" folders.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Calendar Export Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <button
                onClick={handleDownloadIcs}
                className="w-full py-3 px-4 text-xs font-semibold text-zinc-800 bg-white hover:bg-zinc-50 rounded-xl border border-zinc-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-zinc-700" />
                <span>{language === 'ru' ? 'Добавить в календарь (.ics)' : 'Add to Calendar (.ics)'}</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 px-4 text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                <span>{language === 'ru' ? 'Готово' : 'Done'}</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
