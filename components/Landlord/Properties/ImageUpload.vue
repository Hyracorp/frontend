<script setup lang="ts">
import { usePropertyStore } from "@/stores/property";
const propertyStore = usePropertyStore();
const { $api } = useNuxtApp();
const propertyAPI = usePropertyAPI($api);
const device = useDevice();

const props = defineProps({
  propertyId: {
    type: Number,
    default: 0,
  },
});
const toast = useToast();
const images = ref([
  {
    id: null,
    index: 0,
    title: "Outside Photo",
    header: "Outside Photo",
    photo_url: null,
  },
  {
    id: null,
    index: 1,
    title: "Inside Photo",
    header: "Inside Photo",
    photo_url: null,
  },
  {
    id: null,
    index: 2,
    title: "Inside Photo 2",
    header: "Inside Photo 2",
    photo_url: null,
  },
  {
    id: null,
    index: 3,
    title: "Washroom/Amenity",
    header: "Washroom/Amenity",
    photo_url: null,
  },
]);

const updateIndex = ref([]);
async function uploadImage(event, index) {
  if (event.files[0] == null) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Please select a file",
      life: 3000,
    });
  } else if (images.value[index].title == "") {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Please provide a title",
      life: 3000,
    });
  } else {
    const file = event.files[0];
    const formData = new FormData();
    formData.append("photo_url", file);

    formData.append("title", images.value[index].title);
    formData.append("property", props.propertyId);
    if (images.value[index].id != null) {
      formData.append("id", images.value[index].id);
    }

    if (images.value[index].id == null) {
      try {
        const res = await propertyAPI.uploadImage(formData);
        if (res) {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "Image uploaded successfully",
            life: 3000,
          });
          return true;
        }
      } catch (err) {
        console.log(err);
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error uploading image",
          life: 3000,
        });
        await getProperty();
      }
    } else {
      try {
        const res = await propertyAPI.updateImage(
          formData,
          images.value[index].id,
        );

        if (res) {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "Image uploaded successfully",
            life: 3000,
          });
          await getProperty();
          return true;
        }
      } catch (err) {
        console.log(err);

        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error uploading image",
          life: 3000,
        });
      }
    }
  }
}
async function getProperty() {
  const res = await propertyAPI.getProperty(props.propertyId);
  if (res.photos && res.photos.length > 0) {
    images.value.forEach((image) => {
      if (image.index < res.photos.length) {
        image.id = res.photos[image.index].id;
        image.photo_url = res.photos[image.index].photo_url;
        image.title = res.photos[image.index].title;
      }
    });
  }
  return res;
}
onMounted(async () => {
  try {
    await getProperty();
  } catch (err) {
    console.log(err);
  }
});
const baseURL = computed(() => propertyStore.getCloudinaryBaseURL);
</script>

< <template>
  <div class="w-full min-w-72 max-w-2xl">
    <Stepper linear :orientation="device?.isDesktop ? 'horizontal' : 'vertical'">
      <StepperPanel v-for="(image, index) in images" :header="image.header" :key="image.index">
        <template #content="{ prevCallback, nextCallback }">
          <div class="">
            <div v-if="image.id != null">
              <img :src="baseURL + image.photo_url" alt="property image" class="w-56 rounded" />
            </div>
            <div class="flex flex-col gap-2">
              <label for="title">Title</label>
              <InputText v-model="image.title" placeholder="Enter title" class="w-full" />
            </div>
            <FileUpload :key="index" accept="image/*" :multiple="false" :maxFileSize="1000000" customUpload
              @uploader="(event) => uploadImage(event, index)" />
          </div>
          <div class="flex flex-col gap-3">
            <Button label="Back" severity="secondary" @click="prevCallback" v-if="index > 0" />
            <Button label="Next" @click="nextCallback" v-if="index < 3" />
          </div>
        </template>
      </StepperPanel>
    </Stepper>
  </div>
</template>
