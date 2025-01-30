<template>
  <section id="projects" class="min-h-screen flex items-center py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
    <!-- Fond animé -->
    <div class="absolute inset-0 opacity-40 dark:opacity-20">
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute w-96 h-96 bg-[#783DFF]/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div class="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>
    </div>

    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <!-- En-tête avec statistiques -->
      <div class="text-center mb-8 sm:mb-16">
        <div class="inline-flex items-center space-x-2 bg-white dark:bg-gray-700 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6 shadow-md">
          <img :src="rocketIcon" alt="Rocket" class="w-5 sm:w-6 h-5 sm:h-6 object-contain" />
          <span class="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">{{ content.label[locale] }}</span>
        </div>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#783DFF] to-purple-600 text-transparent bg-clip-text mb-4 sm:mb-6 px-4">
          {{ content.title[locale] }}
        </h2>
        <p class="mt-2 sm:mt-3 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300 px-4">
          {{ content.subtitle[locale] }}
        </p>

        <!-- Statistiques avec animation au scroll -->
        <div class="mt-8 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto px-4">
          <div 
            v-for="stat in stats" 
            :key="stat.label[locale]"
            class="group p-3 sm:p-4 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <div class="flex flex-col items-center">
              <div class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#783DFF] to-purple-600 text-transparent bg-clip-text group-hover:scale-110 transition-transform duration-300">
                {{ stat.value }}
              </div>
              <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">{{ stat.label[locale] }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtres améliorés -->
      <div class="mb-8 sm:mb-12 px-4">
        <div class="flex flex-col items-center">
          <div class="flex flex-wrap justify-center gap-2 p-2 bg-white dark:bg-gray-700 rounded-2xl shadow-lg">
            <button
              v-for="category in categories"
              :key="category.id"
              @click="selectedCategory = category.id"
              :aria-label="category.name[locale]"
              class="relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
              :style="{
                color: selectedCategory === category.id ? 'white' : category.color,
                backgroundColor: selectedCategory === category.id 
                  ? category.color
                  : `${category.color}10`
              }"
            >
              <span class="relative z-10 flex items-center">
                <component 
                  :is="category.icon" 
                  class="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2 transition-colors duration-300"
                  :style="{ color: selectedCategory === category.id ? 'white' : category.color }"
                />
                {{ category.name[locale] }}
              </span>
            </button>
          </div>
          <p class="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <span 
              class="inline-block w-2 h-2 rounded-full mr-2 transition-colors duration-300"
              :style="{ 
                backgroundColor: categories.find(c => c.id === selectedCategory)?.color || '#783DFF' 
              }"
            ></span>
            {{ content.showing[locale] }} {{ filteredProjects.length }} {{ content.projects[locale] }}
          </p>
        </div>
      </div>

      <!-- Grille de projets améliorée -->
      <div class="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
        <div
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="group relative bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden transform-gpu transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
        >
          <!-- Image du projet -->
          <div class="relative h-48 sm:h-56 lg:h-64 w-full overflow-hidden">
            <img
              :src="project.image"
              :alt="project.title[locale]"
              class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            
            <!-- Overlay au survol -->
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div class="flex flex-col items-center space-y-4 sm:space-y-6 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <h3 class="text-lg sm:text-xl font-bold text-white text-center px-4">
                  {{ project.title[locale] }}
                </h3>
                <div class="flex space-x-3 sm:space-x-4">
                  <a
                    v-if="project.demo"
                    :href="project.demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center px-5 py-2.5 bg-white/95 rounded-full text-sm font-medium text-gray-900 hover:bg-white transform-gpu hover:scale-105 hover:translate-z-4 transition-all duration-300 shadow-lg hover:shadow-white/50"
                    :aria-label="locale === 'fr' ? `Voir la démo de ${project.title[locale]}` : `View ${project.title[locale]} demo`"
                  >
                    <ExternalLinkIcon class="h-4 w-4 mr-2" />
                    Demo
                  </a>
                  <a
                    v-if="project.github && project.isOpenSource"
                    :href="project.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center px-5 py-2.5 bg-[#783DFF]/95 rounded-full text-sm font-medium text-white hover:bg-[#783DFF] transform-gpu hover:scale-105 hover:translate-z-4 transition-all duration-300 shadow-lg hover:shadow-[#783DFF]/50"
                    :aria-label="locale === 'fr' ? `Voir le code source de ${project.title[locale]} sur GitHub` : `View ${project.title[locale]} source code on GitHub`"
                  >
                    <GithubIcon class="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Contenu du projet -->
          <div class="p-4 sm:p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold bg-gradient-to-r from-[#783DFF] to-purple-600 bg-clip-text text-transparent transform transition-all duration-300 group-hover:scale-105">
                {{ project.title[locale] }}
              </h3>
              <span 
                class="text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-300 transform-gpu group-hover:scale-105 group-hover:translate-z-2"
                :style="{
                  backgroundColor: `${categories.find(c => c.id === project.category)?.color}20`,
                  color: categories.find(c => c.id === project.category)?.color
                }"
              >
                {{ categories.find(c => c.id === project.category)?.name[locale] }}
              </span>
            </div>
            <p class="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
              {{ project.description[locale] }}
            </p>

            <!-- Technologies avec icônes et animations améliorées -->
            <div class="flex flex-wrap gap-2">
              <div
                v-for="tech in project.technologies"
                :key="tech"
                class="group/tech relative flex items-center px-3 py-1.5 rounded-full transform-gpu hover:scale-105 hover:translate-z-2 transition-all duration-300 cursor-default overflow-hidden"
                :style="{
                  backgroundColor: `${techColors[tech]}20`,
                  color: techColors[tech] || '#6200EA'
                }"
              >
                <!-- Effet de particule au hover -->
                <div class="absolute inset-0 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300">
                  <div class="absolute inset-0 bg-gradient-to-r" :style="{
                    backgroundImage: `linear-gradient(to right, ${techColors[tech]}30, ${techColors[tech]}10)`
                  }"></div>
                </div>
                <span 
                  class="w-2 h-2 rounded-full mr-2 group-hover/tech:scale-110 transition-transform duration-300 relative z-10"
                  :style="{ backgroundColor: techColors[tech] || '#6200EA' }"
                ></span>
                <span class="text-xs font-medium relative z-10">{{ tech }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Carte "Plus de projets" intégrée dans la grille -->
        <a
          href="https://github.com/agirem"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="locale === 'fr' ? 'Découvrir tous mes projets sur GitHub' : 'Discover all my projects on GitHub'"
          class="group relative bg-gradient-to-br from-[#783DFF] to-purple-600 rounded-2xl shadow-lg overflow-hidden transform-gpu transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#783DFF]/20"
        >
          <!-- Image/Bannière avec même hauteur que les autres -->
          <div class="relative h-48 sm:h-56 lg:h-64 w-full overflow-hidden">
            <!-- Fond dynamique -->
            <div class="absolute inset-0 bg-gradient-to-br from-[#783DFF] to-purple-600 opacity-75 group-hover:scale-110 transition-transform duration-700"></div>
            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjIiLz48L3N2Zz4=')] opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
            
            <!-- Effet de particules -->
            <div class="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div class="absolute w-24 h-24 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-float-slow"></div>
              <div class="absolute top-1/2 right-1/4 w-32 h-32 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-float-slow animation-delay-2000"></div>
            </div>
            
            <!-- Contenu centré -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center transform group-hover:scale-110 transition-transform duration-500">
                <div class="relative mx-auto mb-4 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-500 flex items-center justify-center border border-white/20 group-hover:border-white/40">
                  <GithubIcon class="w-10 h-10 text-white transform group-hover:rotate-12 transition-all duration-500" />
                </div>
                <h3 class="text-xl font-bold text-white group-hover:text-white/90 transition-colors duration-300">
                  {{ content.moreProjects.title[locale] }}
                </h3>
              </div>
            </div>
          </div>

          <!-- Partie inférieure avec même padding que les autres -->
          <div class="p-4 sm:p-6">
            <p class="text-white text-sm text-center group-hover:text-white transition-colors duration-300">
              {{ content.moreProjects.description[locale] }}
            </p>
            <!-- Badge "Voir plus" -->
            <div class="mt-4 flex justify-center">
              <div class="inline-flex items-center px-4 py-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                <span class="text-sm font-medium text-white mr-2">{{ content.moreProjects.cta[locale] }}</span>
                <ArrowRightIcon class="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </a>
      </div>

      <!-- Appel à l'action amélioré -->
      <div class="mt-20 text-center">
        <a
          href="#contact"
          :aria-label="locale === 'fr' ? 'Contactez-moi pour discuter de votre projet' : 'Contact me to discuss your project'"
          class="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#783DFF] to-purple-600 text-white font-medium rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
        >
          <div class="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          <span class="relative mr-2 group-hover:translate-x-1 transition-transform duration-300">{{ content.cta[locale] }}</span>
          <ArrowRightIcon class="relative h-5 w-5 transform group-hover:translate-x-2 transition-transform duration-300" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ExternalLinkIcon, GithubIcon, ArrowRightIcon, LayoutGridIcon, SmartphoneIcon, CodeIcon, MonitorIcon, ServerIcon, GlobeIcon } from 'lucide-vue-next'
