import nodemailer, { type Transporter } from 'nodemailer';

const DEFAULT_RECIPIENT = 'darmenaskhatpyn@gmail.com';

interface LeadNotificationPayload {
  name: string;
  email: string;
  company?: string;
  website?: string;
  phone?: string;
  type?: string;
  data?: {
    selectedDate?: string;
    selectedSlot?: string;
    timezone?: string;
    primaryGoal?: string;
    selectedTier?: string;
    answers?: Record<string, any>;
    score?: number;
    [key: string]: any;
  };
}

let transporterInstance: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (transporterInstance) return transporterInstance;

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const user = process.env.SMTP_USER || 'darmenaskhatpyn@gmail.com';
  const rawPass = process.env.SMTP_PASS || '';
  const pass = rawPass.replace(/\s+/g, ''); // Removes any spaces from Google App Password
  const port = parseInt(process.env.SMTP_PORT || '587', 10);

  if (pass) {
    if (host.includes('gmail') || user.includes('gmail')) {
      transporterInstance = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user,
          pass
        }
      });
      console.log(`[Mailer] Initialized Gmail Transporter for ${user}`);
    } else {
      transporterInstance = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass }
      });
      console.log(`[Mailer] Initialized SMTP transporter for host ${host}:${port}`);
    }
  }

  return transporterInstance;
}

