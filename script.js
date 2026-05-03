const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.nav-links');
const year = document.getElementById('year');
const leadForm = document.getElementById('leadForm');
const formStatus = document.getElementById('formStatus');
const submitButton = leadForm.querySelector('button[type="submit"]');
const leadEndpoint = 'https://script.google.com/macros/s/AKfycbyOjhohErPrIcokrfoJwio-YLWEAFfRs51vbAHnmKRBTWhCdYBEZA3_Pq_rEFSTGOz2/exec';
const methodTabs = document.querySelectorAll('.method-tab');
const methodLabel = document.getElementById('methodLabel');
const methodTitle = document.getElementById('methodTitle');
const methodText = document.getElementById('methodText');
const methodList = document.getElementById('methodList');

year.textContent = new Date().getFullYear();

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

const methodContent = {
  diagnose: {
    label: '01',
    title: 'Find the signal',
    text: 'We identify what the data can actually answer, where definitions are muddy, and which decisions need better evidence.',
    items: ['Data audit', 'Metric definitions', 'Priority questions']
  },
  design: {
    label: '02',
    title: 'Build the system',
    text: 'We shape dashboards, reporting flows, and lead records around the questions that matter most to growth and impact.',
    items: ['Dashboard architecture', 'Lead tracking', 'Reporting rhythm']
  },
  deliver: {
    label: '03',
    title: 'Translate into action',
    text: 'You receive clear interpretation, executive-ready visuals, and recommended next steps that are easy to explain.',
    items: ['Insight summary', 'Action plan', 'Decision support']
  }
};

methodTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const content = methodContent[tab.dataset.method];

    methodTabs.forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    methodLabel.textContent = content.label;
    methodTitle.textContent = content.title;
    methodText.textContent = content.text;
    methodList.replaceChildren(...content.items.map((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      return li;
    }));
  });
});

const revealTargets = document.querySelectorAll('.service-card, .step, .founder-card, .founder-copy, .showcase-board, .method-panel, .insight-preview-grid article, .lead-form');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealTargets.forEach((element) => {
    element.classList.add('reveal');
    observer.observe(element);
  });
} else {
  revealTargets.forEach((element) => element.classList.add('visible'));
}

leadForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  formStatus.textContent = 'Sending...';
  formStatus.classList.remove('error');
  submitButton.disabled = true;

  try {
    await fetch(leadEndpoint, {
      method: 'POST',
      mode: 'no-cors',
      body: new FormData(leadForm)
    });

    leadForm.reset();
    formStatus.textContent = 'Thank you. Your inquiry has been sent.';
  } catch (error) {
    formStatus.textContent = 'There was a problem sending your inquiry. Please try again.';
    formStatus.classList.add('error');
  } finally {
    submitButton.disabled = false;
  }
});