import rocketIcon from '../assets/rocket.webp'

const props = defineProps({
  locale: {
    type: String,
    required: true
  }
})

// Catégories avec icônes et couleurs
const categories = [
  { 
    id: 'all', 
    name: { fr: 'Tous les projets', en: 'All Projects' }, 
    icon: LayoutGridIcon,
    color: '#783DFF'
  },
  { 
    id: 'web', 
    name: { fr: 'Applications Web', en: 'Web Apps' }, 
    icon: GlobeIcon,
    color: '#2563eb'
  },
  { 
    id: 'mobile', 
    name: { fr: 'Apps Mobile', en: 'Mobile Apps' }, 
    icon: SmartphoneIcon,
    color: '#16a34a'
  }
  // À implémenter plus tard
  // { 
  //   id: 'desktop', 
  //   name: { fr: 'Apps Desktop', en: 'Desktop Apps' }, 
  //   icon: MonitorIcon,
  //   color: '#9333ea'
  // },
  // { 
  //   id: 'api', 
  //   name: { fr: 'APIs & Backend', en: 'APIs & Backend' }, 
  //   icon: ServerIcon,
  //   color: '#ea580c'
  // }
]

const selectedCategory = ref('all')

// Statistiques
const stats = [
  { value: '15+', label: { fr: 'Projets', en: 'Projects' } },
  { value: '5+', label: { fr: 'Années d\'exp.', en: 'Years Exp.' } },
  { value: '10+', label: { fr: 'Clients', en: 'Clients' } },
  { value: '100%', label: { fr: 'Satisfaction', en: 'Satisfaction' } }
]

