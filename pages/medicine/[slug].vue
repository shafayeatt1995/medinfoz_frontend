<template>
  <div v-if="medicine" class="container mx-auto px-4">
    <img :src="medicine.image" :alt="medicine.name" class="w-96" />
    <h1 id="anik-title">{{ medicine.name }}</h1>
    <p id="anik-medicine-type">Medicine type: {{ medicine.type }}</p>
    <p id="anik-medicine-category">
      Medicine category: {{ medicine.category }}
    </p>
    <p id="anik-medicine-strength">
      Medicine strength: {{ medicine.strength }}
    </p>
    <p id="anik-medicine-company">Medicine company: {{ medicine.company }}</p>
    <div class="flex" id="anik-medicine-package">
      Medicine package:
      <div v-html="medicine.package"></div>
    </div>
    <div v-html="medicine.content" id="anik-content"></div>
  </div>
</template>

<script>
export default {
  name: "medicine-slug",
  data() {
    return {
      medicine: null,
    };
  },
  async created() {
    try {
      const { api } = useApi();
      const { slug } = this.$route.params;
      const { data } = await useAsyncData(`medicine-${slug}`, () =>
        api.get(`/fetch/medicine/${slug}`)
      );
      if (!data.value?.item) {
        showError({ statusCode: 404, message: "Medicine not found" });
        return;
      }
      this.medicine = data.value.item;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
