<template>
  <div class="bg-white border-b">
    <header
      class="container mx-auto flex items-center gap-4 p-2 justify-between"
    >
      <NuxtLink
        :to="{ name: 'index' }"
        class="flex items-center gap-2 text-xl font-bold text-gray-700"
      >
        <img src="/logo.svg" alt="logo" class="size-8" /> {{ appName }}
      </NuxtLink>
      <nav class="font-medium flex flex-row items-center md:gap-5 gap-3">
        <Sheet class="md:hidden" :open="open" @update:open="open = !open">
          <SheetTrigger as-child>
            <Button variant="outline" size="icon" class="shrink-0 md:hidden">
              <MenuIcon class="h-5 w-5" />
              <span class="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav class="flex flex-col gap-5 text-lg font-medium">
              <NuxtLink v-for="(url, i) in urls" :key="i" :to="url.to">
                {{ url.name }}
              </NuxtLink>
            </nav>
          </SheetContent>
        </Sheet>
        <NuxtLink
          v-for="(url, i) in urls"
          :key="i"
          :to="url.to"
          class="hidden md:block hover:underline"
        >
          {{ url.name }}
        </NuxtLink>
        <template v-if="isDev">
          <DropdownMenu v-if="loggedIn">
            <DropdownMenuTrigger asChild>
              <Avatar class="cursor-pointer">
                <AvatarImage :src="authUser.avatar" :alt="authUser.name" />
                <AvatarFallback class="text-base">{{
                  authUser.name
                    .split(" ")
                    .map((i) => i[0].toUpperCase())
                    .join("")
                }}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-44" align="end">
              <DropdownMenuItem :to="{ name: 'dashboard' }">
                <NuxtLink :to="{ name: 'dashboard' }" class="flex gap-2 w-full">
                  <LayoutDashboardIcon :size="18" />
                  <span>Dashboard</span>
                </NuxtLink>
              </DropdownMenuItem>
              <DropdownMenuItem @click="logout" class="cursor-pointer">
                <LogOutIcon />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button @click="loginModal" v-if="!loggedIn"> Login </Button>
        </template>
      </nav>
    </header>
  </div>
</template>

<script>
import { LayoutDashboardIcon, LogOutIcon, MenuIcon } from "lucide-vue-next";
import eventBus from "~/lib/eventBus";

export default {
  name: "HomeHeader",
  components: { LogOutIcon, LayoutDashboardIcon, MenuIcon },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    urls() {
      return [
        { name: "Medicine", to: { name: "index", hash: "#pricing" } },
        { name: "Pharmaceutical", to: { name: "index", hash: "#faq" } },
        { name: "Doctor", to: { name: "index" } },
      ];
    },
    appName() {
      const { appName } = useUtils();
      return appName;
    },
    loggedIn() {
      const { loggedIn } = useAuth();
      return loggedIn;
    },
    authUser() {
      const { authUser } = useAuth();
      return authUser.value;
    },
    isDev() {
      const { value } = useData();
      return value.isDev || false;
    },
  },
  watch: {
    $route(to, from) {
      if (to.hash !== from.hash) {
        this.open = false;
      }
    },
  },
  methods: {
    loginModal() {
      eventBus.emit("loginModal");
    },
    logout() {
      const { logout } = useAuth();
      logout();
    },
  },
};
</script>

<style></style>
