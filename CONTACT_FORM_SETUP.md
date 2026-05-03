# Contact Form Setup

The website contact form can send each submission to your Gmail and save a record in Google Sheets using Google Apps Script.

## What You Will Have

- A Gmail notification for every new lead.
- A Google Sheet record with name, email, organization, phone, budget, timeline, service interest, referral source, message, source, and submission time.
- Data you can later analyze to understand demand, lead sources, and service interest.

## 1. Create The Google Sheet

1. Go to Google Sheets.
2. Create a new spreadsheet.
3. Name it `Mora Growth Analytics Leads`.
4. Open `Extensions`.
5. Select `Apps Script`.

## 2. Add The Script

1. Delete any starter code in Apps Script.
2. Copy the contents of:

```text
google-apps-script/Code.gs
```

3. Paste it into Apps Script.
4. Replace:

```js
const NOTIFICATION_EMAIL = 'yourgmail@gmail.com';
```

with your Gmail address.

5. Save the script.

## 3. Deploy As A Web App

1. Select `Deploy`.
2. Select `New deployment`.
3. Select the gear icon.
4. Choose `Web app`.
5. Set `Execute as` to `Me`.
6. Set `Who has access` to `Anyone`.
7. Select `Deploy`.
8. Authorize the script when Google asks.
9. Copy the Web app URL.

## 4. Connect The Website

Open:

```text
script.js
```

The site currently uses this variable:

```js
const leadEndpoint = 'https://script.google.com/macros/s/AKfycbyOjhohErPrIcokrfoJwio-YLWEAFfRs51vbAHnmKRBTWhCdYBEZA3_Pq_rEFSTGOz2/exec';
```

If you create a new Apps Script deployment, replace that URL with the new Web app URL.

## 5. Test

1. Open `index.html`.
2. Fill out the contact form.
3. Submit it.
4. Check your Gmail.
5. Check the `Website Leads` tab in your Google Sheet.

## Analysis Ideas

Once leads are saved in Google Sheets, you can analyze:

- Which services people ask about most.
- Which organizations are reaching out.
- Time from inquiry to follow-up.
- Monthly inquiry volume.
- Conversion rate from inquiry to client.

You can also export the Google Sheet as `website_leads.csv` and use:

```text
lead_analysis_template.ipynb
```

to create quick charts.

Do not collect clinical details or protected health information through the public website form.
