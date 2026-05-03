# Mora Growth Analytics Website

Static website for Mora Growth Analytics.

## Preview

Open `index.html` in a browser.

## Add Your Logo

Your cropped display logo is used here:

```text
assets/logo-cropped.png
```

The original logo is also kept at `assets/logo.png`.

## Add Founder Photo

Add your founder photo here:

```text
assets/founder.jpg
```

The founder section already uses that path. If the file is missing, it shows the `HM` monogram fallback.

## Contact Form

The contact form is designed to send submissions to Gmail and save records to Google Sheets using Google Apps Script.

Follow:

```text
CONTACT_FORM_SETUP.md
```

Do not collect clinical details or protected health information through the public website form.

The active form endpoint is set in:

```text
script.js
```

Look for:

```js
const leadEndpoint = '...';
```

## Lead Analysis

After exporting the Google Sheet as CSV, use:

```text
lead_analysis_template.ipynb
```

to analyze service interest and monthly inquiry volume.
