<template>
  <div id="app" class="container mx-auto bg-gray-600">
    <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <img src="./assets/logo.svg" alt="Weather" />
        <span class="font-semibold text-xl tracking-tight">Weather</span>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <router-link to="/">
            <a
              class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Home
            </a>
          </router-link>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>
