<template>
  <Dashboard>
    <Card>
      <CardHeader>
        <div class="flex justify-between items-start flex-col md:flex-row">
          <div>
            <CardTitle>Company list ({{ items }})</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="fetchCompany" class="space-y-2">
          <div>
            <Label for="url">Fetch url</Label>
            <Input id="url" placeholder="Enter url" v-model="form.url" />
          </div>
          <div class="flex justify-end" :disabled="loading">
            <Button type="submit" :disabled="loading">
              <LoaderIcon v-if="loading" class="animate-spin" />
              <PlayIcon v-else />
              Fetch all company
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </Dashboard>
</template>

<script>
import { LoaderIcon, PlayIcon } from "lucide-vue-next";

export default {
  name: "DashboardSitemap",
  components: { PlayIcon, LoaderIcon },
  data() {
    return {
      items: 0,
      blocked: false,
      loading: false,
      form: { url: "https://medex.com.bd/companies", },
    };
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      try {
        this.loading = true;
        const { api } = useApi();
        const { items } = await api.get("/dashboard/company");
        this.items = items;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async fetchCompany() {
      try {
        if (this.blocked) return;
        this.blocked = true;
        this.loading = true;
        const { api } = useApi();
        await api.post("/dashboard/company", this.form);
        this.fetchItems();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
        this.blocked = false;
      }
    },
  },
};
</script>
