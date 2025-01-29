<template>
  <section id="about" class="min-h-screen py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
    <!-- Fond animé -->
    <div class="absolute inset-0 opacity-30 dark:opacity-20">
      <div class="absolute w-[500px] h-[500px] bg-[#783DFF]/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div class="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
    </div>

    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <!-- En-tête -->
      <div class="text-center mb-8 sm:mb-16 animate-on-scroll">
        <div class="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6 shadow-md">
          <img :src="manTechIcon" alt="Tech man" class="w-5 sm:w-6 h-5 sm:h-6 object-contain" />
          <span class="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">{{ content.label[locale] }}</span>
        </div>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#783DFF] to-purple-600 text-transparent bg-clip-text mb-4 sm:mb-6 px-4">
          {{ content.title[locale] }}
        </h2>
        <p class="mt-2 sm:mt-3 max-w-2xl mx-auto text-lg sm:text-xl text-gray-500 dark:text-gray-400 px-4">
          {{ content.subtitle[locale] }}
        </p>
      </div>

      <!-- Bio Section -->
      <div class="mb-8 sm:mb-16">
        <div 
          ref="bioContainer"
          class="bio-container bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg animate-on-scroll max-w-4xl mx-auto relative group glass-effect"
          @mouseenter="animateHover($event.currentTarget)"
        >
          <!-- Effet de particules en arrière-plan -->
          <div class="absolute inset-0 overflow-hidden rounded-2xl">
            <div class="absolute w-32 h-32 bg-[#783DFF]/10 rounded-full -top-16 -right-16 group-hover:scale-150 transition-transform duration-700"></div>
            <div class="absolute w-24 h-24 bg-purple-500/10 rounded-full -bottom-12 -left-12 group-hover:scale-150 transition-transform duration-700"></div>
          </div>

          <!-- Contenu Bio avec nouvelle mise en page -->
          <div class="relative grid md:grid-cols-[auto,1fr] gap-6 sm:gap-8 items-center">
            <!-- Photo de profil animée -->
            <div class="relative mx-auto md:mx-0 w-40 sm:w-48 md:w-48">
              <div class="aspect-square rounded-2xl overflow-hidden shadow-xl transform group-hover:scale-105 transition-all duration-500">
                <img 
                  :src="content.profileImage" 
                  alt="Profile"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>

            <div class="space-y-4 sm:space-y-6">
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-4">
                <span class="w-8 sm:w-10 h-8 sm:h-10 bg-[#783DFF] rounded-lg flex items-center justify-center transform transition-all duration-300 group-hover:rotate-12">
                  <UserIcon class="w-4 sm:w-6 h-4 sm:h-6 text-white" />
                </span>
                <span class="bg-gradient-to-r from-[#783DFF] to-purple-600 text-transparent bg-clip-text">{{ content.bioTitle[locale] }}</span>
              </h3>

              <!-- Bio text avec mise en forme améliorée -->
              <div class="space-y-4">
                <p 
                  ref="bioText"
                  class="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed typing-text"
                  v-html="formattedBio"
                ></p>

                <!-- Micro-cartes de passions -->
                <div class="flex flex-wrap gap-4 mt-6 justify-center">
                  <div class="passion-card relative w-14 h-14 group">
                    <div class="absolute inset-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 rotate-12 hover:rotate-0 hover:scale-110">
                      <div class="absolute inset-0 bg-gradient-to-br from-[#783DFF]/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div class="absolute inset-0 flex flex-col items-center justify-center">
                        <CameraIcon class="w-6 h-6 text-[#783DFF] group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div class="passion-card relative w-14 h-14 group">
                    <div class="absolute inset-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 -rotate-12 hover:rotate-0 hover:scale-110">
                      <div class="absolute inset-0 bg-gradient-to-br from-[#783DFF]/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div class="absolute inset-0 flex flex-col items-center justify-center">
                        <SwordIcon class="w-6 h-6 text-[#783DFF] group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div class="passion-card relative w-14 h-14 group">
                    <div class="absolute inset-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 rotate-12 hover:rotate-0 hover:scale-110">
                      <div class="absolute inset-0 bg-gradient-to-br from-[#783DFF]/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div class="absolute inset-0 flex flex-col items-center justify-center">
                        <LayoutGridIcon class="w-6 h-6 text-[#783DFF] group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div class="passion-card relative w-14 h-14 group">
                    <div class="absolute inset-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 -rotate-12 hover:rotate-0 hover:scale-110">
                      <div class="absolute inset-0 bg-gradient-to-br from-[#783DFF]/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div class="absolute inset-0 flex flex-col items-center justify-center">
                        <BookOpenIcon class="w-6 h-6 text-[#783DFF] group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    </div>
                  </div>

                  <div class="passion-card relative w-14 h-14 group">
                    <div class="absolute inset-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 rotate-12 hover:rotate-0 hover:scale-110">
                      <div class="absolute inset-0 bg-gradient-to-br from-[#783DFF]/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div class="absolute inset-0 flex flex-col items-center justify-center">
                        <HeartIcon class="w-6 h-6 text-[#783DFF] group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    </div>
                  </div>

                  <div class="passion-card relative w-14 h-14 group">
                    <div class="absolute inset-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 -rotate-12 hover:rotate-0 hover:scale-110">
                      <div class="absolute inset-0 bg-gradient-to-br from-[#783DFF]/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div class="absolute inset-0 flex flex-col items-center justify-center">
                        <MusicIcon class="w-6 h-6 text-[#783DFF] group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Statistiques rapides -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 sm:pt-6">
                  <div 
                    v-for="(value, key) in content.stats" 
                    :key="key"
                    class="stat-item relative overflow-hidden group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300"
                  >
                    <div class="relative z-10">
                      <div class="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#783DFF] to-purple-600 group-hover:scale-110 transition-transform duration-300">{{ value }}+</div>
                      <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{{ key }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    

      <!-- Skills Section -->
      <div class="mb-8 sm:mb-16">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg skills-container animate-on-scroll">
          <h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 flex items-center">
            <span class="w-8 sm:w-10 h-8 sm:h-10 bg-[#783DFF] rounded-lg flex items-center justify-center mr-4">
              <CodeIcon class="w-4 sm:w-6 h-4 sm:h-6 text-white" />
            </span>
            {{ content.skillsTitle[locale] }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div 
              v-for="(category, index) in content.skills" 
              :key="index"
              class="skill-category bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 rounded-xl overflow-hidden animate-on-scroll relative group p-4 sm:p-6"
            >
              <!-- Header de la catégorie -->
              <div class="flex items-center mb-4">
                <span class="w-8 sm:w-10 h-8 sm:h-10 bg-[#783DFF]/10 rounded-lg flex items-center justify-center mr-3">
                  <CodeIcon class="w-4 sm:w-5 h-4 sm:h-5 text-[#783DFF]" />
                </span>
                <h4 class="text-base sm:text-lg font-bold text-[#783DFF]">
                  {{ category.title }}
                </h4>
              </div>
              
              <!-- Technologies -->
              <div class="flex flex-wrap gap-2 sm:gap-3">
                <div 
                  v-for="(item, itemIndex) in category.items" 
                  :key="itemIndex"
                  class="tech-badge"
                >
                  <div class="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-2">
                    <div class="w-4 sm:w-5 h-4 sm:h-5 flex items-center justify-center">
                      <img 
                        v-if="getTechIcon(item).startsWith('https')"
                        :src="getTechIcon(item)"
                        :alt="item"
                        class="w-full h-full object-contain"
                      />
                    </div>
                    <span>{{ item }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Experience et Education -->
      <div class="grid md:grid-cols-2 gap-4 sm:gap-8">
        <!-- Timeline d'expérience -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg animate-on-scroll">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
            <span class="w-10 h-10 bg-[#783DFF] rounded-lg flex items-center justify-center mr-4">
              <BriefcaseIcon class="w-6 h-6 text-white" />
            </span>
            {{ content.experienceTitle[locale] }}
          </h3>
          <div class="space-y-6">
            <div 
              v-for="(exp, index) in content.experiences" 
              :key="index"
              class="timeline-item relative pl-8 group animate-on-scroll"
              :style="{ animationDelay: index * 0.2 + 's' }"
            >
              <div class="absolute left-0 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              <div class="timeline-dot absolute left-[-4px] top-2 w-3 h-3 rounded-full border-2 border-[#783DFF] bg-white dark:bg-gray-900"></div>
              <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                <div class="flex items-start justify-between mb-2">
                  <h4 class="font-bold text-[#783DFF]">{{ exp.role[locale] }}</h4>
                  <span class="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded-full ml-2">
                    {{ exp.period }}
                  </span>
                </div>
                <div class="text-gray-600 dark:text-gray-300 mb-2">{{ exp.company }}</div>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ exp.description[locale] }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Certifications et Formations -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg animate-on-scroll">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
            <span class="w-10 h-10 bg-[#783DFF] rounded-lg flex items-center justify-center mr-4">
              <GraduationCapIcon class="w-6 h-6 text-white" />
            </span>
            {{ content.educationTitle[locale] }}
          </h3>
          <div class="space-y-6">
            <div
              v-for="(edu, index) in content.education" 
              :key="index"
              class="education-item group bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
              :style="{ animationDelay: index * 0.15 + 's' }"
            >
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <AwardIcon class="w-6 h-6 text-[#783DFF]" />
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 dark:text-white group-hover:text-[#783DFF] transition-colors duration-300">
                    {{ edu.title[locale] }}
                  </h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ edu.institution }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ edu.year }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { UserIcon, BriefcaseIcon, CodeIcon, GraduationCapIcon, AwardIcon, CameraIcon, SwordIcon, LayoutGridIcon, BookOpenIcon, HeartIcon, MusicIcon } from 'lucide-vue-next'
import manTechIcon from '../assets/man-tech.png'

const props = defineProps({
  locale: {
    type: String,
    required: true
  }
})

// État pour l'animation des compétences
const isVisible = ref(false)

// Formatage de la bio avec effet de typage
const formattedBio = computed(() => content.bio[props.locale])

// Observer pour les animations au scroll
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  // Observer tous les éléments animés
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el)
  })

  // Animation séquentielle des compétences
  const skillsContainer = document.querySelector('.skills-container')
  if (skillsContainer) {
    const skills = skillsContainer.querySelectorAll('.skill-item')
    skills.forEach((skill, index) => {
      skill.style.animationDelay = `${index * 0.1}s`
    })
  }

  // Animation de la bio
  const bioContainer = document.querySelector('.bio-container')
  if (bioContainer) {
    bioContainer.classList.add('fade-in-up')
  }

  // Nettoyage
  onUnmounted(() => {
    observer.disconnect()
  })
})

