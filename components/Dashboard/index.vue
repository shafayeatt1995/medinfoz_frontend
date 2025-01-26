<template>
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem class="flex items-center gap-1">
            <img src="/logo.svg" class="size-10" />
            <p class="text-2xl font-bold">{{ appName }}</p>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <Collapsible
              v-for="item in data.navMain"
              :key="item.title"
              as-child
              :default-open="item.isActive"
              class="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton :tooltip="item.title">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                    <ChevronRightIcon
                      class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem
                      v-for="subItem in item.items"
                      :key="subItem.title"
                    >
                      <SidebarMenuSubButton as-child>
                        <NuxtLink :to="subItem.to" class="hover:bg-gray-100">
                          <span>{{ subItem.title }}</span>
                        </NuxtLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton
                  size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar class="h-8 w-8 rounded-lg">
                    <AvatarImage :src="authUser.avatar" :alt="authUser.name" />
                    <AvatarFallback class="rounded-lg"> CN </AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">{{
                      authUser.name
                    }}</span>
                    <span class="truncate text-xs">{{ authUser.email }}</span>
                  </div>
                  <ChevronsUpDownIcon class="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                :side-offset="4"
              >
                <DropdownMenuLabel class="p-0 font-normal">
                  <div
                    class="flex items-center gap-2 px-1 py-1.5 text-left text-sm"
                  >
                    <Avatar class="h-8 w-8 rounded-lg">
                      <AvatarImage
                        :src="authUser.avatar"
                        :alt="authUser.name"
                      />
                      <AvatarFallback class="rounded-lg"> CN </AvatarFallback>
                    </Avatar>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">{{
                        authUser.name
                      }}</span>
                      <span class="truncate text-xs">{{ authUser.email }}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem class="cursor-pointer">
                    <SparklesIcon />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem class="cursor-pointer">
                    <BadgeCheckIcon />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem class="cursor-pointer" asChild>
                  </DropdownMenuItem>
                  <DropdownMenuItem class="cursor-pointer">
                    <CreditCardIcon />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem class="cursor-pointer">
                    <BellIcon />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="cursor-pointer" @click="logout">
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
      >
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <DashboardBreadcrumb />
        </div>
      </header>
      <div class="w-full p-4 pt-0">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<script>
import {
  BadgeCheckIcon,
  BellIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  CreditCardIcon,
  LogOutIcon,
  MicroscopeIcon,
  SparklesIcon,
  SquareTerminalIcon,
  UsersIcon,
} from "lucide-vue-next";

export default {
  name: "Dashboard",
  components: {
    ChevronRightIcon,
    ChevronsUpDownIcon,
    LogOutIcon,
    SquareTerminalIcon,
    BadgeCheckIcon,
    BellIcon,
    CreditCardIcon,
    SparklesIcon,
    UsersIcon,
    MicroscopeIcon,
  },
  data() {
    return {
      data: {
        user: {
          name: "shadcn",
          email: "m@example.com",
          avatar: "/avatars/shadcn.jpg",
        },
        navMain: [
          {
            title: "Scraper",
            icon: SquareTerminalIcon,
            isActive: true,
            items: [
              {
                title: "Company list",
                to: { name: "dashboard-company" },
              },
              {
                title: "Medicine",
                to: { name: "dashboard-medicine" },
              },
            ],
          },
        ],
      },
      activeItem: 0,
    };
  },
  computed: {
    appName() {
      return useUtils().appName;
    },
    activeTeam() {
      return this.data.teams[this.activeItem];
    },
    loggedIn() {
      const { loggedIn } = useAuth();
      return loggedIn;
    },
    authUser() {
      const { authUser } = useAuth();
      return authUser.value;
    },
    isFreeUser() {
      const { authUser } = useAuth();
      return !!authUser.value?.isFreeUser;
    },
  },
  methods: {
    setActiveTeam(i) {
      this.activeItem = i;
    },
    async logout() {
      try {
        const { logout } = useAuth();
        await logout();
      } catch (error) {}
    },
  },
};
</script>

<style scoped>
.router-link-exact-active {
  @apply bg-gray-100;
}
</style>