export async function sendLeadEmailNotification(payload: LeadNotificationPayload): Promise<{
  sent: boolean;
  recipient: string;
  messageId?: string;
  loggedOnly?: boolean;
}> {
  const recipientEmail = process.env.NOTIFICATION_EMAIL || DEFAULT_RECIPIENT;
  const isBooking = payload.type === 'call_booking';
  const subject = isBooking
    ? `🔥 Новая запись на аудит: ${payload.name} (${payload.data?.selectedDate || 'Скоро'})`
    : `📩 Новая заявка с сайта от ${payload.name} (${payload.website || payload.email})`;

  const formattedDate = new Date().toLocaleString('ru-RU', { timeZone: 'UTC' }) + ' UTC';

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 24px; color: #18181b; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e4e4e7; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #09090b; color: #ffffff; padding: 24px; }
    .header h2 { margin: 0; font-size: 20px; font-weight: 700; }
    .header p { margin: 6px 0 0 0; font-size: 13px; color: #a1a1aa; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; background: #fef3c7; color: #92400e; margin-bottom: 12px; }
    .content { padding: 24px; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 20px; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .row:last-child { border-bottom: none; }
    .label { color: #64748b; font-weight: 500; }
    .value { color: #0f172a; font-weight: 600; text-align: right; }
    .btn { display: inline-block; background: #09090b; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-size: 14px; font-weight: 600; margin-top: 12px; }
    .footer { padding: 16px 24px; background: #f8fafc; border-top: 1px solid #e4e4e7; font-size: 12px; color: #71717a; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">${isBooking ? '📅 Бронирование Стратегической Сессии' : '⚡ Новая Заявка'}</div>
      <h2>${isBooking ? 'Новая запись на разбор конверсии' : 'Получена новая заявка с сайта'}</h2>
      <p>Уведомление для: ${recipientEmail}</p>
    </div>
    <div class="content">
      <div class="card">
        <div class="row">
          <span class="label">Имя клиента:</span>
          <span class="value">${payload.name}</span>
        </div>
        <div class="row">
          <span class="label">Email:</span>
          <span class="value"><a href="mailto:${payload.email}" style="color: #2563eb; text-decoration: none;">${payload.email}</a></span>
        </div>
        ${payload.phone ? `
        <div class="row">
          <span class="label">Телефон / Мессенджер:</span>
          <span class="value">${payload.phone}</span>
        </div>` : ''}
        ${payload.company ? `
        <div class="row">
          <span class="label">Компания:</span>
          <span class="value">${payload.company}</span>
        </div>` : ''}
        ${payload.website ? `
        <div class="row">
          <span class="label">Сайт:</span>
          <span class="value"><a href="${payload.website.startsWith('http') ? payload.website : 'https://' + payload.website}" target="_blank" style="color: #2563eb;">${payload.website}</a></span>
        </div>` : ''}
        ${payload.data?.selectedDate ? `
        <div class="row">
          <span class="label">Выбранный день:</span>
          <span class="value" style="color: #059669;">${payload.data.selectedDate}</span>
        </div>` : ''}
        ${payload.data?.selectedSlot ? `
        <div class="row">
          <span class="label">Время встречи:</span>
          <span class="value" style="color: #059669;">${payload.data.selectedSlot} (${payload.data?.timezone || 'Local'})</span>
        </div>` : ''}
        ${payload.data?.primaryGoal ? `
        <div class="row">
          <span class="label">Главная цель:</span>
          <span class="value">${payload.data.primaryGoal}</span>
        </div>` : ''}
        ${payload.data?.selectedTier ? `
        <div class="row">
          <span class="label">Интересующий тариф:</span>
          <span class="value">${payload.data.selectedTier}</span>
        </div>` : ''}
      </div>

      <p style="font-size: 13px; color: #52525b; line-height: 1.5;">
        Клиент ожидает звонка или ответа на указанную почту. Вы можете ответить ему напрямую:
      </p>

      <a href="mailto:${payload.email}?subject=Разбор конверсии сайта ${encodeURIComponent(payload.website || '')}" class="btn">
        Написать клиенту (${payload.email}) →
      </a>
    </div>
    <div class="footer">
      ConvertPulse CRO Platform • Время заявки: ${formattedDate}
    </div>
  </div>
</body>
</html>
`;

  const textContent = `
НОВАЯ ЗАЯВКА НА РАЗБОР КОНВЕРСИИ
---------------------------------
Имя: ${payload.name}
Email: ${payload.email}
${payload.phone ? `Телефон: ${payload.phone}\n` : ''}${payload.company ? `Компания: ${payload.company}\n` : ''}${payload.website ? `Сайт: ${payload.website}\n` : ''}${payload.data?.selectedDate ? `Дата: ${payload.data.selectedDate}\n` : ''}${payload.data?.selectedSlot ? `Время: ${payload.data.selectedSlot} (${payload.data?.timezone || ''})\n` : ''}${payload.data?.primaryGoal ? `Цель: ${payload.data.primaryGoal}\n` : ''}
Время получения: ${formattedDate}
Получатель: ${recipientEmail}
`;

  // 1. Try Resend API if key is provided
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'ConvertPulse <onboarding@resend.dev>',
          to: [recipientEmail],
          reply_to: payload.email,
          subject,
          html: htmlContent
        })
      });
      if (resendRes.ok) {
        const resendData = await resendRes.json();
        console.log(`[Mailer] ✅ Resend Email sent to ${recipientEmail}:`, resendData);
        return { sent: true, recipient: recipientEmail, messageId: (resendData as any).id };
      } else {
        const errText = await resendRes.text();
        console.error(`[Mailer] ❌ Resend API error:`, errText);
      }
    } catch (err: any) {
      console.error(`[Mailer] Resend fetch error:`, err?.message || err);
    }
  }

  // 2. Try Telegram Bot notification if configured
  const tgToken = process.env.TELEGRAM_BOT_TOKEN;
  const tgChatId = process.env.TELEGRAM_CHAT_ID;
  if (tgToken && tgChatId) {
    try {
      const tgText = `🔥 *Новая заявка ConvertPulse!* \n\n` +
        `👤 *Имя:* ${payload.name}\n` +
        `📧 *Email:* ${payload.email}\n` +
        (payload.phone ? `📱 *Телефон:* ${payload.phone}\n` : '') +
        (payload.website ? `🌐 *Сайт:* ${payload.website}\n` : '') +
        (payload.data?.selectedDate ? `📅 *Дата:* ${payload.data.selectedDate} в ${payload.data?.selectedSlot || ''}\n` : '') +
        (payload.data?.primaryGoal ? `🎯 *Цель:* ${payload.data.primaryGoal}\n` : '');

      await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgChatId,
          text: tgText,
          parse_mode: 'Markdown'
        })
      });
      console.log(`[Mailer] ✅ Telegram alert sent to chat ${tgChatId}`);
    } catch (tgErr) {
      console.error(`[Mailer] Telegram alert error:`, tgErr);
    }
  }

  // 3. Try Webhook (Zapier, Make, Discord, Slack)
  const webhookUrl = process.env.WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'new_lead',
          recipient: recipientEmail,
          lead: payload,
          timestamp: new Date().toISOString()
        })
      });
      console.log(`[Mailer] ✅ Webhook dispatched to ${webhookUrl}`);
    } catch (wErr) {
      console.error(`[Mailer] Webhook dispatch error:`, wErr);
    }
  }

  // 4. Try SMTP Transporter (Gmail App Password, Sendgrid, etc.)
  const transporter = getTransporter();

  if (transporter) {
    try {
      const fromAddr = process.env.SMTP_FROM || `"ConvertPulse CRO" <${process.env.SMTP_USER || 'darmenaskhatpyn@gmail.com'}>`;
      
      // Send main notification to Admin (darmenaskhatpyn@gmail.com)
      const info = await transporter.sendMail({
        from: fromAddr,
        to: recipientEmail,
        replyTo: payload.email,
        subject: `[ConvertPulse] ${subject}`,
        text: textContent,
        html: htmlContent,
        headers: {
          'X-Priority': '1 (Highest)',
          'X-MSMail-Priority': 'High',
          'Importance': 'High'
        }
      });

      console.log(`[Mailer] ✅ Admin alert sent to ${recipientEmail}. MessageId: ${info.messageId}`);

      // If client provided an email, also send them a confirmation receipt
      if (payload.email && payload.email.includes('@') && payload.type !== 'newsletter_subscription') {
        try {
          const clientSubject = isBooking
            ? `✅ Ваша запись на разбор сайта подтверждена — ConvertPulse`
            : `✅ Ваша заявка на аудит принята — ConvertPulse`;

          const clientHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 24px; color: #18181b; }
    .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e4e4e7; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #09090b; color: #ffffff; padding: 28px 24px; text-align: center; }
    .header h2 { margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; }
    .header p { margin: 8px 0 0 0; font-size: 13px; color: #a1a1aa; }
    .content { padding: 24px; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin: 18px 0; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .row:last-child { border-bottom: none; }
    .label { color: #64748b; font-weight: 500; }
    .value { color: #0f172a; font-weight: 600; text-align: right; }
    .steps { background: #fffbeb; border: 1px solid #fef3c7; border-radius: 12px; padding: 16px; font-size: 13px; color: #92400e; margin-bottom: 20px; }
    .footer { padding: 16px 24px; background: #f8fafc; border-top: 1px solid #e4e4e7; font-size: 12px; color: #71717a; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div style="display:inline-block;padding:4px 12px;border-radius:9999px;background:#fef3c7;color:#92400e;font-size:12px;font-weight:700;margin-bottom:10px;">
        ConvertPulse CRO
      </div>
      <h2>Здравствуйте, ${payload.name}!</h2>
      <p>${isBooking ? 'Ваша стратегическая сессия успешно забронирована' : 'Ваш запрос на аудит успешно принят в работу'}</p>
    </div>
    <div class="content">
      <p style="font-size: 14px; line-height: 1.6; color: #3f3f46; margin-top: 0;">
        Спасибо за обращение! Наш ведущий специалист по оптимизации конверсий уже изучает ваш проект.
      </p>

      <div class="card">
        ${payload.website ? `
        <div class="row">
          <span class="label">Анализируемый сайт:</span>
          <span class="value">${payload.website}</span>
        </div>` : ''}
        ${payload.data?.selectedDate ? `
        <div class="row">
          <span class="label">Дата встречи:</span>
          <span class="value" style="color:#059669;">${payload.data.selectedDate}</span>
        </div>` : ''}
        ${payload.data?.selectedSlot ? `
        <div class="row">
          <span class="label">Время:</span>
          <span class="value" style="color:#059669;">${payload.data.selectedSlot} (${payload.data?.timezone || 'Local'})</span>
        </div>` : ''}
        ${payload.data?.primaryGoal ? `
        <div class="row">
          <span class="label">Ключевая цель:</span>
          <span class="value">${payload.data.primaryGoal}</span>
        </div>` : ''}
      </div>

      <div class="steps">
        <strong>Что произойдет дальше:</strong><br>
        1. Мы проведем предварительный скоринг конверсионных барьеров вашего сайта.<br>
        2. За 15 минут до встречи мы пришлем ссылку на Google Meet / Zoom на этот email и в мессенджер.<br>
        3. Если у вас срочный вопрос, вы можете сразу написать нам в ответ на это письмо.
      </div>
    </div>
    <div class="footer">
      ConvertPulse CRO & Growth Engineering • darmenaskhatpyn@gmail.com
    </div>
  </div>
</body>
</html>`;

          await transporter.sendMail({
            from: fromAddr,
            to: payload.email,
            subject: clientSubject,
            html: clientHtml
          });
          console.log(`[Mailer] ✅ Client confirmation sent to ${payload.email}`);
        } catch (cErr: any) {
          console.warn(`[Mailer] Client confirmation notice:`, cErr?.message || cErr);
        }
      }

      return { sent: true, recipient: recipientEmail, messageId: info.messageId };
    } catch (err: any) {
      console.error(`[Mailer] ❌ Error sending email to ${recipientEmail}:`, err?.message || err);
      // Fallback to detailed logging
    }
  }

  // If SMTP is not yet configured with credentials, output the complete formatted dispatch log:
  console.log(`
======================================================
📧 [LEAD NOTIFICATION DISPATCHED TO: ${recipientEmail}]
======================================================
Тема: ${subject}
Клиент: ${payload.name} <${payload.email}>
Сайт: ${payload.website || 'Не указан'}
Дата и время: ${payload.data?.selectedDate || 'Срочно'} в ${payload.data?.selectedSlot || 'N/A'}
Цель: ${payload.data?.primaryGoal || 'Разбор конверсии'}
------------------------------------------------------
(Примечание: Чтобы письма отправлялись через реальный почтовый сервер (Gmail SMTP / Resend),
укажите SMTP_HOST, SMTP_USER и SMTP_PASS в файле .env)
======================================================
`);

  return { sent: false, recipient: recipientEmail, loggedOnly: true };
}

export async function sendDirectTestEmail(targetEmail: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const transporter = getTransporter();
  if (!transporter) {
    return { success: false, error: 'SMTP credentials (SMTP_PASS) are missing or invalid.' };
  }

  try {
    const fromAddr = process.env.SMTP_FROM || `"ConvertPulse CRO" <${process.env.SMTP_USER || 'darmenaskhatpyn@gmail.com'}>`;
    const info = await transporter.sendMail({
      from: fromAddr,
      to: targetEmail,
      subject: `[ConvertPulse] Проверочное письмо доставки — ${new Date().toLocaleTimeString('ru-RU')}`,
      html: `
        <div style="font-family: sans-serif; padding: 24px; background: #ffffff; border-radius: 12px; border: 1px solid #e4e4e7; max-width: 500px; margin: 0 auto;">
          <h2 style="color: #18181b; margin-top: 0;">✅ Проверка почты ConvertPulse</h2>
          <p style="color: #3f3f46; font-size: 14px; line-height: 1.5;">
            Привет, Дармен! Это тестовое письмо, отправленное напрямую через ваш сервер Gmail SMTP.
          </p>
          <div style="background: #f4f4f5; padding: 12px 16px; border-radius: 8px; font-size: 13px; color: #52525b; margin: 16px 0;">
            <b>Статус:</b> Доставлено успешно<br>
            <b>Время отправки:</b> ${new Date().toLocaleString('ru-RU')}<br>
            <b>Получатель:</b> ${targetEmail}
          </div>
          <p style="color: #71717a; font-size: 12px; margin-bottom: 0;">
            Если письмо попало во вкладку «Оповещения» или «Спам», нажмите «Не спам», чтобы важные заявки приходили во «Входящие».
          </p>
        </div>
      `,
      headers: {
        'X-Priority': '1 (Highest)',
        'Importance': 'High'
      }
    });

    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    return { success: false, error: err?.message || String(err) };
  }
}