// Fonction pour animer les éléments au hover
const animateHover = (element) => {
  element.style.transform = 'scale(1.02)'
  setTimeout(() => {
    element.style.transform = 'scale(1)'
  }, 200)
}

// Ajout des couleurs officielles des technologies
const techColors = {
  'VS Code': '#007ACC',
  'Android Studio': '#3DDC84',
  'Git': '#F05032',
  'GitHub': '#181717',
  'PostMan': '#FF6C37',
  'Figma': '#F24E1E',
  'Adobe Illustrator': '#FF9A00',
  'Adobe Xd': '#FF61F6',
  'Adobe Photoshop': '#31A8FF',
  'SQL': '#4479A1',
  'HTML': '#E34F26',
  'CSS': '#1572B6',
  'JavaScript': '#F7DF1E',
  'PHP': '#777BB4',
  'Sass': '#CC6699',
  'Dart': '#0175C2',
  'Flutter': '#02569B',
  'WordPress': '#21759B',
  'Laravel': '#FF2D20',
  'Bootstrap': '#7952B3',
  'TailwindCSS': '#06B6D4',
  'MySQL': '#4479A1',
  'PostgreSQL': '#336791',
  'Vercel': '#000000',
  'Github Pages': '#222222',
  'Netlify': '#00C7B7',
  'Hostinger': '#673DE6',
  'Vue.js': '#42b883'
}