// Contenu
const content = {
  label: {
    fr: 'Portfolio',
    en: 'Portfolio'
  },
  title: {
    fr: 'Mes Réalisations',
    en: 'My Work'
  },
  subtitle: {
    fr: 'Découvrez une sélection de mes projets les plus innovants et créatifs',
    en: 'Discover a selection of my most innovative and creative projects'
  },
  showing: {
    fr: 'Affichage de',
    en: 'Showing'
  },
  projects: {
    fr: 'projets',
    en: 'projects'
  },
  cta: {
    fr: 'Démarrons un projet ensemble',
    en: 'Let\'s start a project together'
  },
  moreProjects: {
    title: {
      fr: 'Plus de projets sur GitHub',
      en: 'More projects on GitHub'
    },
    description: {
      fr: 'Découvrez tous mes autres projets et contributions open source',
      en: 'Discover all my other projects and open source contributions'
    },
    cta: {
      fr: 'Voir mon GitHub',
      en: 'View my GitHub'
    }
  },
  viewMore: {
    fr: 'Voir plus de projets',
    en: 'View more projects'
  }
}

// Définition des couleurs des technologies
const techColors = {
  'Vue.js': '#42b883',
  'Flutter': '#027DFD',
  'Dart': '#0175C2',
  'TypeScript': '#3178C6',
  'JavaScript': '#F7DF1E',
  'Python': '#3776AB',
  'MongoDB': '#47A248',
  'Firebase': '#FFCA28',
  'Tailwind CSS': '#06B6D4',
  'PostgreSQL': '#336791',
  'PHP': '#777BB4',
  'Laravel': '#FF2D20',
  'MySQL': '#4479A1',
  'Javascript': '#F7DF1E',
  'HTML': '#E34F26',
  'CSS': '#1572B6',
  'Rest API': '#000000',
  'Sass': '#CC6699'
}

