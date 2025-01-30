<template>
  <section id="contact" class="min-h-screen flex items-center py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
    <!-- Fond animé -->
    <div class="absolute inset-0 opacity-40 dark:opacity-20">
      <div class="absolute w-full h-full">
        <div class="absolute w-96 h-96 bg-[#783DFF]/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div class="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>
      <div class="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
    </div>

    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <!-- En-tête -->
      <div class="text-center mb-8 sm:mb-16">
        <div class="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6 shadow-md">
          <img 
            :src="phoneIcon" 
            alt="Phone" 
            class="w-5 sm:w-6 h-5 sm:h-6 object-contain"
            width="24"
            height="24"
            loading="lazy"
          />
          <span class="text-sm sm:text-base text-gray-700 dark:text-gray-200 font-medium">{{ content.label[locale] }}</span>
        </div>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#783DFF] to-purple-600 text-transparent bg-clip-text mb-4 sm:mb-6 px-4">
          {{ content.title[locale] }}
        </h2>
        <p class="mt-2 sm:mt-3 max-w-2xl mx-auto text-lg sm:text-xl text-gray-700 dark:text-gray-300 px-4">
          {{ content.subtitle[locale] }}
        </p>
      </div>

      <!-- Grille de contact -->
      <div class="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
        <!-- Formulaire -->
        <div class="bg-white dark:bg-gray-700 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl relative overflow-hidden order-2 lg:order-1">
          <form @submit.prevent="handleSubmit" class="space-y-6 sm:space-y-8 relative">
            <div class="space-y-6">
              <!-- Nom -->
              <div class="relative group">
                <input 
                  type="text" 
                  :placeholder="content.form.name[locale]"
                  v-model="formData.name"
                  class="w-full px-4 py-4 bg-gray-50 dark:bg-gray-600 rounded-xl border-2 border-transparent focus:border-[#783DFF] outline-none transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-gray-500/50"
                  :class="{ 'border-red-500': errors.name }"
                  required
                />
                <span v-if="errors.name" class="text-red-500 text-sm mt-2 block">{{ errors.name }}</span>
              </div>

              <!-- Email -->
              <div class="relative group">
                <input 
                  type="email" 
                  :placeholder="content.form.email[locale]"
                  v-model="formData.email"
                  class="w-full px-4 py-4 bg-gray-50 dark:bg-gray-600 rounded-xl border-2 border-transparent focus:border-[#783DFF] outline-none transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-gray-500/50"
                  :class="{ 'border-red-500': errors.email }"
                  required
                />
                <span v-if="errors.email" class="text-red-500 text-sm mt-2 block">{{ errors.email }}</span>
              </div>

              <!-- Message -->
              <div class="relative group">
                <textarea 
                  :placeholder="content.form.message[locale]"
                  v-model="formData.message"
                  rows="5"
                  class="w-full px-4 py-4 bg-gray-50 dark:bg-gray-600 rounded-xl border-2 border-transparent focus:border-[#783DFF] outline-none transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-400 resize-none group-hover:bg-gray-100 dark:group-hover:bg-gray-500/50"
                  :class="{ 'border-red-500': errors.message }"
                  required
                ></textarea>
                <span v-if="errors.message" class="text-red-500 text-sm mt-2 block">{{ errors.message }}</span>
              </div>
            </div>

            <!-- Bouton d'envoi -->
            <button
              type="submit"
              :disabled="isSubmitting"
              :aria-label="isSubmitting ? content.form.sending[locale] : content.form.submit[locale]"
              class="w-full inline-flex items-center justify-center px-8 py-4 font-medium text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-[#783DFF] to-purple-600 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="flex items-center gap-2">
                <span v-if="isSubmitting" class="animate-spin">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                <span>{{ isSubmitting ? content.form.sending[locale] : content.form.submit[locale] }}</span>
              </span>
            </button>
          </form>
        </div>

        <!-- Informations de contact -->
        <div class="space-y-6 sm:space-y-8 order-1 lg:order-2">
          <!-- Carte avec effet gradient -->
          <div class="bg-white dark:bg-gray-700 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl relative overflow-hidden">
            <div class="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6">
              <!-- Email -->
              <a 
                href="mailto:contact@meriga.cm" 
                class="flex flex-col gap-3 sm:gap-4 p-4 sm:p-6 bg-gray-50 dark:bg-gray-600 rounded-xl hover:scale-[1.02] transition-transform duration-300 group"
                :aria-label="locale === 'fr' ? 'Envoyer un email à contact@meriga.cm' : 'Send an email to contact@meriga.cm'"
              >
                <div class="w-12 h-12 flex items-center justify-center bg-[#783DFF]/10 rounded-lg group-hover:bg-[#783DFF] transition-colors duration-300">
                  <MailIcon class="w-6 h-6 text-[#783DFF] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-900 dark:text-white">Email</h3>
                  <p class="text-gray-700 dark:text-gray-300">contact@meriga.cm</p>
                </div>
              </a>

              <!-- Twitter -->
              <a 
                href="https://x.com/agirem1" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex flex-col gap-3 sm:gap-4 p-4 sm:p-6 bg-gray-50 dark:bg-gray-600 rounded-xl hover:scale-[1.02] transition-transform duration-300 group"
                :aria-label="locale === 'fr' ? 'Suivez-moi sur X (Twitter) @agirem1' : 'Follow me on X (Twitter) @agirem1'"
              >
                <div class="w-12 h-12 flex items-center justify-center bg-[#783DFF]/10 rounded-lg group-hover:bg-[#783DFF] transition-colors duration-300">
                  <TwitterIcon class="w-6 h-6 text-[#783DFF] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-900 dark:text-white">X (Twitter)</h3>
                  <p class="text-gray-700 dark:text-gray-300">@agirem1</p>
                </div>
              </a>

              <!-- LinkedIn -->
              <a 
                href="https://linkedin.com/in/agirem1" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex flex-col gap-3 sm:gap-4 p-4 sm:p-6 bg-gray-50 dark:bg-gray-600 rounded-xl hover:scale-[1.02] transition-transform duration-300 group"
                :aria-label="locale === 'fr' ? 'Connectez-vous avec moi sur LinkedIn' : 'Connect with me on LinkedIn'"
              >
                <div class="w-12 h-12 flex items-center justify-center bg-[#783DFF]/10 rounded-lg group-hover:bg-[#783DFF] transition-colors duration-300">
                  <LinkedinIcon class="w-6 h-6 text-[#783DFF] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-900 dark:text-white">LinkedIn</h3>
                  <p class="text-gray-700 dark:text-gray-300">Ousmane Meriga</p>
                </div>
              </a>

              <!-- GitHub -->
              <a 
                href="https://github.com/Agirem" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex flex-col gap-3 sm:gap-4 p-4 sm:p-6 bg-gray-50 dark:bg-gray-600 rounded-xl hover:scale-[1.02] transition-transform duration-300 group"
                :aria-label="locale === 'fr' ? 'Voir mes projets sur GitHub @agirem' : 'View my projects on GitHub @agirem'"
              >
                <div class="w-12 h-12 flex items-center justify-center bg-[#783DFF]/10 rounded-lg group-hover:bg-[#783DFF] transition-colors duration-300">
                  <GithubIcon class="w-6 h-6 text-[#783DFF] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-900 dark:text-white">GitHub</h3>
                  <p class="text-gray-700 dark:text-gray-300">@agirem</p>
                </div>
              </a>
            </div>
          </div>

          <!-- Message de disponibilité -->
          <div class="bg-[#783DFF]/10 dark:bg-[#783DFF]/20 rounded-2xl p-4 sm:p-6 border border-[#783DFF]/20">
            <div class="flex items-center gap-4">
              <div class="flex-shrink-0">
                <div class="relative">
                  <span class="flex h-4 w-4">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-4 w-4 bg-green-600"></span>
                  </span>
                </div>
              </div>
              <div>
                <p class="text-[#6200EA] dark:text-[#B388FF] font-medium">{{ content.availability[locale] }}</p>
                <p class="text-gray-700 dark:text-gray-300 text-sm">{{ content.response[locale] }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="absolute bottom-2 sm:bottom-4 left-0 right-0 text-center">
      <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2">
        Made with 
        <img 
          :src="heartIcon" 
          alt="heart" 
          class="w-4 sm:w-5 h-4 sm:h-5 animate-pulse"
          width="20"
          height="20"
          loading="lazy"
        /> 
        by 
        <a 
          href="https://github.com/Agirem" 
          target="_blank" 
          rel="noopener noreferrer"
          class="font-bold text-[#6200EA] hover:text-[#7E57C2] dark:text-[#B388FF] dark:hover:text-[#9575CD] transition-colors duration-300"
        >
          Agirem
        </a>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { MailIcon, LinkedinIcon, GithubIcon, TwitterIcon } from 'lucide-vue-next'
import phoneIcon from '../assets/phone.webp'
import heartIcon from '../assets/heart.webp'

const props = defineProps({
  locale: {
    type: String,
    required: true
  }
})

// État du formulaire
const formData = reactive({
  name: '',
  email: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)

// Contenu
const content = {
  label: {
    fr: 'Contact',
    en: 'Contact'
  },
  title: {
    fr: 'Parlons de votre projet',
    en: 'Let\'s talk about your project'
  },
  subtitle: {
    fr: 'Une idée de projet ? N\'hésitez pas à me contacter pour en discuter.',
    en: 'Have a project idea? Feel free to contact me to discuss it.'
  },
  form: {
    name: {
      fr: 'Votre nom',
      en: 'Your name'
    },
    email: {
      fr: 'Votre email',
      en: 'Your email'
    },
    message: {
      fr: 'Votre message',
      en: 'Your message'
    },
    submit: {
      fr: 'Envoyer le message',
      en: 'Send message'
    },
    sending: {
      fr: 'Envoi en cours...',
      en: 'Sending...'
    }
  },
  availability: {
    fr: 'Disponible pour de nouveaux projets',
    en: 'Available for new projects'
  },
  response: {
    fr: 'Réponse généralement sous 24-48h',
    en: 'Usually responds within 24-48h'
  }
}

// Gestion du formulaire
const validateForm = () => {
  let isValid = true
  errors.name = ''
  errors.email = ''
  errors.message = ''

  if (!formData.name.trim()) {
    errors.name = props.locale === 'fr' ? 'Le nom est requis' : 'Name is required'
    isValid = false
  }

  if (!formData.email.trim()) {
    errors.email = props.locale === 'fr' ? 'L\'email est requis' : 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = props.locale === 'fr' ? 'Email invalide' : 'Invalid email'
    isValid = false
  }

  if (!formData.message.trim()) {
    errors.message = props.locale === 'fr' ? 'Le message est requis' : 'Message is required'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    // Simuler l'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Réinitialiser le formulaire
    formData.name = ''
    formData.email = ''
    formData.message = ''
    
    // Afficher un message de succès
    alert(props.locale === 'fr' ? 'Message envoyé avec succès !' : 'Message sent successfully!')
  } catch (error) {
    alert(props.locale === 'fr' ? 'Erreur lors de l\'envoi du message' : 'Error sending message')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>