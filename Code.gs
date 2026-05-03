const NOTIFICATION_EMAIL = 'yourgmail@gmail.com';
const SHEET_NAME = 'Website Leads';

function doPost(e) {
  try {
    const data = getRequestData(e);
    const sheet = getLeadSheet();
    const submittedAt = new Date();

    sheet.appendRow([
      submittedAt,
      cleanValue(data.full_name || data.name),
      cleanValue(data.email),
      cleanValue(data.organization),
      cleanValue(data.phone),
      cleanValue(data.budget),
      cleanValue(data.timeline),
      cleanValue(data.service_needed || data.service),
      cleanValue(data.referral_source),
      cleanValue(data.project_details || data.message),
      cleanValue(data.source)
    ]);

    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: `New MORA Growth Analytics inquiry from ${cleanValue(data.full_name || data.name)}`,
      replyTo: cleanValue(data.email),
      htmlBody: buildEmailBody(data, submittedAt)
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: error.message });
  }
}

function getLeadSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Submitted At',
      'Name',
      'Email',
      'Organization',
      'Phone',
      'Budget',
      'Timeline',
      'Service Interest',
      'Referral Source',
      'Message',
      'Source'
    ]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function buildEmailBody(data, submittedAt) {
  return `
    <h2>New MORA Growth Analytics inquiry</h2>
    <p><strong>Submitted:</strong> ${escapeHtml(submittedAt.toLocaleString())}</p>
    <p><strong>Name:</strong> ${escapeHtml(data.full_name || data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Organization:</strong> ${escapeHtml(data.organization)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Budget:</strong> ${escapeHtml(data.budget)}</p>
    <p><strong>Timeline:</strong> ${escapeHtml(data.timeline)}</p>
    <p><strong>Service Interest:</strong> ${escapeHtml(data.service_needed || data.service)}</p>
    <p><strong>Referral Source:</strong> ${escapeHtml(data.referral_source)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(data.project_details || data.message).replace(/\n/g, '<br>')}</p>
  `;
}

function getRequestData(e) {
  if (e.parameter && Object.keys(e.parameter).length > 0) {
    return e.parameter;
  }

  return JSON.parse(e.postData.contents);
}

function cleanValue(value) {
  return String(value || '').trim();
}

function escapeHtml(value) {
  return cleanValue(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
