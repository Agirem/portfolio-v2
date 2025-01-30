<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDark ? 'dark bg-gray-900' : 'bg-white'">
    <!-- Loader -->
    <Loader v-if="isLoading" />
    <!-- Reste du contenu -->
    <div v-show="!isLoading">
      <!-- Barre de progression de défilement -->
      <div class="fixed top-0 left-0 w-full h-1 z-50">
        <div 
          class="h-full bg-gradient-to-r from-[#783DFF] to-purple-600 transition-all duration-300"
          :style="{ width: `${scrollProgress}%` }"
        ></div>
      </div>

      <!-- Header amélioré -->
      <header 
        class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        :class="[
          scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent',
          'py-3 sm:py-4'
        ]"
      >
        <nav class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between">
            <!-- Logo/Titre -->
            <div class="relative h-8 sm:h-10 w-32 sm:w-40 flex items-center">
              <transition
                enter-active-class="transition duration-500 ease-out"
                enter-from-class="transform -translate-y-3 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
                leave-active-class="transition duration-500 ease-in"
                leave-from-class="transform translate-y-0 opacity-100"
                leave-to-class="transform translate-y-3 opacity-0"
              >
                <h1 
                  v-if="!scrolled"
                  class="text-lg sm:text-xl font-bold text-[#783DFF]"
                >
                  Ousmane M.
                </h1>
              </transition>
              
              <transition
                enter-active-class="transition duration-500 ease-out"
                enter-from-class="transform scale-90 -translate-y-3 opacity-0"
                enter-to-class="transform scale-100 translate-y-0 opacity-100"
                leave-active-class="transition duration-500 ease-in"
                leave-from-class="transform scale-100 translate-y-0 opacity-100"
                leave-to-class="transform scale-90 translate-y-3 opacity-0"
              >
                <img 
                  v-if="scrolled"
                  src="/images/logo_white.webp" 
                  alt="Logo"
                  class="w-8 sm:w-10 h-8 sm:h-10 absolute"
                />
              </transition>
            </div>

            <!-- Navigation -->
            <div class="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a 
                v-for="item in navigation" 
                :key="item.href"
                :href="item.href"
                class="text-sm lg:text-base text-gray-600 dark:text-gray-300 hover:text-[#783DFF] dark:hover:text-[#783DFF] transition-colors duration-300"
                :class="{ 'text-[#783DFF]': currentSection === item.href.slice(1) }"
              >
                <transition
                  name="fade"
                  mode="out-in"
                  appear
                >
                  <span :key="locale">{{ item.name[locale] }}</span>
                </transition>
              </a>
            </div>

            <!-- Actions -->
            <div class="flex items-center space-x-2 sm:space-x-4">
              <!-- Sélecteur de langue -->
              <button
                @click="toggleLocale"
                class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                <span class="text-sm font-medium text-[#783DFF]">
                  {{ locale.toUpperCase() }}
                </span>
              </button>

              <!-- Toggle mode sombre -->
              <button
                @click="toggleTheme"
                class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                <SunIcon v-if="isDark" class="h-4 sm:h-5 w-4 sm:w-5 text-gray-600 dark:text-gray-300" />
                <MoonIcon v-else class="h-4 sm:h-5 w-4 sm:w-5 text-gray-600 dark:text-gray-300" />
              </button>

              <!-- Menu mobile -->
              <button
                class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                @click="toggleMobileMenu"
              >
                <MenuIcon class="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>

          <!-- Menu mobile -->
          <div
            v-if="isMobileMenuOpen"
            class="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg py-4"
          >
            <div class="px-4 space-y-2">
              <a
                v-for="item in navigation"
                :key="item.href"
                :href="item.href"
                class="block py-2 text-gray-600 dark:text-gray-300 hover:text-[#783DFF] dark:hover:text-[#783DFF] transition-colors duration-300"
                :class="{ 'text-[#783DFF]': item.href && currentSection === item.href.slice(1) }"
                @click="isMobileMenuOpen = false"
              >
                {{ item.name[locale] }}
              </a>
            </div>
          </div>
        </nav>

        <!-- Barre de progression -->
        <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700">
          <div 
            class="h-full bg-gradient-to-r from-[#783DFF] to-purple-600 transition-all duration-300"
            :style="{ width: `${scrollProgress}%` }"
          ></div>
        </div>
      </header>

      <!-- Hero Section -->
      <main class="pt-16">
        <div class="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
          <div class="w-full">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              <div class="text-center relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12">
                <!-- Photo de profil -->
                <div class="relative animate-fade-in-up w-40 sm:w-48 md:w-64" style="--delay: 0s">
                  <div class="relative group">
                    <div class="relative aspect-square rounded-2xl bg-white dark:bg-gray-900 overflow-hidden border-2 border-[#783DFF]/10 group-hover:border-[#783DFF]/30 transition-all duration-500">
                      <img 
                        src="/images/logo_white.webp" 
                        alt="Photo de profil"
                        class="w-full h-full object-cover transform-gpu transition-all duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <!-- Badge de statut -->
                  <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <div class="relative px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-gray-900 rounded-xl border border-[#783DFF]/20 shadow-lg">
                      <div class="flex items-center gap-2">
                        <span class="flex h-1.5 sm:h-2 w-1.5 sm:w-2">
                          <span class="relative inline-flex rounded-full h-full w-full bg-green-500"></span>
                        </span>
                        <span class="text-xs sm:text-sm text-[#783DFF] font-medium whitespace-nowrap flex items-center gap-1">
                          {{ content.hero.status[locale] }}
                          <img :src="sparklessIcon" alt="sparkless" class="w-3 sm:w-4 h-3 sm:h-4 object-contain" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Texte -->
                <div class="flex-1 max-w-2xl px-4">
                  <div class="animate-fade-in-up" style="--delay: 0.2s">
                    <span class="inline-flex items-center gap-2 text-[#783DFF] font-medium mb-4 group">
                      <img :src="handIcon" alt="Hand wave" class="w-6 h-6 object-contain animate-wave" />
                      <transition
                        name="fade"
                        mode="out-in"
                        appear
                      >
                        <span 
                          :key="locale"
                          class="text-[#783DFF] transition-all duration-300"
                        >
                        {{ content.hero.greeting[locale] }}
                        </span>
                      </transition>
                    </span>
                    <h1 class="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                      <transition
                        name="fade"
                        mode="out-in"
                        appear
                      >
                        <span 
                          :key="locale"
                          class="block text-gray-900 dark:text-white mb-2 transition-all duration-500"
                        >
                        {{ content.hero.title[locale] }}
                        </span>
                      </transition>
                      <transition
                        name="fade"
                        mode="out-in"
                        appear
                      >
                        <span 
                          :key="locale"
                          class="block text-[#783DFF] transition-all duration-500"
                        >
                        {{ content.hero.subtitle[locale] }}
                        </span>
                      </transition>
                    </h1>
                  </div>
                  <transition
                    name="fade"
                    mode="out-in"
                    appear
                  >
                    <p 
                      :key="locale"
                      class="mt-6 text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-8 md:text-xl animate-fade-in-up leading-relaxed" 
                      style="--delay: 0.4s"
                      v-html="content.hero.description[locale]"
                    ></p>
                  </transition>
                  
                  <!-- Boutons CTA améliorés -->
                  <div class="mt-8 flex flex-wrap justify-center gap-4 animate-fade-in-up" style="--delay: 0.6s">
                    <a
                      href="#projects"
                      class="group relative inline-flex items-center justify-center px-8 py-3 font-medium text-white transition-all duration-300 ease-out bg-[#783DFF] rounded-xl hover:bg-white overflow-hidden"
                    >
                      <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-[#783DFF] to-purple-600"></span>
                      <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-300 ease-out transform translate-y-full bg-white group-hover:translate-y-0"></span>
                      <span class="relative group-hover:text-[#783DFF] transition-colors duration-300 flex items-center gap-2">
                        {{ content.hero.cta.projects[locale] }}
                        <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                    </a>
                    <a
                      href="#contact"
                      class="group relative inline-flex items-center justify-center px-8 py-3 font-medium transition-all duration-300 ease-out bg-transparent border-2 border-[#783DFF] rounded-xl hover:bg-[#783DFF] overflow-hidden"
                    >
                      <span class="text-[#783DFF] group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                        {{ content.hero.cta.contact[locale] }}
                        <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Bouton de défilement -->
              <div class="absolute left-1/2 -translate-x-1/2 bottom-8 sm:bottom-12 z-10">
                <a 
                  href="#about" 
                  class="group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div class="absolute inset-0 rounded-full bg-gradient-to-br from-[#783DFF] to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <ChevronDownIcon class="w-5 h-5 sm:w-6 sm:h-6 text-[#783DFF] group-hover:text-white relative z-10 animate-bounce" />
                </a>
              </div>
            </div>
          </div>

          <!-- Background decoration amélioré -->
          <div class="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
            <div class="absolute w-full h-full bg-gradient-to-b from-transparent via-[#783DFF]/5 to-transparent opacity-30 dark:opacity-20 animate-pulse-slow"></div>
            <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-[#783DFF] rounded-full mix-blend-multiply filter blur-3xl animate-blob opacity-70 dark:opacity-30"></div>
            <div class="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 opacity-70 dark:opacity-30"></div>
            <div class="absolute bottom-1/4 left-1/3 w-72 h-72 bg-[#783DFF] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000 opacity-70 dark:opacity-30"></div>
            <div class="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          </div>
        </div>
      </main>

      <!-- Components -->
      <About id="about" :locale="locale" />
      <Projects id="projects" :locale="locale" />
      <Contact id="contact" :locale="locale" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { SunIcon, MoonIcon, MenuIcon, ChevronDownIcon } from 'lucide-vue-next'
import About from './components/About.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import handIcon from './assets/hand.webp'
import sparklessIcon from './assets/sparkless.webp'
import Loader from './components/Loader.vue'

// State
const isDark = ref(true)
const locale = ref('en')
const isMobileMenuOpen = ref(false)
const scrolled = ref(false)
const currentSection = ref('')
const isLoading = ref(true)

// Gestion du défilement
const scrollProgress = ref(0)

const updateScroll = () => {
  // Met à jour la barre de progression
  const winScroll = window.scrollY
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (winScroll / height) * 100

  // Met à jour le header
  scrolled.value = window.scrollY > 50

  // Met à jour la section active
  const sections = ['projects', 'about', 'contact']
  for (const section of sections) {
    const element = document.getElementById(section)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentSection.value = section
        break
      }
    }
  }
  // Si on est en haut de la page, on active la section "home"
  if (window.scrollY < 100) {
    currentSection.value = ''
  }
}

// Navigation items
const navigation = [
  { name: { fr: 'Accueil', en: 'Home' }, href: '#' },
  { name: { fr: 'À propos', en: 'About' }, href: '#about' },
  { name: { fr: 'Projets', en: 'Projects' }, href: '#projects' },
  { name: { fr: 'Contact', en: 'Contact' }, href: '#contact' }
]

// Content
const content = {
  hero: {
    greeting: {
      fr: 'Salut, je suis',
      en: 'Hi, I\'m'
    },
    title: {
      fr: 'Ousmane MERIGA',
      en: 'Ousmane MERIGA'
    },
    subtitle: {
      fr: 'Software Engineer',
      en: 'Software Engineer'
    },
    status: {
      fr: 'Disponible pour des projets',
      en: 'Available for projects'
    },
    description: {
      fr: '<strong>Ingénieur logiciel passionné</strong>, spécialisé dans le développement d\'<strong>applications web et mobile innovantes</strong>. Fort de mon <strong>expertise technique</strong> et de ma <strong>créativité</strong>, je transforme des <strong>idées complexes</strong> en <strong>solutions élégantes et performantes</strong>.',
      en: '<strong>Passionate software engineer</strong>, specialized in <strong>innovative web and mobile application</strong> development. With my <strong>technical expertise</strong> and <strong>creativity</strong>, I transform <strong>complex ideas</strong> into <strong>elegant and performant solutions</strong>.'
    },
    cta: {
      projects: {
        fr: 'Voir mes réalisations',
        en: 'View my work'
      },
      contact: {
        fr: 'Me contacter',
        en: 'Contact me'
      }
    },
    scroll: {
      fr: 'Défiler vers le bas',
      en: 'Scroll down'
    }
  }
}

// Methods
const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}