// Contenu
const content = {
  label: {
    fr: 'À propos de moi',
    en: 'About me'
  },
  title: {
    fr: 'Passionné par la Création Numérique',
    en: 'Passionate about Digital Creation'
  },
  subtitle: {
    fr: 'Découvrez mon parcours, mes compétences et ma passion pour le développement',
    en: 'Discover my journey, skills, and passion for development'
  },
  bioTitle: {
    fr: 'Qui suis-je ?',
    en: 'Who am I?'
  },
  bio: {
    fr: `Software Engineer passionné avec plus de 5 ans d'expérience dans le développement d'applications web et mobile innovantes. <span class="text-[#783DFF] font-medium">Spécialisé dans les technologies modernes</span> et toujours à l'affût des dernières tendances du développement. En dehors du code, je suis un judoka passionné, ce qui m'aide à maintenir discipline et équilibre. <span class="text-[#783DFF] font-medium">Adepte du minimalisme</span>, je m'intéresse particulièrement au développement personnel à travers la lecture. Pendant mon temps libre, j'explore ma créativité en photographiant la nature, capturant sa beauté dans sa plus simple expression.`,
    en: `Passionate Software Engineer with over 5 years of experience in developing innovative web and mobile applications. <span class="text-[#783DFF] font-medium">Specialized in modern technologies</span> and always keeping up with the latest development trends. Beyond coding, I'm a dedicated judo practitioner, which helps me maintain discipline and balance. <span class="text-[#783DFF] font-medium">A minimalism enthusiast</span>, I'm particularly interested in personal development through reading. In my spare time, I explore my creativity by photographing nature, capturing its beauty in its simplest form.`
  },
  experienceTitle: {
    fr: 'Expérience Professionnelle',
    en: 'Professional Experience'
  },
  skillsTitle: {
    fr: 'Compétences Techniques',
    en: 'Technical Skills'
  },
  educationTitle: {
    fr: 'Formation & Certifications',
    en: 'Education & Certifications'
  },
  galleryTitle: {
    fr: 'Ma Galerie',
    en: 'My Gallery'
  },
  gallery: [
    {
      image: './src/assets/gallery/nature1.jpg',
      title: {
        fr: 'Nature',
        en: 'Nature'
      },
      description: {
        fr: 'Photographie de paysage',
        en: 'Landscape photography'
      }
    },
    {
      image: './src/assets/gallery/judo1.jpg',
      title: {
        fr: 'Judo',
        en: 'Judo'
      },
      description: {
        fr: 'Passion pour les arts martiaux',
        en: 'Passion for martial arts'
      }
    },
    {
      image: './src/assets/gallery/minimal1.jpg',
      title: {
        fr: 'Minimalisme',
        en: 'Minimalism'
      },
      description: {
        fr: 'Design épuré',
        en: 'Clean design'
      }
    },
    {
      image: './src/assets/gallery/reading1.jpg',
      title: {
        fr: 'Lecture',
        en: 'Reading'
      },
      description: {
        fr: 'Développement personnel',
        en: 'Personal development'
      }
    }
  ],
  experiences: [
  {
      role: {
        fr: 'Freelance',
        en: 'Freelance'
      },
      company: 'Freelance',
      period: '2023 - Présent',
    description: {
        fr: 'Développement de sites web et applications mobiles pour des clients locaux et internationnaux.',
        en: 'Development of web sites and mobile applications for local and international clients.'
      }
    },
    {
      role: {
        fr: 'Développeur Mobile',
        en: 'Mobile Developer'
      },
      company: 'DropMe Sarl - Sur site',
      period: '2023 - Présent',
    description: {
        fr: 'Conecption et réalisation d’une des applications mobile de la structure (DropMe).',
        en: 'Development of one of the mobile applications of the structure (DropMe).'
      }
    },
    {
      role: {
        fr: 'Développeur Web - UI/UX Designer',
        en: 'Web Dev - UI/UX Designer'
      },
      company: 'Busilience SAS - (Remote)',
      period: '2022',
    description: {
        fr: 'Site web officiel de l\'entreprise, Brand designing de la marque de l’entreprise (logo, typo, couleurs...), Référencement naturel (SEO) du site web',
        en: 'Web and mobile application development, cloud solution architecture.'
      }
    }
  ],
  skills: [
    {
      title: 'Utilisation des logiciels',
      items: ['VS Code', 'Android Studio', 'IntelliJ IDEA', 'Git', 'GitHub', 'PostMan', 'Figma', 'Adobe Illustrator', 'Adobe Xd', 'Adobe Photoshop']
    },
    {
      title: 'Langages maîtrisés',
      items: ['SQL', 'HTML', 'CSS', 'JavaScript', 'PHP', 'Sass', 'Dart']
    },
    {
      title: 'Utilisation des frameworks et CMS',
      items: ['Vue.js', 'Flutter', 'WordPress', 'Laravel', 'Bootstrap', 'TailwindCSS']
    },
    {
      title: 'Bases de données',
      items: ['MySQL', 'PostgreSQL', 'Acces(Moyen)']
    },
    {
      title: 'Services d\'hébergements web',
      items: ['Vercel', 'Github Pages', 'Netlify', 'Hostinger']
    },
    {
      title: 'Autres compétences',
      items: ['APIs REST', 'Gestion de projet (Jira, Trello)', 'Référencement naturel (SEO)']
    }
  ],
  education: [
    {
      title: {
        fr: 'Ingénieur en Génie Numérique',
        en: 'Engineer in Digital Engineering'
      },
      institution: 'ESIGN - Université Inter-Etats Congo-Cameroun',
      year: '2025'
    },
    {
      title: {
        fr: 'AWS Solutions Architect',
        en: 'AWS Solutions Architect'
      },
      institution: 'Amazon Web Services',
      year: '2021'
    }
  ],
  stats: {
    experience: 5,
    projects: 30,
    clients: 15,
    certifications: 8
  },
  profileImage: './src/assets/profile.svg'  // Ajoutez le chemin vers votre photo de profil
}