// Données des projets
const projects = [
  {
    id: 1,
    title: {
      fr: 'MyTravelr System',
      en: 'MyTravelr System'
    },
    description: {
      fr: 'MyTravelr est une plateforme qui vous permet de réserver et payer vos billets de bus en toute sécurité.',
      en: 'MyTravelr System is a platform that allows you to book and pay for your bus tickets safely.'
    },
    image: '/images/booking.webp?height=300&width=400',
    category: 'web',
    technologies: ['PHP', 'Laravel', 'Tailwind CSS', 'MySQL', 'Javascript'],
    demo: 'https://booking.mytravelr.co',
    github: null,
    isOpenSource: false
  },
  {
    id: 2,
    title: {
      fr: 'DropMe (bientôt disponible)',
      en: 'DropMe (Soon)'
    },
    description: {
      fr: 'Application Mobile de VTC. Il s\'agissait de realiser le front-end de l\'application.',
      en: 'DropMe is a mobile app for VTC. It was about to make the front-end of the application.'
    },
    image: '/images/dropme.webp?height=300&width=400',
    category: 'mobile',
    technologies: ['Flutter', 'Dart', 'Firebase'],
    demo: null,
    github: null,
    isOpenSource: false
  },
  {
    id: 3,
    title: {
      fr: 'Addjey',
      en: 'Addjey'
    },
    description: {
      fr: 'Addjey est un générateur de mots de passe aléatoires qui simplifie la tâche de création de mots de passe uniques pour chaque site que vous utilisez.',
      en: 'Addjey is a random password generator that simplifies the task of creating unique passwords for each site you use.'
    },
    image: '/images/addjey.webp?height=300&width=400',
    category: 'web',
    technologies: ['HTML', 'Javascript', 'Tailwind CSS'],
    demo: 'https://addjey.meriga.cm',
    github: 'https://github.com/agirem/addjey',
    isOpenSource: true
  },
  {
    id: 4,
    title: {
      fr: 'Purpay (En cours)',
      en: 'Purpay (In progress)'
    },
    description: {
      fr: 'Purpay est une application mobile de recharge de crédits/forfaits internet.',
      en: 'Purpay is a mobile app for recharge credits/forfaits internet.'
    },
    image: '/images/purpay.webp?height=300&width=400',
    category: 'mobile',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Rest API'],
    demo: null,
    github: null,
    isOpenSource: false
  },
  {
    id: 5,
    title: {
      fr: 'MyTravelr Landing Page',
      en: 'MyTravelr Landing Page'
    },
    description: {
      fr: 'Landing Page de MyTravelr',
      en: 'Landing Page of MyTravelr'
    },
    image: '/images/landing.webp?height=300&width=400',
    category: 'web',
    technologies: ['HTML', 'Sass', 'Javascript'],
    demo: 'https://mytravelr.meriga.cm',
    github: null,
    isOpenSource: false
  },
  {
    id: 6,
    title: {
      fr: 'MyTravelr Dashboard',
      en: 'MyTravelr Dashboard'
    },
    description: {
      fr: 'Dashboard de MyTravelr',
      en: 'Dashboard of MyTravelr'
    },
    image: '/images/panel.webp?height=300&width=400',
    category: 'web',
    technologies: ['PHP', 'Tailwind CSS', 'MySQL', 'Javascript'],
    demo: 'https://mpanel.mytravelr.co',
    github: null,
    isOpenSource: false
  },
  {
    id: 7,
    title: {
      fr: 'MyTravelr Mobile App (en cours)',
      en: 'MyTravelr Mobile App (in progress)'
    },
    description: {
      fr: 'Application Mobile de MyTravelr',
      en: 'Mobile App of MyTravelr'
    },
    image: '/images/mytravelr-mobile.webp?height=300&width=400',
    category: 'mobile',
    technologies: ['Flutter', 'Dart', 'Laravel', 'Rest API', 'MySQL'],
    demo: null,
    github: null,
    isOpenSource: false
  },
  {
    id: 8,
    title: {
      fr: 'OM Portfolio',
      en: 'OM Portfolio'
    },
    description: {
      fr: 'Mon portfolio personnel',
      en: 'My personal portfolio'
    },
    image: '/images/om.webp?height=300&width=400',
    category: 'web',
    technologies: ['Vue.js', 'Tailwind CSS', 'Javascript'],
    demo: 'https://meriga.cm',
    github: 'https://github.com/agirem/portfolio-v2',
    isOpenSource: true
  },
  {
    id: 9,
    title: {
      fr: 'Busilience',
      en: 'Busilience'
    },
    description: {
      fr: 'Site officiel de Busilience',
      en: 'Official website of Busilience'
    },
    image: '/images/busilience.webp?height=300&width=400',
    category: 'web',
    technologies: ['HTML', 'CSS', 'Javascript'],
    demo: 'https://busilience.org',
    github: null,
    isOpenSource: false
  }
  // À implémenter plus tard
  // {
  //   id: 3,
  //   title: {
  //     fr: 'API de Gestion de Données',
  //     en: 'Data Management API'
  //   },
  //   description: {
  //     fr: 'API RESTful performante pour la gestion et l\'analyse de données en temps réel.',
  //     en: 'High-performance RESTful API for real-time data management and analysis.'
  //   },
  //   image: '/placeholder.svg?height=300&width=400',
  //   category: 'api',
  //   technologies: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
  //   demo: 'https://demo.example.com',
  //   github: 'https://github.com/example'
  // }
]

