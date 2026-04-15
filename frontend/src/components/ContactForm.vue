<template>
  <div class="contact-form-wrapper">
    <div class="contact-form-card">
      <!-- Header -->
      <div class="contact-header">
        <div class="contact-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <h2 class="contact-title">Get In Touch</h2>
        <p class="contact-subtitle">Have a project in mind or just want to say hello? I'd love to hear from you.</p>
      </div>

      <!-- Success State -->
      <Transition name="fade">
        <div v-if="submitted" class="contact-success">
          <div class="success-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h3 class="success-title">Message Sent!</h3>
          <p class="success-text">Thanks for reaching out, {{ submittedName }}. I'll get back to you as soon as I can.</p>
          <button class="btn-reset" @click="resetForm">Send Another Message</button>
        </div>
      </Transition>

      <!-- Form -->
      <Transition name="fade">
        <form v-if="!submitted" class="contact-form" @submit.prevent="handleSubmit" novalidate>
          <div class="form-row">
            <!-- Name -->
            <div class="form-group" :class="{ 'has-error': errors.name }">
              <label for="contact-name" class="form-label">Name</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <input
                  id="contact-name"
                  v-model="form.name"
                  type="text"
                  class="form-input"
                  placeholder="Your name"
                  autocomplete="name"
                  @blur="validateField('name')"
                />
              </div>
              <Transition name="slide-down">
                <p v-if="errors.name" class="form-error">{{ errors.name }}</p>
              </Transition>
            </div>

            <!-- Email -->
            <div class="form-group" :class="{ 'has-error': errors.email }">
              <label for="contact-email" class="form-label">Email</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  placeholder="your@email.com"
                  autocomplete="email"
                  @blur="validateField('email')"
                />
              </div>
              <Transition name="slide-down">
                <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
              </Transition>
            </div>
          </div>

          <!-- Message -->
          <div class="form-group" :class="{ 'has-error': errors.message }">
            <label for="contact-message" class="form-label">Message</label>
            <div class="input-wrapper textarea-wrapper">
              <span class="input-icon textarea-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/>
                </svg>
              </span>
              <textarea
                id="contact-message"
                v-model="form.message"
                class="form-input form-textarea"
                placeholder="Tell me what's on your mind..."
                rows="5"
                @blur="validateField('message')"
              ></textarea>
            </div>
            <div class="message-footer">
              <Transition name="slide-down">
                <p v-if="errors.message" class="form-error">{{ errors.message }}</p>
              </Transition>
              <span class="char-count" :class="{ 'char-count--warn': form.message.length > 900 }">
                {{ form.message.length }}/1000
              </span>
            </div>
          </div>

          <!-- API Error -->
          <Transition name="slide-down">
            <div v-if="apiError" class="api-error">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{{ apiError }}</span>
            </div>
          </Transition>

          <!-- Submit Button -->
          <button
            type="submit"
            class="btn-submit"
            :class="{ 'btn-loading': loading }"
            :disabled="loading"
          >
            <span v-if="!loading" class="btn-content">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
              Send Message
            </span>
            <span v-else class="btn-content">
              <svg class="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"/>
                <path class="spinner-head" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Sending...
            </span>
          </button>
        </form>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { createDirectus, rest, createItem } from '@directus/sdk';

const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL || 'http://127.0.0.1:8055';
const client = createDirectus(DIRECTUS_URL).with(rest());

// Form state
const form = reactive({ name: '', email: '', message: '' });
const errors = reactive({ name: '', email: '', message: '' });
const loading = ref(false);
const submitted = ref(false);
const submittedName = ref('');
const apiError = ref('');

// Validation
function validateField(field) {
  errors[field] = '';
  if (field === 'name' && !form.name.trim()) {
    errors.name = 'Please enter your name.';
  }
  if (field === 'email') {
    if (!form.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Please enter a valid email address.';
    }
  }
  if (field === 'message') {
    if (!form.message.trim()) {
      errors.message = 'Please enter a message.';
    } else if (form.message.length > 1000) {
      errors.message = 'Message must be under 1000 characters.';
    }
  }
}

function validateAll() {
  ['name', 'email', 'message'].forEach(validateField);
  return !errors.name && !errors.email && !errors.message;
}

async function handleSubmit() {
  apiError.value = '';
  if (!validateAll()) return;

  loading.value = true;
  try {
    await client.request(
      createItem('contact_submissions', {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        submitted_at: new Date().toISOString(),
      })
    );
    submittedName.value = form.name.trim().split(' ')[0];
    submitted.value = true;
  } catch (err) {
    console.error('Contact form error:', err);
    apiError.value = 'Something went wrong. Please try again or email me directly.';
  } finally {
    loading.value = false;
  }
}

function resetForm() {
  form.name = '';
  form.email = '';
  form.message = '';
  errors.name = '';
  errors.email = '';
  errors.message = '';
  apiError.value = '';
  submitted.value = false;
}
</script>

<style scoped>
.contact-form-wrapper {
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
}