// Fonction pour obtenir l'icône correspondante
const getTechIcon = (tech) => {
  const iconMap = {
    'VS Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    'Android Studio': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    'PostMan': 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg',
    'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    'Adobe Illustrator': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg',
    'Adobe Xd': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg',
    'Adobe Photoshop': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
    'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'PHP': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    'Sass': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
    'Dart': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
    'Flutter': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
    'WordPress': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg',
    'Laravel': 'https://static.cdnlogo.com/logos/l/23/laravel.svg',
    'Bootstrap': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
    'TailwindCSS': 'https://static.cdnlogo.com/logos/t/58/tailwind-css.svg',
    'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
    'Vercel': 'https://www.vectorlogo.zone/logos/vercel/vercel-icon.svg',
    'Netlify': 'https://www.vectorlogo.zone/logos/netlify/netlify-icon.svg',
    'Hostinger': 'https://cdn.worldvectorlogo.com/logos/hostinger.svg',
    'Vue.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg'
  }
  
  return iconMap[tech] || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg'
}
</script>

<style scoped>
/* Animations de base */
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* Classes d'animation */
.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

.slide-in-left {
  animation: slideInLeft 0.6s ease-out forwards;
}

.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}

.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Styles des éléments */
.bio-container {
  position: relative;
  overflow: hidden;
}

