const mobileMenuButton = document.querySelector('#mobile-menu-button');
const nav = document.querySelector('#primary-navigation');
const body = document.body;

if (mobileMenuButton && nav) {
  mobileMenuButton.addEventListener('click', () => {
    const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    mobileMenuButton.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('hidden');
    nav.classList.toggle('flex');
    body.classList.toggle('overflow-hidden', !expanded);
  });
}

const slider = document.querySelector('[data-gallery]');
if (slider) {
  const slides = Array.from(slider.querySelectorAll('[data-slide]'));
  const controls = slider.querySelectorAll('[data-control]');
  let activeIndex = 0;

  const updateSlides = () => {
    slides.forEach((slide, index) => {
      slide.classList.toggle('hidden', index !== activeIndex);
      slide.setAttribute('aria-hidden', index !== activeIndex);
    });
    controls.forEach((control, index) => {
      control.classList.toggle('bg-shark-accent', index === activeIndex);
      control.classList.toggle('bg-white/30', index !== activeIndex);
    });
  };

  controls.forEach((control, index) => {
    control.addEventListener('click', () => {
      activeIndex = index;
      updateSlides();
    });
  });

  let startX = 0;
  slider.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
  });

  slider.addEventListener('touchend', (event) => {
    const delta = event.changedTouches[0].clientX - startX;
    if (Math.abs(delta) > 50) {
      activeIndex = (activeIndex + (delta < 0 ? 1 : slides.length - 1)) % slides.length;
      updateSlides();
    }
  });

  updateSlides();
}

const orderForm = document.querySelector('#order-form');
const feedback = document.querySelector('#form-feedback');
const FORM_ENDPOINT = 'https://formspree.io/f/attack-shark-x3';

const phoneInput = document.querySelector('#phone');
if (phoneInput) {
  phoneInput.addEventListener('input', () => {
    let value = phoneInput.value.replace(/[^\d+]/g, '');
    if (!value.startsWith('+7') && value.startsWith('8')) {
      value = '+7' + value.slice(1);
    }
    phoneInput.value = value.slice(0, 16);
  });
}

const honeypot = document.querySelector('#website-field');

const validateForm = () => {
  if (!orderForm) return false;
  const formData = new FormData(orderForm);
  const name = formData.get('name');
  const phone = formData.get('phone');
  const email = formData.get('email');

  const errors = [];
  if (!name || String(name).trim().length < 2) {
    errors.push('Имя должно содержать не менее 2 символов.');
  }

  if (!phone || !/^\+?7\d{10}$/.test(String(phone).replace(/\D/g, ''))) {
    errors.push('Введите корректный номер телефона в формате +7XXXXXXXXXX.');
  }

  if (email && !/^\S+@\S+\.\S+$/.test(String(email))) {
    errors.push('Введите корректный email.');
  }

  if (honeypot && honeypot.value) {
    errors.push('Подтверждение не пройдено.');
  }

  if (errors.length > 0) {
    feedback.textContent = errors.join(' ');
    feedback.classList.remove('text-green-400');
    feedback.classList.add('text-red-400');
    return false;
  }

  feedback.textContent = '';
  return true;
};

const persistOrder = async (payload) => {
  try {
    const response = await fetch('/.netlify/functions/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      throw new Error('Netlify function error');
    }
  } catch (error) {
    console.warn('Не удалось записать заказ в orders.json. Используется localStorage.', error);
    const existing = JSON.parse(localStorage.getItem('attack-shark-orders') || '[]');
    existing.push(payload);
    localStorage.setItem('attack-shark-orders', JSON.stringify(existing));
  }
};

if (orderForm) {
  orderForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData(orderForm);
    const submission = Object.fromEntries(formData.entries());
    submission.timestamp = new Date().toISOString();

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке.');
      }

      await persistOrder(submission);

      feedback.textContent = 'Спасибо! Мы свяжемся с вами в течение 24 часов.';
      feedback.classList.remove('text-red-400');
      feedback.classList.add('text-green-400');
      orderForm.reset();
    } catch (error) {
      feedback.textContent = 'Не удалось отправить форму. Попробуйте позже.';
      feedback.classList.remove('text-green-400');
      feedback.classList.add('text-red-400');
      console.error(error);
    }
  });
}
