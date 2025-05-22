<template>
  <div class="flex">
    <UNotifications />
    <div class="w-[15%] bg-[white] min-h-screen p-6 shadow-lg">
      <nuxt-link
          to="/"
          class="flex items-center mb-[20px] justify-center w-full max-w-xs px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1"
      >
        <span
            class="w-6 h-6 mr-2 bg-no-repeat bg-center bg-contain"
            style="background-image: url('/images/home.svg')"
        ></span>
        Home
      </nuxt-link>

      <nuxt-link
          to="/languages"
          class="flex items-center mb-[20px] justify-center w-full max-w-xs px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1"
      >
        <span
            class="w-6 h-6 mr-2 bg-no-repeat bg-center bg-contain"
            style="background-image: url('/images/language.png')"
        ></span>
        Languages
      </nuxt-link>

      <nuxt-link
          to="/countries"
          class="flex items-center mb-[20px] justify-center w-full max-w-xs px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1"
      >
        <span
            class="w-6 h-6 mr-2 bg-no-repeat bg-center bg-contain"
            style="background-image: url('/images/countries.svg')"
        ></span>
        Countries
      </nuxt-link>

      <nuxt-link
          to="/topics"
          class="flex items-center mb-[20px] justify-center w-full max-w-xs px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1"
      >
        <span
            class="w-6 h-6 mr-2 bg-no-repeat bg-center bg-contain"
            style="background-image: url('/images/topic.svg')"
        ></span>
        Topics
      </nuxt-link>

      <nuxt-link
          to="/tags"
          class="flex items-center mb-[20px] justify-center w-full max-w-xs px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1"
      >
        <span
            class="w-6 h-6 mr-2 bg-no-repeat bg-center bg-contain"
            style="background-image: url('/images/tags.svg')"
        ></span>
        Tags
      </nuxt-link>
    </div>
    <div class="w-[85%] bg-gray-200 p-6">
      <NuxtPage />
    </div>
  </div>
</template>