.bio-container::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #783DFF, purple);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s ease-out;
}

.bio-container:hover::after {
  transform: scaleX(1);
}

.skill-item {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.skill-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(120, 61, 255, 0.1);
}

.skill-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(120, 61, 255, 0.1), rgba(120, 61, 255, 0));
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.skill-item:hover::before {
  transform: translateX(0);
}

.timeline-dot {
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-dot {
  transform: scale(1.5);
  box-shadow: 0 0 15px rgba(120, 61, 255, 0.5);
}

.education-item {
  transition: all 0.3s ease;
}

.education-item:hover {
  transform: translateX(10px);
}

/* Animations des icônes */
.icon-container {
  transition: all 0.3s ease;
}

.icon-container:hover {
  transform: rotate(360deg);
  background-color: #783DFF;
}

.icon-container:hover svg {
  color: white;
}

/* Animation du texte de la bio */
.typing-effect {
  border-right: 2px solid #783DFF;
  white-space: nowrap;
  overflow: hidden;
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: #783DFF }
}

/* Animation de typage */
.typing-text {
  position: relative;
  display: inline-block;
  width: 100%;
}

.typing-text::after {
  content: '';
  position: absolute;
  right: -4px;
  top: 50%;
  transform: translateY(-50%);
  height: 24px;
  width: 3px;
  background: #783DFF;
  animation: cursor-blink 1.2s ease-in-out infinite;
}

@keyframes cursor-blink {
  0%, 100% { 
    opacity: 0;
    transform: translateY(-50%) scaleY(0.8);
  }
  50% { 
    opacity: 1;
    transform: translateY(-50%) scaleY(1);
  }
}

.typing-text p {
  overflow: hidden;
  margin: 0;
  animation: typing 2.5s ease-out forwards;
  white-space: pre-wrap;
  opacity: 0;
}

/* Transitions fluides */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Animation des barres de progression */
.progress-bar {
  transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Style pour les tags de compétences */
.container {
  display: flex;
  flex-direction: column;
}

.skill-category {
  border: 1px solid rgba(120, 61, 255, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 6px -1px rgba(120, 61, 255, 0.05),
              0 2px 4px -1px rgba(120, 61, 255, 0.03);
}

.skill-category:hover {
  border-color: rgba(120, 61, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 12px -1px rgba(120, 61, 255, 0.08),
              0 4px 6px -1px rgba(120, 61, 255, 0.05);
}

.timeline-item:last-child .absolute {
  height: 50%;
}

.tech-badge {
  isolation: isolate;
  cursor: pointer;
}

.tech-badge > div {
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform, background-color, color;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.tech-badge:hover > div {
  background-color: #783DFF !important;
  color: white !important;
  transform: translateZ(0) scale(1.02);
  box-shadow: 0 4px 12px -2px rgba(120, 61, 255, 0.3);
}

:root.dark .tech-badge > div {
  background-color: rgba(120, 61, 255, 0.15) !important;
  color: rgba(255, 255, 255, 0.9) !important;
}

:root.dark .tech-badge:hover > div {
  background-color: #783DFF !important;
  color: white !important;
  box-shadow: 0 4px 12px -2px rgba(120, 61, 255, 0.5);
}

.tech-badge:hover img,
.tech-badge:hover .tech-icon-wrapper img {
  filter: brightness(0) invert(1) !important;
}

:root.dark .tech-badge img {
  filter: brightness(0.9);
}

:root.dark .tech-badge .tech-name {
  color: rgba(255, 255, 255, 0.9);
}

.tech-icon-wrapper {
  transform: translateZ(0);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.tech-badge .tech-name {
  transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Animation pour les badges */
@keyframes techBadgePop {
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.tech-badge {
  animation: techBadgePop 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .grid-cols-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .grid-cols-3 {
    grid-template-columns: 1fr;
  }
  
  .tech-badge {
    flex-basis: calc(50% - 0.75rem);
  }
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .grid {
    gap: 1.5rem;
  }
}

.stat-item {
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px -10px rgba(120, 61, 255, 0.3);
}
</style>