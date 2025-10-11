<template>
  <section class="forten-support min-h-screen text-gray-100">
    <!-- HERO -->
    <div class="relative hero-section text-center py-24 px-6 sm:px-16 overflow-hidden">
      <video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover opacity-40">
        <source src="/" type="video/mp4" />
      </video>
      <div class="absolute inset-0 bg-gradient-to-b from-[#03121c]/90 via-[#04292e]/85 to-[#03121c]/95"></div>

      <div class="relative z-10 max-w-3xl mx-auto">
        <h1 class="text-4xl sm:text-5xl font-extrabold mb-4 text-[#00d1b2] drop-shadow-lg">
          Forten Support Center
        </h1>
        <p class="text-gray-300 text-lg leading-relaxed">
          Need assistance? Our <span class="text-[#f4b000] font-semibold">24/7 support</span> team is here to help with
          your account, investments, or withdrawals — anytime, anywhere.
        </p>
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <div class="max-w-7xl mx-auto py-20 px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
      <!-- Form Section -->
      <div
        class="lg:col-span-2 glass-card backdrop-blur-lg bg-white/10 border border-white/10 shadow-xl rounded-3xl p-8"
      >
        <h2 class="text-2xl font-semibold text-[#00d1b2] mb-6 flex items-center gap-2">
          <i class="mdi mdi-email-outline text-[#f4b000] text-3xl"></i> Send Us a Message
        </h2>

        <div class="flex flex-col gap-5">
          <div>
            <label class="block text-sm mb-2 text-gray-300">Topic</label>
            <InputText v-model="form.topic" placeholder="Enter your topic..." class="w-full" />
          </div>

          <div>
            <label class="block text-sm mb-2 text-gray-300">Email (optional)</label>
            <InputText v-model="form.email" placeholder="your@email.com" class="w-full" />
          </div>

          <div>
            <label class="block text-sm mb-2 text-gray-300">Description</label>
            <Textarea
              v-model="form.description"
              rows="6"
              autoResize
              placeholder="Describe your issue or question..."
              class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm mb-2 text-gray-300">Attach File (optional)</label>
            <input
              type="file"
              @change="handleFileUpload"
              class="w-full border border-[#1e3a4f] p-2 rounded-md bg-[#0d1b2a] text-gray-300"
            />
          </div>

          <div class="flex justify-end mt-4">
            <Button
              label="Send Message"
              icon="mdi mdi-send"
              class="p-button-success w-48 bg-[#00d1b2] hover:bg-[#00bfa1] text-[#02131d] font-semibold border-none"
              @click="sendMessage"
            />
          </div>
        </div>
      </div>

      <!-- Contact Info -->
      <div
        class="bg-gradient-to-b from-[#041a25] via-[#052e36] to-[#02131d] border border-[#0e3d45] shadow-lg rounded-3xl p-8 flex flex-col justify-between"
      >
        <div>
          <h3 class="text-xl font-bold mb-4 text-[#f4b000]">Contact Us Directly</h3>
          <ul class="space-y-4 text-gray-300">
            <li class="flex items-center gap-3">
              <i class="mdi mdi-email-outline text-2xl text-[#00d1b2]"></i>
              <span>support@forten.io</span>
            </li>
            <li class="flex items-center gap-3">
              <i class="mdi mdi-phone text-2xl text-[#00d1b2]"></i>
              <span>+1 (800) 555-2025</span>
            </li>
            <li class="flex items-center gap-3">
              <i class="mdi mdi-whatsapp text-2xl text-[#00d1b2]"></i>
              <span>+44 7894 654321</span>
            </li>
            <li class="flex items-center gap-3">
              <i class="mdi mdi-map-marker text-2xl text-[#00d1b2]"></i>
              <span>London HQ – 123 Global Finance Avenue</span>
            </li>
          </ul>
        </div>

        <div class="mt-8">
          <h4 class="font-semibold mb-3 text-[#f4b000]">Follow Us</h4>
          <div class="flex gap-4 text-2xl">
            <a href="#" class="hover:text-[#00d1b2]"><i class="mdi mdi-facebook"></i></a>
            <a href="#" class="hover:text-[#00d1b2]"><i class="mdi mdi-twitter"></i></a>
            <a href="#" class="hover:text-[#00d1b2]"><i class="mdi mdi-telegram"></i></a>
            <a href="#" class="hover:text-[#00d1b2]"><i class="mdi mdi-linkedin"></i></a>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ -->
    <div class="faq-section bg-[#0a1829] py-20 px-6 sm:px-12">
      <div class="max-w-5xl mx-auto text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-[#f4b000] mb-3">Frequently Asked Questions</h2>
        <p class="text-gray-400 max-w-3xl mx-auto">
          Find quick answers before reaching out to support.
        </p>
      </div>

      <div class="max-w-4xl mx-auto space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="faq-item bg-[#0d1f33] border border-[#153c45] rounded-2xl p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#00d1b2]/10"
        >
          <button
            class="w-full flex justify-between items-center text-left text-[#00d1b2] font-semibold text-lg"
            @click="toggleFAQ(index)"
          >
            {{ faq.question }}
            <i :class="[faq.open ? 'mdi mdi-chevron-up' : 'mdi mdi-chevron-down']"></i>
          </button>
          <transition name="fade">
            <p v-if="faq.open" class="text-gray-400 text-sm mt-3 leading-relaxed">{{ faq.answer }}</p>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Button from "primevue/button";

const form = ref({
  topic: "",
  email: "",
  description: "",
  file: null,
});

function handleFileUpload(e) {
  form.value.file = e.target.files[0];
}

function sendMessage() {
  if (!form.value.topic || !form.value.description) {
    alert("⚠️ Please fill in topic and description before sending.");
    return;
  }
  alert("✅ Your message has been sent successfully. Our support team will respond shortly.");
  form.value = { topic: "", email: "", description: "", file: null };
}

const faqs = ref([
  {
    question: "How long does it take to process a withdrawal?",
    answer:
      "Withdrawals are typically processed within 12–24 hours, depending on blockchain network conditions.",
    open: false,
  },
  {
    question: "Can I cancel or upgrade my investment plan?",
    answer:
      "Yes. You can withdraw your active balance or reinvest anytime using the 'Portfolio' section of your dashboard.",
    open: false,
  },
  {
    question: "How can I contact Forten support?",
    answer:
      "You can reach us via email, WhatsApp, or Telegram 24/7. Our support staff responds within 30 minutes on average.",
    open: false,
  },
]);

function toggleFAQ(index) {
  faqs.value[index].open = !faqs.value[index].open;
}
</script>

<style scoped lang="scss">
.forten-support {
  background: linear-gradient(180deg, #03121c 0%, #0a1829 100%);
  font-family: "Inter", sans-serif;

  .glass-card {
    box-shadow: 0 0 40px rgba(0, 209, 178, 0.1);
  }

  .faq-item button i {
    transition: transform 0.3s ease;
  }

  .faq-item button:hover i {
    transform: scale(1.1);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-5px);
  }
}
</style>