// Computed
const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') {
    return projects
  }
  return projects.filter(project => project.category === selectedCategory.value)
})

// Fonction utilitaire pour ajuster les couleurs
const adjustColor = (color, amount) => {
  const clamp = (val) => Math.min(255, Math.max(0, val))
  
  // Convertir la couleur hex en RGB
  const hex = color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  
  // Ajuster les valeurs
  const newR = clamp(r + amount)
  const newG = clamp(g + amount)
  const newB = clamp(b + amount)
  
  // Convertir en hex
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
}
</script>

<style scoped>
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

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
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

.grid > div {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* Nouvelles animations et effets */
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-10px) rotate(1deg); }
}

@keyframes shine {
  0% { transform: translateX(-100%) rotate(45deg); }
  100% { transform: translateX(100%) rotate(45deg); }
}

.text-shadow-lg {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Effet de perspective */
.perspective-1000 {
  perspective: 1000px;
}

[transform-style="preserve-3d"] {
  transform-style: preserve-3d;
}

/* Animation d'apparition améliorée */
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

/* Effet de glassmorphism amélioré */
.glass-effect {
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .glass-effect {
  background: rgba(17, 24, 39, 0.7);
  border-color: rgba(255, 255, 255, 0.1);
}

/* Animations des particules */
.particle-1 {
  animation: particleFloat1 8s ease-in-out infinite;
  top: 20%;
  left: 20%;
}

.particle-2 {
  animation: particleFloat2 12s ease-in-out infinite;
  top: 50%;
  right: 20%;
}

.particle-3 {
  animation: particleFloat3 10s ease-in-out infinite;
  bottom: 20%;
  left: 30%;
}

@keyframes particleFloat1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -20px) scale(1.2); }
}

@keyframes particleFloat2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-40px, 20px) scale(0.8); }
}

@keyframes particleFloat3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, 30px) scale(1.1); }
}
</style>