.contact-form-card {
  position: relative;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255,255,255,0.3) inset;
  overflow: hidden;
}

.dark .contact-form-card {
  background: rgba(30, 41, 59, 0.7);
  border-color: rgba(71, 85, 105, 0.5);
  box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.4);
}

/* Decorative top gradient bar */
.contact-form-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #ff5533, #ff8c42, #ff5533);
  background-size: 200% 100%;
  animation: shimmer 3s ease infinite;
}

@keyframes shimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Header */
.contact-header {
  text-align: center;
  margin-bottom: 2rem;
}

.contact-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, #ff5533, #ff8c42);
  color: white;
  margin-bottom: 1rem;
  box-shadow: 0 8px 20px -4px rgba(255, 85, 51, 0.35);
}

.contact-icon svg {
  width: 24px;
  height: 24px;
}

.contact-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.4rem;
  letter-spacing: -0.02em;
}

.dark .contact-title {
  color: #f1f5f9;
}

.contact-subtitle {
  font-size: 0.95rem;
  color: #64748b;
  margin: 0;
  line-height: 1.6;
}

.dark .contact-subtitle {
  color: #94a3b8;
}

/* Form Layout */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 540px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  .contact-form-card {
    padding: 1.5rem;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.dark .form-label {
  color: #94a3b8;
}

/* Input */
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 0.85rem;
  color: #94a3b8;
  pointer-events: none;
  display: flex;
  align-items: center;
}

.input-icon svg {
  width: 16px;
  height: 16px;
}

.textarea-wrapper {
  align-items: flex-start;
}

.textarea-icon {
  top: 0.85rem;
}

.form-input {
  width: 100%;
  padding: 0.7rem 0.85rem 0.7rem 2.5rem;
  background: rgba(248, 250, 252, 0.8);
  border: 1px solid #e2e8f0;
  border-radius: 0.65rem;
  font-size: 0.9rem;
  color: #1e293b;
  transition: all 0.2s ease;
  outline: none;
  font-family: inherit;
}

.dark .form-input {
  background: rgba(15, 23, 42, 0.5);
  border-color: #334155;
  color: #f1f5f9;
}

.form-input::placeholder {
  color: #cbd5e1;
}

.dark .form-input::placeholder {
  color: #475569;
}

.form-input:focus {
  border-color: #ff5533;
  background: white;
  box-shadow: 0 0 0 3px rgba(255, 85, 51, 0.12);
}

.dark .form-input:focus {
  background: rgba(15, 23, 42, 0.8);
  box-shadow: 0 0 0 3px rgba(255, 85, 51, 0.2);
}

.has-error .form-input {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 130px;
  line-height: 1.6;
}

.message-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  min-height: 1.2rem;
}

.char-count {
  font-size: 0.75rem;
  color: #94a3b8;
  white-space: nowrap;
  margin-left: auto;
  padding-left: 0.5rem;
}

.char-count--warn {
  color: #ef4444;
}

.form-error {
  font-size: 0.78rem;
  color: #ef4444;
  margin: 0;
  font-weight: 500;
}

/* API Error */
.api-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 0.65rem;
  color: #ef4444;
  font-size: 0.875rem;
}

.api-error svg {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}

/* Submit Button */
.btn-submit {
  width: 100%;
  padding: 0.85rem 1.5rem;
  background: linear-gradient(135deg, #ff5533, #ff7433);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 8px 20px -4px rgba(255, 85, 51, 0.4);
  font-family: inherit;
  letter-spacing: 0.01em;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px -4px rgba(255, 85, 51, 0.5);
  background: linear-gradient(135deg, #ff4422, #ff6622);
}

.btn-submit:active:not(:disabled) {
  transform: translateY(0);
}

.btn-submit:disabled {
  opacity: 0.75;
  cursor: not-allowed;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-content svg:not(.spinner) {
  width: 16px;
  height: 16px;
}

/* Spinner */
.spinner {
  width: 18px;
  height: 18px;
  animation: spin 0.8s linear infinite;
}

.spinner-track {
  opacity: 0.25;
}

.spinner-head {
  opacity: 0.9;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Success State */
.contact-success {
  text-align: center;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.success-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  box-shadow: 0 8px 24px -4px rgba(34, 197, 94, 0.4);
  animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.success-icon svg {
  width: 28px;
  height: 28px;
}

@keyframes pop-in {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.success-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.dark .success-title {
  color: #f1f5f9;
}

.success-text {
  font-size: 0.95rem;
  color: #64748b;
  margin: 0;
  max-width: 340px;
  line-height: 1.6;
}

.dark .success-text {
  color: #94a3b8;
}

.btn-reset {
  margin-top: 0.5rem;
  padding: 0.6rem 1.25rem;
  background: transparent;
  border: 1.5px solid #e2e8f0;
  border-radius: 0.6rem;
  font-size: 0.875rem;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  font-weight: 500;
}

.btn-reset:hover {
  border-color: #ff5533;
  color: #ff5533;
  background: rgba(255, 85, 51, 0.05);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-4px);
}

.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 2rem;
}
</style>