const toggleLocale = () => {
  locale.value = locale.value === 'fr' ? 'en' : 'fr'
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Lifecycle
onMounted(() => {
  // Initialisation du mode sombre
  document.documentElement.classList.add('dark')
  
  window.addEventListener('scroll', updateScroll)
  updateScroll() // Initial check
  
  // Défilement fluide pour les liens d'ancrage
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault()
      if (!this.hash) return
      
      if (this.hash === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const targetId = this.hash.substring(1)
        const element = document.getElementById(targetId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          // Fermer le menu mobile si ouvert
          isMobileMenuOpen.value = false
        }
      }
    })
  })

  // Simuler un temps de chargement minimum
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
})
</script>

<style>
/* Déclaration de la police Google Sans */
@font-face {
  font-family: 'Google';
  src: url('@/GoogleSans-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

:root {
  font-family: 'Google', sans-serif !important;
  --perspective: 1000px;
}

* {
  font-family: 'Google', sans-serif !important;
}

.dark {
  color-scheme: dark;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Perspective */
.perspective-1000 {
  perspective: var(--perspective);
}

.perspective-text span {
  display: inline-block;
  transform-style: preserve-3d;
}

/* Animations */
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes wave {
  0% { transform: rotate(0deg); }
  20% { transform: rotate(-10deg); }
  40% { transform: rotate(10deg); }
  60% { transform: rotate(-10deg); }
  80% { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.4; }
}

.animate-wave {
  animation: wave 2s infinite;
  transform-origin: bottom right;
}

.animate-pulse-slow {
  animation: pulse-slow 4s infinite;
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px) translateZ(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0) translateZ(0);
  }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: var(--delay, 0s);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Style pour la barre de défilement */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 100vh;
  margin: 2px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #783DFF, #6030cc);
  border-radius: 100vh;
  border: 2px solid #f1f1f1;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #6030cc, #4a2599);
}

/* Support pour Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #783DFF #f1f1f1;
}

/* Animations de révélation au défilement */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.reveal-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Animations du scroll indicator */
@keyframes scroll-down {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  75% {
    transform: translateY(0.75rem);
    opacity: 0;
  }
  76% {
    transform: translateY(-0.75rem);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-scroll-down {
  animation: scroll-down 1.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
}

/* Effet de glassmorphism */
.glass-effect {
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .glass-effect {
  background: rgba(17, 24, 39, 0.7);
  border-color: rgba(255, 255, 255, 0.1);
}

/* Hover effects */
.hover-lift {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-2px);
}

/* Text gradient animation */
.text-gradient {
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>